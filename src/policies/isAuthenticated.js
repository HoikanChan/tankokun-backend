const passport = require("passport");
const sendResult = require("../utils/sendResult");

module.exports = function(req, res, next) {
  passport.authenticate("jwt", function(err, user) {
    if (err || !user) {
      let error = "请先登录";
      sendResult.error(res, error);
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};
