export class FormValidator {
    constructor(validationConfig, formElement) {
        this.validationConfig = validationConfig;
        this.formElement = formElement;
    };

    showInputError = (inputElement, errorMessage) => {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this.validationConfig.inputErrorClass);
        errorElement.classList.add(this.validationConfig.errorClass);
        errorElement.textContent = errorMessage;
    };

    hideInputError = (inputElement) => {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this.validationConfig.inputErrorClass);
        errorElement.classList.remove(this.validationConfig.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(inputElement);
        }
    };

    hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
    };

    disableButton = (buttonElement) => {
        buttonElement.classList.add(this.validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    }
    
    activateButton = (buttonElement) => {
        buttonElement.classList.remove(this.validationConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    };

    toggleButtonState = (inputList, buttonElement) => {
        if (this.hasInvalidInput(inputList)) {
            this.disableButton(buttonElement);
        } else {
            this.activateButton(buttonElement);
        }
    };

    _setEventListeners = () => {
        const inputList = Array.from(this.formElement.querySelectorAll(this.validationConfig.inputSelector));
        const buttonElement = this.formElement.querySelector(this.validationConfig.submitButtonSelector);
        this.toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation = () => {
        const formList = Array.from(document.querySelectorAll(this.validationConfig.formSelector));
        formList.forEach(() => {
            this.formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners();
        });
    };

};