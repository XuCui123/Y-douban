var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var fs = require('fs');
var path = require('path');
var check = require('../middlewares/check');

var saveAvatar = check.saveAvatar;
// PUT /signup ajax交互验证用户名是否存在
router.put('/', function(req, res, next) {
	var name = req.query.name;
	User.findOne({username: name}, function(err, user) {
		if(err) {console.log(err);}

		if(user) {
			return res.json({success: 1});
		}else{
			return res.json({success: 0});
		}
	});
});
// GET /signup 进入注册页
router.get('/', function(req, res, next) {
	res.render('signup', {
		title: '注册啦！欢迎宝宝准备成为我的粉丝一员！'
	});
});

// POST /signup 用户注册
router.post('/', function(req, res, next) {
	var username = req.fields.username;
	var password = req.fields.password;
	var confirmPassword = req.fields.confirmPassword;
	var gender = req.fields.gender;
	var avatar = req.files.avatar.path.split(path.sep).pop();
	var bio = req.fields.bio;
	// 服务器校验二次参数，永远不要相信客户端的校验
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
	// 待写入数据库的用户信息
	var _user = {
		username: username,
	    password: password,
	    gender: gender,
	    bio: bio,
	    avatar: avatar
	}
	//
	User.findOne({username: username}, function(err, user) {
		if(err) {console.log(err);}

		if(user != null) {
			return res.redirect('signup');
		}else{
			user = new User(_user);
			user.save(function(err, user) {
				if(err) {console.log(err);}

				req.session.user = user;
				res.redirect('/');
			});
		}
	});
});

module.exports = router;