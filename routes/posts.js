var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /posts/create 发表一个帖子页
router.get('/create', checkLogin, function(req, res, next) {
	res.render('postcreate', {
		title: 'Come on 发个帖吧！'
	});
});

// POST /posts 发表一个帖子
router.post('/create', checkLogin, function(req, res, next) {
	var author = req.session.user._id;
	var title = req.fields.title;
	var content = req.fields.content;

	// 校验参数
	try{
		if(!title.length) {
			throw new Error('标题不能为空！');
		}
		if(!content.length) {
			throw new Error('内容不能为空！');
		}
	}catch(e) {
		req.flash('error', e.message);
		return res.redirect('back');
	}
	// 待写入数据库帖子信息
	var _post = {
		author: author,
		title: title,
		content: content,
		pv: 0
	};
	post = new Post(_post);
	post.save(function(err, post) {
		if(err) {console.log(err);}

		res.redirect('/posts/' + post._id);
	});
});

// GET /posts 论坛页
router.get('/', checkLogin, function(req, res, next) {
	var page = parseInt(req.query.p, 10) || 0;
	var count = 6;
	var index = page * count;

	Post
		.find({})
		.populate({path: 'author', model: 'User'})
		.exec(function(err, posts) {
			if(err) {console.log(err);}

			// 反转数组，倒序排列帖子
			posts = posts.reverse();
			// 截取显示元素
			results = posts.slice(index, index + count);

			res.render('posts', {
				title: '欢迎来到唠嗑圣地！！',
				currentPage: (page+1),
				totalPage: Math.ceil(posts.length / count),
				posts: results
			});
	});
});

// GET /posts/:postId 单独一篇帖子
router.get('/:postId', checkLogin,function(req, res, next) {
	var postId = req.params.postId;

	Post.update({_id: postId}, {$inc: {pv: 1}}, function(err) {
		if(err) {console.log(err);}
	});

	Post.findOne({_id: postId})
		.populate({path: 'author', model: 'User'})
		.exec(function(err, post) {
		  	res.render('postdetail', {
		  		title: post.title,
		  		post: post
		  	});
		});
	});

// GET /posts/:postId/edit 更新帖子页
router.get('/:postId/edit', checkLogin, function(req, res, next) {
	var postId = req.params.postId;
	var author = req.session.user._id;

	Post.findById(postId, function(err, post) {
		if(!post) {
			throw new Error('该帖子不存在！');
		}
		if(author.toString() !== post.author.toString()) {
			throw new Error('无权操作！');
		}
		res.render('postedit', {
			title: post.title + '更新！',
			post: post
		});
	});
});

// POST /posts/:postId/edit 更新帖子
router.post('/:postId/edit', checkLogin, function(req, res, next) {
	var postId = req.params.postId;
	var author = req.session.user._id;
	var title = req.fields.title;
	var content = req.fields.content;

	Post.update({_id: postId, author: author}, {$set: {title: title, content: content}}, function(err) {
		if(err) {console.log(err);}

		res.redirect('/posts/' + post._id);
	});
});

// GET /posts/:postId 删除一篇帖子
router.get('/:postId/remove', checkLogin, function(req, res, next) {
	var postId = req.params.postId;
	var author = req.session.user._id;

	Post.remove({_id: postId, author: author}, function(err) {
		if(err) {console.log(err);}

		res.redirect('/posts');
	});
});


module.exports = router;