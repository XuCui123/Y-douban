var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var checkNotLogin = require('../../middlewares/check').checkNotLogin;

// GET /login 登录页
router.get('/', checkNotLogin, (req, res, next) => {
  res.render('login', { title: '登录豆瓣' });
});

// POST /login 登录
router.post('/', checkNotLogin, (req, res, next) => {
  var email = req.fields.email;
  var password = req.fields.password;

  User.findOne({email: email}, function (err, user) {
    if (err) console.log(err);

    if (user == null) {
      req.flash('error', '邮箱或手机号或用户名不存在！');
      return res.redirect('/login');
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) console.log(err);

      if (isMatch) {
        req.session.user = user;
        return res.redirect('/');
      } else {
        req.flash('error', '密码错误');
        return res.redirect('/login');
      }
    });
  });
});


module.exports = router;
