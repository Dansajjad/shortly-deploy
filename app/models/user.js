var mongoose = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var schema = mongoose.Schema({
  username: String,
  password: String
});

schema.method('comparePassword', function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
});

schema.method('hashPassword', function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
});

var User = mongoose.model('User', schema);


module.exports = User;
