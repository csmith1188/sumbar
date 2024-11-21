const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/database.db');

class TestHandler {
    constructor(session, test, options) {
        this.session = session;
        this.test = test;
        this.stage = 1;
        this.course = [1];
        this.unit = [1];
        this.tasks = [1];
        this.problems = [];
        this.problemIndex = -1;
        // loop through the options and assign them to the class
        for (let key in options) {
            this[key] = options[key];
        }
    }

    async generateTest() {
        // generate the test
        db.all("SELECT * FROM testSelections JOIN problems ON testSelections.problem_id = problems.uid WHERE test_id = ?;", [this.test], (err, rows) => {
            if (err) return
            if (!rows) return
            this.problems = rows;
        });
    }

    checkAnswer(answer) {
        // check the answer
        if (this.problems[this.problemIndex].solution === answer) {
            return true;
        } else {
            return false;
        }
    }

    nextProblem() {
        this.problemIndex++;
        // get the next problem
        if (this.problemIndex > this.problems.length) {
            return null;
        } else {
            return this.problems[this.problemIndex];
        }
    }
}

exports.TestHandler = TestHandler;