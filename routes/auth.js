var express = require('express');
var passport = require('passport');
const Users = require('../models/user')
var router = express.Router();

router.get('/auth/twitter',
  passport.authenticate('twitter'));

router.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    let sess = req.session
    sess.user = res.req.user.id

    const userId = {
      "userId": req.session.user
    }
    Users.findOneAndUpdate(userId, userId, {
      new: true,
      upsert: true // Make this update into an upsert
    }, (err) => {
      if (err) {
        console.log(err)
      }
    });
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'application/json');
    // res.json(userId);
    console.log("ANS== ", req.cookie)
    res.cookie('cookieName',20000, { maxAge: 900000, httpOnly: true });
    console.log("ANS after== ", res.cookie.name)
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
