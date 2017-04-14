var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('register', { title: '欢迎加入豆瓣' });
});

module.exports = router;
