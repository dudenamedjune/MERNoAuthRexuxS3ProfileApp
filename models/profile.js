const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  discription:{
    type: String,
    required: false
  },
  imageURL: {
    type: String,
    required: false
  }
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
