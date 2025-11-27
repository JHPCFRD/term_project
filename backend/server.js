const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let recipes = [
  { id: 1, title: 'Pancakes', ingredients: 'Flour, Eggs, Milk', instructions: 'Mix and cook' },
  { id: 2, title: 'Omelette', ingredients: 'Eggs, Cheese, Ham', instructions: 'Beat eggs and cook' }
];

app.get('/', (req, res) => {
  res.json({ message: 'RecipeShare API is working!' });
});

app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.post('/recipes', (req, res) => {
  const newRecipe = { id: recipes.length + 1, ...req.body };
  recipes.push(newRecipe);
  res.json(newRecipe);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});