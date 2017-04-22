var express = require('express');
var router = express.Router();

// GET /location 豆瓣同城主页
router.get('/', (req, res, next) => {
  res.render('location', { title: '豆瓣同城' });
});

module.exports = router;
