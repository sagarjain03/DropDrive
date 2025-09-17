const wipeAddon = require('./build/Release/wipeAddon.node');
// const usbPath = '\\\\.\\PhysicalDrive1'
// console.log(wipeAddon.wipeFile('./test/test_video.mp4', 'nist'));
// console.log(wipeAddon.wipeFile('./test/test_exe.exe', 'nistzero'));
// console.log(wipeAddon.wipeFile('./test/test_img.png', 'dod'));
// console.log(wipeAddon.wipeFile('./test/test_zip.zip', 'zero'));
console.log(wipeAddon.wipeFile('./test', 'nistzero'));
// console.log(wipeAddon.wipeFile('./test/test_pdf.pdf', 'random'));


