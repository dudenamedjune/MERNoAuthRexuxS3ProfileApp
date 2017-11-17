const assert = require('assert');
const request = require('supertest');
const app = require('../../server');
const mongoose = require("mongoose");
const Profile = mongoose.model('profile');

describe('Profiles controller', () =>{

  it('Get to /api/profiles and returns all ', done => {
    let joe, maria, alex, zach;
    alex = new Profile({ email: "alex@alex.com", name: 'Alex', discription: 'test'});
    joe = new Profile({email:'Joe@Joe.com', name: 'Joe', discription: 'test'});
    maria = new Profile({email: 'Maria@Maria.com', name: 'Maria', discription: 'test'});
    zach = new Profile({ email:'Zach@Zach.com', name: 'Zach', discription: 'test'});
    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
    .then(()=>{
      request(app)
        .get('/api/profiles')
        .then((res) => {
          assert(res.body.length === 4);
          done();
    });
});



  });
  it('Post to /api/profile creates a new profile', (done) => {
    Profile.count().then(count => {
        request(app)
          .post('/api/profile')
          .send({ email: 'test@test.com', name: 'June Lara', discription: "Lorem" })
          .end(() => {
            Profile.count().then(newCount => {
              assert(count + 1 === newCount);
              done();
        });
      });
    });
  });//end of it

  it('Put to /api/profile/:id edits an existing profile', (done) => {
    const profile = new Profile({email: 'test@test.com', name: 'June Lara', discription: "Lorem" });

    profile.save().then(() => {
      request(app)
        .put(`/api/profile/${profile._id}`)
        .send({ discription: "edit" })
        .end(() => {
          Profile.findOne({
          name: 'June Lara'
        }).then(profile =>{
          assert(profile.discription === 'edit');
          done();
        })
    });


  });
});

it('Delete to /api/profile/:id deletes profile', (done) => {
    const profile = new Profile({email: 'test@test.com', name: 'June Lara', discription: "Lorem" });

  profile.save().then(() => {
    request(app)
      .delete(`/api/profile/${profile._id}`)
      .end(() => {
        Profile.findOne({
        email: 'test@test.com'
      }).then(profile =>{
        assert(profile === null);
        done();
      })
    });
  });
});


});
