const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl,
  whoViewedMyProfileCtrl,
  followingCtrl,
  unFollowCtrl,
  blockUserCtrl,
} = require("../../controllers/users/userCtrl");
const isLogin = require("../../middlewares/isLogin");
const storage = require("../../config/cloudinary");
const multer = require("multer");
const userRouter = express.Router();

//instance of multer
const upload = multer({ storage });

//POST/api/v1/users/register
userRouter.post("/register", userRegisterCtrl);

//POST/api/v1/users/login
userRouter.post("/login", userLoginCtrl);

//GET/api/v1/users
userRouter.get("/", usersCtrl);

//GET/api/v1/users/:id
userRouter.get("/profile/", isLogin, userProfileCtrl);

//DELETE/api/v1/users/:id
userRouter.delete("/:id", deleteUserCtrl);

//PUT/api/v1/users/:id
userRouter.put("/:id", updateUserCtrl);

//GET/api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfileCtrl);

//GET/api/v1/users/following/:id
userRouter.get("/following/:id", isLogin, followingCtrl);

//GET/api/v1/users/block/:id
userRouter.get("/block/:id", isLogin, blockUserCtrl);

//GET/api/v1/users/unfollowing/:id
userRouter.get("/unfollowing/:id", isLogin, unFollowCtrl);

//POST/api/v1/users/:id
userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoUploadCtrl
);
module.exports = userRouter;
