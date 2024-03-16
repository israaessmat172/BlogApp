const express = require("express");
const {
  createPostCtrl,
  postUserCtrl,
  postsCtrl,
  deletePostCtrl,
  updatePostCtrl,
} = require("../../controllers/posts/postCtrl");
const isLogin = require("../../middlewares/isLogin");

const postRouter = express.Router();

//POST/api/v1/posts
postRouter.post("/", isLogin, createPostCtrl);

//GET/api/v1/posts/:id
postRouter.get("/:id", postUserCtrl);

//GET/api/v1/posts
postRouter.get("/", postsCtrl);

//DELETE/api/v1/comments/:id
postRouter.delete("/:id", deletePostCtrl);

//PUT/api/v1/posts/:id
postRouter.put("/:id", updatePostCtrl);
module.exports = postRouter;
