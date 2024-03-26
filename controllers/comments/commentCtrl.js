const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const appErr = require("../../utils/appErr");

const createCommentCtrl = async (req, res, next) => {
  const { description } = req.body;
  try {
    const post = await Post.findById(req.params.id);

    const comment = await Comment.create({
      post: post._id,
      description,
      user: req.userAuth,
    });
    post.comments.push(comment._id);

    const user = await User.findById(req.userAuth);

    user.comments.push(comment._id);

    await post.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });
    res.json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const deleteCommentCtrl = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to update this comment", 403));
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Comment has been deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const updateCommentCtrl = async (req, res, next) => {
  const { description } = req.body;
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to update this comment", 403));
    }
    const comments = await Comment.findByIdAndUpdate(
      req.params.id,
      { description },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      data: comments,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  createCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
};
