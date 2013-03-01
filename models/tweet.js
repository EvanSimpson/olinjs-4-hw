var mongoose = require('mongoose');

var schema = mongoose.Schema({text: String, user: String, createdAt: { type : Date, default: Date.now }});
var tweet = mongoose.model('Tweet', schema);

module.exports = tweet;