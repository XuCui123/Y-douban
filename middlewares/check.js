module.exports = {
  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      return res.redirect('/user');
    }
    next();
  },
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    next();
  }
}
