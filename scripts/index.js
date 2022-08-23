const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupAddCard = document.querySelector('#popup-add-card');
const previewCardPhotoPopup = document.querySelector('#popup-image');
const popup = document.querySelectorAll('.popup');
const openButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-icon');
const closeButtonsArray = Array.from(closeButton);
closeButtonsArray.forEach(function (item) {
  item.addEventListener('click', (evt) => {
    const closePopup = evt.target.closest('.popup');
    closePopup.classList.remove('popup_opened');
});
});

let formElement = document.querySelector('.popup__form');

const cardInitialElements = [
  {
    name: 'Луксор',
    link: 'https://images.unsplash.com/photo-1657218842456-35280cac5d47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80.jpg'
  },
  {
    name: 'Агуас-Кальентес',
    link: 'https://images.unsplash.com/photo-1415804941191-bc0c3bbac10d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80.jpg'
  },
  {
    name: 'Париж',
    link: 'https://images.unsplash.com/photo-1659891670855-a49219141f34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80.jpg'
  },
  {
    name: 'Венеция',
    link: 'https://images.unsplash.com/photo-1656365084095-99110bc92e81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80.jpg'
  },
  {
    name: 'Невада',
    link: 'https://images.unsplash.com/photo-1624822764351-77c42080f626?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80.jpg'
  },
  {
    name: 'Скалы Севен Систерс',
    link: 'https://images.unsplash.com/photo-1512778595306-cd1a150f561c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80.jpg'
  }
];

const cardListElement = document.querySelector('.elements__items');
const cardFormElement = document.querySelector('.popup__form_add_card');
const cardInputHeadingElement = cardFormElement.querySelector('.popup__item_input_card-name');
const cardInputPhotoElement = cardFormElement.querySelector('.popup__item_input_card-photo-url');
const cardTemplateElement = document.querySelector('.element__template');
const cardAddOpenFormButton = document.querySelector('.profile__add-button');

const openAddCardPopup = () => {
  popupAddCard.classList.add('popup_opened');
};

function openEditProfilePopup () {
  popupEditProfile.classList.add('popup_opened');
  setEditProfileMode ();
};

function setEditProfileMode () {
  let nameInputElement = document.querySelector('.popup__item_input_name');
  let occupationInputElement = document.querySelector('.popup__item_input_occupation');
  nameInputElement.value = document.querySelector('.profile__title').textContent;
  occupationInputElement.value = document.querySelector('.profile__subtitle').textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
};

function addCardElements(heading, photo) {
  const newCardElement = cardTemplateElement.content.cloneNode(true);
  newCardElement.querySelector('.element__text').textContent = heading;
  newCardElement.querySelector('.element__image').src = photo;
  newCardElement.querySelector('.element__image').setAttribute('alt', heading);
  newCardElement.querySelector('.element__like').addEventListener('click', cardLikeHandler);
  newCardElement.querySelector('.element__delete-button').addEventListener('click', cardDeleteHandler);
  newCardElement.querySelector('.element__image').addEventListener('click', () => zoomPhotoPopup(heading, photo));
  cardListElement.prepend(newCardElement);
};

function openPreviewCardPhoto () {
  previewCardPhotoPopup.classList.add('popup_opened');
}

function zoomPhotoPopup (heading, photo) {
  let photoPopupCardElement = document.querySelector('.popup__image');
  let namePopupCardElement = document.querySelector('.popup__figcaption');
  photoPopupCardElement.src = photo;
  namePopupCardElement.textContent = heading;
  openPreviewCardPhoto ();
}

function cardLikeHandler (evt) {
  evt.target.classList.toggle('element__like_active');
};

function cardDeleteHandler (evt) {
  const itemElement = evt.target.closest('.element');
  itemElement.remove();
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  const nameInput = document.querySelector('.popup__item_input_name').value;
  const occupationInput = document.querySelector('.popup__item_input_occupation').value;
  const profileNameElement = document.querySelector('.profile__title');
  const profileOccupationElement = document.querySelector('.profile__subtitle');
  profileNameElement.textContent = nameInput;
  profileOccupationElement.textContent = occupationInput;
  popupEditProfile.classList.remove('popup_opened');
}

function cardFormSubmitHandler (evt) {
  evt.preventDefault();
  heading = cardInputHeadingElement.value;
  photo = cardInputPhotoElement.value;
  addCardElements(heading, photo);
  cardInputHeadingElement.value = '';
  cardInputPhotoElement.value = '';
  popupAddCard.classList.remove('popup_opened');
};

cardInitialElements.forEach((element) => {
  addCardElements(element.name, element.link)
});

formElement.addEventListener('submit', formSubmitHandler);
openButton.addEventListener('click', openEditProfilePopup);
cardAddOpenFormButton.addEventListener('click', openAddCardPopup);
cardFormElement.addEventListener('submit', cardFormSubmitHandler);