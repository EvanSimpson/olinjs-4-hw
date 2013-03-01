var User = require('../models/user');
var Tweet = require('../models/tweet');

//GET form for new tweet
exports.new = function(req, res){
	var user = req.session.user;
	if (user){
		console.log('compose form loaded');
		res.render('_newTweet');
	}
	else{
		console.log('compose form not loaded');
		res.render('');
	}
};

//POST make a new tweet
exports.create = function(req, res){
	var user = req.session.user;
	if (user){
		var tweet = new Tweet({text: req.body.text, user: user.name});
		tweet.save(function(err, newTweet){
			console.log(newTweet.id);
			console.log('tweet saved');
			console.log(user.tweets);
			user.tweets.push(newTweet.id);
			console.log(user.tweets);
			User.update({name: user.name}, {$set: { tweets: user.tweets}}, {upsert: true});
			res.redirect('/');
		});
	}
};

//GET list of tweets
exports.list = function(req, res){
	var user = req.session.user;
	if (user){
		Tweet.find().sort('-createdAt').exec(function(err, docs){
			console.log('rendering feed');
			res.render('_feed', {tweets: docs, user: user});
		});
	}
	else{
		console.log('feed not rendered');
	}
};

//POST delete tweet
exports.delete = function(req, res){
	var user = req.session.user;
	if (user){
		if(user.name == req.body.user){
			Tweet.findAndRemoveOne({id: req.body.id}).exec(function(err){
				console.log('tweet removed');
				res.redirect('/');
			});
		}
	}
};