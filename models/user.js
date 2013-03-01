var mongoose = require('mongoose');

var schema = mongoose.Schema({name: String, tweets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tweet'}], createdAt: { type : Date, default: Date.now }});
var user = mongoose.model('User', schema);

module.exports = user;