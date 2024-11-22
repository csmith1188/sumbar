const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/database.db');

class TestHandler {
    constructor(session, test, options) {
        this.session = session;
        this.test = test;
        this.stage = 1;
        this.courses = [1];
        this.units = [1];
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
        db.all("SELECT testSelections.*, problems.*, results.result, results.confidence FROM testSelections JOIN problems ON testSelections.problem_id = problems.uid LEFT JOIN results ON testSelections.problem_id = results.problem_id WHERE testSelections.test_id = ?;", [this.test], (err, rows) => {
            if (err) { console.error(err); return; }
            if (!rows) { console.error("No rows returned from database."); return; }
            this.problems = rows;
        });
    }

    get_problem_id() {
        // get the current problem
        return this.problems[this.problemIndex].problem_id;
    }

    checkAnswer(answer) {
        // check the answer
        if (this.problems[this.problemIndex].match === answer) {
            return true;
        } else {
            return false;
        }
    }

    analyzeResults() {
        // analyze the results
        let correct = 0;
        let confidence = 0;
        let confRatio = 0;
        let total = this.problems.length;
        for (let i = 0; i < this.problems.length; i++) {
            if (this.problems[i].result === 1) {
                correct++;
                switch (this.problems[i].confidence) {
                    case "up":
                        confidence += 2
                        confRatio += 4;
                        break;
                    case "wiggle":
                        confidence += 1
                        confRatio += 3;
                        break;
                    case "down":
                        confRatio += 2;
                        break;
                }
            } else if (this.problems[i].result === 0) {
                switch (this.problems[i].confidence) {
                    case "up":
                        confRatio += 0;
                        break;
                    case "wiggle":
                        confRatio += 1;
                        break;
                    case "down":
                        confRatio += 2;
                        break;
                }
            }
        }
        return { correct: correct, confidence: confidence, confRatio: confRatio, total: total };
    }

    nextProblem() {
        this.problemIndex++;
        // get the next problem
        if (this.problemIndex >= this.problems.length) {
            return null;
        } else {
            return this.problems[this.problemIndex];
        }
    }
}

exports.TestHandler = TestHandler;