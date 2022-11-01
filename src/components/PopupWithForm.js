import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputList = this._formElement.querySelectorAll(".popup__item");
    this._popupSubmitButton = this._formElement.querySelector(".popup__button");
  }

  _getInputValues() {
    this._formInputValues = {};
    this._inputList.forEach((inputElement) => {
      this._formInputValues[inputElement.name] = inputElement.value;
    });
    return this._formInputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }

  setSubmitButtonText(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = "Сохранение...";
    } else {
      this._popupSubmitButton.textContent = "Сохранить";
    }
  }
}