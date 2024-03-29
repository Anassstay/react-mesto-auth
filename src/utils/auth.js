class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // проверить, есть ли ошибка
  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ошибки: ${res.status}`);
  }

  // регистрация
  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => this._checkError(res));
  }

  // вход
  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => this._checkError(res));
  }

  // проверяем токен
  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => this._checkError(res));
  }
}

const auth = new Auth("https://auth.nomoreparties.co");
export default auth;