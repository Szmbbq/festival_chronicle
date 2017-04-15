const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('../GOOGLE_AUTH');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({'local.username': username}, function(err, user) {
            if(err) {return done(err);}
            console.log(user);
            if(!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if(!bcrypt.compareSync(password, user.local.password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));

passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL
}, function(accessToken, refreshToken, profile, done) {
    User.findOne({'google.id': profile.id}, function(err, user) {
        if(err) {return done(err);}
        if(user) {
            return done(null, user);
        } else {
            const user = new User();
            user.google.id = profile.id;
            user.google.token = accessToken;
            user.google.name = profile.displayName;
            user.save(function(err) {
                if(err) {throw err;}
                return done(null, user);
            });
        }

    });
}));



// get user schema
const User = require('../models/user.js'); 


// get register form
router.get('/register', function(req, res) {
    res.render('register');
});

// register user
router.post('/register', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPW = req.body.confirmPW;
    // Validation
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirmPW', 'Password do not match').equals(req.body.password);
    // collect errors
    const errors = req.validationErrors();
    // re-register if there are errors
    if(errors) {
        res.render('register', {err: errors});
    }
    // check is username existed
    User.findOne({'local.username': req.body.username}, (err, result) => {
        // re-register
        if(result) {
            res.render('register', {err: "Username exsits!"});
        } else {
            // hash the password
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                // create the new user object to be stored in the database
                const user = new User();
                user.local.username = req.body.username;
                user.local.password = hash;
                // save new user
                user.save((err) => {
                    if(err) {
                        res.send(err);
                        console.log(err);
                    }
                });
                // redirect to homepage
                req.login(user, function(err) {
                    if(err) {
                        console.log(err);
                    }
                    return res.redirect('/');
                });
            });
        };
    });
});



// get login form
router.get('/login', function(req, res) {
    res.render('login', {err: req.flash('error')});
});

// login user
router.post('/login', passport.authenticate('local', 
    {successRedirect: '/',
     failureRedirect: '/login',
     failureFlash: true}),
    function(req, res) {
        res.redirect('/');
    });

// google login
router.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/auth/google/callback', 
    passport.authenticate('google', {successRedirect: '/',
                                     failureRedirect: '/login'}));

// logout user
router.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/login');
});


// export routes
module.exports = router;