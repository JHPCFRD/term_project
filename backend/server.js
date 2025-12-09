const express = require('express');
const cors = require('cors');
const pool = require('./database.js');
const fetch = require('node-fetch');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/recipes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/recipes', async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO recipes (title, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *',
      [title, ingredients, instructions]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/recipes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    const result = await pool.query('DELETE FROM recipes WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    res.json({ message: 'Recipe deleted successfully', deleted: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/recipes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, ingredients, instructions } = req.body;
  
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'UPDATE recipes SET title = $1, ingredients = $2, instructions = $3 WHERE id = $4 RETURNING *',
      [title, ingredients, instructions, id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/quote', async (req, res) => {
  try {
    const response = await fetch('https://api.quotable.io/random');
    
    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Quotable API failed, sending fallback:', err);
    res.json({
      content: "Anyone can cook.",
      author: "Auguste Gusteau"
    });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'RecipeShare API is working!', database: 'PostgreSQL' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});