const Post = require('../models/postModel');

exports.createTest = () => {
  Post.create({
    postTitle: 'FIRST POST',
    postOriginalPoster: 'Nick',
    postCategory: 'NSFW',
    postImagePath: 'front/img/posts/post1.jpg'
  });
};
