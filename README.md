## YGames

## 简介

基于NodeJS+Express+MongoDB搭建的游戏推广网站(ps:其实是毕业设计用的)

## 开发环境

- Node.js: `6.9.4`
- MongoDB: `3.4.1`
- Express: `4.14.0`

**1. 后端搭建：**
  * NodeJS的Express框架完成后端搭建；
  * MongoDB实现数据存储，使用mongoose模块进行数据构建；
  * Pug模板引擎完成页面渲染

**2. 前端搭建：**
  * Bootstrap，jQuery完成脚步和样式的处理
  * 手写了表单验证，public/js/validation.js

**3. 依赖模块：**
  1. `express`: web 框架
  2. `express-session`: session 中间件
  3. `connect-mongo`: 将 session 存储于 mongodb，结合 express-session 使用
  4. `connect-flash`: 页面通知提示的中间件，基于 session 实现
  5. `pug`: 模板
  6. `express-formidable`: 接收表单及文件的上传中间件
  7. `config-lite`: 读取配置文件
  8. `moment`: 时间格式化
  9. `mongoose`: mongodb 驱动
  10. `bcryptjs`: 用于密码加密

**4. 功能介绍**

网站用户分为游客，用户，管理员三种，每种用户拥有观看网站的不同权限。

  * 用户头像、游戏海报自定义上传；
  * 列表展示的分页处理；
  * 访问量统计；

游客：
  * 用户注册登录；
  * 主页与关于页展示；

用户：
  * 用户登出与详情；
  * 游戏分类页游戏展示与搜索；
  * 游戏详情页展示；
  * 论坛页展示、搜索、发帖与基本信息查看；
  * 帖子详情页的回复、编辑、删除；

管理员：
  * 后台管理页展示
  * 用户查看与删除
  * 游戏管理页展示
  * 游戏分类录入
  * 游戏分类查看、修改、删除；
  * 游戏录入
  * 游戏查看、删除、修改；
  * 帖子查看、删除；

## 项目演示

![图片演示1](showImage/1.gif)
![图片演示2](showImage/2.gif)
![图片演示3](showImage/3.gif)
![图片演示4](showImage/4.gif)

## 运行环境

Windows 7上运行正常，后续会测Ubuntu 16.04，比较穷Mac先不测了！

## 运行和使用

1. 启动MongoDB服务(因为是在Windows 7，做了一个MongoDB的服务，net start MongoDB)。
2. npm install(安装依赖模块)。
3. node app(打开cmd，进入项目目录，运行此命令)。
4. 打开浏览器(默认在3000端口，输入http://localhost:3000)。
5. 权限这块在项目里不能加，我是直接在数据库中修改用户的role值，大于10为管理员。

## 项目页面

使用管理员账号开启所有页面访问权限。(username: AdminYDR,password: admin2ydr)

**游客访问：**
- 首页：http://localhost:3000
- 关于页：http://localhost:3000/about
- 注册页：http://localhost:3000/signup
- 登录页：http://localhost:3000/signin
- 未登录出错页：http://localhost:3000/signinerror

**用户访问：**
- 用户详情页：http://localhost:3000/user/:id
- 游戏展示页：http://localhost:3000/games
- 游戏搜索页：http://localhost:3000/search/games
- 论坛展示页：http://localhost:3000/posts
- 帖子搜素页：http://localhost:3000/search/posts
- 帖子详情页：http://localhost:3000/posts/:id
- 发帖页：http://localhost:3000/posts/create
- 帖子编辑页：http://localhost:3000/posts/:id/edit
- 非管理员出错页：http://localhost:3000/signinerror

**管理员访问：**
- 后台管理页：http://localhost:3000/admin
- 用户管理页：http://localhost:3000/admin/userlist
- 游戏管理页：http://localhost:3000/admin/games
- 分类录入页：http://localhost:3000/admin/category/create
- 分类列表页：http://localhost:3000/admin/categorylist
- 游戏录入页：http://localhost:3000/admin/game/create
- 游戏列表页：http://localhost:3000/admin/gamelist
- 帖子管理页：http://localhost:3000/admin/postlist

## 项目结构:

```
├── config			  默认配置文件目录     
├── middlewares       中间件目录
├── models            模型目录
│   ├──schemas        模式目录
├── node_modules      
├── public            静态文件目录
│   ├── css           
│   ├── fonts         bootstrap字体图标目录
│   ├── img           
│   ├── js            
│   └── upload        上传图片存储目录
├── routes            路由目录
├── views             视图文件目录
│   ├── includes             
│   └── pages
├── app.js            项目入口文件
├── package.json
└── README.md
```

## 写在后面:

1. 第一次做一个还算完整的项目，还有很多欠缺的地方，希望大家帮忙指出。
2. 没用bower，gulp，less等一些工具，没做自动化测试。
3. 后续可能会再度完善一下。
