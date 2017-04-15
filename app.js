const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const mongoose = require('mongoose');
const Question = require('./models/question');
const User = require('./models/user');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

require('./db');

// bring in routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/handleUsers');
const functionsRoutes = require('./routes/functions.js');









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

// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// // Global Vars
// app.use(function (req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   res.locals.user = req.user || null;
//   next();
// });

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// use routes
app.use('/', indexRoutes);
app.use('/', userRoutes);
app.use('/', functionsRoutes);

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
// app.get('/', (req, res) => {
//     Question.find({}, (err, questions) => {
//         if(err) {
//             console.log(err);
//         }
//         res.render('index', {questions: questions});
//     });
// });

app.get('/login', (req, res) => {
    res.render('login');
});

// app.post('/createQuestion', (req, res) => {
//     const question = new Question({
//         flashcard: req.body.flashcard,
//         blank: req.body.blank,
//         festival: req.body.festival
//     });
//     question.save((err) => {
//         if(err) {
//             res.send(err);
//         }
//         res.redirect('/');
//     });
// });

// app.post('/deleteQuestion', (req, res) => {
//     Question.deleteOne({_id: req.body.delete}, function(err, question) {
//         if(err) {
//             res.send(err);
//         }
//         res.redirect('/');
//     });
// });

// app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));

// app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), function(req, res) {
//     res.redirect('/');
// });

// set port
app.listen(process.env.PORT || 3000);