export default class Card {
  constructor(cardElementInfo, templateSelector, handlePreviewCard) {
    this._name = cardElementInfo.name;
    this._link = cardElementInfo.link;
    this._templateSelector = templateSelector;
    this._handlePreviewCard = handlePreviewCard;
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

    this._cardImageElement = this._element.querySelector('.element__image');
    this._cardNameElement = this._element.querySelector('.element__text');
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardNameElement.textContent = this._name;
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    
    this._setEventListeners();

    return this._element;
  };

  _handleCardLike = (evt) => {
      evt.target.classList.toggle('element__like_active');
  };

  _handleCardDelete = () => {
    this._element.remove();
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleCardLike);
    this._deleteButton.addEventListener('click', this._handleCardDelete);
    this._cardImageElement.addEventListener('click', () => {
      this._handlePreviewCard(this._name, this._link);
    });
  }
};

