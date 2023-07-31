import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import authStore from "@/store/AuthStore/AuthStore";


const LoginForm: React.FC = observer(() => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await authStore.login(username, password);
  };

  return (
    <div>
      <h2>Login form</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
});

export default LoginForm;
