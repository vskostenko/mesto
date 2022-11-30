import './index.css';
import { initialCards } from '../script/utils/initalСards.js';
import { Card } from '../script/components/card.js';
import { FormValidator } from '../script/components/formvalidator.js';
import { profileEditButton,addButton,editProfilePopup,title,subtitle,listElement,newItemElement,submitFormAddElement,placeInput,urlInput,templateElement,validationSettings,imgPopupElement } from '../script/utils/global.js';
import { Section } from '../script/components/section.js';
import PopupWithImage  from '../script/components/PopupWithImage.js';
import {PopupWithForm}  from '../script/components/PopupWithForm.js';
import { UserInfo } from '../script/components/UserInfo.js';
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
//инициализация классов 
const cardSection = new Section ({
  items: initialCards,
  renderer: (cardItem)=> {
    const card = createCard(cardItem);
    listElement.prepend(card);}
  },
  '.elements');
  cardSection.renderItems();

const newItemPopup = new PopupWithForm(newItemElement,submitAddFormHandler);
newItemPopup._getInputValues();
newItemPopup.setEventListeners();

const imagePopup = new PopupWithImage(imgPopupElement);

const profilePopup = new PopupWithForm(editProfilePopup,submitFormProfileHandler);
profilePopup._getInputValues();
profilePopup.setEventListeners();

const userInfo = new UserInfo (title,subtitle);

//Обработчики кнопок на главной странице
profileEditButton.addEventListener('click', openEditProfilePopupHandler);
addButton.addEventListener('click', () => newItemPopup.open());
//валидация форм
enableVaildation(validationSettings);

