import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmitDeleteCard) {
        super(popupSelector);
        this._buttonElement = this._popupElement.querySelector('.popup__button_confirm');
        this._handleFormSubmitDeleteCard = handleFormSubmitDeleteCard;
    }

    openPopup(cardElement) {
        super.openPopup();
        this._card = cardElement;
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmitDeleteCard(this._card);
        });
    }

}