const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  isTimeSlotAvailable: {
    type: Boolean,
    require: true,
    default: true,
  },
});

const Appointment = mongoose.model("appointment", AppointmentSchema);
module.exports = Appointment;
