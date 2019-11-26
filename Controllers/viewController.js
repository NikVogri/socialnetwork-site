const User = require('../models/userModel');
exports.getIndex = (req, res, next) => {
  // call services for posts & user information
  const { posts } = req;
  res.status(200).render('Frontpage', {
    title: 'Homepage',
    posts
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
  const { posts } = req;
  const { userInfo } = req;
  res.status(200).render('userProfile', {
    title: 'User profile',
    posts,
    userInfo
  });
};

exports.getSettings = (req, res, next) => {
  res.status(200).render(req.params.type + 'Settings', {
    title: 'User settings - req.params.type'
  });
};

exports.getPost = (req, res, next) => {
  const post = req.getPost;
  let user;
  if (req.user) {
    user = req.user;
  }
  res.status(200).render('fullPost', {
    title: `${post.postTitle}`,
    post,
    user
  });
};
