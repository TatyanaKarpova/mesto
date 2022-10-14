export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'error_visible'
};

export const cardFormElement = document.querySelector('.popup__form_add_card');
export const profileEditFormElement = document.querySelector('.popup__form_edit_profile');
export const nameEditInputElement = document.querySelector('.popup__item_input_name');
export const occupationEditInputElement = document.querySelector('.popup__item_input_occupation');
export const profileEditOpenButton = document.querySelector('.profile__edit-button');
export const cardAddOpenFormButton = document.querySelector('.profile__add-button');
export const profileNameElement = document.querySelector('.profile__title');
export const profileOccupationElement = document.querySelector('.profile__subtitle');
export const cardListElement = document.querySelector('.elements__items');