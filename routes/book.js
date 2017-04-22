var express = require('express');
var router = express.Router();

// GET /book 豆瓣读书主页
router.get('/', (req, res, next) => {
  res.render('book', { title: '豆瓣图书' })
});

module.exports = router;
