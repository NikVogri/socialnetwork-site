const commentCreator = require('../Services/createComment');
const commentUpdater = require('../Services/updateComment');

exports.createComment = async (req, res, next) => {
  const { commentBody } = req.body;
  const postID = req.params.post;
  const userID = req.params.user;
  await commentCreator.createNewComment(commentBody, postID, userID);
  res.status(200).redirect('back');
};

// fix this part
exports.getAllComments = async (req, res, next) => {
  if (req.params.id) {
    let comments = await commentUpdater.getPostComments(req.params.id);
    let commenterInfo = [];
    if (comments.length >= 1) {
      await new Promise((resolve, reject) => {
        comments.forEach(async (el, index, array) => {
          let user = await commentUpdater.getUser(el.originalPosterID);
          el.commentsAmmount = comments.length;
          el.posterName = user.displayName;
          el.posterID = user.userID;
          el.userImage = user.imagePath;
          if (index === array.length - 1) {
            resolve();
          }
        });
      });
      req.commenterInfo = commenterInfo;
      req.comments = comments;
    } else if (req.postID) {
      const comments = await commentUpdater.getPostComments(req.postID);
      let commenterInfo = [];
      await new Promise((resolve, reject) => {
        comments.forEach(async (el, index, array) => {
          let user = await commentUpdater.getUser(el.originalPosterID);
          el.commentsAmmount = comments.length;
          el.posterName = user.displayName;
          el.posterID = user.userID;
          el.userImage = user.imagePath;
          if (index === array.length - 1) {
            resolve();
          }
        });
      });
      req.commenterInfo = commenterInfo;
      req.comments = comments;
    }
  }
  next();
};
