const express = require('express');
const bodyParser = require('body-parser');
const Tweet = require('../models/tweet');
const passport = require('passport');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
// var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
//Declaring Express Router
const bookmarkRouter = express.Router();
var loggedIn
bookmarkRouter.use(bodyParser.json());

bookmarkRouter.route('/findbookmark')
    .get((req, res, next) => {
        let sess = req.session
        if(sess["user"]==undefined) {
            res.statusCode = 403;
            res.end("Unauthorized")
            return
        }
        Tweet.find({ userId: req.body.user_id })
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