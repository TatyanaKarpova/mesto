export class Card {
  constructor(name, link, templateSelector, handlePreviewCard) {
    this._name = name;
    this._link = link;
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

    this.cardImageElement = this._element.querySelector('.element__image');
    this.cardImageElement.src = this._link;
    this.cardImageElement.alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;

    this._element.querySelector('.element__like').addEventListener('click', this._handleCardLike);
    this._element.querySelector('.element__delete-button').addEventListener('click', this._handleCardDelete);
    this.cardImageElement.addEventListener('click', () => this._handlePreviewCard(this._name, this._link));

    return this._element;
  };

  _handleCardLike = (evt) => {
      evt.target.classList.toggle('element__like_active');
  };

  _handleCardDelete = (evt) => {
    evt.target.closest('.element').remove();
  };
};

