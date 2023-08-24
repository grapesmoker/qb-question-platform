const API_HOST = "http://localhost:8000";

let _csrfToken = null;

async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${API_HOST}/csrf/`, {
      credentials: "include"
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  console.log('csrf token gotten');
  return _csrfToken;
}

export async function submitLogin(username, password) {
  const response = await fetch(`${API_HOST}/accounts/login/`, {
    method: "POST",
    headers: { "X-CSRFToken": await getCsrfToken() },
    body: {'username': username, 'password': password},
    credentials: "include",
  });
  const result = response.status === 200 ? "Success" : "Failure";
  console.log(response);
  console.log(result);
}