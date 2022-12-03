export const fullViewImage = document.querySelector('.popup__image');
export const imgPopupElement = document.querySelector('#image-popup');
export const imgPopupCaptionElement = document.querySelector('.popup__image-caption');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const editProfilePopup = document.querySelector('#editProfileEl');
export const popupElementsArray = document.querySelectorAll('.popup');
export const title = document.querySelector('.profile__title');
export const popupTitle = document.querySelector("input[name='title']");
export const subtitle = document.querySelector('.profile__subtitle');
export const popupSubtitleInput = document.querySelector("input[name='subtitle']");
export const formProfileElement = document.querySelector('.popup__form');
export const listElement = document.querySelector('.elements__list');
export const newItemElement = document.querySelector('#new-item');
export const submitFormAddElement = document.querySelector('#submitnewcard');
export const placeInput = document.querySelector("input[name='place']");
export const urlInput = document.querySelector("input[name='imagelink']");
export const templateElement = document.querySelector('#template').content;
export const editProfileForm = editProfilePopup.querySelector('.popup__form');
export const newItemForm = newItemElement.querySelector('.popup__form');

export const validationSettings = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_error',
  errorClass: 'popup__error_visible'
}