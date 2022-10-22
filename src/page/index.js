import './index.css';

import { cardInitialElements } from '../utils/initial-cards.js';
import {
  validationConfig,
  cardFormElement,
  profileEditFormElement,
  nameEditInputElement,
  occupationEditInputElement,
  profileEditOpenButton,
  cardAddOpenFormButton,
  profileNameElement,
  profileOccupationElement,
  cardListElement
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const profileEditFormValidator = new FormValidator(validationConfig, profileEditFormElement);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(validationConfig, cardFormElement);
cardAddFormValidator.enableValidation();

const API_OPTIONS = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-52/',
  headers: {
    authorization: 'bbfe3381-78a1-420d-846d-3c7932cfb849',
    "Content-Type": "application/json"
  }
}

const api = new Api(API_OPTIONS);

const cardPreviewImagePopup = new PopupWithImage('#popup-image');
cardPreviewImagePopup.setEventListeners();

const handlePreviewCard = (cardName, cardLink) => { 
  cardPreviewImagePopup.openPopup(cardName, cardLink);
};

const createCard = (cardElementInfo) => {
  const card = new Card(cardElementInfo, '.element__template', handlePreviewCard);
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


const addCardPopup = new PopupWithForm('#popup-add-card', handleAddCardSubmit);
addCardPopup.setEventListeners();

cardAddOpenFormButton.addEventListener('click', () => {
  addCardPopup.openPopup();
  cardAddFormValidator.resetValidationErrors();
});


const profileInfo = new UserInfo({
  profileName: profileNameElement, 
  profileOccupation: profileOccupationElement});

const handleEditProfileSubmit = (userName, userOccupation) => {
  profileInfo.setUserInfo(userName, userOccupation);
};


const profileEditPopup = new PopupWithForm('#popup-edit-profile', handleEditProfileSubmit);
profileEditPopup.setEventListeners();

const setEditProfileMode = () => {
  const userData = profileInfo.getUserInfo();
  nameEditInputElement.value = userData.name;
  occupationEditInputElement.value = userData.occupation;
};

profileEditOpenButton.addEventListener('click', () => {
  profileEditPopup.openPopup();
  setEditProfileMode();
  profileEditFormValidator.resetValidationErrors();
});