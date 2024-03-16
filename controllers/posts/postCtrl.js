const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");

//Create post
const createPostCtrl = async (req, res) => {
  const { title, description } = req.body;
  try {
    const author = await User.findById(req.userAuth);

    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
    });

    author.posts.push(postCreated);
    await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//single post
const postUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const postsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "posts route",
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
};
