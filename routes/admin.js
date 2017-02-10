var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Category = mongoose.model('Category');
var Game = mongoose.model('Game');
var Post = mongoose.model('Post');
var _  = require('underscore');
var fs = require('fs');
var path = require('path');
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
			users: results
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
		title: '欢迎大大前来录入分类信息！',
		category: {}
	});
});

// POST /admin/category/create 分类录入
router.post('/category/create', checkLogin, isAdmin, function(req, res, next) {
	var id = req.fields.categoryId;
	var categoryName = req.fields.categoryName;
	var _category = {
		name: categoryName
	}
	console.log(id);
	if(id) {
		Category.findById(id, function(err, category) {
			if(err) {console.log(err);}

			categoryLast = _.extend(category, _category);

			categoryLast.save(function(err, category) {
				if(err) {console.log(err);}

				res.redirect('/admin/categorylist');
			});
		});
	}else{
		var category = new Category(_category);

		category.save(function(err, category) {
			if(err) {console.log(err);}

			res.redirect('/admin/categorylist');
		});
	}	
});

// GET /admin/categorylist 进入分类列表页
router.get('/categorylist', checkLogin, isAdmin, function(req, res, next) {
	var page = parseInt(req.query.p, 10) || 0;
	var count = 6;
	var index = page * count;

	Category.fetch(function(err, categories) {
		if(err) {console.log(err);}

		results = categories.slice(index, index + count);

		res.render('admincategorylist', {
			title: '分类列表展示给您观看！',
			currentPage: (page+1),
			totalPage: Math.ceil(categories.length / count),
			categories: results
		});
	});
});

// GET /admin/categoryupdate/:id 修改分类名称
router.get('/categoryupdate/:id', checkLogin, isAdmin, function(req, res, next) {
	var id = req.params.id;

	if (id) {
		Category.findById(id, function(err, category) {
			res.render('admincategorycreate', {
				title: '欢迎主人前来修改' + category.name,
				category: category
			});
		});
	}
});

// DELETE /admin/categorylist 分类删除交互
router.delete('/categorylist', checkLogin, isAdmin, function(req, res, next) {
	var id = req.query.id;
	if(id) {
		Category.remove({_id: id}, function(err, category) {
			if(err) {
				console.log(err);
				res.json({success: 0});
			}else{
				res.json({success: 1});
			}
		});
	}
});

// GET /admin/game/create 进入游戏录入页
router.get('/game/create', checkLogin, isAdmin, function(req, res, next) {
	Category.find({},function(err, categories){
		res.render('admingamecreate', {
			title: '欢迎大大前来录入游戏信息！',
			categories: categories,
			game: {}
		});
	});
});

// POST /admin/game/create 游戏录入
router.post('/game/create', checkLogin, isAdmin, function(req, res, next) {
	var gameId = req.fields.gameId;
	var gamecategory = req.fields.gamecategory;
	var gamename = req.fields.gamename;
	if(req.files.uploadposter.name) {
		gameposter = req.files.uploadposter.path.split(path.sep).pop();
	}else{
		fs.unlink(req.files.uploadposter.path);
		gameposter = req.fields.gameposter;
	}
	var gameflash = req.fields.gameflash;
	var gameyear = req.fields.gameyear;
	var gameurl = req.fields.gameurl;
	var gamesummary = req.fields.gamesummary;

	var categoryId = req.fields.gamecategory;

	// 参数校验
	try {
		if (!gamename.length) {
		    throw new Error('游戏名称不能为空！');
		}
		if (!gameposter.length) {
			throw new Error('尚未上传海报！');
		}
		if (!gameflash.length) {
			throw new Error('尚未上传宣传视频！');
		}
		if (!gameyear.length) {
			throw new Error('上线时间不能为空！');
		}
		if (!gamesummary.length) {
			throw new Error('游戏简介不能为空！');
		}
		if (!gameurl.length) {
			throw new Error('官网网站不能为空！');
		}
	} catch(e) {
		// 录入失败，异步删除上传的海报
	    fs.unlink(req.files.uploadposter.path);
	    req.flash('error', e.message);
	    return res.redirect('/admin/game/create');
	}

	var _game = {
		category: gamecategory,
		name: gamename,
		poster: gameposter,
		flash: gameflash,
		year: gameyear,
		url: gameurl,
		summary: gamesummary
	}

	if(gameId) {
		Game.findById(gameId, function(err, game) {
			if(err) {console.log(err);}

			gameLast = _.extend(game, _game);

			gameLast.save(function(err, game) {
				if(err) {console.log(err);}

				res.redirect('/admin/gamelist');
			});
		});
	}else{
		Game.findOne({name: gamename}, function(err, game) {
			if(err) {console.log(err);}

			if(game != null) {
				req.flash('error', '已经录入过的游戏！');
				return res.redirect('/admin/game/create');
			}else{
				game = new Game(_game);
				game.save(function(err, game) {
					if(err) {console.log(err);}

					if(categoryId) {
						Category.findById(categoryId, function(err, category) {
							category.games.push(game._id);

							category.save(function(err, category) {
								res.redirect('/admin/gamelist');
							});
						});
					}
				});
			}
		});
	}
});

// GET /admin/gamelist 进入游戏列表页
router.get('/gamelist', checkLogin, isAdmin, function(req, res, next) {
	var page = parseInt(req.query.p, 10) || 0;
	var count = 6;
	var index = page * count;

	Game.fetch(function(err, games) {
		if(err) {console.log(err);}

		results = games.slice(index, index + count);

		res.render('admingamelist', {
			title: '游戏列表展示给您观看！',
			currentPage: (page+1),
			totalPage: Math.ceil(games.length / count),
			games: results
		});
	});
});

// GET /admin/gameupdate/:id 修改游戏内容
router.get('/gameupdate/:id', checkLogin, isAdmin, function(req, res, next) {
	var id = req.params.id;

	if(id) {
		Game.findById(id, function(err, game) {
			Category.find({},function(err, categories){
				res.render('admingamecreate', {
					title: '欢迎大大前来录入游戏信息！',
					categories: categories,
					game: game
				});
			});
		});
	}
});

// DELETE /admin/gamelist 游戏删除交互
router.delete('/gamelist', checkLogin, isAdmin, function(req, res, next) {
	
	var id = req.query.id;
	if(id) {
		Game.remove({_id: id}, function(err, game) {
			if(err) {
				console.log(err);
				res.json({success: 0});
			}else{
				res.json({success: 1});
			}
		});
	}
});

// GET /admin/postlist 进入帖子列表页
router.get('/postlist', checkLogin, isAdmin, function(req, res, next) {
	var page = parseInt(req.query.p, 10) || 0;
	var count = 8;
	var index = page * count;

	Post
		.find({})
		.populate({
	  	  path: 'author',
	  	  model: 'User'
		})
		.exec(function(err, posts) {
		if(err) {console.log(err);}

		results = posts.slice(index, index + count);

		res.render('adminpostlist', {
			title: '帖子列表展示给您观看！',
			currentPage: (page+1),
			totalPage: Math.ceil(posts.length / count),
			posts: results
		});
	});
});

// DELETE /admin/postlist 帖子删除交互
router.delete('/postlist', checkLogin, isAdmin, function(req, res, next) {
	var id = req.query.id;
	if(id) {
		Post.remove({_id: id}, function(err, post) {
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