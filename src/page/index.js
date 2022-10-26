import './index.css'; //

/*import { cardInitialElements } from '../utils/initial-cards.js';*/
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
} from '../utils/constants.js'; //

import Card from '../components/Card.js'; //
import FormValidator from '../components/FormValidator.js'; //
import Section from '../components/Section.js'; //
import PopupWithImage from '../components/PopupWithImage.js'; //
import PopupWithForm from '../components/PopupWithForm.js'; //
import UserInfo from '../components/UserInfo.js'; //
import Api from '../components/Api.js'; //
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'; //


// ok
const profileEditFormValidator = new FormValidator(validationConfig, profileEditFormElement);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(validationConfig, cardFormElement);
cardAddFormValidator.enableValidation();
const profileUpdateAvatarFormValidator = new FormValidator(validationConfig, profileUpdateAvatarFormElement);
profileUpdateAvatarFormValidator.enableValidation();

// ok
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52/',
  headers: {
    authorization: 'bbfe3381-78a1-420d-846d-3c7932cfb849',
    "Content-Type": "application/json"
  }
}); 

// ok
const handlePreviewCard = (cardName, cardLink) => { 
  cardPreviewImagePopup.openPopup(cardName, cardLink);
};

let userId;
// ?
Promise.all([api.getInitialCards(), api.getUserProfileInfo()])
  .then(([cardsData, userInfoData]) => {
    initialCardList.renderItems(cardsData);
    profileInfo.setUserInfo(userInfoData);
  })
  .catch((err) => console.log(err));

// ok
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


//ok
const initialCardList = new Section({
    renderer: (initialCardElement) => {
      initialCardList.addItem(createCard(initialCardElement));
    }
}, cardListElement);

//ok
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
//ok
const addCardPopup = new PopupWithForm('#popup-add-card', handleAddCardSubmit);
addCardPopup.setEventListeners();

//ok
const cardPreviewImagePopup = new PopupWithImage('#popup-image');
cardPreviewImagePopup.setEventListeners();


// ??
const profileInfo = new UserInfo({
    profileName: profileNameElement, 
    profileOccupation: profileOccupationElement,
    profileAvatar: profileAvatarElement
});

// вообще ок, но не работает
const handleEditProfileSubmit = (info) => {
  profileEditPopup.handleSubmitButtonText(true);
  return api
    .editProfileInfo(info)
    .then((response) => {
      profileInfo.setUserInfo(response);
      profileEditPopup.closePopup();
    })
    .catch((err) => console.log(err));
};

//ok
const profileEditPopup = new PopupWithForm('#popup-edit-profile', handleEditProfileSubmit);
profileEditPopup.setEventListeners();


// вообще ок, но не работает
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
//ok
const profileUpdateAvatarPopup = new PopupWithForm('#popup-avatar-update', handleUpdateAvatarSubmit);
profileUpdateAvatarPopup.setEventListeners();

// вообще ок, но не работает
const handleFormSubmitDeleteCard = (card) => {
  return api
    .deleteCard(card._cardId)
    .then(() => {
      card.deleteCard();
      confirmationPopup.closePopup();
    })
  .catch((err) => console.log(err));
}
//ok
const confirmationPopup = new PopupWithConfirmation('#popup-confirm', handleFormSubmitDeleteCard);
confirmationPopup.setEventListeners();

//ok
const setEditProfileMode = () => {
  const userData = profileInfo.getUserInfo();
  nameEditInputElement.value = userData.name;
  occupationEditInputElement.value = userData.occupation;
};

//ok
profileEditOpenButton.addEventListener('click', () => {
  profileEditPopup.openPopup();
  setEditProfileMode();
  profileEditFormValidator.resetValidationErrors();
  profileEditPopup.handleSubmitButtonText(false);
});

//ok
cardAddOpenFormButton.addEventListener('click', () => {
  addCardPopup.openPopup();
  cardAddFormValidator.resetValidationErrors();
  addCardPopup.handleSubmitButtonText(false);
});


// ?
profileUpdateAvatarOpenButton.addEventListener('click', () => {
  profileUpdateAvatarPopup.openPopup();
  profileUpdateAvatarPopup.handleSubmitButtonText(false);
  profileUpdateAvatarFormValidator.resetValidationErrors();
});