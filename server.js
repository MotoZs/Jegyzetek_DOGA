const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());
app.use(express.static('public'));


app.get('/notes', (req, res) => {
  const notes = db.prepare('SELECT * FROM notes').all();
  res.json(notes);
});


app.get('/notes/:id', (req, res) => {
  const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(req.params.id);
  if (note) res.json(note);
  else res.status(404).json({ error: 'Jegyzet nem található' });
});


app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Hiányzó mezők' });

  const result = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)').run(title, content);
  res.status(201).json({ id: result.lastInsertRowid });
});


app.delete('/notes/:id', (req, res) => {
  const result = db.prepare('DELETE FROM notes WHERE id = ?').run(req.params.id);
  if (result.changes > 0) res.status(204).send();
  else res.status(404).json({ error: 'Jegyzet nem található' });
});

app.listen(8080, () => {
  console.log('Szerver fut: http://localhost:8080');
});
