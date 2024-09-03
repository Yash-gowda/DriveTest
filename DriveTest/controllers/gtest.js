const User = require("../models/User");

module.exports = async (req, res) => {
  if (req.session.userId) {
    const userDetail = await User.findById(req.session.userId);
    res.render("g_test", { userDetail: userDetail });
  } else {
    res.redirect("/login");
  }
};
