

# Festival Chronicle 

## Overview



Festival, as a event combining various aspects from a culture, is the precious gift of thousands of years' civilization. Different cultures brew diverse festivals. Sometimes we to know a new culture through the lens of its festivals. Festival Chronicle is the best navigator for your voyage to the festival kingdom.

Festival Chronicle is a web app that will allow users to learn basic knowledge of different festivals from different cultures. Users can register and login. Once they're logged in, they can create their own questions for other users to study. For every question that they create, they can choose where to be left blank. They can also doing another's questions or just viewing flashcards. Each user has their own stats (quiz scores and number of questions created) shown on the ranking list.


## Data Model



The application will store Users and Questions

* users can create questions and modify them. 
* each user has a stats recording his/her score (by embedding)
* each question has a flahscard for viewing, a number indicating the gap index and a key string.



An Example User:

```javascript
{
  username: "festivalcitizen",
  hash: // a password hash,
  myQuestions: // an array of references to Question documents this user has created
  stat: { quiz: 17, accuracy: 0.6, ownQuestion: 10 } // the stats of this user, number of quiz took, accuracy and number of questions created
}
```

An Example Question:

```javascript
{ 
    flashcard: "Christmas is an annual festival commemorating the birth of Jesus Christ, observed most commonly on December 25th as a religious and cultural celebration.", // flashcard of this question
    blank: 0 // index of blanks set by the question creater
    key: "christmas" // the normal form of the word derived using nlp module compromise
}

```


## [Link to User Schema](models/user.js)
## [Link to Question Schema](models/question.js)


## Wireframes



/login - page for user to login

![list](documentation/login.png)

/flashcards - page for user to view existing flashcards

![list](documentation/flashcards.png)

/createQuestion - page for user to create his question

![list](documentation/createQuestion.png)

/deleteQuestion - page for user to delete existing questions

![list](documentation/deleteQuestion.png)

/quiz - page for user to take quizzes

![list](documentation/quiz.png)

/ranking - page for user to view ranking

![list](documentation/ranking.png)

## Site map

The site map

![list](documentation/theSiteMap.png)

## User Stories or Use Cases



1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new question relate to a specific festival
4. as a user, I can view all of the existing flashcards in the database
5. as a user, I can take quizzes made of questions in the database
6. as a user, I can check the ranking list

## Research Topics



* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * Local and Google Strategy will be used
* (3 points) Unit testing with JavaScript
    * use Mocha for unit testing
* (1-6 points) Use a Javascript library
    * use compromise as NLP tool to help create a valid question




## [Link to Initial Main Project File](app.js) 



## Annotations / References Used



1. [passport.js authentication docs](http://passportjs.org/docs)
2. [passport google authentication](https://github.com/BrentAureli/Youtube-Tutorials/tree/master/NodeJS%20Tutorials/Tutorial%2011%20-%20Google%20OAuth)
3. [tutorial on Mocha](https://github.com/mochajs/mocha)
4. [compromise docs](https://github.com/nlp-compromise/compromise)


