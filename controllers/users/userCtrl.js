const bcrypt = require("bcryptjs");
const User = require("../../model/User/User");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeaders = require("../../utils/getTokenFromHeaders");
const appErr = require("../../utils/appErr");

//Register
const userRegisterCtrl = async (req, res, next) => {
  const { firstname, lastname, profilePhoto, email, password } = req.body;
  try {
    //check if email exsit
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("Email Already Exist", 500));
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//login
const userLoginCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Check if email does not exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({
        msg: "Invalid login credentials",
      });
    }

    //verify password
    const isPasswordMatched = await bcrypt.compare(
      password,
      userFound.password
    );
    if (!isPasswordMatched) {
      return res.json({
        msg: "Invalid login credentials",
      });
    }

    res.json({
      status: "success",
      data: {
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

//who viewed my profile
const whoViewedMyProfileCtrl = async (req, res, next) => {
  try {
    //1. Find the original
    const user = await User.findById(req.params.id);
    //2. Find the user who viewed the original user
    const userWhoViewed = await User.findById(req.userAuth);

    //3. Check if original and who viewed are found
    if (user && userWhoViewed) {
      //4. check if userWhoViewed is already in the users viewers array
      const isUserAlreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toString()
      );
      if (isUserAlreadyViewed) {
        return next(appErr("You already viewed this profile"));
      } else {
        //5. Push the userWhoViewed to the user's viewers array
        user.viewers.push(userWhoViewed._id);
        //6. Save the user
        await user.save();
        res.json({
          status: "success",
          data: "You have successfully viewed this profile",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

//following
const followingCtrl = async (req, res, next) => {
  try {
    const userToFollow = await User.findById(req.params.id);

    const userWhoFollowed = await User.findById(req.userAuth);

    if (userToFollow && userWhoFollowed) {
      const isUserAlreadyFollowed = userToFollow.following.find(
        (follower) => follower.toString() === userWhoFollowed._id.toString()
      );
      if (isUserAlreadyFollowed) {
        return next(appErr("You already followed this user"));
      } else {
        userToFollow.followers.push(userWhoFollowed._id);

        userWhoFollowed.following.push(userToFollow._id);
        await userWhoFollowed.save();
        await userToFollow.save();
        res.json({
          status: "success",
          data: "You have successfully followed this user",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

//unfollowing
const unFollowCtrl = async (req, res, next) => {
  try {
    const userToBeUnfollowed = await User.findById(req.params.id);

    const userWhoUnFollowed = await User.findById(req.userAuth);

    if (userToBeUnfollowed && userWhoUnFollowed) {
      const isUserAlreadyFollowed = userToBeUnfollowed.followers.find(
        (follower) => follower.toString() === userWhoUnFollowed._id.toString()
      );
      if (!isUserAlreadyFollowed) {
        return next(appErr("You have not followed this user"));
      } else {
        userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
          (follower) => follower.toString() !== userWhoUnFollowed._id.toString()
        );

        await userToBeUnfollowed.save();

        userWhoUnFollowed.following = userWhoUnFollowed.following.filter(
          (following) =>
            following.toString() !== userToBeUnfollowed._id.toString()
        );

        await userWhoUnFollowed.save();
        res.json({
          status: "success",
          data: "You have successfully unfollowed this user",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

//blocked
const blockUserCtrl = async (req, res, next) => {
  try {
    const userToBeBlocked = await User.findById(req.params.id);

    const userWhoBlocked = await User.findById(req.userAuth);

    if (userWhoBlocked && userToBeBlocked) {
      const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeBlocked._id.toString()
      );
      if (isUserAlreadyBlocked) {
        return next(appErr("You already blocked this user"));
      } else {
        userWhoBlocked.blocked.push(userToBeBlocked._id);

        await userWhoBlocked.save();
        res.json({
          status: "success",
          data: "You have successfully blocked this user",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

//unblocking
const unblockUserCtrl = async (req, res, next) => {
  try {
    const userToBeUnBlocked = await User.findById(req.params.id);

    const userWhoUnBlocked = await User.findById(req.userAuth);

    if (userToBeUnBlocked && userWhoUnBlocked) {
      const isUserAlreadyBlocked = userWhoUnBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeUnBlocked._id.toString()
      );
      if (!isUserAlreadyBlocked) {
        return next(appErr("You have not blocked this user"));
      } else {
        userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(
          (blocked) => blocked.toString() !== userToBeUnBlocked._id.toString()
        );

        await userWhoUnBlocked.save();
        res.json({
          status: "success",
          data: "You have successfully unblocked this user",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

//admin-block
const adminBlockUserCtrl = async (req, res) => {
  try {
    const userToBeBlocked = await User.findById(req.params.id);

    if (!userToBeBlocked) {
      return next(appErr("User not Found"));
    }

    userToBeBlocked.isBlocked = true;

    await userToBeBlocked.save();
    res.json({
      status: "success",
      data: "You have successfully blocked this user",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//admin-unblock
const adminUnblockUserCtrl = async (req, res) => {
  try {
    const userToBeUnblocked = await User.findById(req.params.id);

    if (!userToBeUnblocked) {
      return next(appErr("User not Found"));
    }

    userToBeUnblocked.isBlocked = false;

    await userToBeUnblocked.save();
    res.json({
      status: "success",
      data: "You have successfully unblocked this user",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//all
const usersCtrl = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//profile
const userProfileCtrl = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//delete
const deleteUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete user route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//update
const updateUserCtrl = async (req, res) => {
  const { email, lastname, firstname } = req.body;
  try {
    //Check if email is not taken
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return next(appErr("Email is taken", 400));
      }
    }
    //update the user
    const user = await User.findByIdAndUpdate(
      req.userAuth,
      {
        lastname,
        firstname,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//update password
const updatePasswordCtrl = async (req, res, next) => {
  const { password } = req.body;
  try {
    //Check if user is updating the password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      //update user
      await User.findByIdAndUpdate(
        req.userAuth,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );
      res.json({
        status: "success",
        data: "Password has been changed successfully",
      });
    } else {
      return next(appErr("Please provide password field"));
    }
  } catch (error) {
    res.json(error.message);
  }
};

//Profile Photo Upload
const profilePhotoUploadCtrl = async (req, res, next) => {
  try {
    const userToUpdate = await User.findById(req.userAuth);

    if (!userToUpdate) {
      return next(appErr("User not found", 403));
    }
    if (userToUpdate.isBlocked) {
      return next(appErr("Action not allowed, your account is blocked", 403));
    }
    if (req.file) {
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );
      res.json({
        status: "success",
        data: "You have successfully updated your profile photo",
      });
    }
  } catch (error) {
    next(appErr(error.message, 500));
  }
};
module.exports = {
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
  unblockUserCtrl,
  adminBlockUserCtrl,
  adminUnblockUserCtrl,
  updatePasswordCtrl,
};
