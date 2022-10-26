export default class Card {
  constructor(cardElementInfo, templateSelector, handlePreviewCard, handleDeleteCard, handleAddLike, handleRemoveLike) {
    this._name = cardElementInfo.name;
    this._link = cardElementInfo.link;
    this._templateSelector = templateSelector;
    this._handlePreviewCard = handlePreviewCard;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._likes = cardElementInfo.likes;
    this._userId = cardElementInfo.userId;
    this._cardId = cardElementInfo.cardId;
    this._ownerId = cardElementInfo.ownerId;
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

    this._cardImageElement = this._element.querySelector('.element__image'); //
    this._cardNameElement = this._element.querySelector('.element__text');
    this._likesCounter = this._element.querySelector('.element__like-number');
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete-button');


    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardNameElement.textContent = this._name;
    this._likesCounter.textContent = `${this._likes.length}`;
    
    this._setEventListeners(); 
    this._handleCardLikeState();

    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }

    return this._element;
  };

  _handleCardLikeState() {
      this._likes.forEach((user) => {
        if (user._id === this._userId) {
          this.addLike();
        } else {
          this.removeLike();
        }
      });
  };

  addLike() {
    this._likeButton.classList.add('element__like_active');
 ; }

  removeLike() {
    this._likeButton.classList.remove('element__like_active');
  };

  setLikesCount(res) {
    this._likesCounter.textContent = `${res.likes.length}`;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.contains('element__like_active')
        ? this._handleRemoveLike()
        : this._handleAddLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._cardImageElement.addEventListener('click', () => {
      this._handlePreviewCard(this._name, this._link);
    });
  }
};

