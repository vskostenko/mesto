import './index.css';
import { Api } from '../script/utils/Api.js';
import { Card } from '../script/components/Card.js';
import { FormValidator } from '../script/components/Formvalidator.js';
import { deleteItemPopup,profileEditButton,addButton,editProfilePopup,title,subtitle,listElement,newItemElement,submitFormAddElement,editProfileForm,newItemForm,templateElement,validationSettings,imgPopupElement } from '../script/utils/global.js';
import { Section } from '../script/components/Section.js';
import PopupWithImage  from '../script/components/PopupWithImage.js';
import {PopupWithForm}  from '../script/components/PopupWithForm.js';
import {PopupWithConfirm} from '../script/components/PopupWithConfirm.js';
import { UserInfo } from '../script/components/UserInfo.js';

function createCard (item) {  
  const myNewItem = new Card(
    item,
    templateElement,
    (name,link) => {
      imagePopup.open(name,link)
    },
    trashButtonHandler,
    likeHandler,
    userInfo.getUserId()
    )
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
  api.editProfile(data)
  .then ((res) => { console.log(data);
    console.log(res)
    userInfo.setUserInfo(res);
  })
}

function submitAddFormHandler(data) {
  data.likes = 0;
  api.addCard(data)
  .then ((res) => {console.log(res);
  cardSection.addItem(createCard(res))
  })
}

function submitDeleteCardHandler(card) {
  api.delCard(card.getCardId())
  .then (card.delete())
}

function trashButtonHandler(card){
  deleteCardPopup.open(card);
}
function likeHandler(card){
  console.log(card);
  console.log(card.isCardLiked());
  if (!card.isCardLiked()) {
    api.addCardLike(card.getCardId())
    .then((res) => {
      card.likeCard(res.likes.length);
      console.log(res.likes.length)
    })  
  } else {
    api.delCardLike(card.getCardId())
    .then((res) => {
      card.dislikeCard(res.likes.length);
      console.log(res)
    })  
  }
}

//инициализация классов 
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54/',
  headers: {
    authorization: '894ca0c1-f322-46d5-9613-0b5b161eddf9',
    'Content-Type': 'application/json'
  }
}); 

const userInfo = new UserInfo (title,subtitle);

const cardSection = new Section ({
  renderer:(cardItem)=> {
    cardSection.addItem(createCard(cardItem));
  }
},
  '.elements__list');

const newItemPopup = new PopupWithForm(newItemElement,submitAddFormHandler);
newItemPopup.setEventListeners();

const imagePopup = new PopupWithImage(imgPopupElement);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(editProfilePopup,submitFormProfileHandler);
profilePopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirm(deleteItemPopup,submitDeleteCardHandler);
deleteCardPopup.setEventListeners();

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([userData,initalСards]) => {
    userInfo.setUserInfo(userData);
    cardSection.renderItems(initalСards);
    console.log(initalСards);
  })
  .catch(err => console.error(err));


//Обработчики кнопок на главной странице
profileEditButton.addEventListener('click', openEditProfilePopupHandler);
addButton.addEventListener('click', openNewItemPopup);
//валидация форм
const formEditProfileValidator = new FormValidator(validationSettings,editProfileForm);
formEditProfileValidator.enableValidation();
const newItemFormValidator = new FormValidator(validationSettings,newItemForm);
newItemFormValidator.enableValidation();



