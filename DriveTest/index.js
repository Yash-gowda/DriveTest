const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");

global.loggedIn = null;
global.userType = null;

// Model
const User = require("./models/User");

// Controllers
const dashboardController = require("./controllers/dashboard");
const g2TestController = require("./controllers/g2test");
const gTestController = require("./controllers/gtest");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const logoutController = require("./controllers/logout");
const appointmentController = require("./controllers/appointment_route");
const updateUserController = require("./controllers/updateUserG2");
const {
  saveAppointment,
  fetchAppointmentByDate,
} = require("./controllers/appointment");

// Middleware
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
const isAdmin = require("./middleware/isAdminController");

//creating application using express
const app = express();

// Connect to MongoDB with Mongoose
mongoose.connect("mongodb+srv://toyashgowda:Yashwanth1994@cluster0.vj1wzta.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.log('Error connecting to MongoDB: ', err.message);
});

app.use(express.static("public"));

app.use(
  expressSession({
    secret: "Yashgowda",
    resave: true,
    saveUninitialized: true,
  })
);

//Set view engine:
app.use(flash());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  userType = req.session.userType;
  console.log(loggedIn);
  next();
});

//Routes
app.get("/", dashboardController);
app.get("/dashboard", dashboardController);
app.get("/g2_test", authMiddleware, g2TestController);
app.get("/g_test", authMiddleware, gTestController);

// Users routes
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
app.get("/auth/logout", logoutController);
app.post("/update-details", updateUserController);

app.get("/appointment", isAdmin, appointmentController);
app.post("/admin/appointment/add", saveAppointment);
app.post("/appointment_date", fetchAppointmentByDate);

app.listen(4100, (req, res) => {
  console.log("Application is running on http://localhost:4100");
});
