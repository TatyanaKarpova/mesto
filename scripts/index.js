import { Card, cardInitialElements } from './Card.js';
import { popupAddCard, openPopup, closePopup } from './utils.js';

const addCardButton = document.querySelector('.popup__button_add_card');
const editProfileButton = document.querySelector('.popup__button_edit');
const popupEditProfile = document.querySelector('#popup-edit-profile');
const closeButtons = document.querySelectorAll('.popup__close-icon');
const editInputNameElement = document.querySelector('.popup__item_input_name');
const editInputOccupationElement = document.querySelector('.popup__item_input_occupation');
const cardFormElement = document.querySelector('.popup__form_add_card');
const cardInputHeadingElement = cardFormElement.querySelector('.popup__item_input_card-name');
const cardInputPhotoElement = cardFormElement.querySelector('.popup__item_input_card-photo-url');
const editFormElement = document.querySelector('.popup__form_edit_profile');
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const cardAddOpenFormButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__title');
const profileOccupationElement = document.querySelector('.profile__subtitle');
const cardTemplateElement = document.querySelector('.element__template');
const cardListElement = document.querySelector('.elements__items');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function setEditProfileMode() {
  editInputNameElement.value = profileNameElement.textContent;
  editInputOccupationElement.value = profileOccupationElement.textContent;
};

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  const editNameInput = editInputNameElement.value;
  const editOccupationInput = editInputOccupationElement.value;
  profileNameElement.textContent = editNameInput;
  profileOccupationElement.textContent = editOccupationInput;
  closePopup(popupEditProfile);
};

function addCard() {
  const newCard = new Card (cardInputHeadingElement.value, cardInputPhotoElement.value, '.element__template');
  cardListElement.prepend(newCard.createCardElement());
};

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  addCard();
  evt.target.reset();
  closePopup(popupAddCard);
};

const renderElements = () => {
  cardInitialElements.forEach((element) => {
    const card = new Card (element.name, element.link, '.element__template');
    const cardElement = card.createCardElement();
    cardListElement.prepend(cardElement);
  })
};

profileEditOpenButton.addEventListener('click', () => {
  setEditProfileMode();
  openPopup(popupEditProfile);
  const editInputList = Array.from(editFormElement.querySelectorAll('.popup__item'));
  editInputList.forEach((editProfileInputElement) => {
    hideInputError(editFormElement, editProfileInputElement, validationConfig);
  });
  activateButton(editProfileButton);
});

cardAddOpenFormButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  const addCardInputList = Array.from(cardFormElement.querySelectorAll('.popup__item'));
  addCardInputList.forEach((addCardInputElement) => {
    /*hideInputError(cardFormElement, addCardInputElement, validationConfig);*/
  });
  /*disableButton(addCardButton);*/
  cardFormElement.reset();
});

editFormElement.addEventListener('submit', handleEditFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);


renderElements();