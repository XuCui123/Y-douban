var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

var checkLogin = require('../middlewares/check').checkLogin;
// GET /admin 进入管理页
router.get('/', checkLogin, function(req, res, next) {
	res.render('admin', {
		title: '欢迎主人回家！！'
	});
});

module.exports = router;