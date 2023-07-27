import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

interface Tokens {
  access_token: string;
  refresh_token: string;
}

interface AuthDto {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      const dto: AuthDto = { username, password };
      const response = await axios.post<Tokens>('http://localhost:3000/auth/local/signin', dto);
      const tokens = response.data;
      console.log('Access Token:', tokens.access_token);
      console.log('Refresh Token:', tokens.refresh_token);

      localStorage.setItem('username', username);

      router.push('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
