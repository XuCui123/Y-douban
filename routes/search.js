var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Category = mongoose.model('Category');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /results 进入搜索结果页
router.get('/', checkLogin, function(req, res, next) {
	res.render('results', {
		title: 'lalalla'
	});
});

module.exports = router;