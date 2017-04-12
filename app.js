var express = require('express');
var routes = require('./routes');
var path = require('path');

var config = {
  port: 3000
}

var app = express();

// 设置模板引擎，改用swig更好理解
var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, './views/pages'));
app.set('view engine', 'html');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 路由
routes(app);

app.listen(3000, () => {
  console.log(`Y-douban Listening on port ${config.port} !`);
});
