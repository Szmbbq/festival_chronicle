// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more questions created
// * as well as their own stats
const User = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  stats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stat' }]
});

// a festival in the festival list
// * includes the name of the festival
// * embedded questions related to this festival
const Festival = new mongoose.Schema({
  name: {type: String, required: true},
  questions: [Question]
});

// a question
// * each question has a creator user
// * flashcard
// * blank position
const Question = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  flashcard: {type: String, required: true},
  blank: Array
});

// a stats
// * each has accuracy field
// * number of questions created
// * number of quzzes took
// * reference to the user
const Stat = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    accurracy: Number,
    ownQuestion: Number,
    quiz: Number
});
// TODO: add remainder of setup for slugs, connection, registering models, etc. below
mongoose.model('User', User);
mongoose.model('Question', Question);
mongoose.model('Festival', Festival);
mongoose.model('Stat', Stat);

Festival.plugin(URLSlugs('name'));

mongoose.connect('mongodb://');