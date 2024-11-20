const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/database.db');

class QuizHandler {
    constructor(session, options) {
        this.session = session;
        this.stage = 1;
        this.course = [1];
        this.unit = [1];
        this.tasks = [1];
        this.problems = this.generateQuiz();
        this.step = {
            current: 0,
            total: 1
        }
        // loop through the options and assign them to the class
        for (let key in options) {
            this[key] = options[key];
        }
    }

    generateQuiz(amount) {
        // generate the quiz
        db.all("SELECT t.uid, t.name, t.desc, u.name, c.name FROM tasks t JOIN units u ON t.unit_id = u.uid JOIN courses c ON u.course_id = c.uid WHERE c.uid = ? ORDER BY u.sortOrder, t.sortOrder;", this.course, (err, rows) => {
            if (err) return console.error(err);
            let problems = [];
            // select "amount" of problems from the rows at random, or all of them if amount is not specified or greater than the number of rows
            for (let i = 0; i < amount || i < rows.length; i++) {
                let problem = rows[Math.floor(Math.random() * rows.length)];
                problems.push(problem);
            }
            return problems;
        });
    }

    nextProblem() {
        // get the next problem
    }
}

exports.QuizHandler = QuizHandler;