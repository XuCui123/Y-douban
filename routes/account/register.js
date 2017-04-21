var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var checkNotLogin = require('../../middlewares/check').checkNotLogin;

// PUT register/email 异步校验邮箱是否存在
router.put('/email', checkNotLogin, (req, res, next) => {
    var email = req.query.email;

    User.findOne({email: email}, function (err, user) {
      if (err) console.log(err);
      if (user)
        return res.json({ success: 1 });
      else
        return res.json({ success: 0 });
    })
});

// PUT register/nickname 异步校验名号是否存在
router.put('/nickname', checkNotLogin, (req, res, next) => {
    var nickname = req.query.nickname;

    User.findOne({nickname: nickname}, function (err, user) {
      if (err) console.log(err);
      if (user)
        return res.json({ success: 1 });
      else
        return res.json({ success: 0 });
    })
});

// PUT register/phone 异步校验手机号是否存在
router.put('/phone', checkNotLogin, (req, res, next) => {
    var phone = req.query.phone;

    User.findOne({phone: phone}, function (err, user) {
      if (err) console.log(err);
      if (user)
        return res.json({ success: 1 });
      else
        return res.json({ success: 0 });
    })
});

// 模拟验证码
var PHONE_CODE = '';
// GET register/phonecode
router.get('/phonecode', checkNotLogin, (req, res, next) => {
  var number = '';

  for (var i = 0; i < 6; i++) {
    number += Math.floor(Math.random()*10);
  }

  PHONE_CODE = number;

  res.json({
    success: 1,
    data: number
  });

});

// GET register 注册页
router.get('/', checkNotLogin, (req, res, next) => {
  res.render('register', { title: '欢迎加入豆瓣' });
});

// POST user/register 注册逻辑
router.post('/', checkNotLogin, (req, res, next) => {
  var code = req.fields.code;
  // 模拟验证码校验
  try {
    if (!code || code !== PHONE_CODE) {
      throw new Error('验证码不正确！');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('/register');
  }

  var email = req.fields.email;
  var password = req.fields.password;
  var nickname = req.fields.nickname;
  var address = req.fields.address;
  var phone = req.fields.phone_num;
  console.log(phone);

  // 校验参数
  try {
    var reg_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    if (!reg_email.test(email)) {
      throw new Error('请输入正确格式的邮箱！');
    }
    if (password.length < 8 || password.length < 8 || password.match(/\d/) === null || password.match(/[A-Za-z]/) === null) {
      throw new Error('请输入长度至少为八位的字母数字组合密码！');
    }
    if (nickname.length < 7 || nickname.length > 14) {
      throw new Error('名号请保持在7-14个字符之间！');
    }
    var reg_phone = /^1[34578]\d{9}$/;
    if (!reg_phone.test(phone)) {
      throw new Error('请输入正确格式的手机号！');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('/register');
  }

  var _user = {
    email: email,
    password: password,
    nickname: nickname,
    address: address,
    phone: phone
  }

  User.findOne({email: email}, (err, user) => {
    if (err) console.log(err);
    if (user != null) {
      req.flash('error', '邮箱已经注册过了！');
      return res.redirect('register');
    } else {
      User.findOne({nickname: nickname}, (err, user) => {
        if (err) console.log(err);
        if (user != null) {
          req.flash('error', '名号已经注册过了！');
          return res.redirect('register');
        } else {
          User.findOne({phone: phone}, (err, user) => {
            if (err) console.log(err);
            if (user != null) {
              req.flash('error', '手机号已经注册过了！');
              return res.redirect('register');
            } else {
              user = new User(_user);
              user.save(function(err, user) {
                if (err) console.log(err);
                req.session.user = user;
                res.redirect('/user');
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
