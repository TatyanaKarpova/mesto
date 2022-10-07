import Popup from '../components/Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._name = this._popupSelector.querySelector('.popup__image');
        this._link = this._popupSelector.querySelector('.popup__figcaption');
    }

    openPopup(cardName, cardLink) {
        this._link.src = cardLink;
        this._link.setAttribute('alt', cardName);
        this._name.textContent = cardName;

        super.openPopup();
    }
}