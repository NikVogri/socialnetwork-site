const userCreator = require('../Services/registerUser');
const userUpdater = require('../Services/updateUser');
const passport = require('passport');
exports.createNewUser = async (req, res, next) => {
  // get info from form
  const { nickname, email, password, confirmPassword } = req.body;
  // check if inserted passwords match
  if (password === confirmPassword) {
    try {
      if (
        (await userCreator.checkIfEmailExists(email)) === false &&
        (await userCreator.checkIfUserExists(nickname)) === false
      ) {
        await userCreator.createNew(nickname, email, password, confirmPassword);
        req.session.message = {
          type: 'success',
          message: 'User successfully created, please log in now!'
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
  req.session.message = {
    type: 'danger',
    message: 'Invalid credentials, please try again.'
  };
};

exports.logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).redirect('/');
  next();
};

exports.updateAccount = async (req, res, next) => {
  const { email, displayName } = req.body;
  const { userID } = req.user;
  // check received data
  try {
    if (email === '' && displayName === '') {
      req.session.message = {
        type: 'danger',
        message: 'Invalid data provided, include email or username to update'
      };
      res.status(400).redirect('/user/settings/account');
      next();
    } else {
      if (email !== '') {
        const unique = await userUpdater.updateUserEmail(email, userID);
        if (unique === true) {
          req.session.message = {
            type: 'success',
            message: 'Email successfully changed, please log in again'
          };
          req.logout();
          res.status(200).redirect('/login');
          next();
        } else {
          req.session.message = {
            type: 'danger',
            message: 'An account with that email already exists'
          };

          res.status(200).redirect('back');
          next();
        }
      }
      if (displayName !== '') {
        const unique = await userUpdater.updateUsername(displayName, userID);
        if (unique === true) {
          req.session.message = {
            type: 'success',
            message: 'Username successfully changed'
          };
          res.status(200).redirect('back');
          next();
        } else {
          req.session.message = {
            type: 'danger',
            message: 'An account with that username already exists'
          };

          res.status(200).redirect('back');
          next();
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { userID } = req.user;
  const check = await userUpdater.deleteUser(userID);
  if (check === true) {
    req.session.message = {
      type: 'success',
      message: 'Account succesfully deleted'
    };
    req.logout();
    res.status(200).redirect('/login');
    next();
  }
};

exports.updatePassword = async (req, res, next) => {
  const { userID } = req.user;
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;
  if (newPassword === newPasswordConfirm) {
    const changed = await userUpdater.changePassword(
      userID,
      oldPassword,
      newPassword
    );
    if (changed === true) {
      req.session.message = {
        type: 'success',
        message: 'Password has been changed, please log in again'
      };
      req.logout();
      res.status(200).redirect('/login');
      next();
    } else {
      req.session.message = {
        type: 'danger',
        message: 'Current password is not correct'
      };
      res.status(400).redirect('back');
      next();
    }
  } else {
    req.session.message = {
      type: 'danger',
      message: 'Passwords do not match'
    };
    res.status(400).redirect('back');
    next();
  }
};

exports.updateProfile = async (req, res, next) => {
  const { gender, dateDay, dateMonth, dateYear, bio } = req.body;
  const date = {
    day: dateDay,
    month: dateMonth,
    year: dateYear
  };
  const { userID } = req.user;
  if (
    gender !== 'Choose...' ||
    bio !== '' ||
    (date.day !== '' && date.month !== '' && date.year !== '')
  ) {
    if (gender !== 'Choose...') {
      await userUpdater.updateGender(userID, gender);
    }
    if (bio !== '') {
      await userUpdater.updateBio(userID, bio);
    }
    if (date.day !== '' && date.day !== '' && date.year !== '') {
      await userUpdater.updateDate(userID, date);
    }
    req.session.message = {
      type: 'success',
      message: 'Profile updated successfully'
    };
    res.status(200).redirect('back');
    next();
  } else {
    req.session.message = {
      type: 'danger',
      message: 'Invalid input'
    };
    res.status(400).redirect('back');
    next();
  }
};
