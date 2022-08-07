const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit-button_open-popup');
const closeButton = popup.querySelector('.popup__close-icon_close-popup');

const togglePopup = function () {
    popup.classList.toggle('popup_opened');
}

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__item-name');
let occupationInput = document.querySelector('.popup__item-occupation');

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput.getAttribute('value');
    occupationInput.getAttribute('value');
    const nameInputNew = document.getElementById('name');
    const occupationInputNew = document.getElementById('occupation');
    const nameInputAdded = nameInputNew.textContent;
    const occupationInputAdded = occupationInputNew.textContent;
}

formElement.addEventListener('submit', formSubmitHandler); 