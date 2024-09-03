module.exports = (req, res) => {
  var userName = "";
  var password = "";
  var usertype = "";

  const rdata = req.flash("data")[0];
  if (typeof rdata != "undefined") {
    userName = rdata.userName;
    password = rdata.password;
    usertype = rdata.usertype;
  }
  res.render("register", {
    errorArr: req.flash("validationErrors"),
    userName,
    password,
    usertype,
    errorArr: req.flash("existingUser"),
    errorArr: req.flash("passwordMatch"),

  }); 
};
