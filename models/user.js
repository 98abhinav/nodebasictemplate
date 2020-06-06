const mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
let User = mongoose.model('user', UserSchema);

// make this model available
module.exports = User;

