var User = require('../models/user');
var Tweet = require('../models/tweet');


//GET list of Users
exports.list = function(req, res){
	User.find().sort('-createdAt').exec(function(err, docs){
		res.render('users', {title: 'All Users', users: docs});
	});
};


//GET form for new User/login
exports.new = function(req, res){
	res.render('_login');
};

//POST new User signup/login
exports.create = function(req, res){
	
	User.findOne({name: req.body.name}).exec(function(err, user){
		if (user){
			console.log('user signed in');
			req.session.user = user;
			res.redirect('/');
		} else{
			var user = new User({name: req.body.name, tweets: []});
			user.save(function(err){
				console.log('user created');
				req.session.user= user;
				res.redirect('/');
			});
		}
	});
};



