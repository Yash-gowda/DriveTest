module.exports = (req, res) => {
  var userName = "";
  var password = "";

  const rdata = req.flash("dataLogin")[0];
  if (typeof rdata != "undefined") {
    userName = rdata.userName;
    password = rdata.password;
    usertype = rdata.usertype;
  }
  res.render("login", {
    errorArrLogin: req.flash("loginValidationErrors"),
    userName,
    password,
    errorArrLogin: req.flash("incorrectPassword"),
    errorArrLogin: req.flash("noUser"),
    errorArrLogin: req.flash("emptyFieldsError"),
  });
};
