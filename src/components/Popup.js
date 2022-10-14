export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closePopupKeydownEscHandler = this._closePopupKeydownEscHandler.bind(this);
    }

    openPopup() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupKeydownEscHandler);
    }

    closePopup() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupKeydownEscHandler);
    }

    _closePopupKeydownEscHandler(evt) {
        if (evt.key === 'Escape') {
            this.closePopup();
          }
    }

    _closePopupClickOverlayHandler(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.closePopup();
          }
    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__close-icon').addEventListener('click', () => {
            this.closePopup();
        });
        this._popupElement.addEventListener('click', this._closePopupClickOverlayHandler.bind(this));        
    }
}