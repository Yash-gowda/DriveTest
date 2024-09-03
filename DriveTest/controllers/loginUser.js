const User = require("../models/User");
const path = require("path");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    console.log("userName : ", userName, password);
    if (userName != "" && password != "") {
      const userInfo = await User.findOne({ userName: userName });
      if (userInfo) {
        console.log(userInfo);
        bcrypt.compare(password, userInfo.password, (error, isSame) => {
          if (isSame) {
            req.session.userId = userInfo._id;
            req.session.userType = userInfo.usertype;
            console.log("session info: ", req.session);
            res.redirect("/");
          } else {
            console.log("Form Password: " + password);
            console.log("Model Password: " + userInfo.password);
            const incorrectPassword = "Incorrect Password";
            req.session.incorrectPassword = incorrectPassword;
            req.flash("incorrectPassword", incorrectPassword);
            res.redirect("/auth/login");
          }
        });
      } else {
        console.log("Not Valid User");
        const noUser = "No user found named " + userName;
        req.session.noUser = noUser;
        req.flash("noUser", noUser);
        res.redirect("/auth/login");
      }
    } else {
      throw new Error("Username and password are required");
    }
  } catch (error) {
    console.log("Error : " + error);
    if (error.message === "Username and password are required") {
      const emptyFieldsError = "Username and password are required";
      req.session.emptyFieldsError = emptyFieldsError;
      req.flash("emptyFieldsError", emptyFieldsError);
      res.redirect("/auth/login");
    } else {
      const loginValidationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      console.log("loginValidationErrors", loginValidationErrors);
      req.session.loginValidationErrors = loginValidationErrors;
      req.flash("loginValidationErrors", loginValidationErrors);
      req.flash("dataLogin", req.body);
      res.redirect("/auth/login");
    }
  }
};
