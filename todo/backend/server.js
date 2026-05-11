import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize database
const db = new sqlite3.Database('./todos.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

app.get('/', (req, res) => {
  res.json({ message: 'Todo API Server running' });
});

// Get all todos
app.get('/api/todos', (req, res) => {
  db.all('SELECT * FROM todos ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows.map(row => ({
        ...row,
        completed: Boolean(row.completed)
      })));
    }
  });
});

// Get single todo
app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.json({
        ...row,
        completed: Boolean(row.completed)
      });
    }
  });
});

// Create todo
app.post('/api/todos', (req, res) => {
  const { title, description = '' } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const id = uuidv4();
  db.run(
    'INSERT INTO todos (id, title, description) VALUES (?, ?, ?)',
    [id, title, description],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          id,
          title,
          description,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    }
  );
});

// Update todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  db.run(
    'UPDATE todos SET title = ?, description = ?, completed = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [title, description, completed ? 1 : 0, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.json({
          id,
          title,
          description,
          completed: Boolean(completed),
          updatedAt: new Date().toISOString()
        });
      }
    }
  );
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM todos WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.json({ message: 'Todo deleted successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/todos`);
});
