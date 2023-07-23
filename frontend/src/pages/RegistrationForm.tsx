import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRegister = () => {
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Please provide a username and password.');
      return;
    }

    axios
      .post('http://localhost:3000/auth/local/signup', { username, password })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400 && error.response.data.message.includes('Credentials incorrect')) {
            setErrorMessage('User with this username already exists.');
          } else {
            console.error(error.response.data.message);
            setErrorMessage(error.response.data.message);
          }
        } else {
          console.error('An error occurred:', error.message);
          setErrorMessage('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <div>
      <h2>Registration Form</h2>
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
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
