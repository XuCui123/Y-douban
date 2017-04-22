var express = require('express');
var router = express.Router();

// GET /music 豆瓣音乐主页
router.get('/', (req, res, next) => {
  res.render('music', { title: '豆瓣音乐' })
});

module.exports = router;
