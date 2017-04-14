module.exports = (app) => {
  // 首页
  app.get('/', (req, res, next) => {
    res.render('index', { title: '豆瓣' });
  });

  // 注册
  app.use('/register', require('./register'));

  // 登录
  app.use('/login', require('./login'));
}
