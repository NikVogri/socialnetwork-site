const userCreator = require('../Services/registerUser');
const userUpdater = require('../Services/updateUser');
const passport = require('passport');

// User image
const multer = require('multer');
const sharp = require('sharp');
const multerStorage = multer.memoryStorage();
// Multer configuration
// -filter
const filter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// -upload
const upload = multer({
  storage: multerStorage,
  fileFilter: filter
});

exports.uploadUserPhoto = upload.single('image');

//resize image to lower resolution
exports.resizeUserPhoto = async (req, res, next) => {
  const { userID } = req.user;
  if (!req.file) {
    req.session.message = {
      type: 'danger',
      message: 'No correct image file selected'
    };
    res.status(400).redirect('back');
  }
  req.file.filename = `user-${userID}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`Front/img/users/${req.file.filename}`);
  // update db with new image path
  const imagePath = `/img/users/${req.file.filename}`;
  const check = await userUpdater.updateImage(userID, imagePath);
  if (check === true) {
    req.session.message = {
      type: 'success',
      message: 'User photo successfully changed!'
    };
    res.status(200).redirect('back');
  } else {
    req.session.message = {
      type: 'danger',
      message: 'User photo could not be changed'
    };
    res.status(400).redirect('back');
  }
  next();
};

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
  // logging in with passport
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
        // check if requested email is unique.
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
  // delete and check if user was deleted
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
  // Check if new and confirm passwords match
  if (newPassword === newPasswordConfirm) {
    // Changing password
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
  // check if there is any data provided in request.
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

exports.updateImage = async (req, res, next) => {
  if (req.file) {
    next();
  } else {
    req.session.message = {
      type: 'danger',
      message: 'Select an image'
    };
    res.status(400).redirect('back');
  }
};

exports.getUserInfo = async (req, res, next) => {
  const { id } = req.params;
  req.userInfo = await userUpdater.getPageUser(id);
  next();
};
