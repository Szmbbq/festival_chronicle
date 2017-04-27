const hf = require('../public/javascripts/helperFunctions.js');
const expect = require('chai').expect;

describe('helperFunctions', function() {
    describe('isValidQuestion', function() {
        it('check the blank wether valid or not (the word replaced by the gap should be noun, location, person name or number) If valid return true, else return the invalid word.', function() {
            const check1 = hf.isValidQuestion("The Chinese New Year is also called the Spring Festival.", 1);
            const expected1 = true;
            const check2 = hf.isValidQuestion("The name of the monster that the village scared off at the first Chinese New Year is Nian.", 0);
            const expected2 = 'The';
            expect(check1).to.deep.equal(expected1);
            expect(check2).to.deep.equal(expected2);
        });
    });

    describe('createQuestion', function() {
        it('create a question based on the flashcard and blank index', function() {
            const check1 = hf.createQuestion("The celebration for Chinese New Year lasts for 15 days.", 6);
            const check2 = hf.createQuestion("Halloween is on Oct 31st.", 3);
            const expected1 = "The celebration for Chinese New Year lasts for (_______)days. "
            const expected2 = "Halloween is on (_______)31st. ";
            expect(check1).to.deep.equal(expected1);
            expect(check2).to.deep.equal(expected2);
        });
    });

    describe('checkAnswers', function() {
        it('check the answer user submitted with the answer key and return an object contains number of questions, number of corrects and accuracy.', function() {
            const check = hf.checkAnswers(['One', 'Two', 'Three', 'Four'], ['One', 'Two', 'Three', 'wrong']);
            const expected = {numOfQuestions: 4, correct: 3, accuracy: "75.00"};
            expect(check).to.deep.equal(expected);
        });
    });

    describe('ranking', function() {
        it('rank users by total number of questions took, number of correct answers or accuracy', function() {
            const userList = [{id: 'user1', stats: {accuracy : 39.09, correctNum : 43, questionTake : 110}},
                              {id: 'user2', stats: {accuracy : 41.18, correctNum : 7, questionTake : 17}},
                              {id: 'user3', stats: {accuracy : 33.33, correctNum : 6, questionTake : 18}}];
            const checkByAccuracy = hf.ranking('accuracy', userList);
            const expected = [{id: 'user2', stats: {accuracy : 41.18, correctNum : 7, questionTake : 17}},
                               {id: 'user1', stats: {accuracy : 39.09, correctNum : 43, questionTake : 110}},
                               {id: 'user3', stats: {accuracy : 33.33, correctNum : 6, questionTake : 18}}];
            expect(checkByAccuracy).to.deep.equal(expected);
        });
    });
});