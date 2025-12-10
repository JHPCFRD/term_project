import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ 
    title: '', 
    ingredients: '', 
    instructions: '' 
  });
  const [quote, setQuote] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ 
    title: '', 
    ingredients: '', 
    instructions: '' 
  });

  useEffect(() => {
    fetchRecipes();
    fetchQuote();
    const savedLogin = localStorage.getItem('recipeLoggedIn');
    if (savedLogin === 'true') {
      setLoggedIn(true);
    }
  }, []);

  const fetchRecipes = () => {
    fetch('http://localhost:5000/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data));
  };

  const fetchQuote = () => {
    fetch('http://localhost:5000/api/quote')
      .then(response => response.json())
      .then(data => {
        setQuote(`${data.content} — ${data.author}`);
      });
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

  const handleEdit = (recipe) => {
    setEditingId(recipe.id);
    setEditForm({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/recipes/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    })
      .then(response => response.json())
      .then(data => {
        setEditingId(null);
        setEditForm({ title: '', ingredients: '', instructions: '' });
        fetchRecipes();
      });
  };

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('recipeLoggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('recipeLoggedIn');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-top">
          <div className="header-content">
            <h1>RecipeShare</h1>
            {loggedIn && (
              <button onClick={handleLogout} className="logout-button-top">
                Logout
              </button>
            )}
          </div>
        </div>

        {!loggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
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

            <div className="quote-box">
              "{quote}"
            </div>

            <div className="recipes-container">
              <h2>Recipes</h2>
              {recipes.length === 0 ? (
                <p className="no-recipes">No recipes yet. Add one above!</p>
              ) : (
                recipes.map(recipe => (
                  <div key={recipe.id} className="recipe-card">
                    {editingId === recipe.id ? (
                      <div className="edit-form">
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                          className="form-input"
                          placeholder="Title"
                        />
                        <input
                          type="text"
                          value={editForm.ingredients}
                          onChange={(e) => setEditForm({...editForm, ingredients: e.target.value})}
                          className="form-input"
                          placeholder="Ingredients"
                        />
                        <input
                          type="text"
                          value={editForm.instructions}
                          onChange={(e) => setEditForm({...editForm, instructions: e.target.value})}
                          className="form-input"
                          placeholder="Instructions"
                        />
                        <div className="edit-buttons">
                          <button onClick={handleUpdate} className="save-button">
                            Save
                          </button>
                          <button onClick={() => setEditingId(null)} className="cancel-button">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="recipe-header">
                          <h3>{recipe.title}</h3>
                          <div className="recipe-actions">
                            <button onClick={() => handleEdit(recipe)} className="edit-button">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(recipe.id)} className="delete-button">
                              Delete
                            </button>
                          </div>
                        </div>
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;