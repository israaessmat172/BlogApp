const express = require("express");
const {
  createPostCtrl,
  postUserCtrl,
  postsCtrl,
  deletePostCtrl,
  updatePostCtrl,
  toggleLikesPostCtrl,
  toggleDisLikesPostCtrl,
} = require("../../controllers/posts/postCtrl");
const isLogin = require("../../middlewares/isLogin");

const postRouter = express.Router();

//POST/api/v1/posts
postRouter.post("/", isLogin, createPostCtrl);

//GET/api/v1/posts/:id
postRouter.get("/:id", postUserCtrl);

//GET/api/v1/posts/likes/:id
postRouter.get("/likes/:id", isLogin, toggleLikesPostCtrl);

//GET/api/v1/posts/dislikes/:id
postRouter.get("/dislikes/:id", isLogin, toggleDisLikesPostCtrl);

//GET/api/v1/posts
postRouter.get("/", postsCtrl);

//DELETE/api/v1/comments/:id
postRouter.delete("/:id", deletePostCtrl);

//PUT/api/v1/posts/:id
postRouter.put("/:id", updatePostCtrl);
module.exports = postRouter;
