require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Question = mongoose.model('Question');

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

// routes handler
app.get('/', (req, res) => {
    Question.find({}, (err, questions) => {
        res.render('index', {questions: questions});
    });
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

app.listen(process.env.PORT || 3000);