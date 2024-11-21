const express = require('express');
const session = require('express-session');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const sharedSession = require('express-socket.io-session');
const { spawn } = require("child_process");
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
const { socketHandler } = require('./modules/socketHandler');
const SQLiteStore = require('connect-sqlite3')(session);

const AUTH_URL = process.env.AUTH_URL + "/oauth" || "http://localhost:420/oauth";
const THIS_URL = process.env.THIS_URL + "/login" || "http://localhost:3000/login";
const PORT = process.env.PORT || 3000;
const APIKEY = process.env.APIKEY;

const db = new sqlite3.Database('./data/database.db');

const app = express();
const server = app.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

const io = socketIo(server);

const sessionMiddleware = session({
    store: new SQLiteStore({ db: 'sessions.db', dir: './data' }),
    secret: process.env.SESSIONKEY || "putakeyhere",
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

function isAuthenticated(req, res, next) {
    if (req.session.token) next()
    else res.redirect('/login')
};

app.get('/', (req, res) => {
    res.render('index', { token: req.session.token });
});

app.get('/login', (req, res) => {
    if (req.query.token) {
        let tokenData = jwt.decode(req.query.token);
        req.session.token = tokenData;
        res.redirect('/');
    } else {
        res.redirect(`${AUTH_URL}?redirectURL=${THIS_URL}`);
    };
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/teacher', isAuthenticated, (req, res) => {
    const userClass = req.session.token.class;
    db.all("SELECT * FROM tests WHERE class = ?", [userClass], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.render('teacher', { token: req.session.token, tests: rows });
    });
});

app.get('/test/:testId', isAuthenticated, (req, res) => {
    req.session.testId = req.params.testId;
    res.render('test', { token: req.session.token });
});

app.get('/problem/:problemId', isAuthenticated, (req, res) => {
    const problemId = req.params.problemId;
    db.get("SELECT * FROM problems WHERE uid = ?", [problemId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Problem not found." });
        res.render('test', { problem: row });
    });
});

io.on('connection', socketHandler);