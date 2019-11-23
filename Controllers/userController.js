const userManager = require('../Services/registerUser');
const passport = require('passport');

exports.createNewUser = async (req, res, next) => {
  // get info from form
  const { nickname, email, password, confirmPassword } = req.body;
  // check if inserted passwords match
  if (password === confirmPassword) {
    try {
      if (
        (await userManager.checkIfEmailExists(email)) === false &&
        (await userManager.checkIfUserExists(nickname)) === false
      ) {
        await userManager.createNew(nickname, email, password, confirmPassword);
        req.session.message = {
          type: 'success',
          message: 'User successfuly created, please log in now!'
        };
        res.status(200).redirect('/register');
      } else {
        req.session.message = {
          type: 'danger',
          message: 'User with that email or nickname already exists!'
        };
        res.status(400).redirect('/register');
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    req.session.message = {
      type: 'danger',
      message: 'Passwords do not match!'
    };
    res.status(400).redirect('/register');
  }
  next();
};

exports.loginUser = async (req, res, next) => {
  await passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};

exports.logoutUser = (req, res, next) => {
  req.logout();
  console.log('logging out');
  res.status(200).redirect('/');
};
