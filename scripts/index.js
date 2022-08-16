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

const popupAddCard = document.querySelector('.popup_add_card');
const openAddCardFormButton = document.querySelector('.profile__add-button');
const closeAddCardFormButton = document.querySelector('.popup__close-icon_add_card');

const openAddCardForm = () => {
    popupAddCard.classList.add('popup_opened_add_card_form');
};

const closeAddCardForm = () => {
    popupAddCard.classList.remove('popup_opened_add_card_form');
};

openAddCardFormButton.addEventListener('click', openAddCardForm);
closeAddCardFormButton.addEventListener('click', closeAddCardForm);