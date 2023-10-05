import React from 'react';
import { useUser } from '../UserContext/UserContext';
import './Login.css'

function LoginForm() {
  const { user, login, logout } = useUser();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // Simulate a login process (e.g., check credentials)
    // In a real application, you would perform authentication here
    const userData = {
      id: 'user123',
      email: email,
      // Add other user-related properties as needed
    };
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="login-container"> {/* Apply the container class */}
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout} className="logout-button">Log Out</button> {/* Apply the button class */}
        </div>
      ) : (
        <div>
          <div className="input-group"> {/* Apply the input group class */}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group"> {/* Apply the input group class */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin} className="login-button">Log In</button> {/* Apply the button class */}
        </div>
      )}
    </div>
  );
}

export default LoginForm;
