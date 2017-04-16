module.exports = (app) => {

  app.use(function (req, res, next) {
    var _user = req.session.user;
    app.locals.user = _user;
    var _error = req.flash('error').toString();
    app.locals.error = _error;
    next();
  });

  // 首页
  app.get('/', (req, res, next) => {
    res.render('index', { title: '豆瓣' });
  });

  // 注册
  app.use('/register', require('./register'));
  // 登录
  app.use('/login', require('./login'));
  // 用户
  app.use('/user', require('./user'));
}
