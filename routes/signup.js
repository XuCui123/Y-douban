var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart(); 
var mongoose = require('mongoose');
var User = mongoose.model('User');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 进入注册页
router.get('/', checkNotLogin, function(req, res, next) {
	console.log('注册页');
	res.render('signup');
});

// POST /signup 用户注册
router.post('/', checkNotLogin, multipartMiddleware,function(req, res, next) {
	var _user = req.body;
	var username = _user.username;
	var password = _user.password;
	var confirmPassword = _user.confirmPassword;
	// 服务器校验参数
	try {
		if (!(username.length >= 6 && username.length <= 11)) {
		    throw new Error('名字请限制在 6-11 个字符');
		}
		if (!(password.length >= 6 && password.length <= 16)) {
			throw new Error('密码请限制在 6-16 个字符');
		}
		if (password != confirmPassword) {
			throw new Error('两次输入密码不一致');
		}
	} catch(e) {
		return res.redirect('/signup');
	}
	//
	User.findOne({username: username}, function(err, user) {
		if(err) {console.log(err);}

		if(user != null) {
			return res.redirect('/signin')
		}else{
			user = new User(_user);
			console.log(user);
			user.save(function(err, user) {
				if(err) {console.log(err);}
				res.redirect('/');
			});
		}
	});
});

module.exports = router;