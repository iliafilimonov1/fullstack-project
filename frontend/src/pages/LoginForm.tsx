import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

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

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const dto: AuthDto = { username, password };
      const response = await axios.post<Tokens>('http://localhost:3000/auth/local/signin', dto);
      const tokens = response.data;

      console.log('accessToken:', tokens.access_token);
      console.log('refreshToken:', tokens.refresh_token);

      Cookies.set('accessToken', tokens.access_token);
      Cookies.set('refreshToken', tokens.refresh_token);

      router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login form</h2>
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
