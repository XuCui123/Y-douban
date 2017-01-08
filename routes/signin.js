var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 进入登录页
router.get('/', checkNotLogin, function(req, res, next) {
	console.log('未登录');
});

// POST /signin 用户登录
router.post('/', checkNotLogin, function(req, res, next) {
	console.log('未登录');
});

module.exports = router;