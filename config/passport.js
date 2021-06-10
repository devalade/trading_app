const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// Load User model
const UserServices = require('../services/User');
// console.log(User)


var options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

module.exports = function (passport) {
  
  passport.use('jwt', new JwtStrategy(options, function (jwt_payload, done) {
    let user_email = jwt_payload.user_email
    let user = UserServices.getUserByEmail(user_email);
    
    if (user) {
      return done(null, user);
    } else {
      return done(err, false);
    }
    
  }));
  
}



// module.exports = function(passport) {
//   passport.use('local',
//     new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
//       console.log('On est dedans');
//       // Match user
//       User.getUserByEmail(email)
//         .then(user => {
//         if (!user) {
//           console.log(user);
//           return done(null, false, { message: 'That email is not registered' });
//         }
//           // console.log('We want to test the user ...', user)

//         // Match password
//         bcrypt.compare(password, user.user_password, (err, isMatch) => {
//           if (err) throw err;
//           if (isMatch) {
//             console.log('C\'est bon');
//             return done(null, user);
//           } else {
//             console.log("Not good");

//             return done(null, false, { message: 'Password incorrect' });
//           }
//         });
//       });
//     })
//   );

//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function(id, done) {
//     console.log('deserializeUser');
//     User.getById(id)
//     .then((user) => {
//       done(null, user);
//     }).catch(done);
//   });
// };
