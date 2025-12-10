function Login({ onLogin, onLogout, isLoggedIn }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <p>Welcome!</p>
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
          placeholder="Username"
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
        />
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;