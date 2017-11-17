
var jwt = require('jsonwebtoken');
var axios = require("axios");



module.exports = function(apiRoutes, app, MongoClient, assert, url, mongoose) {





  // route to authenticate a user (POST http://localhost:8080/api/authenticate)
  apiRoutes.post('/auth', function(req, res) {
    console.log("/auth");


    // find the user
    User.findOne({
      email: req.body.email
    }, function(err, user) {

      if (err)
        throw err;

      if (!user) {
        res.json({success: false, message: 'Authentication failed. User not found.'});
      } else if (user) {

        bcrypt.compare(req.body.password, user.password, function(err, match) {

          // check if password matches
          if (!match) {
            res.json({success: false, message: 'Authentication failed. Wrong password.'});
          } else {


            let id = user._id;
            console.log(id)

            id = String(id);
            // if user is found and password is right
            // create a token
            var token = jwt.sign({id: id, dateUpdated: user.dateUpdated}, app.get('superSecret'), {
              expiresIn: 60 * 60 * 24
            });


            //cookie wiht cookies lib
            var cookie = new Cookies(req, res);

            cookie.set("auth_log", token, {httpOnly: false});

            res.writeHead(302, {"Location": "/"})

            return res.end("Now let's check.")

          }
        });
      }

    });
  });

  // route middleware to verify a token
  apiRoutes.use(function(req, res, next) {

    //get cookie
    var token = new Cookies(req, res).get('auth_log');
    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.json({success: false, message: 'Failed to authenticate token. The NSA is watching you'});
        } else {
          // console.log(decoded);
          // if everything is good, save to request for use in other routes

          // req.decoded = decoded;
          req.standardQuery = {_id: decoded.id}
          req.dateUpdated = decoded.dateUpdated;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({success: false, message: 'No token provided.'});

    }
  });


//check make sure token was authorized
  apiRoutes.get("/loggedIn", function(req, res) {

    let a = moment(req.dateUpdated, "MM/DD/YYYY" );
    let b = moment();
    let timePast = b.diff(a, 'days');

 if(timePast >= 90){
   res.json({loggedIn: "reset"});
 }else{
     res.json({loggedIn: true});
 }


    // console.log(req.decoded._doc.email)
    // console.log(req.decoded._doc._id)
  }); //end of loggedIn



} //end of module.exports
