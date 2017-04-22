var express = require('express');
var router = express.Router();

// GET /market 豆瓣市集主页
router.get('/', (req, res, next) => {
  res.render('market', { title: '豆瓣市集' });
});

module.exports = router;
