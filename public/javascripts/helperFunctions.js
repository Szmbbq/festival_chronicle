const nlp = require('compromise');

// check if the question is valid
function isValidQuestion(question, index) {
    const parsedText = nlp(question);
    // get tokenized sentence
    const tokenizedSent = parsedText.out('terms');
    // check if valid
    let checkResult;
    if(tokenizedSent[index].tags.indexOf('Noun') >= 0 || tokenizedSent[index].tags.indexOf('Value') >= 0 || tokenizedSent[index].tags.indexOf('People') >= 0 || tokenizedSent[index].tags.indexOf('Place') >= 0) {
        // return true if valid
        checkResult = true;
    } else {
        // return the invalid word if the question is invalid
        checkResult = tokenizedSent[index].text;
    }

    return checkResult;
}

// create a string of question based on the flashcard and the bland index
function createQuestion(flashCard, index) {
    const parsedText = nlp(flashCard);
    const tokenizedSent = parsedText.out('terms');
    let question = '';
    for(let i = 0; i < tokenizedSent.length; i++) {
        if(index === i) {
            let blank = "(_______)";
            question += blank;
        } else {
            question += tokenizedSent[i].text + ' ';
        }
    }
    return question;
}

// check answers
function checkAnswers(answers, keys) {
    const result = {numOfQuestions: answers.length,
                    correct: 0};
    const accuracy = answers.reduce((acc, val) => {
        if(val === keys[answers.indexOf(val)]) {
            result.correct += 1;
            return acc += 1;
        } else {
            return acc;
        }
    }, 0)/answers.length;
    result.accuracy = (accuracy * 100).toFixed(2);
    return result;
}

// ranking
function ranking(rankBy, users) {
    if(rankBy === 'accuracy') {
        return users.sort((a, b) => b.stats.accuracy - a.stats.accuracy);
    } else if(rankBy === 'questionTake') {
        return users.sort((a, b) => b.stats.questionTake - a.stats.questionTake);
    } else {
        return users.sort((a, b) => b.stats.correctNum - a.stats.correctNum);
    }
}

module.exports = {isValidQuestion: isValidQuestion,
                  createQuestion: createQuestion,
                  checkAnswers: checkAnswers,
                  ranking: ranking};