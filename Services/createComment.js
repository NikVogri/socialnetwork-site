const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const sequelize = require('sequelize');

exports.createNewComment = async (body, post, user) => {
  try {
    await Comment.create({
      postID: post,
      originalPosterID: user,
      commentBody: body
    });
    await Post.increment({ postComments: 1 }, { where: { postID: post } }).then(
      () => {
        return;
      }
    );
  } catch (err) {
    console.log(err);
  }
};
