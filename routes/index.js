const express = require('express');
const router = express.Router();
const Question = require('../models/question.js');
// guest homepage
router.get('/guest', function(req, res) {
    res.render('guest');
});

// get homepage
router.get('/', ensureAuthenticated, function(req, res) {
    // render the homepage with the username
    res.render('index', {name: req.user.local.username || req.user.google.name});
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