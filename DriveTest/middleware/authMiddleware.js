const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId).exec();

    if (user) {
      return next();
    }
    return res.redirect("/");
  } catch (error) {
    console.log("error in authMiddleware.js", error);
    return res.redirect("/");
  }
};
