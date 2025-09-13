const { startWipe } = require('./wipeController');

startWipe(
  { device: '/dev/sdb', method: 'dod', label: 'USB Drive' },
  progress => console.log('Progress:', progress)
).then(result => {
  console.log('Final wipe result:', result);
});
