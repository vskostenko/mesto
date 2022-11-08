import { initialCards } from './initalСards.js';
import { Card } from './card.js';
import { FormValidator } from './formvalidator.js';
import { openPopup,closePopup } from './popup.js';
import { profileEditButton,addButton,editProfilePopup,popupElementsArray,title,popupTitle,subtitle,popupSubtitleInput,
  formProfileElement,listElement,newItemElement,submitFormAddElement,placeInput,urlInput,templateElement,validationSettings } from './global.js';
export {openPopup};


function createCard (item) {  
  const myNewItem = new Card(item,templateElement);
  return myNewItem.getCard();
}

function openEditProfilePopup() {
  popupTitle.value = title.textContent;
  popupSubtitleInput.value = subtitle.textContent;
  openPopup(editProfilePopup);
}

function submitFormProfileHandler (evt) {
  evt.preventDefault(); 
  title.textContent = popupTitle.value;
  subtitle.textContent = popupSubtitleInput.value;
  closePopup(editProfilePopup);
}

function submitAddFormHandler(evt) {
  const currentButton = submitFormAddElement.querySelector(validationSettings.submitButtonSelector);
  evt.preventDefault(); 
  const currentCard = createCard({place: placeInput.value,link: urlInput.value});
  listElement.prepend(currentCard);
  closePopup(newItemElement);
  submitFormAddElement.reset();
  FormValidator.disableSubmitNewcardButton(currentButton);
  
}

function addCloseButtonHandler (item) {
  const closeButEl= item.querySelector('.popup__close-button');
  closeButEl.addEventListener('click', () => {closePopup(item)});
}

function enableVaildation (settings) {

  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((form) => {
      const newValid = new FormValidator(settings,form);
      newValid.name = form.name;
      newValid.enableValidation();
  }); 
}

initialCards.forEach((item) => { 
  listElement.prepend(createCard(item))});
profileEditButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', () => openPopup(newItemElement));
popupElementsArray.forEach(addCloseButtonHandler);
formProfileElement.addEventListener('submit',submitFormProfileHandler);
submitFormAddElement.addEventListener('submit',submitAddFormHandler);
enableVaildation(validationSettings);
