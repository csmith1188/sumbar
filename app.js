const express = require('express');
const http = require('http');
const session = require('express-session');
const socketIo = require('socket.io');
const sharedSession = require('express-socket.io-session');
const { spawn } = require("child_process");

const app = express();

const server = app.listen(3000, () => {
    console.log('listening on *:3000');
});

const io = socketIo(server);

const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
});

app.use(sessionMiddleware);

// Share session with io sockets
io.use(sharedSession(sessionMiddleware, {
    autoSave: true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected with session ID:', socket.handshake.sessionID);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('run_code', (code) => {
        if (!code) {
            return res.status(400).json({ error: "No code provided." });
        }

        // Spawn a Python process to execute the code
        const pythonProcess = spawn("python", ["-c", code]);

        let output = "";
        let error = "";

        // Capture stdout
        pythonProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        // Capture stderr
        pythonProcess.stderr.on("data", (data) => {
            error += data.toString();
        });

        // Handle process exit
        pythonProcess.on("close", (code) => {
            if (code === 0) {
                socket.emit('output', { output });
            } else {
                socket.emit('output', { error });
            }
        });

        // Error handling for process spawn
        pythonProcess.on("error", (err) => {
            socket.emit('output', { error: `Execution error: ${err.message}` });
        });
    });
});

