//入口
module.exports = function(app) {

	app.use(function(req, res, next) {
		var _user = req.session.user;

		app.locals.user = _user;

		next();
	});

	app.get('/', function(req, res, next) {
		res.render('index', {
			title: '狂拽酷炫吊炸天，酷酷的首页！！'
		});
	});

	// 注册
	app.use('/signup', require('./signup'));
	// 登录
	app.use('/signin', require('./signin'));
	// 登出
	app.use('/signout', require('./signout'));
	// 关于
	app.get('/about', function(req, res, next) {
		res.render('about', {
			title: '这是关于啊，大哥大姐！！'
		});
	});
	app.use('/admin', require('./admin'));
}