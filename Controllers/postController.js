const postCreator = require('../Services/createPost');
const postUpdater = require('../Services/updatePost');

const multer = require('multer');
const sharp = require('sharp');
const multerStorage = multer.memoryStorage();

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// -upload
const upload = multer({
  storage: multerStorage,
  fileFilter: filter
});

exports.uploadPostImage = upload.single('postImage');

//resize image to lower resolution
exports.resizePostImage = async (req, res, next) => {
  const { userID } = req.user;
  if (!req.file) {
    req.session.message = {
      type: 'danger',
      message: 'No correct image file selected'
    };
    res.status(400).redirect('back');
  }
  req.file.filename = `post-${userID}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`Front/img/posts/${req.file.filename}`);
  // update db with new image path
  req.file.imagePath = `/img/posts/${req.file.filename}`;
  next();
};

exports.createNewPost = async (req, res, next) => {
  const { postName, postCategory } = req.body;
  const { userID } = req.user;
  const { imagePath } = req.file;
  let icon;
  switch (postCategory) {
    case 'Gaming':
      icon = 'gamepad';
      break;
    case 'Comedy':
      icon = 'laugh';
      break;
    case 'WTF':
      icon = 'surprise';
      break;
    case 'Animals':
      icon = 'hippo';
      break;
    case 'Music':
      icon = 'music';
      break;
    case 'NSFW':
      icon = 'kiss-wink-heart';
      break;
  }
  await postCreator.createNewPost(
    postName,
    postCategory,
    imagePath,
    userID,
    icon
  );
  res.status(200).redirect('/'); // change this to the actual post.
  next();
};

exports.getAllPosts = async (req, res, next) => {
  req.posts = await postUpdater.getPosts();

  res.status(200);
  next();
};

exports.getUserPost = async (req, res, next) => {
  // get user profile
  const { id } = req.params;
  // get all posts with that id & send them to next middleware
  req.posts = await postUpdater.getUserPosts(id);
  next();
};

exports.getOnePost = async (req, res, next) => {
  const { id } = req.params;
  req.getPost = await postUpdater.getOnePost(id);
  next();
};

exports.getRandomPost = async (req, res, next) => {
  req.getPost = await postUpdater.getRandom();
  next();
};
