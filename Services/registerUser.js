const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/userModel');

exports.createNew = async (name, email, password, confirmPassword) => {
  try {
    // hashing password
    await User.create({
      displayName: name,
      userEmail: email,
      userPassword: await bcrypt.hash(password, 10)
    });
    return 'success';
  } catch (err) {
    return err;
  }
  // check if email or name is already used
  // create new user
};

exports.checkIfEmailExists = async email => {
  try {
    const checkEmail = await User.findAll({
      where: {
        userEmail: email
      }
    });
    // check if there are users with that email if array is empty, then theres no users with that name
    if (checkEmail.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return err;
  }
};
exports.checkIfUserExists = async name => {
  try {
    const checkName = await User.findAll({
      where: {
        displayName: name
      }
    });
    // check if there are users with that name if array is empty, then theres no users with that name
    if (checkName.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return err;
  }
};
