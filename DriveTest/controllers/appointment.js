const Appointment = require("../models/appointment");
const { getCurrentUserByID } = require("./g2test");
const User = require("../models/User");

exports.saveAppointment = (req, res) => {
  const { appointment_time, appointment_date } = req.body;

  Appointment.findOne({ date: appointment_date, time: appointment_time })
    .then((data) => {
      if (data) {
        req.flash("validationErrors", ["Appointment slot Exist"]);
        return res.json({
          code: 1,
          message: "Appointment slot Exist",
          data,
        });
      }

      Appointment.create({
        date: appointment_date,
        time: appointment_time,
      }).then(async (data) => {
        console.log(data);

        const all = await Appointment.find();

        req.flash("appointments", all);
        return res.json({
          code: 0,
        });
      });
    })
    .catch((err) => {
      console.log("Failed:" + err.message);
    })
    .catch((err) => {});
};

exports.fetchAppointmentByDate = async (req, res) => {
  const { selected_date } = req.body;

const appointments = await Appointment.find({
    isTimeSlotAvailable: true,
    date: selected_date,
  });
  console.log(appointments);
  const user = await User.findById(req.session.userId);
  req.session.appointments = appointments;
  return res.render("g2_test", {
    appointments,
    userDetail: user,
  });
};
