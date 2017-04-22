var express = require('express');
var router = express.Router();

// GET /group 豆瓣小组主页
router.get('/', (req, res, next) => {
  res.render('group', { title: '话题精选(豆瓣)' })
});

module.exports = router;
