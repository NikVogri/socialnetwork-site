const User = require('../models/userModel');
exports.getIndex = (req, res, next) => {
  // call services for posts & user information
  res.status(200).render('Frontpage', {
    title: 'Homepage'
  });
};

exports.getRegister = (req, res, next) => {
  // call services for posts & user information
  res.status(200).render('register', {
    title: 'Register'
  });
};

exports.getLogin = (req, res, next) => {
  res.status(200).render('login', {
    title: 'login'
  });
};
