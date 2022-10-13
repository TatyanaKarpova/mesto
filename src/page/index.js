import './index.css';

import Card from '../components/Card.js';
import { popupAddCard, photoPopupCardElement, namePopupCardElement, cardPreviewPhotoPopup } from '../components/utils.js';
import FormValidator from '../components/FormValidator.js';
import { cardInitialElements } from '../components/initial-cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


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


const popupEditProfile = document.querySelector('#popup-edit-profile');
const nameEditInputElement = document.querySelector('.popup__item_input_name');
const occupationEditInputElement = document.querySelector('.popup__item_input_occupation');
const cardInputHeadingElement = cardFormElement.querySelector('.popup__item_input_card-name');
const cardInputPhotoElement = cardFormElement.querySelector('.popup__item_input_card-photo-url');
const profileEditOpenButton = document.querySelector('.profile__edit-button');
const cardAddOpenFormButton = document.querySelector('.profile__add-button');
const profileNameElement = document.querySelector('.profile__title');
const profileOccupationElement = document.querySelector('.profile__subtitle');
const cardListElement = document.querySelector('.elements__items');

const profileEditFormValidator = new FormValidator(validationConfig, profileEditFormElement);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(validationConfig, cardFormElement);
cardAddFormValidator.enableValidation();

const cardPreviewImagePopup = new PopupWithImage('#popup-image');
cardPreviewImagePopup.setEventListeners();

const handlePreviewCard = (cardName, cardLink) => { 
  cardPreviewImagePopup.openPopup(cardName, cardLink);
};

const createCard = (cardElementInfo) => {
  const card = new Card (cardElementInfo, '.element__template', handlePreviewCard);
  const cardElement = card.createCardElement();
  return cardElement;
};

const initialCardList = new Section({
  items: cardInitialElements,
  renderer: (initialCardElement) => {
    initialCardList.addItem(createCard(initialCardElement));
  }
}, cardListElement);

initialCardList.renderItems();

const handleAddCardSubmit = (newCardElement) => {
  initialCardList.addItem(createCard(newCardElement));
};

const popupAddCardForm = new PopupWithForm('#popup-add-card', handleAddCardSubmit);
popupAddCardForm.setEventListeners();

cardAddOpenFormButton.addEventListener('click', () => {
  popupAddCardForm.openPopup();
  cardAddFormValidator.resetValidationErrors();
  cardAddFormValidator.disableButton();
  cardFormElement.reset();
});

const profileInfo = new UserInfo ({
  profileName: profileNameElement, 
  profileOccupation: profileOccupationElement});

const handleEditProfileSubmit = (userName, userOccupation) => {
  profileInfo.setUserInfo(userName, userOccupation);
}

const profileEditPopup = new PopupWithForm('#popup-edit-profile', handleEditProfileSubmit);
profileEditPopup.setEventListeners();

profileEditOpenButton.addEventListener('click', () => {
  profileEditPopup.openPopup();
  setEditProfileMode();
  profileEditFormValidator.resetValidationErrors();
  profileEditFormValidator.activateButton();
});

const setEditProfileMode = () => {
  const userData = profileInfo.getUserInfo();
  nameEditInputElement.value = userData.name;
  occupationEditInputElement.value = userData.occupation;
};