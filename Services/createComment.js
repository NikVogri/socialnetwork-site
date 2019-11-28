const Comment = require('../models/commentModel');

exports.createNewComment = async (body, post, user) => {
  await Comment.create({
    postID: post,
    originalPosterID: user,
    commentBody: body
  });
};
