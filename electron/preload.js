const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  }
});

// Render process or preload.js
window.electron.ipcRenderer.invoke('test-addon').then(result => {
  alert(result); // Should alert your C++ message
});
