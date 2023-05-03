export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //получение дефолтных карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => res.json());
  }

  //получение данных профиля с сервера
  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => res.json());
  }

  //редактирование данных профиля на сервере
  patchProfileData({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => res.json());
  }

  //изменение аватара на сервере
  patchAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => res.json());
  }

  //дабавление новой карточки на сервер
  postNewCard({ place, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link: link,
      }),
    }).then((res) => res.json());
  }

  //установка лайка
  putLike(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => res.json());
  }

  //снятие лайка
  deleteLike(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => res.json());
  }

  //удаление карточки
  deleteCard(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => res.json());
  }
}
