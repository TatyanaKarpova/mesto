export default class FormValidator {
    constructor(validationConfig, formElement) {
      this._validationConfig = validationConfig;
      this._formElement = formElement;
      this._buttonElement = this._formElement.querySelector(
        validationConfig.submitButtonSelector
      );
      this._inputList = Array.from(
        this._formElement.querySelectorAll(this._validationConfig.inputSelector)
      );
    }
  
    _showInputError = (inputElement, errorMessage) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.add(this._validationConfig.inputErrorClass);
      errorElement.classList.add(this._validationConfig.errorClass);
      errorElement.textContent = errorMessage;
    };
  
    _hideInputError = (inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.remove(this._validationConfig.inputErrorClass);
      errorElement.classList.remove(this._validationConfig.errorClass);
      errorElement.textContent = "";
    };
  
    _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };
  
    _hasInvalidInput = () => {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };
  
    disableButton = () => {
      this._buttonElement.classList.add(
        this._validationConfig.inactiveButtonClass
      );
      this._buttonElement.disabled = true;
    };
  
    activateButton = () => {
      this._buttonElement.classList.remove(
        this._validationConfig.inactiveButtonClass
      );
      this._buttonElement.disabled = false;
    };
  
    _toggleButtonState = () => {
      if (this._hasInvalidInput()) {
        this.disableButton();
      } else {
        this.activateButton();
      }
    };
  
    _setEventListeners = () => {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    };
  
    enableValidation = () => {
      this._setEventListeners();
    };
  
    resetValidationErrors = () => {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    };
  }