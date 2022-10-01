export const photoPopupCardElement = document.querySelector('.popup__image');
export const namePopupCardElement = document.querySelector('.popup__figcaption');
export const popupAddCard = document.querySelector('#popup-add-card');
export const cardPreviewPhotoPopup = document.querySelector('#popup-image');

export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupClickOverlayHandler);
    document.addEventListener('keydown', closePopupKeydownEscHandler);
};

export const closePopupClickOverlayHandler = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    }
};
  
export const closePopupKeydownEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    }
};

export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closePopupClickOverlayHandler);
    document.removeEventListener('keydown', closePopupKeydownEscHandler);
};