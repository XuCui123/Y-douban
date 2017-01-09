var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

// GET /signin 进入登录页
router.get('/', function(req, res, next) {
	res.render('signin');
});

// POST /signin 用户登录
router.post('/', function(req, res, next) {
	var _user = req.body;
	var username = _user.username;
	var password = _user.password;

	User.findOne({username: username}, function(err, user) {
		if(err) {console.log(err);}

		if(user == null) {
			return res.redirect('/signin');
		}

		user.comparePassword(password, function(err, isMatch) {
			if(err) {console.log(err);}

			if(isMatch) {
				req.session.user = user;

				return res.redirect('/');
			}else{
				console.log('密码错误');
				return res.redirect('signin');
			}
		});
	});
});

module.exports = router;