const { TestHandler } = require('./testHandler');
const { spawn } = require('child_process');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/database.db');

const socketHandler = (socket) => {
    console.log('User connected:', socket.handshake.sessionID);

    (async () => {
        socket.testHandler = new TestHandler(socket.handshake.session, socket.handshake.session.testId);
        await socket.testHandler.generateTest();
        socket.emit('handlerReady', { message: 'Test Handler Ready' });
    })();

    socket.on('nextProblem', () => {
        let problem = socket.testHandler.nextProblem();
        if (problem) {
            problem = {
                prompt: problem.prompt,
                precode: problem.precode,
                usercode: problem.usercode,
                postcode: problem.postcode,
                solution: problem.solution
            }
            socket.emit('problem', { problem: problem });
        } else {
            socket.emit('testComplete', { message: 'Test Complete' });
        }
    });

    socket.on('run_code', (data) => {
        if (!data.usercode) {
            return socket.emit('output', { error: "No code provided." });
        }

        const precode = socket.testHandler.problems[socket.testHandler.problemIndex].precode + `\n`;
        const postcode = socket.testHandler.problems[socket.testHandler.problemIndex].postcode + `\n`;
        const usercode = data.usercode + `\n`;

        // Safe code to prevent malicious code execution
        let safeCode = "import builtins\ndel builtins.input\ndel builtins.open\ndel builtins.exec\ndel builtins.eval\ndel builtins.compile\ndel builtins.__import__\n"

        // Spawn a safe process
        const pythonProcess = spawn("python", ["-c", safeCode + precode + usercode + postcode], { timeout: 5000 });

        let output = "";
        let error = "";

        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            error += data.toString();
        });

        pythonProcess.on("close", (exitCode) => {
            if (exitCode === 0) {
                let correct = socket.testHandler.checkAnswer(output);
                db.run(
                    `INSERT OR REPLACE INTO results (user_id, test_id, problem_id, confidence, result) VALUES (?, ?, ?, ?, ?);`,
                    [socket.handshake.session.token.id, socket.testHandler.test, socket.testHandler.get_problem_id(), data.confidence, correct ? 1 : 0]
                );
                socket.emit('output', { output: output.trim(), correct: correct });
            } else {
                socket.emit('output', { error: error.trim() });
            }
        });

        pythonProcess.on("error", (err) => {
            socket.emit('output', { error: `Execution error: ${err.message}` });
        });
    });
}

exports.socketHandler = socketHandler;