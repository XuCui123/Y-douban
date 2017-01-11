var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var check = require('../middlewares/check');

var checkLogin = check.checkLogin;
var isAdmin = check.isAdmin;
// GET /admin 进入管理页
router.get('/', checkLogin, isAdmin, function(req, res, next) {
	res.render('admin', {
		title: '欢迎主人回家！！'
	});
});

module.exports = router;