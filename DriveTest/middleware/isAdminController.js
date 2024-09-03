const User = require("../models/User");

module.exports = (req, res, next) => {
  User.findById(req.session.userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }
      console.log("user", user.userType);

      if (!user.userType === "admin") {
        return res.redirect("/login");
      }
      next();
    })
    .catch((error) => {
      console.log("Fetch user by id and return error message: ", error.message);
      return;
    });
};
