export default class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(response) {
        return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
    }

    getUserProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(response => this._checkResponse(response));
    }

    editProfileInfo(obj) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: obj.name,
                about: obj.occupation
              })
        })
        .then(response => this._checkResponse(response));
    }

    addNewCards(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
              })
        })
        .then(response => this._checkResponse(response));
    }

    likeCard(obj) {
        return fetch(`${this._url}/cards/${obj._id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(response => this._checkResponse(response));
    }

    removeLikeCard(obj) {
        return fetch(`${this._url}/cards/${obj._id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(response => this._checkResponse(response));
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(response => this._checkResponse(response));
    }

    updateAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url
              })
        })
        .then(response => this._checkResponse(response));
    }
}