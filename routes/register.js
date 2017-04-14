var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', (req, res, next) => {
  res.render('register', { title: '欢迎加入豆瓣' });
});

router.post('/', (req, res, next) => {
  var email = req.fields.email;
  var password = req.fields.password;
  var nickname = req.fields.nickname;
  var address = req.fields.address;
  var phone = req.fields.phone;

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
      return res.redirect('login');
    }
    else {
      user = new User(_user);

      user.save(function(err, user) {
        if (err) console.log(err);

        res.redirect('/')
      });
    }

  });

});

module.exports = router;
