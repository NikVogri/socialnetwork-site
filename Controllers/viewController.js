const User = require('../models/userModel');
exports.getIndex = (req, res, next) => {
  // call services for posts & user information

  res.status(200).render('Frontpage', {
    title: 'Homepage'
  });
};
