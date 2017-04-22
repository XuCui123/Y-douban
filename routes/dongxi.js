var express = require('express');
var router = express.Router();

// GET /dongxi 豆瓣东西主页
router.get('/', (req, res, next) => {
  res.render('dongxi', { title: '豆瓣东西' });
});

module.exports = router;
