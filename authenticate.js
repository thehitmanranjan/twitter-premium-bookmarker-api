// const passport = require('passport');
// const User = require('./models/user');
// require('dotenv').config();

// passport.use(new TwitterStrategy({
//     consumerKey: process.env.TWITTER_CONSUMER_KEY,
//     consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, cb) {
//     User.findOrCreate({ userId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// exports.verifyUser = passport.authenticate('twitter');