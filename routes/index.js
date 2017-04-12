module.exports = (app) => {
  // 首页
  app.get('/', (req, res) => {
    res.render('index', { title: '豆瓣' });
  });

}
