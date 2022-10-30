export default class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(response) {
        if (response.ok ) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    getUserProfileInfo() {
        this._userProfileInfo = fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(response => this._checkResponse(response));
        return this._userProfileInfo;
    }

    getInitialCards() {
        this._initialCards = fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(response => this._checkResponse(response));
        return this._initialCards;
    }

    editProfileInfo(profileInfo) {
        this._editedProfileInfo = fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: profileInfo.name,
                about: profileInfo.about
              })
        })
        .then(response => this._checkResponse(response));
        return this._editedProfileInfo;
    }

    addNewCards(name, link) {
        this._newCards = fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
              })
        })
        .then(response => this._checkResponse(response));
        return this._newCards;
    }

    likeCard(like) {
        this._addedLike = fetch(`${this._url}/cards/${like._id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(response => this._checkResponse(response));
        return this._addedLike;
    }

    removeLikeCard(like) {
        this._removedLike = fetch(`${this._url}/cards/${like._id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(response => this._checkResponse(response));
        return this._removedLike;
    }

    deleteCard(id) {
        this._deletedCard = fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(response => this._checkResponse(response));
        return this._deletedCard;
    }

    updateAvatar(imageLink) {
        this._updatedAvatar = fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: imageLink.avatar
              })
        })
        .then(response => this._checkResponse(response));
        return this._updatedAvatar;
    }

}