const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    trim: true
  },
  registro: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Usuario', UserSchema);