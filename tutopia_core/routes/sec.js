var router = require("express").Router();
var jwt = require("jsonwebtoken");
//var passport = require("passport");

function initSecRoute(db, passport) {
  var UserColl = db.collection("usuarios");


  router.post('/login',
    passport.authenticate('local',{session:false}),
    function(req,res,next){
      console.log(req.user);
      var token = jwt.sign(req.user, "cuandoLosGatosBlaBlaBla");
      return res.status(200).json({ user: req.user, token: token });
    }
  );

  /*router.post("/login", function(req, res, next) {

    passport.authenticate(
      'local',
      { session: false },
      function(err, user, info) {

        if (err || !user) {
          return res.status(400).json({ islogged: false });
        }

        req.login(user, { session: false }, function(err) {
          if (err) return res.status(400).json({ islogged: false });
          var token = jwt.sign(user, "cuandoLosGatosBlaBlaBla");
          return res.status(200).json({ user: user, token: token });
        });
      } // authenticate
    );
  }); // post login
  */

  router.post("/regiter", function(req, res, next) {
    var newUser = Object.Assign(
      {},
      { useremail: "", password: "", nombre: "" },
      req.body
    );
    UserColl.insert(newUser, function(err, rsl) {
      return res.status(200).json({ done: true });
    });
  });

  return router;
}
module.exports = initSecRoute;
