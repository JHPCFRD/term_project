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

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/recipes/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        fetchRecipes();
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>RecipeShare</h1>
        {/*
        <nav className="main-nav">
          <a className="App-link" href="/search">Search</a>
          <a className="App-link" href="/categories">Categories</a>
          <a className="App-link" href="/about">About</a>
          <a className="App-link" href="/login">Login</a>
        </nav>
  */}   {/*Commented for now, will implement later*/}
  
        <div className="recipe-form-container">
          <h3>Add New Recipe</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Recipe Title"
              value={newRecipe.title}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="ingredients"
              placeholder="Ingredients"
              value={newRecipe.ingredients}
              onChange={handleChange}
              className="form-input"
              required
            />
            <input
              type="text"
              name="instructions"
              placeholder="Instructions"
              value={newRecipe.instructions}
              onChange={handleChange}
              className="form-input"
              required
            />
            <button type="submit" className="submit-button">
              Add Recipe
            </button>
          </form>
        </div>

        <div className="recipes-container">
          <h2>Recipes</h2>
          {recipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <button
                onClick={() => handleDelete(recipe.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;