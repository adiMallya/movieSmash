const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// Sign a JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env['JWT_SECRET'], {
        expiresIn: process.env['JWT_EXPIRE']
    });
}
// Match user given password to hashed password in databse
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);