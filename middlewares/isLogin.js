const appErr = require("../utils/appErr");
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
    return next(appErr("Invalid/Expired token, please login again", 500));
  } else {
    next();
  }
};
module.exports = isLogin;
