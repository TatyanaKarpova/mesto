import { photoPopupCardElement, namePopupCardElement, openPopup, previewCardPhotoPopup } from './utils.js';

export const cardInitialElements = [
  {
    name: 'Луксор',
    link: 'https://images.unsplash.com/photo-1657218842456-35280cac5d47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg'
  },
  {
    name: 'Агуас-Кальентес',
    link: 'https://images.unsplash.com/photo-1415804941191-bc0c3bbac10d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80.jpg'
  },
  {
    name: 'Париж',
    link: 'https://images.unsplash.com/photo-1659891670855-a49219141f34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80.jpg'
  },
  {
    name: 'Венеция',
    link: 'https://images.unsplash.com/photo-1656365084095-99110bc92e81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80.jpg'
  },
  {
    name: 'Невада',
    link: 'https://images.unsplash.com/photo-1624822764351-77c42080f626?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80.jpg'
  },
  {
    name: 'Скалы Севен Систерс',
    link: 'https://images.unsplash.com/photo-1512778595306-cd1a150f561c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80.jpg'
  }
];

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

      return cardElement;
  };

  createCardElement() {
    this._element = this._getCardTemplate();

    this.cardImageElement = this._element.querySelector('.element__image');
    this.cardImageElement.src = this._link;
    this.cardImageElement.alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;

    this._element.querySelector('.element__like').addEventListener('click', this._handleCardLike);
    this._element.querySelector('.element__delete-button').addEventListener('click', this._handleCardDelete);
    this.cardImageElement.addEventListener('click', () => this._handlePreviewCard());

    return this._element;
  };

  _handleCardLike = (evt) => {
      evt.target.classList.toggle('element__like_active');
  };

  _handleCardDelete = (evt) => {
    evt.target.closest('.element').remove();
  };

  _handlePreviewCard() {
    photoPopupCardElement.src = this._link;
    photoPopupCardElement.setAttribute('alt', this._name);
    namePopupCardElement.textContent = this._name;
    openPopup(previewCardPhotoPopup);
  };
};

