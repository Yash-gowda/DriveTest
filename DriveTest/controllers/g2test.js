const User = require("../models/User");
const Appointment = require("../models/appointment");

module.exports = async (req, res) => {
  if (req.session.userId) {
    const userDetail = await User.findById(req.session.userId);
    console.log("userDetail : ", userDetail);
    //load appointments page
    const today = new Date();
    const formatted =
      today.getFullYear() +
      "-" +
      Number(today.getMonth() + 1) +
      "-" +
      today.getDate();

    const todaysAppointment = await Appointment.find({
      date: formatted,
      isTimeSlotAvailable: true,
    });
    console.log(todaysAppointment);
    res.render("g2_test", {
      userDetail: userDetail,
      appointments: todaysAppointment,
    });
  } else {
    res.redirect("/login");
  }
};
