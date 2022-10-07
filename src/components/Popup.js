export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    openPopup() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupKeydownEscHandler());
    }

    closePopup() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupKeydownEscHandler());
    }

    _closePopupKeydownEscHandler(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
          }
    }

    setEventListeners(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.closePopup();
          }
    }
}