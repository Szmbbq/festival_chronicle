const express = require('express');
const router = express.Router();
const Question = require('../models/question');
// review flashcards
router.get('/flashcards', ensureAuthenticated, function(req, res) {
    Question.find({}, (err, questions) => {
        res.render('flashcards', {questions: questions});
    });
});

// create question
router.get('/createQuestion', ensureAuthenticated, function(req, res) {
    res.render('createQuestion');
});

router.post('/createQuestion', ensureAuthenticated, function(req, res) {
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

// remove flashcards
router.get('/deleteQuestion', ensureAuthenticated, function(req, res) {
    Question.find({}, (err, questions) => {
        res.render('deleteQuestion', {questions: questions});
    });
});

router.post('/deleteQuestion', ensureAuthenticated, function(req, res) {
    Question.deleteOne({_id: req.body.delete}, function(err, question) {
        if(err) {
            res.send(err);
        }
        res.redirect('/');
    });
});











function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/guest');
    }
}

// export router
module.exports = router;