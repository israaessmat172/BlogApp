const bcrypt = require("bcryptjs");
const User = require("../../model/User/User");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeaders = require("../../utils/getTokenFromHeaders");

//Register
const userRegisterCtrl = async (req, res) => {
  const { firstname, lastname, profilePhoto, email, password } = req.body;
  try {
    //check if email exsit
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.json({
        msg: "Email Already Exist",
      });
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
    res.json(error.message);
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

//all
const usersCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "users route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//profile
const userProfileCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const token = getTokenFromHeaders(req);
    console.log(token);
    const user = await User.findById(id);
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
  try {
    res.json({
      status: "success",
      data: "update user route",
    });
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
