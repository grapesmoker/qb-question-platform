import styles from "./login.module.css";
import CSRFToken from "../../lib/csrftoken";
import { submitLogin } from "../../lib/login";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.loginSectionDiv}>
      <h2>Login</h2>
      <div className={styles.loginInputDiv}>
        <label for="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          name="login-email"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className={styles.loginInput}
        />
      </div>
      <div className={styles.loginInputDiv}>
        <label for="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          name="login-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.loginInput}
        />
        <a href="https://hsquizbowl.org/forums/">Forgot password?</a>
      </div>
      <div className={styles.loginRegisterDiv}>
        <CSRFToken />
        <button className={styles.loginButton} onClick={(e) => submitLogin(username, password)}>
          Log Into QUOTE
        </button>
        <a href="https://hsquizbowl.org/forums/">No account? Register here</a>
      </div>
    </div>
  );
}
