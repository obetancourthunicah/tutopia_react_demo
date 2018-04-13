var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passportJWT = require("passport-jwt");
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

function init(db) {
  var UserColl = db.collection("usuarios");
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "pswd",
        "session":false
      },
      function( email, pswd, next) {
        var query = { email: email };
        console.log({email, pswd});
        UserColl.findOne(query, function(err, user) {
          if (err) return  next(err);
          if (user && user.pswd === pswd) {
            delete user.pswd;
            // token = jwt.sign(user, "cuandoLosGatosBlaBlaBla");
            // return res.status(200).json({ user: user, token: token });
            return next(null, user);
          } else {
            //return res.status(400).json({ islogged: false });
            return next(null, false);
          }
        });
      }
    )
  ); // passport.use

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "cuandoLosGatosBlaBlaBla"
      },
      function(jwtPayload, next) {
        console.log(jwtPayload);
        next(null, jwtPayload);
      }
    )
  ); //use JWT

  return passport;
} // init

module.exports = init;
