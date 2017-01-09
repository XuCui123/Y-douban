//入口
module.exports = function(app) {

	app.use(function(req, res, next) {
		var _user = req.session.user;

		app.locals.user = _user;

		next();
	});

	app.get('/', function(req, res, next) {
		res.render('index');
	});

	// 注册
	app.use('/signup', require('./signup'));
	// 登录
	app.use('/signin', require('./signin'));
	// 登出
	app.use('/signout', require('./signout'));
}