const getTokenFromHeaders = require("../utils/getTokenFromHeaders");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
  //get Token from header
  const token = getTokenFromHeaders(req);

  //verify the token
  const decodedUser = verifyToken(token);

  //save the user into req obj
  req.userAuth = decodedUser.id;
  if (!decodedUser) {
    return res.json({
      message: "Invalid/Expired token, please login again",
    });
  } else {
    next();
  }
};
module.exports = isLogin;
