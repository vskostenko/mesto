import './index.css';
import { initialCards } from '../script/utils/initalСards.js';
import { Card } from '../script/components/Card.js';
import { FormValidator } from '../script/components/Formvalidator.js';
import { profileEditButton,addButton,editProfilePopup,title,subtitle,listElement,newItemElement,submitFormAddElement,editProfileForm,newItemForm,templateElement,validationSettings,imgPopupElement } from '../script/utils/global.js';
import { Section } from '../script/components/Section.js';
import PopupWithImage  from '../script/components/PopupWithImage.js';
import {PopupWithForm}  from '../script/components/PopupWithForm.js';
import { UserInfo } from '../script/components/UserInfo.js';

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
  formEditProfileValidator.resetError();
  profilePopup.open();
  profilePopup.setInputValues(data);
}

function openNewItemPopup () {
  newItemFormValidator.resetError();
  newItemPopup.open();
}

function submitFormProfileHandler(data) {
  userInfo.setUserInfo(data);
}

function submitAddFormHandler() {
  const currentCard = createCard(this._getInputValues());
  cardSection.addItem(currentCard);
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
addButton.addEventListener('click', openNewItemPopup);
//валидация форм
const formEditProfileValidator = new FormValidator(validationSettings,editProfileForm);
formEditProfileValidator.enableValidation();
const newItemFormValidator = new FormValidator(validationSettings,newItemForm);
newItemFormValidator.enableValidation();



