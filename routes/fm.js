var express = require('express');
var router = express.Router();

// GET /fm 豆瓣FM主页
router.get('/', (req, res, next) => {
  res.render('fm', { title:'豆瓣FM' });
});

module.exports = router;
