const mongoose = require('mongoose');

// question schema
const Question = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  flashcard: {type: String, required: true},
  blank: Number
});

//register schema
mongoose.model('Question', Question);

// export schema
module.exports = mongoose.model('Question');