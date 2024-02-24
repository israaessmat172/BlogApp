const express = require("express");

const userRouter = express.Router();

//POST/api/v1/users/register
userRouter.post("/register", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user registered",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//POST/api/v1/users/login
userRouter.post("/login", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user logged in",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET/api/v1/users/:id
userRouter.get("/profile/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Profile route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET/api/v1/users
userRouter.get("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "users route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//DELETE/api/v1/users/:id
userRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete user route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update user route",
    });
  } catch (error) {
    res.json(error.message);
  }
});
module.exports = userRouter;
