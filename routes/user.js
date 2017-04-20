var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;

// GET /user 个人主页
router.get('/', checkLogin, (req, res, next) => {
  res.render('user', { title: '豆瓣' });
});


module.exports = router;
