const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6
  },
  username: {
    type: String,
    required: [true, "Please use a unique username."],
    unique: true,
    trim: true
  },
  phoneNumber: {
    type: Number,
    length: 10
  },
  address: {
    type: String,
    trim: true,
    maxLength: [60, "Address can not be more than 50 characters"]
  },
  profileImage: {
    type: String,
    trim: true,
    default: "https://www.imageholder.com/#noimage"
  }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema);