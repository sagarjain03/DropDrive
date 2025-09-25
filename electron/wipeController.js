// electron/wipeController.js
const { EventEmitter } = require('events');
const { wipeDeviceOrFile } = require('./connectorNative');
const { generateWipeCertificate } = require('./certificateGenerator'); // Assuming you have this

const wipeController = new EventEmitter();
function mapMethodToNistProfile(method) {
  switch((method || '').toLowerCase()) {
    case "nist": return "Clear";
    case "dod": return "Purge";
    case "gutmann": return "Destroy";
    case "nistzero": return "Clear";
    case "zero": return "Clear";
    case "random": return "Clear";
    default: return "Clear";
  }
}

/**
 * Initiates a wipe job.
 * @param {Object} options - { device, method, ... }
 * @param {function} onProgress - Callback for progress updates
 */
async function startWipe({ device, method, label, deviceInfo }, onProgress) {
  // 1. Validate input
  if (!device || !method) {
    throw new Error('Missing required parameters: device or method');
  }
  // 2. Log start
  console.log(`[WipeController] Starting wipe on ${device} with ${method} (${label})`);

  // 3. Optional: Unmount logic (platform specific, out of scope for MVP)
  // await unmountDevice(device);
  
  // 4. Simulate Wipe Job (replace with call to native wipeAddon later)
  let progress = 0;
  const passes = getWipePassCount(method);
  for (let pass = 1; pass <= passes; pass++) {
    progress = Math.round((pass / passes) * 100);
    // simulate processing delay
    await new Promise(res => setTimeout(res, 1000));
    if (onProgress) onProgress({ progress, stage: `Pass ${pass} / ${passes}` });
  }
  
  // Call the native wipe function
  const wipeResult = wipeDeviceOrFile(device, method);

  // 5. Send completed event/log
  console.log(`[WipeController] Wipe completed for ${device} with ${method}: ${wipeResult}`);
  const status = wipeResult && wipeResult.toLowerCase().includes('completed') ? "success" : "failure";
  const logArr = [wipeResult]; // Pass log lines/strings if you maintain logs

  // Compose deviceInfo if not coming in (add logic as you wish)
  if (!deviceInfo) deviceInfo = { serial: device, model: label, type: "unknown", capacity: "unknown" };

  // 6. Generate certificate
  const certPath = await generateWipeCertificate({
    device,
    deviceInfo,
    eraseMethod: method,
    nistProfile: mapMethodToNistProfile(method),
    postWipeStatus: status,
    logs: logArr,
    toolVersion: "1.0.0"
  });

  return {
    device,
    method,
    label,
    status: status === "success" ? "Completed" : "Error",
    completedAt: new Date().toISOString(),
    certificatePath: certPath,
    wipeResult
  };
}

// Helper: map method name to pass count (for simulation)
function getWipePassCount(method) {
  switch ((method || '').toLowerCase()) {
    case 'dod': return 3;
    case 'gutmann': return 35;
    case 'nist': return 1;
    case 'nistzero': return 1;
    case 'zero': return 1;
    case 'random': return 1;
    default: return 1;
  }
}


// Example usage:
// For now, just test minimal signature (no arguments)
// Example usage:
const result = wipeDeviceOrFile('../native/test/test_img.png', 'zero');
console.log(result); // Should print: "C++ Addon Loaded - Ready for real wipe"


module.exports = {
  startWipe,
  wipeController,
};