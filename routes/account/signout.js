var express = require('express');
var router = express.Router();
var checkLogin = require('../../middlewares/check').checkLogin;

// GET /signout
router.get('/', checkLogin,(req, res, next) => {
  // 清空 session 中用户信息
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
