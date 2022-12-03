import './index.css';
import { initialCards } from '../script/utils/initalСards.js';
import { Card } from '../script/components/card.js';
import { FormValidator } from '../script/components/formvalidator.js';
import { profileEditButton,addButton,editProfilePopup,title,subtitle,listElement,newItemElement,submitFormAddElement,editProfileForm,newItemForm,templateElement,validationSettings,imgPopupElement } from '../script/utils/global.js';
import { Section } from '../script/components/section.js';
import PopupWithImage  from '../script/components/PopupWithImage.js';
import {PopupWithForm}  from '../script/components/PopupWithForm.js';
import { UserInfo } from '../script/components/UserInfo.js';
const formValidators = {};

function createCard (item) {  
  const myNewItem = new Card(item,
    templateElement,
    (name,link) => {
      imagePopup.open(name,link);
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
  const currentCard = createCard(newItemPopup._getInputValues());
  cardSection.addItem(currentCard);
  newItemFormValidator.disableSubmitNewcardButton;
}

//инициализация классов 
const cardSection = new Section ({
  renderer:(cardItem)=> {
    cardSection.addItem(createCard(cardItem));
  }
},
  '.elements__list');
  cardSection.renderItems(initialCards);

const newItemPopup = new PopupWithForm(newItemElement,submitAddFormHandler);
newItemPopup.setEventListeners();

const imagePopup = new PopupWithImage(imgPopupElement);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(editProfilePopup,submitFormProfileHandler);
profilePopup.setEventListeners();

const userInfo = new UserInfo (title,subtitle);

//Обработчики кнопок на главной странице
profileEditButton.addEventListener('click', openEditProfilePopupHandler);
addButton.addEventListener('click', () => newItemPopup.open());
//валидация форм
const formEditProfileValidator = new FormValidator(validationSettings,editProfileForm);
formEditProfileValidator.enableValidation();
const newItemFormValidator = new FormValidator(validationSettings,newItemForm);
newItemFormValidator.enableValidation();



