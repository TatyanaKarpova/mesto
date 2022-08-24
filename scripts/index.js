const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupAddCard = document.querySelector('#popup-add-card');
const previewCardPhotoPopup = document.querySelector('#popup-image');
const closeButtons = document.querySelectorAll('.popup__close-icon');
const editInputNameElement = document.querySelector('.popup__item_input_name');
const editInputOccupationElement = document.querySelector('.popup__item_input_occupation');
const cardFormElement = document.querySelector('.popup__form_add_card');
const cardInputHeadingElement = cardFormElement.querySelector('.popup__item_input_card-name');
const cardInputPhotoElement = cardFormElement.querySelector('.popup__item_input_card-photo-url');
const editFormElement = document.querySelector('.popup__form_edit_profile');
const photoPopupCardElement = document.querySelector('.popup__image');
const namePopupCardElement = document.querySelector('.popup__figcaption');
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



function openPopup(popups) {
  popups.classList.add('popup_opened');
};

function closePopup(popups) {
  popups.classList.remove('popup_opened');
};

function setEditProfileMode() {
  editInputNameElement.value = profileNameElement.textContent;
  editInputOccupationElement.value = profileOccupationElement.textContent;
};

function createCardElement(heading, photo) {
  const cardElement = cardTemplateElement.content.cloneNode(true);
  cardElement.querySelector('.element__text').textContent = heading;
  cardElement.querySelector('.element__image').src = photo;
  cardElement.querySelector('.element__image').setAttribute('alt', heading);
  cardElement.querySelector('.element__like').addEventListener('click', handleCardLike);
  cardElement.querySelector('.element__delete-button').addEventListener('click', handleCardDelete);
  cardElement.querySelector('.element__image').addEventListener('click', () => previewCardPhoto(heading, photo));
  return cardElement;
};

function handleCardLike (evt) {
  evt.target.classList.toggle('element__like_active');
};

function handleCardDelete (evt) {
  const itemElement = evt.target.closest('.element');
  itemElement.remove();
};

function previewCardPhoto (heading, photo) {
  photoPopupCardElement.src = photo;
  namePopupCardElement.textContent = heading;
  photoPopupCardElement.setAttribute('alt', heading);
  openPopup(previewCardPhotoPopup);
};

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  const editNameInput = editInputNameElement.value;
  const editOccupationInput = editInputOccupationElement.value;
  profileNameElement.textContent = editNameInput;
  profileOccupationElement.textContent = editOccupationInput;
  closePopup(popupEditProfile);
};

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const cardHeading = cardInputHeadingElement.value;
  const cardPhoto = cardInputPhotoElement.value;
  createCardElement(cardHeading, cardPhoto);
  cardListElement.prepend(createCardElement(cardHeading, cardPhoto));
  evt.target.reset();
  closePopup(popupAddCard);
};



cardInitialElements.forEach((element) => {
  const cardInitialElement = createCardElement(element.name, element.link);
  cardListElement.prepend(cardInitialElement);
});

profileEditOpenButton.addEventListener('click', () => {
  setEditProfileMode();
  openPopup(popupEditProfile)
});

cardAddOpenFormButton.addEventListener('click', () => openPopup(popupAddCard));
editFormElement.addEventListener('submit', handleEditFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);