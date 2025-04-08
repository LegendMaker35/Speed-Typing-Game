const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 8000;
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/scores', require('./routes/scores'));

// Connect or create SQLite DB
const db = new sqlite3.Database('./scores.db');

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    score INTEGER
)`);

// Save a score
app.post('/savescore', (req, res) => {
    console.log('Incoming score submission:', req.body);
    const { name, score } = req.body;
    db.run(`INSERT INTO scores (name, score) VALUES (?, ?)`, [name, score], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to save score' });
        res.json({ message: 'Score saved!' });
    });
});

// Get top scores
app.get('/api/highscores', (req, res) => {
    db.all(`SELECT name, score FROM scores ORDER BY score DESC LIMIT 10`, [], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Failed to fetch scores' });
        res.json(rows);
    });
});


//starts the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

