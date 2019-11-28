const Comment = require('../models/commentModel');

exports.getPostComments = async postID => {
  return Comment.findAll({ order: [['createdAt', 'DESC']], where: { postID } });
};
