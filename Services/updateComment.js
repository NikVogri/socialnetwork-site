const Comment = require('../models/commentModel');
const User = require('../models/userModel');

exports.getPostComments = async postID => {
  return Comment.findAll({ order: [['createdAt', 'DESC']], where: { postID } });
};

exports.getUser = async id => {
  return User.findByPk(id);
};
