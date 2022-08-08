const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit-button_open-popup');
const closeButton = popup.querySelector('.popup__close-icon_close-popup');
const saveButton = popup.querySelector('.popup__button-save');

const togglePopup = function () {
    popup.classList.toggle('popup_opened');
}

const closePopup = function () {
    popup.classList.add('popup__button-save');
}

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
saveButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__form');
let nameInputElement = document.querySelector('.popup__item-name');
let occupationInputElement = document.querySelector('.popup__item-occupation');

function formSubmitHandler (evt) {
    evt.preventDefault();
    const name = nameInputElement.value;
    const occupation = occupationInputElement.value;
    const profileNameElement = document.querySelector('.profile__title');
    profileNameElement.textContent = name;
    const profileOccupationElement = document.querySelector('.profile__subtitle');
    profileOccupationElement.textContent = occupation;
}

formElement.addEventListener('submit', formSubmitHandler); 
