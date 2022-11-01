import "./index.css";

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
  profileUpdateAvatarOpenButton,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const profileEditFormValidator = new FormValidator(
  validationConfig,
  profileEditFormElement
);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(
  validationConfig,
  cardFormElement
);
cardAddFormValidator.enableValidation();
const profileUpdateAvatarFormValidator = new FormValidator(
  validationConfig,
  profileUpdateAvatarFormElement
);
profileUpdateAvatarFormValidator.enableValidation();

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-52/",
  headers: {
    authorization: "bbfe3381-78a1-420d-846d-3c7932cfb849",
    "Content-Type": "application/json",
  },
});

const handlePreviewCard = (cardName, cardLink) => {
  cardPreviewImagePopup.openPopup(cardName, cardLink);
};

const createCard = (cardElementInfo) => {
  const card = new Card(
    {
      name: cardElementInfo.name,
      link: cardElementInfo.link,
      ownerId: cardElementInfo.owner._id,
      userId: userId,
      cardId: cardElementInfo._id,
      likes: cardElementInfo.likes,
    },
    ".element__template",
    handlePreviewCard,
    () => confirmationCardDeletePopup.openPopup(card),
    () => {
      return api
        .likeCard(cardElementInfo)
        .then((likesCount) => {
          card.setLikesCount(likesCount);
          card.addLike();
        })
        .catch((err) => console.log(err));
    },
    () => {
      return api
        .removeLikeCard(cardElementInfo)
        .then((likesCount) => {
          card.setLikesCount(likesCount);
          card.removeLike();
        })
        .catch((err) => console.log(err));
    }
  );
  const cardElement = card.createCardElement();
  return cardElement;
};

let userId;

Promise.all([api.getInitialCards(), api.getUserProfileInfo()])
  .then(([cardElements, userInfo]) => {
    userId = userInfo._id;
    cardsSection.renderItems(cardElements);
    profileInfo.setUserInfo(userInfo);
  })
  .catch((err) => console.log(err));

const cardsSection = new Section(
  {
    renderer: (initialCardElement) => {
      cardsSection.addItem(createCard(initialCardElement));
    },
  },
  cardListElement
);

const handleAddCardSubmit = (cardData) => {
  cardAddPopup.setSubmitButtonText(true);
  return api
    .addNewCards(cardData.name, cardData.link)
    .then((card) => {
      cardsSection.addItem(createCard(card));
      cardAddPopup.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      cardAddPopup.setSubmitButtonText(false);
    });
};

const cardAddPopup = new PopupWithForm("#popup-add-card", handleAddCardSubmit);
cardAddPopup.setEventListeners();

const cardPreviewImagePopup = new PopupWithImage("#popup-image");
cardPreviewImagePopup.setEventListeners();

const profileInfo = new UserInfo({
  profileName: profileNameElement,
  profileOccupation: profileOccupationElement,
  profileAvatar: profileAvatarElement,
});

const handleEditProfileSubmit = (info) => {
  profileEditPopup.setSubmitButtonText(true);
  return api
    .editProfileInfo(info)
    .then((data) => {
      profileInfo.setUserInfo(data);
      profileEditPopup.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profileEditPopup.setSubmitButtonText(false);
    });
};

const profileEditPopup = new PopupWithForm(
  "#popup-edit-profile",
  handleEditProfileSubmit
);
profileEditPopup.setEventListeners();

const handleUpdateAvatarSubmit = (url) => {
  profileUpdateAvatarPopup.setSubmitButtonText(true);
  return api
    .updateAvatar(url)
    .then((link) => {
      profileInfo.setUserInfo(link);
      profileUpdateAvatarPopup.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profileUpdateAvatarPopup.setSubmitButtonText(false);
    });
};

const profileUpdateAvatarPopup = new PopupWithForm(
  "#popup-avatar-update",
  handleUpdateAvatarSubmit
);
profileUpdateAvatarPopup.setEventListeners();

const handleFormSubmitDeleteCard = (card) => {
  return api
    .deleteCard(card._cardId)
    .then(() => {
      card.deleteCard();
      confirmationCardDeletePopup.closePopup();
    })
    .catch((err) => console.log(err));
};

const confirmationCardDeletePopup = new PopupWithConfirmation(
  "#popup-confirm",
  handleFormSubmitDeleteCard
);
confirmationCardDeletePopup.setEventListeners();

const setEditProfileMode = () => {
  const userData = profileInfo.getUserInfo();
  nameEditInputElement.value = userData.name;
  occupationEditInputElement.value = userData.about;
};

profileEditOpenButton.addEventListener("click", () => {
  profileEditPopup.openPopup();
  setEditProfileMode();
  profileEditFormValidator.resetValidationErrors();
});

cardAddOpenFormButton.addEventListener("click", () => {
  cardAddPopup.openPopup();
  cardAddFormValidator.resetValidationErrors();
});

profileUpdateAvatarOpenButton.addEventListener("click", () => {
  profileUpdateAvatarPopup.openPopup();
  profileUpdateAvatarFormValidator.resetValidationErrors();
});