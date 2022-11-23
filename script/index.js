import { initialCards } from './initalСards.js';
import { Card } from './card.js';
import { FormValidator } from './formvalidator.js';
import popup from './popup.js';
import { profileEditButton,addButton,editProfilePopup,popupElementsArray,title,popupTitle,subtitle,popupSubtitleInput,
  formProfileElement,listElement,newItemElement,submitFormAddElement,placeInput,urlInput,templateElement,validationSettings,imgPopupElement } from './global.js';
import { Section } from './section.js';
import PopupWithImage  from "./PopupWithImage.js";
import {PopupWithForm}  from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
export { imagePopup };


function createCard (item) {  
  const myNewItem = new Card(item,
    templateElement,
    (name,link) => {
      imagePopup.open(name,link);
      imagePopup.setEventListeners();
    }
    );
  return myNewItem.getCard();
}

function openEditProfilePopupHandler() {
  const data = userInfo.getUserInfo();
  profilePopup.open();
  profilePopup.setInputValues(data);
}

function submitFormProfileHandler(data) {
  userInfo.setUserInfo(data);
}

function submitAddFormHandler() {
  const currentButton = submitFormAddElement.querySelector(validationSettings.submitButtonSelector);
  const currentCard = createCard({place: placeInput.value,link: urlInput.value});
  listElement.prepend(currentCard);
  FormValidator.disableSubmitNewcardButton(currentButton);
}

function enableVaildation (settings) {

  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((form) => {
      const newValid = new FormValidator(settings,form);
      newValid.name = form.name;
      newValid.enableValidation();
  }); 
}

const cardSection = new Section ({
  items: initialCards,
  renderer: (cardItem)=> {
    const card = createCard(cardItem);
    listElement.prepend(card);}
  },
  '.elements');
  cardSection.renderItems();

//инициализация классов 
const newItemPopup = new PopupWithForm(newItemElement,submitAddFormHandler);
newItemPopup._getInputValues();
newItemPopup.setEventListeners();

const imagePopup = new PopupWithImage(imgPopupElement);

const profilePopup = new PopupWithForm(editProfilePopup,submitFormProfileHandler);
profilePopup._getInputValues();
profilePopup.setEventListeners();

const userInfo = new UserInfo (title,subtitle);

profileEditButton.addEventListener('click', openEditProfilePopupHandler);
addButton.addEventListener('click', () => newItemPopup.open());
enableVaildation(validationSettings);

