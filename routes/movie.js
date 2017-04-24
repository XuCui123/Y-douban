var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

// GET /movie 豆瓣电影主页
router.get('/', (req, res, next) => {
  res.render('movie', { title: '豆瓣电影' });
});

// GET /movie/:id 豆瓣电影详情页
router.get('/:id', (req, res, next) => {
  var id = req.params.id;

  Movie
    .findOne({_id: id})
    .exec(function (err, movie) {
      res.render('movie_detail', {
        title: movie.name + '(豆瓣)',
        movie: movie
      });
    });
});

module.exports = router;
