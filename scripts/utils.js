export const photoPopupCardElement = document.querySelector('.popup__image');
export const namePopupCardElement = document.querySelector('.popup__figcaption');
export const popupAddCard = document.querySelector('#popup-add-card');
export const cardPreviewPhotoPopup = document.querySelector('#popup-image');

export const openPopup = (popups) => {
    popups.classList.add('popup_opened');
    popups.addEventListener('click', closePopupClickOverlayHandler);
    document.addEventListener('keydown', closePopupKeydownEscHandler);
};

export const closePopupClickOverlayHandler = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      evt.target.classList.remove('popup_opened');
    }
};
  
export const closePopupKeydownEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    }
};

export const closePopup = (popups) => {
    popups.classList.remove('popup_opened');
    popups.removeEventListener('click', closePopupClickOverlayHandler);
    document.removeEventListener('keydown', closePopupKeydownEscHandler);
};