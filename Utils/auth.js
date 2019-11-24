module.exports = {
  checkAuthentication: function(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      req.session.message = {
        type: 'danger',
        message: 'Log in to view this page'
      };
      res.redirect('/login');
      next();
    }
  }
};
