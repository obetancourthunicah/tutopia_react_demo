var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var passportInitiate = require("./passport.js");

function initApp(db) {

  var index = require("./routes/index");
  var users = require("./routes/users");

  var app = express();

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  app.use(cors());
  app.use(logger("dev"));
  app.use(bodyParser.json());
  var passport = passportInitiate(db);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(require("less-middleware")(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/", index);
  app.use("/users", users);

  var sec = require("./routes/sec");
  app.use("/api/sec", sec(db, passport));

  var api_appdata = require("./routes/api/appdata.js")(db);
  app.use(
    "/api/app",
    passport.authenticate('jwt', { session: false }),
    api_appdata
  );

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  return app;
} // end initApp
module.exports = initApp;
