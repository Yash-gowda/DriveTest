const User = require("../models/User");
const path = require("path");
module.exports = async (req, res) => {
  try {
    const userName = req.body.userName;
    const userInfo = await User.findOne({ userName: userName });
    if (userInfo) {
      console.log("This user already exists");
      const existingUser = "User Already Exists";
      req.session.existingUser = existingUser;
      req.flash("existingUser", existingUser);
      res.redirect("/auth/register");
    } else {
      if (req.body.password === req.body.confirmpassword) {
        const assignmentUser = await User.create({
          userName: userName,
          password: req.body.password,
          usertype: req.body.usertype,
        });
        res.redirect("/auth/login");
      } else {
        const passwordMatch = "Passwords dont match";
        req.session.passwordMatch = passwordMatch;
        req.flash("passwordMatch", passwordMatch);
        res.redirect("/auth/register");
      }
    }
  } catch (error) {
    //handle error
    console.log("registration error", error);
    const validationErrors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );

    console.log(`validationErrors: ${validationErrors}`);
    req.session.validationErrors = validationErrors;
    req.flash("validationErrors", validationErrors);
    req.flash("data", req.body);
    res.redirect("/auth/register");
  }
};
