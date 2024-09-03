const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserDetails = new Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  usertype: {
    type: String,
  },
  appointment_id: {
    type: String,
  },
  fname: {
    type: String,
    default: "default",
  },
  lname: {
    type: String,
    default: "default",
  },
  license: {
    type: String,
    default: "default",
  },
  age: {
    type: Number,
    default: 0,
  },
  dob: {
    type: String,
    default: "default",
  },
  car: {
    make: {
      type: String,
      default: "default",
    },
    model: {
      type: String,
      default: "default",
    },
    year: {
      type: Number,
      default: 0,
    },
    plateNumber: {
      type: String,
      default: "default",
    },
  },
});

UserDetails.plugin(uniqueValidator);

UserDetails.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("UserRegistration", UserDetails);

module.exports = User;
