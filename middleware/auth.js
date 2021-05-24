const ROLE = {
    admin: 'admin',
    basic: 'basic'
}
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/api/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/home');
  },

  isAdmin: function(req, res, next) {
    if (req.user.user_name == ROLE.admin) {
      return next();
    }
    //Page de non authorisation
    // res.render('')
  }
};
