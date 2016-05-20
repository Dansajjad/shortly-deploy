var mongoose = require('../config');

var schema = mongoose.Schema({
  username: String,
  password: String
});

var User = mongoose.model('User', schema);


module.exports = User;
