const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const appErr = require("../../utils/appErr");

//Create post
const createPostCtrl = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    const author = await User.findById(req.userAuth);

    if (author.isBlocked) {
      return next(appErr("Access denied, account blocked", 403));
    }

    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
      category,
      photo: req?.file?.path,
    });

    author.posts.push(postCreated);
    await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//single post
const postUserCtrl = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//toggle like
const toggleLikesPostCtrl = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const isLiked = post.likes.includes(req.userAuth);

    if (isLiked) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== req.userAuth.toString()
      );
      await post.save();
    } else {
      post.likes.push(req.userAuth);
      await post.save();
    }
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//toggle dislike
const toggleDisLikesPostCtrl = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const isUnLiked = post.dislikes.includes(req.userAuth);

    if (isUnLiked) {
      post.dislikes = post.dislikes.filter(
        (dislikes) => dislikes.toString() !== req.userAuth.toString()
      );
      await post.save();
    } else {
      post.dislikes.push(req.userAuth);
      await post.save();
    }
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const postsCtrl = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const deletePostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete post route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updatePostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update post route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createPostCtrl,
  postUserCtrl,
  postsCtrl,
  deletePostCtrl,
  updatePostCtrl,
  toggleLikesPostCtrl,
  toggleDisLikesPostCtrl,
};
