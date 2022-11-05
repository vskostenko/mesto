import { initialCards } from './initalСards.js';
import { Card } from './card.js';
import { FormValidator } from './formvalidator.js';
export {openPopup};
const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('#editProfileEl');
const popupElementsArray = document.querySelectorAll('.popup');
const title = document.querySelector('.profile__title');
const popupTitle = document.querySelector("input[name='title']");
const subtitle = document.querySelector('.profile__subtitle');
const popupSubtitleInput = document.querySelector("input[name='subtitle']");
const formProfileElement = document.querySelector('.popup__form');
const listElement = document.querySelector('.elements__list');
const newItemElement = document.querySelector('#new-item');
const submitFormAddElement = document.querySelector('#submitnewcard');
const placeInput = document.querySelector("input[name='place']");
const urlInput = document.querySelector("input[name='imagelink']");
const templateElement = document.querySelector('#template').content;
const validationSettings = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_error',
  errorClass: 'popup__error_visible'
}

function createCard (item) {  
  const myNewItem = new Card(item,templateElement);
  listElement.prepend(myNewItem.getCard());
}

function openEditProfilePopup() {
  popupTitle.value = title.textContent;
  popupSubtitleInput.value = subtitle.textContent;
  openPopup(editProfilePopup);
}

function formProfileSubmitHandler (evt) {
  evt.preventDefault(); 
  title.textContent = popupTitle.value;
  subtitle.textContent = popupSubtitleInput.value;
  closePopup(editProfilePopup);
}

function submitAddFormHandler(evt) {
  const currentButton = submitFormAddElement.querySelector(validationSettings.submitButtonSelector);
  evt.preventDefault(); 
  createCard({place: placeInput.value,link: urlInput.value});
  closePopup(newItemElement);
  submitFormAddElement.reset();
  currentButton.setAttribute('disabled',true);
}

function addCloseButtonHandler (item) {
  const closeButEl= item.querySelector('.popup__close-button');
  closeButEl.addEventListener('click', () => {closePopup(item)});
}

function closePopup(popupItem) {
  popupItem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
  popupItem.removeEventListener('click', closePopupByOverlay);
}

function openPopup(popupItem) {
  popupItem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  popupItem.addEventListener('click', closePopupByOverlay);
  
}

function closePopupByOverlay (evt) {
  if (evt.target.classList.contains("popup_opened")){
    closePopup(evt.target);
  }
}

function closePopupByEscape (evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup);
  }
}

function enableVaildation (settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((form) => {
      const newValid = new FormValidator(settings,form);
      newValid.enableValidation();
  }); 
}

initialCards.forEach(createCard);
profileEditButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', () => openPopup(newItemElement));
popupElementsArray.forEach(addCloseButtonHandler);
formProfileElement.addEventListener('submit',formProfileSubmitHandler);
submitFormAddElement.addEventListener('submit',submitAddFormHandler);
enableVaildation(validationSettings);