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
  },
  isAdmin: function isAdmin(req, res, next) {
    var _user = req.session.user;
    var role = _user.role;
    if (role < 10) {
      return res.redirect('/');
    }
    next();
  }
}
