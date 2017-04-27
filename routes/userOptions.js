// bring in modules and schemas
const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const User = require('../models/user');
const hf = require('../public/javascripts/helperFunctions.js')
const nlp = require('compromise');

// review flashcards
router.get('/flashcards', ensureAuthenticated, function(req, res) {
    Question.find({}, (err, questions) => {
        res.render('flashcards', {questions: questions});
    });
});

// create question (need authentication)
router.get('/createQuestion', ensureAuthenticated, function(req, res) {
    res.render('createQuestion');
});

// handle create question form (check if the question is valid, redirect to homepage if success)
router.post('/createQuestion', ensureAuthenticated, function(req, res) {
    const checkResult = hf.isValidQuestion(req.body.flashcard, req.body.blank);
    const invalidWords = [];
    if(checkResult !== true) {
        invalidWords.push(checkResult);
        res.render('createQuestion', {invalidWords: invalidWords});
    } else {
        const question = new Question({
            flashcard: req.body.flashcard,
            blank: req.body.blank,
            festival: req.body.festival,
            key: nlp(req.body.flashcard).out('terms')[req.body.blank].normal
        });
        question.save((err) => {
            if(err) {
                res.send(err);
            } else {
                res.redirect('/');
            }
        });
    }
});

// remove flashcards
router.get('/deleteQuestion', ensureAuthenticated, function(req, res) {
    Question.find({}, (err, questions) => {
        res.render('deleteQuestion', {questions: questions});
    });
});

// handle the remove flashcard form
router.post('/deleteQuestion', ensureAuthenticated, function(req, res) {
    Question.deleteOne({_id: req.body.delete}, function(err, question) {
        if(err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    });
});

// have a quiz
router.get('/quiz', ensureAuthenticated, function(req, res) {
    let filter = {};
    // if(req.query.festival) {
    //     filter.festival = req.query.festival;
    // }
    Question.find(filter, function(err, questions) {
        if(err) {
            res.send(err);
        } else {
            const quizList = questions.map(ele => {
                return hf.createQuestion(ele.flashcard, ele.blank);
            });
            const quizKeys = questions.map(ele => {
                return ele.key
            });
            res.render('quiz', {questions: quizList, keys: quizKeys.toString().split(' ').join('&nbsp')});
        }
    });
});

// show quiz result and calculate user stats
router.post('/quizResult', function(req, res) {
    const keys = req.body.keys.split('&nbsp').join(' ').split(',');
    const answers = req.body.answers.map(ele => {
        if(ele === '') {
            return undefined;
        }
        return nlp(ele).out('terms')[0].normal;
    });
    const result = hf.checkAnswers(answers, keys);
    User.findOne({_id: req.user._id}, function(err, user) {
        const newTotal = user.stats.questionTake + result.numOfQuestions;
        const newCorrect = user.stats.correctNum + result.correct;
        const newAccuracy = newCorrect/newTotal;
        user.stats.questionTake = newTotal;
        user.stats.correctNum = newCorrect;
        user.stats.accuracy = (newAccuracy * 100).toFixed(2);
        user.save(function(err, user) {
            if(err) {
                res.send(err);
            }
            res.render('quizResult', {thisTime: result, accumulative: user.stats, keys: keys, answers: answers});
        })
    });
});

// ranking page
router.get('/ranking', function(req, res) {
    User.find({}, function(err, users) {
        const sortedUsers = hf.ranking(req.query.rankBy, users);
        if(req.query.rankBy === 'questionTake') {
            rankBy = 'Total Number of Questions Took';
        } else if(req.query.rankBy === 'accuracy') {
            rankBy = 'Accuracy';
        } else {
            rankBy = 'Number of Right Answers';
        }
        res.render('ranking', {users: sortedUsers, rankBy: rankBy});
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