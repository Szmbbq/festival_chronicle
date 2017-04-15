// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');
// const URLSlugs = require('mongoose-url-slugs');

// // users
// // * our site requires authentication...
// // * so users have a username and password
// // * they also can have 0 or more questions created
// // * as well as their own stats
// const User = new mongoose.Schema({
//   // username provided by authentication plugin
//   // password hash provided by authentication plugin
//   // lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
//   // stats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stat' }]
//   local: {
//       username: String,
//       password: String
//   },
//   google: {
//       id: String,
//       token: String,
//       email: String,
//       name: String
//   }
// });

// // a question
// // * each question has a creator user
// // * flashcard
// // * blank position
// const Question = new mongoose.Schema({
//   createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
//   flashcard: {type: String, required: true},
//   blank: Number
// });

// // a festival in the festival list
// // * includes the name of the festival
// // * embedded questions related to this festival
// const Festival = new mongoose.Schema({
//   name: {type: String, required: true},
//   questions: [Question]
// });

// // a stats
// // * each has accuracy field
// // * number of questions created
// // * number of quzzes took
// // * reference to the user
// const Stat = new mongoose.Schema({
//     user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
//     accurracy: Number,
//     ownQuestion: Number,
//     quiz: Number
// });

// // TODO: add remainder of setup for slugs, connection, registering models, etc. below
// mongoose.model('User', User);
// mongoose.model('Question', Question);
// mongoose.model('Festival', Festival);
// mongoose.model('Stat', Stat);
// Festival.plugin(URLSlugs('name'));

// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');
 var data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 var conf = JSON.parse(data);
 var dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/database1';
};

mongoose.connect(dbconf);