const { app, BrowserWindow, ipcMain } = require('electron');
const { listDrives } = require('./deviceManager');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const os = require('os');
const si = require('systeminformation');
const { wipeDrive } = require('./wipeController'); 

// Use systeminformation for more accurate info
ipcMain.handle('get-system-info', async () => {
  const cpu = await si.cpu();
  const mem = await si.mem();
  const osInfo = await si.osInfo();
  const disks = await si.diskLayout();
  return {
    cpu: cpu.manufacturer + ' ' + cpu.brand,
    memory: Math.round(mem.total / (1024 ** 3)) + ' GB',
    os: osInfo.distro + ' ' + osInfo.arch,
    storage: disks.map(disk =>
      ({ type: disk.type, size: disk.size, name: disk.name })
    ),
  };
});

// Example output: [{fs: 'C:', size, used, type, mount, ...}, ...]
// Filter out CDs/virtual disks if wanted
ipcMain.handle('get-volumes', async () => {
  const fs = await si.fsSize();
  return fs.filter(volume => /^[A-Z]:/.test(volume.mount));
});


//to list drives
ipcMain.handle('list-drives', async () => {
  return await listDrives();
});

// Test native addon
ipcMain.handle('test-addon', async () => {
  return wipeDrive(); 
});

// Create the main application window
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../.next/standalone/index.html')}`;

  win.loadURL(startUrl);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});



