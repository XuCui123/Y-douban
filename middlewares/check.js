module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      console.log('error', '未登录'); 
      return res.redirect('/signin');
    }
    next();
  },
};