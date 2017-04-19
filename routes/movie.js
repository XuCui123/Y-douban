var express = require('express');
var router = express.Router();

// GET /movie 豆瓣电影主页
router.get('/', (req, res, next) => {
  res.render('movie', { title: '豆瓣电影' });
});

module.exports = router;
