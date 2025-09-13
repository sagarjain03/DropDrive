const wipeAddon = require('./build/Release/wipeAddon.node');
// console.log(wipeAddon);
// Overwrite file with zeroes
console.log(wipeAddon.wipeFile('test.txt', 'zero')); // Wipe 10 KB

// Overwrite file with random data
// console.log(wipeAddon.wipeFile('test.txt', 'random', 1024 * 10));
