const User = require("../models/User");
const path = require("path");
const Appointment = require("../models/appointment");

module.exports = async (req, res) => {
  try {
    await User.findByIdAndUpdate(loggedIn, {
      fname: req.body.fname,
      lname: req.body.lname,
      license: req.body.license,
      age: req.body.age,
      dob: req.body.dob,
      appointment_id: req.body.appointment_id,
      car: {
        make: req.body.carMake,
        model: req.body.carModel,
        year: req.body.carYear,
        plateNumber: req.body.carPlateNumber,
      },
    }).then(async (data) => {
      console.log("registration successful: ", data);
      const update = await Appointment.findByIdAndUpdate(
        req.body.appointment_id,
        { isTimeSlotAvailable: false }
      );
      console.log("update", update);
    });
    res.redirect("/");
    const userDetail = await User.findById(req.session.userId);
    console.log("userDetails:", userDetail);
  } catch {
    res.redirect("/login");
  }
};
