const User = require('../models/userModel');
const bcrypt = require('bcrypt');
exports.updateUserEmail = async (email, userID) => {
  // check if display email is unique
  const checkCount = await User.findAll({ where: { userEmail: email } });
  if (checkCount.length === 0) {
    // if unique, update current user with new email
    await User.update({ userEmail: email }, { where: { userID } });
    return true;
  } else {
    return false;
  }
};

exports.updateUsername = async (displayName, userID) => {
  try {
    // check if display name is unique
    const checkCount = await User.findAll({ where: { displayName } });
    if (checkCount.length === 0) {
      // if unique, update current user with new name
      await User.update({ displayName }, { where: { userID } });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async userID => {
  try {
    await User.destroy({
      where: {
        userID
      }
    });
    return true;
  } catch (err) {
    return false;
  }
};

exports.changePassword = async (userID, oldPassword, newPassword) => {
  // get user
  const user = await User.findByPk(userID);
  // check if passwords match
  const compare = await bcrypt.compare(oldPassword, user.userPassword);
  // update user with new password
  if (compare === true) {
    await User.update(
      { userPassword: await bcrypt.hash(newPassword, 10) },
      { where: { userID } }
    );
    return true;
  } else {
    return false;
  }
};

exports.updateGender = async (userID, gender) => {
  User.update({ userGender: gender }, { where: { userID } });
};

exports.updateBio = async (userID, bio) => {
  User.update({ userBio: bio }, { where: { userID } });
};

exports.updateDate = async (userID, date) => {
  User.update(
    { userBirthday: `${date.day}/${date.month}/${date.year}` },
    { where: { userID } }
  );
};

exports.updateImage = async (id, path) => {
  User.update({ imagePath: path }, { where: { userID: id } });
  return true;
};
