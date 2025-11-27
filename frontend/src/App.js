import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', instructions: '' });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch('http://localhost:5000/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    })
    .then(response => response.json())
    .then(data => {
      setNewRecipe({ title: '', ingredients: '', instructions: '' });
      fetchRecipes();
    });
  };

  const handleChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>RecipeShare</h1>
        <nav style={{ marginTop: '20px' }}>
          <a className="App-link" href="/search">Search</a>
          <a className="App-link" href="/categories">Categories</a>
          <a className="App-link" href="/about">About</a>
          <a className="App-link" href="/login">Login</a>
        </nav>
        
        <div style={{ marginTop: '40px', border: '1px solid white', padding: '20px' }}>
          <h3>Add New Recipe</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="title" 
              placeholder="Recipe Title" 
              value={newRecipe.title} 
              onChange={handleChange}
              style={{ margin: '5px', padding: '5px' }}
              required
            /><br/>
            <input 
              type="text" 
              name="ingredients" 
              placeholder="Ingredients" 
              value={newRecipe.ingredients} 
              onChange={handleChange}
              style={{ margin: '5px', padding: '5px' }}
              required
            /><br/>
            <input 
              type="text" 
              name="instructions" 
              placeholder="Instructions" 
              value={newRecipe.instructions} 
              onChange={handleChange}
              style={{ margin: '5px', padding: '5px' }}
              required
            /><br/>
            <button type="submit" style={{ margin: '5px', padding: '5px' }}>
              Add Recipe
            </button>
          </form>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h2>Recipes</h2>
          {recipes.map(recipe => (
            <div key={recipe.id} style={{ border: '1px solid white', padding: '10px', margin: '10px' }}>
              <h3>{recipe.title}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;