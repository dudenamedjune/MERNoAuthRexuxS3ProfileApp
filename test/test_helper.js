const mongoose = require('mongoose');

before(done => {

  mongoose.connect('mongodb://localhost/keystokes_test',
  {useMongoClient: true,});
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err);
    });
});

beforeEach(done => {
  const { profiles } = mongoose.connection.collections;
  profiles.drop()
  .then(()=> done())
  .catch(() => done());
});
