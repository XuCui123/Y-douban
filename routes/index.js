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
  app.use('/register', require('./account/register'));
  // 登录
  app.use('/login', require('./account/login'));
  // 登出
  app.use('/signout', require('./account/signout'));
  // 密码修改
  app.use('/resetpassword', require('./account/resetpassword'));
  // 用户
  app.use('/user', require('./user'));
  // 豆瓣电影
  app.use('/movie', require('./movie'));
  // 豆瓣读书
  app.use('/book', require('./book'));
  // 豆瓣音乐
  app.use('/music', require('./music'));
  // 豆瓣小组
  app.use('/group', require('./group'));
  // 豆瓣同城
  app.use('/location', require('./location'));
  // 豆瓣FM
  app.use('/fm', require('./fm'));
  // 豆瓣东西
  app.use('/dongxi', require('./dongxi'));
  // 豆瓣市集
  app.use('/market', require('./market'));
  // 后台管理
  app.use('/admin', require('./admin'));
}
