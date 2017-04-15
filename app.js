var express = require('express');
var routes = require('./routes');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var config = {
  port: 3000,
  session: {
    secret: 'Y-douban',
    key: 'Y-douban',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/Y-douban'
}

mongoose.connect(config.mongodb);

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connection Success!');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB Connection Error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Connection Failed!');
});

var app = express();

// 读取数据库模型
var models_path = __dirname + '/models';
var walk = function(path) {
  fs
    .readdirSync(path)
    .forEach(function(file) {
      var newPath = path + '/' + file;
      var stat = fs.statSync(newPath);

      if(stat.isFile()) {
        if(/(.*)\.(js|coffee)/.test(file)) {
          require(newPath);
        }
      }else if(stat.isDirectory()) {
        walk(newPath);
      }
    });
}
walk(models_path);

// 设置模板引擎，改用swig更好理解
var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, './views/pages'));
app.set('view engine', 'html');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({
    url: config.mongodb
  })
}));

// 错误信息显示
app.use(flash());

// 表单处理
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, './public/upload'),
    keepExtensions: true
}));

// 时间格式化
app.locals.moment = require('moment');

// 路由
routes(app);

app.listen(config.port, () => {
  console.log(`Y-douban Listening on port ${config.port} !`);
});
