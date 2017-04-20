var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var _ = require('underscore');

// GET /resetpassword 密码修改页面
router.get('/', (req, res, next) => {
  res.render('resetpassword', { title: '重设密码' });
});

// PUT /resetpassword/validate 校验帐号是否存在
router.put('/validate', (req, res, next) => {
  var email = req.query.email;

  User.findOne({email: email}, function (err, user) {
    if (err) console.log(err);
    if (user)
      return res.json({ success: 1});
    else
      return res.json({ success: 0});
  });

});

// POST /resetpassword 密码修改行为
router.post('/', (req, res, next) => {
  var email = req.fields.email;
  var old_password = req.fields.old_password;
  var new_password = req.fields.new_password;

  // 校验新密码
  try {
    if (old_password === '') {
      throw new Error('请输入旧密码！');
    }
    if (new_password.length < 8 || new_password.length < 8 || new_password.match(/\d/) === null || new_password.match(/[A-Za-z]/) === null) {
      throw new Error('请输入长度至少为八位的字母数字组合密码！');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('/resetpassword');
  }

  User.findOne({email: email}, function (err, user) {
    if (err) console.log(err);

    if (user == null) {
      req.flash('error', '邮箱或手机号不存在！');
      return res.redirect('/resetpassword');
    }

    user.comparePassword(old_password, function (err, isMatch) {
      if (err) console.log(err);

      if (isMatch) {
        var _user = _.extend(user, {password: new_password});
        user = new User(_user);
        user.save(function (err, user) {
          if (err) console.log(err);
          req.session.user = user;
          res.redirect('/');
        });
      } else {
        req.flash('error', '密码错误');
        return res.redirect('/resetpassword');
      }
    });

  });

});


module.exports = router;
