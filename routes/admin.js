var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

// GET /admin 管理页面
router.get('/', (req, res, next) => {
  res.render('admin', { title: '豆瓣后台管理' });
});

// GET /admin/userlist 用户列表
router.get('/userlist', (req, res, next) => {

  User.fetch((err, users) => {
    if (err) console.log(err);

    res.render('adminuserlist', {
      title: '豆瓣用户管理',
      users: users
    });
  });
});

// DELETE /admin/userlist 用户删除交换
router.delete('/userlist', (req, res, next) => {
  var id = req.query.id;
  if (id) {
    User.remove({_id: id}, (err, user) => {
      if (err) {
        console.log(err);
        res.json({ success: 0 });
      } else {
        res.json({ success: 1 });        
      }
    });
  }
});

module.exports = router;
