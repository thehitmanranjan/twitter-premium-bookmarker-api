var express = require('express');
var passport = require('passport');
const Users = require('../models/user')
var router = express.Router();

router.get('/login', function (req, res, next) {
  res.redirect('/login/federated/twitter.com');
});


router.get('/login/federated/twitter.com', passport.authenticate('twitter'));

router.get('/oauth/callback/twitter.com',
  passport.authenticate('twitter', { assignProperty: 'federatedUser', failureRedirect: 'https://www.geeksforgeeks.org/express-js-res-redirect-function/' }),
  function (req, res, next) {
    
    const federatedUserId = parseInt(req.federatedUser.id)
    let sess = req.session
    sess.user = federatedUserId

    const userId = {
      "userId": federatedUserId
    }
    Users.findOneAndUpdate(userId, userId, {
      new: true,
      upsert: true // Make this update into an upsert
    }, (err) => {
      if (err) {
        console.log(err)
      }
    });
    res.redirect('/twitterbookmarker/showUserBookmark');
  });

router.get('/logout', function (req, res, next) {
  req.logout();

  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  });

});

module.exports = router;
