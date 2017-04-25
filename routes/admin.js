var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Movie = mongoose.model('Movie');
var MovieCelebrity = mongoose.model('MovieCelebrity');
var MovieCategory = mongoose.model('MovieCategory');

// GET /admin 管理页面
router.get('/', (req, res, next) => {
  res.render('admin', { title: '豆瓣后台管理' });
});

// GET /admin/userlist 用户列表
router.get('/user/list', (req, res, next) => {
  var page = parseInt(req.query.p, 10) || 0;
  var count = 5;
  var index = page * count;

  User.fetch((err, users) => {
    if (err) console.log(err);

    for (var i = 0; i < users.length; i++) {
      if (users[i].phone === 18888888888) {
        users = users.splice(i+1);
      }
    }

    results = users.slice(index, index + count);

    res.render('admin_user_list', {
      title: '豆瓣用户管理',
      currentPage: (page + 1),
      totalPage: Math.ceil(users.length / count),
      users: results
    });
  });
});

// DELETE /admin/userlist 用户删除交换
router.delete('/user/list', (req, res, next) => {
  var id = req.query.id;
  if (id) {
    User.remove({_id: id}, (err, user) => {
      if (err) {
        console.log(err);
        res.json({ success: 0 });
      } else {
        res.json({ success: 1 });
      }
    });
  }
});

// GET /admin/movie/create 豆瓣电影后台录入页
router.get('/movie/create', (req, res, next) => {
  res.render('admin_movie_create', { title: '豆瓣电影录入' });
});

// POST /admin/movie/crate 豆瓣电影后台提交
router.post('/movie/create', (req, res, next) => {

  var movie_name = req.fields.movie_name;
  var movie_director = req.fields.movie_director;
  var movie_screenwriter = req.fields.movie_screenwriter;
  var movie_actor = req.fields.movie_actor;
  var movie_categories = req.fields.movie_categories;
  var movie_country = req.fields.movie_country;
  var movie_language = req.fields.movie_language;
  var movie_year = req.fields.movie_year;
  var movie_duration = req.fields.movie_duration;
  var movie_alias = req.fields.movie_alias;
  var movie_post = req.fields.movie_post

  var _movie = {
    name: movie_name,
    director: movie_director,
    screenwriter: movie_screenwriter,
    actor: movie_actor,
    categories: movie_categories,
    country: movie_country,
    language: movie_language,
    year: movie_year,
    duration: movie_duration,
    alias: movie_alias,
    post: movie_post
  }

  Movie.findOne({name: movie_name}, function (err, movie) {
    if (err) console.log(err);

    if (movie !== null) {
      req.flash('error', '已经录入过的电影！');
      return res.redirect('/admin/movie/create');
    } else {
      movie = new Movie(_movie);
      movie.save(function (err, movie) {
        if (err) console.log(err);

        res.redirect('/admin/movie/list');
      });
    }
  });
});

// GET /admin/movie/list 豆瓣电影后台列表
router.get('/movie/list', (req, res, next) => {
  var page = parseInt(req.query.p, 10) || 0;
  var count = 10;
  var index = page * count;

  Movie.fetch(function (err, movies) {
    if (err) console.log(err);
    results = movies.slice(index, index + count);
    res.render('admin_movie_list', {
      title: '豆瓣电影列表',
      currentPage: (page + 1),
      totalPage: Math.ceil(movies.length / count),
      movies: results
    });
  });
});

// DELETE /admin/movie/list 电影删除交换
router.delete('/movie/list', (req, res, next) => {
  var id = req.query.id;
  if (id) {
    Movie.remove({_id: id}, (err, movie) => {
      if (err) {
        console.log(err);
        res.json({ success: 0 });
      } else {
        res.json({ success: 1 });
      }
    });
  }
});

// GET /admin/celebrity/create 豆瓣影人后台录入页
router.get('/celebrity/create', (req, res, next) => {
  res.render('admin_movie_celebrity_create', { title: '豆瓣影人录入' });
});

// POST /admin/celebrity/create 豆瓣影人后台提交
router.post('/celebrity/create', (req, res, next) => {
  var movie_celebrity_douban_id = req.fields.movie_celebrity_douban_id;
  var movie_celebrity_name = req.fields.movie_celebrity_name;
  var movie_celebrity_name_en = req.fields.movie_celebrity_name_en;
  var movie_celebrity_gender = req.fields.movie_celebrity_gender;
  var movie_celebrity_constellayion = req.fields.movie_celebrity_constellayion;
  var movie_celebrity_born_place = req.fields.movie_celebrity_born_place;
  var movie_celebrity_aka = req.fields.movie_celebrity_aka;
  var movie_celebrity_aka_en = req.fields.movie_celebrity_aka_en;
  var movie_celebrity_website = req.fields.movie_celebrity_website;
  var movie_celebrity_avatar = req.fields.movie_celebrity_avatar;

  var _movieCelebrity = {
    douban_id: movie_celebrity_douban_id,
    name: movie_celebrity_name,
    name_en: movie_celebrity_name_en,
    gender: movie_celebrity_gender,
    constellayion: movie_celebrity_constellayion,
    born_place: movie_celebrity_born_place,
    aka: movie_celebrity_aka,
    aka_en: movie_celebrity_aka_en,
    website: movie_celebrity_website,
    avatar: movie_celebrity_avatar
  }

  MovieCelebrity.findOne({douban_id: movie_celebrity_douban_id}, function (err, movieCelebrity) {
    if (err) console.log(err);

    if (movieCelebrity !== null) {
      req.flash('error', '已经录入过的影人！');
      return res.redirect('/admin/celebrity/create');
    } else {
      movieCelebrity = new MovieCelebrity(_movieCelebrity);
      movieCelebrity.save(function (err, movieCelebrity) {
        if (err) console.log(err);

        res.redirect('/admin/celebrity/list');
      });
    }
  });
});

// GET /admin/celebrity/list 豆瓣电影后台列表
router.get('/celebrity/list', (req, res, next) => {
  var page = parseInt(req.query.p, 10) || 0;
  var count = 10;
  var index = page * count;

  MovieCelebrity.fetch(function (err, movieCelebrities) {
    if (err) console.log(err);
    results = movieCelebrities.slice(index, index + count);
    res.render('admin_movie_celebrity_list', {
      title: '豆瓣影人列表',
      currentPage: (page + 1),
      totalPage: Math.ceil(movieCelebrities.length / count),
      movieCelebrities: results
    });
  });
});

// DELETE /admin/celebrity/list 影人删除交互
router.delete('/celebrity/list', (req, res, next) => {
  var id = req.query.id;
  if (id) {
    MovieCelebrity.remove({_id: id}, (err, movie) => {
      if (err) {
        console.log(err);
        res.json({ success: 0 });
      } else {
        res.json({ success: 1 });
      }
    });
  }
});

// GET /admin/category/create 豆瓣电影分类后台录入页
router.get('/category/create', (req, res, next) => {
  res.render('admin_movie_category_create', { title: '豆瓣电影分类录入' });
});

// POST /admin/category/create 豆瓣电影分类后台提交
router.post('/category/create', (req, res, next) => {
  var movie_category_name = req.fields.movie_category_name;

  var _movieCategory = {
    name: movie_category_name
  }

  MovieCategory.findOne({name: movie_category_name}, function (err, movieCategory) {
    if (err) console.log(err);

    if (movieCategory !== null) {
      req.flash('error', '已经录入过的分类！');
      return res.redirect('/admin/category/create');
    } else {
      movieCategory = new MovieCategory(_movieCategory);
      movieCategory.save(function (err, movieCategory) {
        if (err) console.log(err);

        res.redirect('/admin/category/list');
      });
    }
  });
});

// GET /admin/category/list 豆瓣电影后台列表
router.get('/category/list', (req, res, next) => {
  var page = parseInt(req.query.p, 10) || 0;
  var count = 10;
  var index = page * count;

  MovieCategory.fetch(function (err, movieCategory) {
    if (err) console.log(err);
    results = movieCategory.slice(index, index + count);
    res.render('admin_movie_category_list', {
      title: '豆瓣电影分类列表',
      currentPage: (page + 1),
      totalPage: Math.ceil(movieCategory.length / count),
      movieCategories: results
    });
  });
});

// DELETE /admin/category/list 影人删除交互
router.delete('/category/list', (req, res, next) => {
  var id = req.query.id;
  if (id) {
    MovieCategory.remove({_id: id}, (err, movie) => {
      if (err) {
        console.log(err);
        res.json({ success: 0 });
      } else {
        res.json({ success: 1 });
      }
    });
  }
});

module.exports = router;
