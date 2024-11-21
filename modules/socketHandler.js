const { TestHandler } = require('./testHandler');
const { spawn } = require('child_process');

const socketHandler = (socket) => {
    console.log('User connected:', socket.handshake.sessionID);

    (async () => {
        socket.testHandler = new TestHandler(socket.handshake.session, socket.handshake.session.testId);
        await socket.testHandler.generateTest();
        socket.emit('handlerReady', { message: 'Test Handler Ready' });
    })();

    socket.on('nextProblem', () => {
        let problem = socket.testHandler.nextProblem();
        problem = {
            precode : problem.precode,
            usercode : problem.usercode,
            postcode : problem.postcode
        }
        if (problem) {
            socket.emit('problem', { problem: problem });
        } else {
            socket.emit('testComplete', { message: 'Test Complete' });
        }
    });

    socket.on('run_code', (code) => {
        if (!code) {
            return socket.emit('output', { error: "No code provided." });
        }

        // Safe code to prevent malicious code execution
        let safeCode = "import builtins\ndel builtins.input\ndel builtins.open\ndel builtins.exec\ndel builtins.eval\ndel builtins.compile\ndel builtins.__import__\n"

        // Spawn a safe process
        const pythonProcess = spawn("python", ["-c", safeCode + code], { timeout: 5000 });

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
                socket.emit('output', { message: output.trim() });
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