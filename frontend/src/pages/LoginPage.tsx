import React, { useState } from 'react';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    axios
      .post('http://localhost:3000/auth/local/signin', { username, password })
      .then((response) => {
        console.log(response.data.message);
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          setErrorMessage(error.response.data.message);
        } else {
          console.error('An error occurred:', error.message);
          setErrorMessage('An error occurred. Please try again later.');
        }
      });
  };


  return (
    <div>
      <h2>Login Page</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
