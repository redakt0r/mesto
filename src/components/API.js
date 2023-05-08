export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //проверка ответа.
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибочка: ${res.status}`);
    }
    return res.json();
  }

  //получение дефолтных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  //получение данных профиля
  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  //редактирование данных профиля
  patchProfileData({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //изменение аватара
  patchAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //дабавление новой карточки
  postNewCard({ place, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link: link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  //установка лайка
  putLike(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  //снятие лайка
  deleteLike(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  //удаление карточки
  deleteCard(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}
