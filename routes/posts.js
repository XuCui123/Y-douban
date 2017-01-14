var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /posts/create 发表一个帖子
router.get('/create', checkLogin, function(req, res, next) {
	res.render('createpost', {
		title: 'Come on 发个帖吧！'
	});
});

// POST /posts 发表一篇文章
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
router.get('/', function(req, res, netx) {
	Post.fetch(function(err, posts) {
		if(err) {console.log(err);}

		// 反转数组，倒序排列帖子
		posts = posts.reverse();

		res.render('posts', {
			title: '欢迎来到唠嗑圣地！！',
			posts: posts
		});
	});
});

// GET /posts/:postId 单独一篇帖子
router.get('/:postId', function(req, res, next) {
	var postId = req.params.postId;

	Post.update({_id: postId}, {$inc: {pv: 1}}, function(err) {
		if(err) {console.log(err);}
	});

	Post.findById(postId, function(err, post) {
		User.findById(post.author, function(err, user) {
		  	res.render('postdetail', {
		  		title: post.title,
		  		user: user,
		  		post: post
		  	});
		});
	});
});

module.exports = router;