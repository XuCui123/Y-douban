var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /game/:id 进入游戏详情页
router.get('/:id', checkLogin, function(req, res) {
	var id = req.params.id;

	Game.findById(id, function(err, game) {
		res.render('gamedetail', {
			title: 'lalalla',
			game: game
		});
	});
});

module.exports = router;