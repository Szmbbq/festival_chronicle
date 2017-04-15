const mongoose = require('mongoose');

// User Schema
const User = new mongoose.Schema({
    local: {
        username: String,
        password: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

// register models
mongoose.model('User', User);

// export schema
module.exports = mongoose.model('User');