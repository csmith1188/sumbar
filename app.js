const express = require('express');
const http = require('http');
const session = require('express-session');
const socketIo = require('socket.io');
const sharedSession = require('express-socket.io-session');
const { spawn } = require("child_process");
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/database.db');

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

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/problem/1');
});

app.get('/problem/:problemId', (req, res) => {
    const problemId = req.params.problemId;
    db.get("SELECT * FROM problems WHERE uid = ?", [problemId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Problem not found." });
        res.render('problem', { problem: row });
        // res.json(row);
    });
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.handshake.sessionID);

    socket.on('run_code', (code) => {
        if (!code) {
            return socket.emit('output', { error: "No code provided." });
        }

        // Basic validation
        if (code.includes("import os") || code.includes("subprocess")) {
            return socket.emit('output', { error: "Unauthorized code detected." });
        }

        // Spawn a safe process
        const pythonProcess = spawn("python", ["-c", code], { timeout: 5000 });

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
});


