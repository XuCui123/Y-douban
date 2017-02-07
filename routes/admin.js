var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Category = mongoose.model('Category');
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

// GET /admin/games 进入游戏管理页
router.get('/games', checkLogin, isAdmin, function(req, res, next) {
	res.render('admingames', {
		title: '游戏管理！！'
	});
});
// GET /admin/category/create 进入分类录入页
router.get('/category/create', checkLogin, isAdmin, function(req, res, next) {
	res.render('admincategorycreate', {
		title: '欢迎大大前来录入分类信息！'
	});
});
// POST /admin/category/create 分类录入
router.post('/category/create', checkLogin, isAdmin, function(req, res, next) {
	var categoryName = req.fields.categoryName;
	var _category = {
		name: categoryName
	}
	var category = new Category(_category);

	category.save(function(err, category) {
		if(err) {console.log(err);}

		res.redirect('/admin/category/list')
	});
});
// GET /admin/category/list 进入分类列表页
router.get('/category/list', checkLogin, isAdmin, function(req, res, next) {
	Category.fetch(function(err, categories) {
		if(err) {console.log(err);}

		res.render('admincategorylist', {
			title: '分类列表展示给您观看！',
			categories: categories
		});
	});
});
// GET /admin/games/create 进入游戏录入页
router.get('/game/create', checkLogin, isAdmin, function(req, res, next) {
	Category.find({},function(err, categories){
		res.render('admingamecreate', {
			title: '欢迎大大前来录入游戏信息！',
			categories: categories,
			game: {}
		});
	});
});

module.exports = router;