var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

// GET /admin 进入管理页
router.get('/', function(req, res, next) {
	res.render('admin', {
		title: '欢迎主人回家！！'
	});
});

// POST /admin 管理员登录
router.post('/', function(req, res, next) {
	var _user = req.body;
	console.log(_user);
});

module.exports = router;