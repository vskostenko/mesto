import { initialCards } from './initalСards.js';
import { Card } from './card.js';
import { FormValidator } from './formvalidator.js';
import { profileEditButton,addButton,editProfilePopup,popupElementsArray,title,popupTitle,subtitle,popupSubtitleInput,
  formProfileElement,listElement,newItemElement,submitFormAddElement,placeInput,urlInput,templateElement,validationSettings } from './global.js';
export {openPopup};


function createCard (item) {  
  const myNewItem = new Card(item,templateElement);
  listElement.prepend(myNewItem.getCard());
  return myNewItem;
}

function openEditProfilePopup() {
  popupTitle.value = title.textContent;
  popupSubtitleInput.value = subtitle.textContent;
  openPopup(editProfilePopup);
}

function SubmitFormProfileHandler (evt) {
  evt.preventDefault(); 
  title.textContent = popupTitle.value;
  subtitle.textContent = popupSubtitleInput.value;
  closePopup(editProfilePopup);
}

function submitAddFormHandler(evt) {
  const currentButton = submitFormAddElement.querySelector(validationSettings.submitButtonSelector);
  evt.preventDefault(); 
  const currentCard = createCard({place: placeInput.value,link: urlInput.value});
  closePopup(newItemElement);
  submitFormAddElement.reset();
  FormValidator.disableSubmitNewcardButton(currentButton);
  
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
      newValid.name = form.name;
      newValid.enableValidation();
  }); 
}

initialCards.forEach(createCard);
profileEditButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', () => openPopup(newItemElement));
popupElementsArray.forEach(addCloseButtonHandler);
formProfileElement.addEventListener('submit',SubmitFormProfileHandler);
submitFormAddElement.addEventListener('submit',submitAddFormHandler);
enableVaildation(validationSettings);
