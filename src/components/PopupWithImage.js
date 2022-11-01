import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._name = this._popupElement.querySelector(".popup__figcaption");
    this._link = this._popupElement.querySelector(".popup__image");
  }

  openPopup(cardName, cardLink) {
    super.openPopup();
    this._name.textContent = cardName;
    this._link.src = cardLink;
    this._link.alt = cardName;
  }
}