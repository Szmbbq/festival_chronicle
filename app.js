require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Question = mongoose.model('Question');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const app = express();

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the GoogleStrategy within Passport
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
// }, function(accessToken, refreshToken, profile, done) {
//     User.findOne({gooleId: profile.id}, function(err, user) {
//         return done(err, user);
//     });
// }));

// routes handler
app.get('/', (req, res) => {
    Question.find({}, (err, questions) => {
        res.render('index', {questions: questions});
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/createQuestion', (req, res) => {
    const question = new Question({
        flashcard: req.body.flashcard,
        blank: req.body.blank,
        festival: req.body.festival
    });
    question.save((err) => {
        if(err) {
            res.send(err);
        }
        res.redirect('/');
    });
});

app.post('/deleteQuestion', (req, res) => {
    Question.deleteOne({_id: req.body.delete}, function(err, question) {
        if(err) {
            res.send(err);
        }
        res.redirect('/');
    });
});

app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));

app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), function(req, res) {
    res.redirect('/');
});

app.listen(process.env.PORT || 3000);