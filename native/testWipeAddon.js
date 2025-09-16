const wipeAddon = require('./build/Release/wipeAddon.node');
// console.log(wipeAddon);
// Overwrite file with zeroes
// console.log(wipeAddon.wipeFile('text1.txt', 'zero')); // Wipe 10 KB

// Overwrite file with random data
const usbPath = '\\\\.\\PhysicalDrive1'
console.log(wipeAddon.wipeFile(usbPath, 'nistzero'));
// console.log(wipeAddon.wipeFile('text.txt', 'dod'));

