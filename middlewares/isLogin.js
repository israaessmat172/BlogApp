const getTokenFromHeaders = require("../utils/getTokenFromHeaders");

const isLogin = (req, res, next) => {
  //get Token from header
  const token = getTokenFromHeaders(req);
  if (!token) {
    return res.json({
      message: "There is no token attached to the header",
    });
  } else {
    next();
  }
};
module.exports = isLogin;
