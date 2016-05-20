var mongoose = require('../config');

var schema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});


var Link = mongoose.model('Link', schema);

module.exports = Link;
