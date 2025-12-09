/**
 * Login.js
 * Name: Jay Park
 * Date: 12/08/2025
 * CSC 372-01
 * 
 * Login component
 */

function Login({ onLogin, onLogout, isLoggedIn }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - always succeeds
    onLogin();
  };

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <p>Welcome, Chef! 🍳</p>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h3>Login to RecipeShare</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username (any)"
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password (any)"
          className="form-input"
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <p className="login-note">Mock login: any credentials work</p>
    </div>
  );
}

export default Login;