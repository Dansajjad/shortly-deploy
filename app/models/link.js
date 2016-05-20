var mongoose = require('../config');
var crypto = require('crypto');

var schema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

schema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);

  next();
});

var Link = mongoose.model('Link', schema);

module.exports = Link;
