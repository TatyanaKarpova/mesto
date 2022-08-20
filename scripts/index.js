const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-icon');

function openPopup () {
    popup.classList.add('popup_opened');
    let nameInputElement = document.querySelector('.popup__item_input_name');
    let occupationInputElement = document.querySelector('.popup__item_input_occupation');
    nameInputElement.value = document.querySelector('.profile__title').textContent;
    occupationInputElement.value = document.querySelector('.profile__subtitle').textContent;
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault();
    const nameInput = document.querySelector('.popup__item_input_name').value;
    const occupationInput = document.querySelector('.popup__item_input_occupation').value;
    const profileNameElement = document.querySelector('.profile__title');
    const profileOccupationElement = document.querySelector('.profile__subtitle');
    profileNameElement.textContent = nameInput;
    profileOccupationElement.textContent = occupationInput;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);


/* Вебинар */

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
const cardInputHeadingElement = cardFormElement.querySelector('.popup__item_input_card_name');
const cardInputPhotoElement = cardFormElement.querySelector('.popup__item_input_card_photo_url');
const cardTemplateElement = document.querySelector('.element__template');
const cardAddPopup = document.querySelector('.popup_add_card');
const cardAddOpenFormButton = document.querySelector('.profile__add-button');
const cardAddCloseFormButton = document.querySelector('.popup__close-icon_add_card');

const openAddCardForm = () => {
  cardAddPopup.classList.add('popup_opened_add_card_form');
};

const closeAddCardForm = () => {
  cardAddPopup.classList.remove('popup_opened_add_card_form');
};

function addCardElements(heading, photo) {
  const newCardElement = cardTemplateElement.content.cloneNode(true);
  newCardElement.querySelector('.element__text').textContent = heading.name;
  newCardElement.querySelector('.element__image').src = photo.link;
  newCardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
});
  newCardElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    const itemElement = evt.target.closest('.element');
    itemElement.remove();
});

  cardListElement.prepend(newCardElement);
  console.log(heading.name);
  console.log(photo.link);
};

function cardFormSubmitHandler (evt) {
  evt.preventDefault();

  /*heading = cardInputHeadingElement.value;
  photo = cardInputPhotoElement.value;*/
  addCardElements(heading, photo);
  cardInputHeadingElement.value = '';
  cardInputPhotoElement.value = '';
  closeAddCardForm();
};

cardInitialElements.forEach(addCardElements);
cardAddOpenFormButton.addEventListener('click', openAddCardForm);
cardAddCloseFormButton.addEventListener('click', closeAddCardForm);
cardFormElement.addEventListener('submit', cardFormSubmitHandler);