var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var userRouter = require("./routes/user");
var apiRouter = require("./routes/api");
var saleRouter = require("./routes/sale"); // Importera sale.js

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);
app.use("/", saleRouter); // Lägg till routen
app.use("/stylesheets/Images", express.static("stylesheets/Images"));

app.post("/test-post", (req, res) => {
  res.status(200).json({ message: "Test POST fungerar!" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("404 triggered for:", req.originalUrl);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
