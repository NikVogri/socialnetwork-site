const userManager = require('../Services/registerUser');

exports.createNewUser = async (req, res, next) => {
  const { nickname, email, password, confirmPassword } = req.body;
  try {
    await userManager.createNew(nickname, email, password, confirmPassword);
  } catch (err) {
    req.flash('danger', err);
  }
  res.status(200).json({
    success: 'true'
  });
  next();
};
