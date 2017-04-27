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
const functionsRoutes = require('./routes/userOptions.js');









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



app.get('/login', (req, res) => {
    res.render('login');
});



// set port
app.listen(process.env.PORT || 3000);