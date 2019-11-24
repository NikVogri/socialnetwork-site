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

exports.getUser = (req, res, next) => {
  res.status(200).render('userProfile', {
    title: 'User profile'
  });
};

exports.getSettings = (req, res, next) => {
  res.status(200).render(req.params.type + 'Settings', {
    title: 'User settings - req.params.type'
  });
};
