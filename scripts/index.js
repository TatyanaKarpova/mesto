const addCardButton = document.querySelector('.popup__button_add_card');
const editProfileButton = document.querySelector('.popup__button_edit');
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

const closePopupClickOverlayHandler = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    evt.target.classList.remove('popup_opened');
  }
};

const closePopupKeydownEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

function openPopup(popups) {
  popups.classList.add('popup_opened');
  popups.addEventListener('click', closePopupClickOverlayHandler);
  document.addEventListener('keydown', closePopupKeydownEscHandler);
};

function closePopup(popups) {
  popups.classList.remove('popup_opened');
  popups.removeEventListener('click', closePopupClickOverlayHandler);
  document.removeEventListener('keydown', closePopupKeydownEscHandler);
};

function setEditProfileMode() {
  editInputNameElement.value = profileNameElement.textContent;
  editInputOccupationElement.value = profileOccupationElement.textContent;
};

function createCardElement(heading, photo) {
  const cardElement = cardTemplateElement.content.cloneNode(true);
  const cardImageElement = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__text').textContent = heading;
  cardImageElement.src = photo;
  cardImageElement.setAttribute('alt', heading);
  cardElement.querySelector('.element__like').addEventListener('click', handleCardLike);
  cardElement.querySelector('.element__delete-button').addEventListener('click', handleCardDelete);
  cardImageElement.addEventListener('click', () => previewCardPhoto(heading, photo));
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

function addCard (cardHeading, cardPhoto) {
  createCardElement(cardHeading, cardPhoto);
  cardListElement.prepend(createCardElement(cardHeading, cardPhoto));
};

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const cardHeading = cardInputHeadingElement.value;
  const cardPhoto = cardInputPhotoElement.value;
  addCard (cardHeading, cardPhoto);
  evt.target.reset();
  closePopup(popupAddCard);
};

cardInitialElements.forEach((element) => {
  const cardInitialElement = createCardElement(element.name, element.link);
  cardListElement.prepend(cardInitialElement);
});

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
    hideInputError(cardFormElement, addCardInputElement, validationConfig);
  });
  disableButton(addCardButton);
  cardFormElement.reset();
});

editFormElement.addEventListener('submit', handleEditFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);