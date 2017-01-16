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
// GET /admin/userlist 进入管理用户页
router.get('/userlist', checkLogin, isAdmin, function(req, res, next) {
	var page = parseInt(req.query.p, 10) || 0;
	var count = 6;
	var index = page * count;

	User.fetch(function(err, users) {
		if(err) {console.log(err);}

		for(var i=0;i<users.length;i++) {
			if(users[i].username == 'AdminYDR') {
				users = users.splice(i+1);
			}
		}

		results = users.slice(index, index + count);
		res.render('adminuserlist', {
			title: '欢迎来到用户管理的地盘！！',
			currentPage: (page+1),
			totalPage: Math.ceil(users.length / count),
			users: results,
		});
	});
});
// DELETE /admin/userlist 用户删除交互
router.delete('/userlist', checkLogin, isAdmin, function(req, res, next) {
	var id = req.query.id;
	if(id) {
		User.remove({_id: id}, function(err, user) {
			if(err) {
				console.log(err);
				res.json({success: 0});
			}else{
				res.json({success: 1});
			}
		});
	}
});

module.exports = router;