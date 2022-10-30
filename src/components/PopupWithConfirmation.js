import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmitDeleteCard) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._handleFormSubmitDeleteCard = handleFormSubmitDeleteCard;
        this._buttonElement = this._popupElement.querySelector('.popup__button_confirm');
    }

    openPopup(cardElement) {
        super.openPopup();
        this._card = cardElement;
        this._buttonElement.focus();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmitDeleteCard(this._card);
        });
    }
}