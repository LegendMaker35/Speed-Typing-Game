const express = require('express');
const router = express.Router();
const db = require('../db/db');

// POST: Submit a score
router.post('/', (req, res) => {
  const { username, score } = req.body;
  if (!username || !score) return res.status(400).json({ error: 'Missing fields' });

  db.run(`INSERT INTO scores (username, score) VALUES (?, ?)`, [username, score], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Score saved!', id: this.lastID });
  });
});

// GET: High scores
router.get('/', (req, res) => {
  db.all(`SELECT username, score, timestamp FROM scores ORDER BY score DESC LIMIT 10`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
