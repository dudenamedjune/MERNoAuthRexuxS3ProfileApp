const Profile = require('../models/profile');

module.exports ={
  getProfile(req, res, next){
    console.log(req.query)
    Profile
      .findOne({ email: req.query.email })
      .then(profile => {if(profile === null){
        Profile.create({email: req.query.email, name: req.query.displayName, imageURL: req.query.photoURL})
        .then(profile => res.send(profile))
      }else{
        res.send(profile)
      }})
      .catch(next);
  },

  getAll(req, res, next) {
    Profile.find({})
    .then(profiles => res.send(profiles))
    .catch(next);
  },
  create(req, res, next) {
      const profileProps = req.body;
      Profile.create(profileProps)
        .then(profile => res.send(profile))
        .catch(next);
  },
  edit(req, res, next) {

    const profileId = req.params.id;
    const profileProps = req.body;
    Profile.findByIdAndUpdate({ _id: profileId }, profileProps)
      .then(() => Profile.findById({ _id: profileId }))
      .then(profile => res.send(profile))
      .catch(next);
  },
  delete(req, res, next) {
    const profileId = req.params.id;
    Profile.findByIdAndRemove({ _id: profileId })

      .then(profile => res.status(204).send(profile))
      .catch(next);
  }
};
