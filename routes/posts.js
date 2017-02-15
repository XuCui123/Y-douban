var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
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
			
			// 冒泡排序 完成帖子点击量排序
		  	var sortPosts = function(array) {
		  		var i,j,temp;

		  		for(i = 0; i < array.length; i++) {
		  			for(j = i + 1; j < array.length; j++) {
		  				if(array[j].pv > array[i].pv) {
		  					temp = array[i];
		  					array[i] = array[j];
		  					array[j] = temp;
		  				}else if(array[j].pv === array[i].pv) {
		  					if(array[j].meta.updateAt > array[i].meta.updateAt) {
		  						temp = array[i];
		  						array[i] = array[j];
		  						array[j] = temp;
		  					}
		  				}
		  			}
		  		}
		  		return array;
		  	}

	 		sortPosts(posts);

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
	var i = 1;

	Post.update({_id: postId}, {$inc: {pv: 1}}, function(err) {
		if(err) {console.log(err);}
	});

	Post.findById(postId, function(err, post) {
		Comment
			.find({postId: postId})
			.populate({path: 'from', model: 'User'})
			.populate('reply.from reply.to', 'nickname')
			.exec(function(err, comments) {
		  		res.render('postdetail', {
			  		title: post.title,
			  		post: post,
			  		comments: comments,
			  		i: i
  				});
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

// POST /posts/:postId/comment 创建一条回复
router.post('/:postId/comment', checkLogin, function(req, res, next) {
	var postId = req.params.postId;
	var content = req.fields.content;
	var from  = req.session.user._id;
	var commentTid = req.fields.commentTid;
	var commentCid = req.fields.commentCid;

	// 校验参数
	try{
		if(!content.length) {
			throw new Error('回复内容不能为空！');
		}
	}catch(e) {
		req.flash('error', e.message);
		return res.redirect('back');
	}
	// 待写入数据库帖子信息
	var _comment = {
		postId: postId,
		content: content,
		from: from,
		commentCid: commentCid,
		commentTid: commentTid
	}

	if(commentCid) {
		Comment.findById(commentCid, function(err, comment) {
			var reply = {
				from: from,
				to: commentTid,
				content: content
			}

			comment.reply.push(reply);

			comment.save(function(err, comment) {
				if(err) {console.log(err);}
			});

			res.redirect('/posts/' + postId);
		});
	}else{
		comment = new Comment(_comment);
		comment.save(function(err, comment) {
			if(err) {console.log(err);}

			res.redirect('/posts/' + postId);
		});
	}
	
});

module.exports = router;