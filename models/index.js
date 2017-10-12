var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  String,
  firstName: String,
  lastName:   String,
  email:   String,
  password:   String,
  dateCreatedS: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
