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
                db.run("INSERT INTO problems (solution, task_id) VALUES (?, 1)", [output], function (err) {
                    if (err) {
                        socket.emit('output', { error: `Database error: ${err.message}` });
                    } else {
                        socket.emit('output', { message: "Solution saved to database." });
                    }
                });
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

