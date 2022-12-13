const express = require('express');
const bodyParser = require('body-parser');
const Tweet = require('../models/tweet');
const { requiresAuth } = require('express-openid-connect');
// const passport = require('passport');
// const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
//Declaring Express Router
const bookmarkRouter = express.Router();
var loggedIn
bookmarkRouter.use(bodyParser.json());

bookmarkRouter.route('/showUserBookmark')
    .get(requiresAuth(),(req, res, next) => {
        Tweet.find({ userId: process.env.DEMO_USER_ID})
            .then((tw) => {
                if (tw != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(tw);
                }
                else {
                    err = new Error('Not found');
                    err.status = 404;
                    return next(err); //DON't return just the 'err'
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /favorites');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /favorites');
    });

module.exports = bookmarkRouter;