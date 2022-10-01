import { Card } from './Card.js';
import { popupAddCard, openPopup, closePopup, photoPopupCardElement, namePopupCardElement, cardPreviewPhotoPopup } from './utils.js';
import { FormValidator } from './FormValidator.js';
import { cardInitialElements } from './initial-cards.js';

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
  const card = new Card (element.name, element.link, '.element__template', handlePreviewCard);
  const cardElement = card.createCardElement();
  cardListElement.prepend(cardElement);
  return cardElement;
};

const renderInitialElements = () => {
  cardInitialElements.forEach((element) => {
    createCard(element);
  })
};

const addNewCard = () => {
  const cardInfo = {
    name: cardInputHeadingElement.value,
    link: cardInputPhotoElement.value
  };
  cardListElement.prepend(createCard(cardInfo));
};


const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  addNewCard();
  evt.target.reset();
  closePopup(popupAddCard);
};

profileEditOpenButton.addEventListener('click', () => {
  setEditProfileMode();
  openPopup(popupEditProfile);
  profileEditFormValidator.resetValidationErrors();
  profileEditFormValidator.activateButton();
});

cardAddOpenFormButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  const cardAddInputList = Array.from(cardFormElement.querySelectorAll('.popup__item'));
  cardAddInputList.forEach(() => {
    cardAddFormValidator.resetValidationErrors();
  });
  cardAddFormValidator.disableButton();
  cardFormElement.reset();
});

profileEditFormElement.addEventListener('submit', handleEditFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

renderInitialElements();