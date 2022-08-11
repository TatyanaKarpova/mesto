const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit-button_popup_opened');
const closeButton = popup.querySelector('.popup__close-icon_popup_closed');

const openPopup = function () {
    popup.classList.add('popup_opened');
}

const closePopup = function () {
    popup.classList.remove('popup_opened');
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


let formElement = document.querySelector('.popup__form');
let nameInputElement = document.querySelector('.popup__item_input_name');
let occupationInputElement = document.querySelector('.popup__item_input_occupation');

function formSubmitHandler (evt) {
    evt.preventDefault();
    const name = nameInputElement.value;
    const occupation = occupationInputElement.value;
    const profileNameElement = document.querySelector('.profile__title');
    profileNameElement.textContent = name;
    const profileOccupationElement = document.querySelector('.profile__subtitle');
    profileOccupationElement.textContent = occupation;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);