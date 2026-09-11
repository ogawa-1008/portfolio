const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('kakeibo.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item TEXT,
    amount INTEGER,
    type TEXT,
    category TEXT,
    date TEXT
  )`);
});

module.exports = db;