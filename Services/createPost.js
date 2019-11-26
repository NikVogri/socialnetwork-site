const Post = require('../models/postModel');

exports.createNewPost = (postName, postCategory, imagePath, userID, icon) => {
  Post.create({
    postTitle: postName,
    postOriginalPoster: userID,
    postCategory: postCategory,
    postImagePath: imagePath,
    postIcon: icon
  });
};
