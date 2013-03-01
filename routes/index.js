var Tweet = require('../models/tweet');
/*
 * GET home page.
 */

exports.index = function(req, res){
	var user = req.session.user;
	Tweet.find().sort('-createdAt').exec(function(err, docs){
		res.render('index', {title: 'Shitty Twitty', user: user, tweets: docs});
	});
};