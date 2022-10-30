import './index.css';

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
  cardListElement,
  profileAvatarElement,
  profileUpdateAvatarFormElement,
  profileUpdateAvatarOpenButton
} from '../utils/constants.js'; 

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const profileEditFormValidator = new FormValidator(validationConfig, profileEditFormElement);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(validationConfig, cardFormElement);
cardAddFormValidator.enableValidation();
const profileUpdateAvatarFormValidator = new FormValidator(validationConfig, profileUpdateAvatarFormElement);
profileUpdateAvatarFormValidator.enableValidation();

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52/',
  headers: {
    authorization: 'bbfe3381-78a1-420d-846d-3c7932cfb849',
    "Content-Type": "application/json"
  }
}); 


const handlePreviewCard = (cardName, cardLink) => { 
  cardPreviewImagePopup.openPopup(cardName, cardLink);
};

const createCard = (cardElementInfo) => {
  const card = new Card ({
    name: cardElementInfo.name,
    link: cardElementInfo.link,
    ownerId: cardElementInfo.owner._id,
    userId: userId,
    cardId: cardElementInfo._id,
    likes: cardElementInfo.likes
  }, 
  '.element__template', 
  handlePreviewCard,
  () => confirmationPopup.openPopup(card),
  () => {
    return api
    .likeCard(cardElementInfo)
    .then((response) => {
      card.setLikesCount(response);
      card.addLike();
    })
    .catch((err) => console.log(err))
  },
  () => {
    return api
    .removeLikeCard(cardElementInfo)
    .then((response) => {
      card.setLikesCount(response);
      card.removeLike();
    })
    .catch((err) => console.log(err))
  }
  )
  const cardElement = card.createCardElement();
  return cardElement;
};


let userId;

Promise.all([api.getInitialCards(), api.getUserProfileInfo()])
  .then((value) => {
    userId = value[1]._id;
    initialCardList.renderItems(value[0]);
    profileInfo.setUserInfo(value[1]);
  })
  .catch((err) => console.log(err));

const initialCardList = new Section({
    renderer: (initialCardElement) => {
      initialCardList.addItem(createCard(initialCardElement));
    }
}, cardListElement);

const handleAddCardSubmit = (newCardElement) => {
  addCardPopup.handleSubmitButtonText(true);
  return api
    .addNewCards(newCardElement.name, newCardElement.link)
    .then((card) => {
      initialCardList.addItem(createCard(card));
      addCardPopup.closePopup();
    })
    .catch((err) => console.log(err));
};

const addCardPopup = new PopupWithForm('#popup-add-card', handleAddCardSubmit);
addCardPopup.setEventListeners();


const cardPreviewImagePopup = new PopupWithImage('#popup-image');
cardPreviewImagePopup.setEventListeners();


const profileInfo = new UserInfo({
    profileName: profileNameElement, 
    profileOccupation: profileOccupationElement,
    profileAvatar: profileAvatarElement
});


const handleEditProfileSubmit = (info) => {
  profileEditPopup.handleSubmitButtonText(true);
  return api
    .editProfileInfo(info)
    .then((data) => {
      profileInfo.setUserInfo(data);
      profileEditPopup.closePopup();
    })
    .catch((err) => console.log(err));
};

const profileEditPopup = new PopupWithForm('#popup-edit-profile', handleEditProfileSubmit);
profileEditPopup.setEventListeners();


const handleUpdateAvatarSubmit = (url) => {
  profileUpdateAvatarPopup.handleSubmitButtonText(true);
  return api
  .updateAvatar(url)
  .then((link) => {
    profileInfo.setUserInfo(link);
    profileUpdateAvatarPopup.closePopup();
  })
  .catch((err) => console.log(err));
}

const profileUpdateAvatarPopup = new PopupWithForm('#popup-avatar-update', handleUpdateAvatarSubmit);
profileUpdateAvatarPopup.setEventListeners();


const handleFormSubmitDeleteCard = (card) => {
  return api
    .deleteCard(card._cardId)
    .then(() => {
      card.deleteCard();
      confirmationPopup.closePopup();
    })
  .catch((err) => console.log(err));
}

const confirmationPopup = new PopupWithConfirmation('#popup-confirm', handleFormSubmitDeleteCard);
confirmationPopup.setEventListeners();


const setEditProfileMode = () => {
  const userData = profileInfo.getUserInfo();
  nameEditInputElement.value = userData.name;
  occupationEditInputElement.value = userData.about;
};


profileEditOpenButton.addEventListener('click', () => {
  profileEditPopup.openPopup();
  setEditProfileMode();
  profileEditFormValidator.resetValidationErrors();
  profileEditPopup.handleSubmitButtonText(false);
});

cardAddOpenFormButton.addEventListener('click', () => {
  addCardPopup.openPopup();
  cardAddFormValidator.resetValidationErrors();
  addCardPopup.handleSubmitButtonText(false);
});

profileUpdateAvatarOpenButton.addEventListener('click', () => {
  profileUpdateAvatarPopup.openPopup();
  profileUpdateAvatarPopup.handleSubmitButtonText(false);
  profileUpdateAvatarFormValidator.resetValidationErrors();
});