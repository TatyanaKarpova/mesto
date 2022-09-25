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
    this.cardImageElement.addEventListener('click', this._previewCardPhoto);

    return this._element;
  };

  _handleCardLike(evt) {
      const cardLikeTarget = evt.target;
      cardLikeTarget.classList.toggle('element__like_active');
  };

  _handleCardDelete(evt) {
    const cardDeleteTarget = evt.target;
    cardDeleteTarget.closest('.element').remove();
  };
// не работает функция
  _previewCardPhoto() {
    this.photoPopupCardElement = this._element.querySelector('.popup__image'); // тут ошибка
    photoPopupCardElement.src = this._link;
    photoPopupCardElement.setAttribute('alt', this._name);
    this._element.querySelector('.popup__figcaption').textContent = this._name;
    openPopup(previewCardPhotoPopup);
  }
};

