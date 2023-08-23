import styles from "./login.module.css";
import "js-cookie";

export default function Login() {
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  function doLogin() {
    const csrftoken = getCookie("csrftoken");
    var headers = new Headers();
    headers.append("X-CSRFToken", csrftoken);
    fetch("/api/upload", {
      method: "POST",
      body: ,
      headers: headers,
      credentials: "include",
    });
  }

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
        <button className={styles.loginButton} onClick={doLogin}>
          Log Into QUOTE
        </button>
        <a href="https://hsquizbowl.org/forums/">No account? Register here</a>
      </div>
    </div>
  );
}
