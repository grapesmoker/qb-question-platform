import styles from "./login.module.css";

export default function Login() {
  return (
    <div className={styles.loginSectionDiv}>
      <h2>Login</h2>
      <div className={styles.loginInputDiv}>
        <label for="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          name="login-email"
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
          required
          className={styles.loginInput}
        />
        <a href="https://hsquizbowl.org/forums/">Forgot password?</a>
      </div>
      <div className={styles.loginRegisterDiv}>
        <button className={styles.loginButton}>Log Into QUOTE</button>
        <a href="https://hsquizbowl.org/forums/">No account? Register here</a>
      </div>
    </div>
  );
}
