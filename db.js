const Database = require('better-sqlite3');
const db = new Database('notes.db');


db.prepare(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )
`).run();


const existing = db.prepare('SELECT COUNT(*) AS count FROM notes').get();
if (existing.count === 0) {
  const insert = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
  insert.run('Cím1', 'Ez az első jegyzet tartalma.');
  insert.run('Cím2', 'Szöveg22222222222222.');
  insert.run('Cím3', 'Üdvözlöm Tanár Úr!');
  insert.run('Cím4', 'Csíkos Marcell kockás ingben...');
}

module.exports = db;
