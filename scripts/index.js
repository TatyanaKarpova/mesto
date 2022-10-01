import { Card } from './Card.js';
import { popupAddCard, openPopup, closePopup, photoPopupCardElement, namePopupCardElement, cardPreviewPhotoPopup } from './utils.js';
import { FormValidator } from './FormValidator.js';
import { cardInitialElements } from './cards.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'error_visible'
};

const cardFormElement = document.querySelector('.popup__form_add_card');
const profileEditFormElement = document.querySelector('.popup__form_edit_profile');

const profileEditFormValidator = new FormValidator(validationConfig, profileEditFormElement);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(validationConfig, cardFormElement);
cardAddFormValidator.enableValidation();

const cardAddButton = document.querySelector('.popup__button_add_card');
const profileEditButton = document.querySelector('.popup__button_edit');
const popupEditProfile = document.querySelector('#popup-edit-profile');
const buttonsClose = document.querySelectorAll('.popup__close-icon');
const nameEditInputElement = document.querySelector('.popup__item_input_name');
const occupationEditInputElement = document.querySelector('.popup__item_input_occupation');
const cardInputHeadingElement = cardFormElement.querySelector('.popup__item_input_card-name');
const cardInputPhotoElement = cardFormElement.querySelector('.popup__item_input_card-photo-url');
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const cardAddOpenFormButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__title');
const profileOccupationElement = document.querySelector('.profile__subtitle');
const cardListElement = document.querySelector('.elements__items');

buttonsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const setEditProfileMode = () => {
  nameEditInputElement.value = profileNameElement.textContent;
  occupationEditInputElement.value = profileOccupationElement.textContent;
};

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  const nameEditInput = nameEditInputElement.value;
  const occupationEditInput = occupationEditInputElement.value;
  profileNameElement.textContent = nameEditInput;
  profileOccupationElement.textContent = occupationEditInput;
  closePopup(popupEditProfile);
};

const handlePreviewCard = (cardName, cardLink) => {
  photoPopupCardElement.src = cardLink;
  photoPopupCardElement.setAttribute('alt', cardName);
  namePopupCardElement.textContent = cardName;
  openPopup(cardPreviewPhotoPopup);
};

const createCard = (element) => {
  const card = new Card (element.name, element.link, '.element__template');
  const cardElement = card.createCardElement();
  cardListElement.prepend(cardElement);
};

const renderInitialElements = () => {
  cardInitialElements.forEach((element) => {
    /*const card = new Card (element.name, element.link, '.element__template', handlePreviewCard(element.name, element.link));
    const cardElement = card.createCardElement();
    cardListElement.prepend(cardElement);*/
    createCard(element)
  })
};

const addNewCard = (element) => {
  /*const newCard = new Card (cardInputHeadingElement.value, cardInputPhotoElement.value, '.element__template', handlePreviewCard(cardInputHeadingElement.value, cardInputPhotoElement.value));
  cardListElement.prepend(newCard.createCardElement());*/
  createCard(element);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  addNewCard(element);
  evt.target.reset();
  closePopup(popupAddCard);
};

profileEditOpenButton.addEventListener('click', () => {
  setEditProfileMode();
  openPopup(popupEditProfile);
  const inputEditList = Array.from(profileEditFormElement.querySelectorAll('.popup__item'));
  inputEditList.forEach((editProfileInputElement) => {
    profileEditFormValidator.hideInputError(editProfileInputElement);
  });
  profileEditFormValidator.activateButton(profileEditButton);
});

cardAddOpenFormButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  const cardAddInputList = Array.from(cardFormElement.querySelectorAll('.popup__item'));
  cardAddInputList.forEach((cardAddInputElement) => {
    cardAddFormValidator.hideInputError(cardAddInputElement);
  });
  cardAddFormValidator.disableButton(cardAddButton);
  cardFormElement.reset();
});

profileEditFormElement.addEventListener('submit', handleEditFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);


renderInitialElements();