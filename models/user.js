const mongoose = require('mongoose');
// User Stats Schema
const Stats = new mongoose.Schema({
    questionTake: {type: Number, default: 0},
    correctNum: {type: Number, default: 0},
    accuracy: {type: Number, default: 0}
});

// User Schema
const User = new mongoose.Schema({
    local: {
        username: String,
        password: String,    
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
    stats: {type: Stats, default: Stats}
});

// register models
mongoose.model('User', User);
mongoose.model('Stats', Stats);

// export schema
module.exports = mongoose.model('User');