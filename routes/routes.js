const ProfileController = require('../controllers/appController');

module.exports = (app) => {
  app.get('/api/profiles', ProfileController.getAll);
  app.get('/api/profile', ProfileController.getProfile);
  app.post('/api/profile', ProfileController.create);
  app.put('/api/profile/:id', ProfileController.edit);
  app.delete('/api/profile/:id', ProfileController.delete);


};
