const { generateWipeCertificate } = require('./certificateGenerator');

async function testCert() {
  const certPath = await generateWipeCertificate({
    device: '\\\\.\\PhysicalDrive1',
    deviceInfo: {
      serial: '123XYZ',
      model: 'SanDisk Ultra USB 3.0',
      type: 'USB',
      capacity: '64GB'
    },
    eraseMethod: 'NIST',
    nistProfile: 'Clear',
    postWipeStatus: 'success',
    logs: ['Wipe started', 'Completed'],
    toolVersion: '1.0.0'
  });
  console.log('Certificate JSON saved to:', certPath);
}
testCert();
