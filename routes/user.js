var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;

// GET /user 个人主页
router.get('/', checkLogin, (req, res, next) => {
  res.render('user', { title: '豆瓣' });
});


// GET /signout
router.get('/signout', checkLogin,(req, res, next) => {
  // 清空 session 中用户信息
  req.session.user = null;
  res.redirect('/');
})

module.exports = router;
