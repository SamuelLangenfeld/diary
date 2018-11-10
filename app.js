const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const api = require("./routers/api");
const login = require("./routers/login");

// ----------------------------------------
// Database
// ----------------------------------------

const dbURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : "mongodb://localhost/test";

mongoose.connect(
  dbURI,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// ----------------------------------------
// App Variables
// ----------------------------------------
app.locals.appName = "My App";

// ----------------------------------------
// ENV
// ----------------------------------------
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "secret"]
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// ----------------------------------------
// Flash Messages
// ----------------------------------------
const flash = require("express-flash-messages");
app.use(flash());

// ----------------------------------------
// Method Override
// ----------------------------------------
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");

app.use(
  methodOverride(
    getPostSupport.callback,
    getPostSupport.options // { methods: ['POST', 'GET'] }
  )
);

// ----------------------------------------
// Referrer
// ----------------------------------------
app.use((req, res, next) => {
  req.session.backUrl = req.header("Referer") || "/";
  next();
});

// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(path.join(__dirname, "client/build")));

// ----------------------------------------
// Logging
// ----------------------------------------
const morgan = require("morgan");
const morganToolkit = require("morgan-toolkit")(morgan);

app.use(morganToolkit());

// ----------------------------------------
// Routes
// ----------------------------------------
// first login route
// then check for logged in session
// if no, send error

app.use("/login", login);

app.use("/api", api);

// ----------------------------------------
// Error Handling
// ----------------------------------------
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.stack) {
    err = err.stack;
  }
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
