import './index.css';
import { Api } from '../script/utils/Api.js';
import { Card } from '../script/components/Card.js';
import { FormValidator } from '../script/components/Formvalidator.js';
import { editAvatarForm,apiConfig,avatarImg,avatarEditButton,deleteItemPopup,profileEditButton,addButton,editProfilePopup,title,subtitle,listElement,newItemElement,submitFormAddElement,editProfileForm,newItemForm,templateElement,validationSettings,imgPopupElement, editAvatarPopup } from '../script/utils/global.js';
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

function openEditAvatarPopupHandler(){
  avatarEditFormValidator.resetError();
  avatarPopup.open();
}

function openNewItemPopup () {
  newItemFormValidator.resetError();
  newItemPopup.open();
}

function submitFormProfileHandler(data) {
  profilePopup.renderLoading(true);
  api.editProfile(data)
  .then ((res) => { 
    userInfo.setUserInfo(res);
    profilePopup.close()
  })
  .catch((err) => alert(err))
  .finally(() => {
    profilePopup.renderLoading(false);
  })
}

function submitFormAvatarHandler(data) {
  avatarPopup.renderLoading(true);
  api.updateAvatar(data)
  .then ((res) => {
    userInfo.setUserInfo(res);
    avatarPopup.close()
  })
  .catch((err) => alert(err))
  .finally(() => {
    avatarPopup.renderLoading(false);
  })

}

function submitAddFormHandler(data) {
  newItemPopup.renderLoading(true);
  api.addCard(data)
  .then ((res) => {
    cardSection.addItem(createCard(res));
    newItemPopup.renderLoading(false);
    newItemPopup.close()
  })
  .catch((err) => alert(err))
  .finally(() => {
    newItemPopup.renderLoading(false);
  })
  
}

function submitDeleteCardHandler(card) {
  api.delCard(card.getCardId())
  .then (()=> {
    card.delete();
    deleteCardPopup.close()
  }
  )
  .catch((err) => alert(err))
}

function trashButtonHandler(card){
  deleteCardPopup.open(card);
}

function likeHandler(card){
  if (!card.isCardLiked()) {
    api.addCardLike(card.getCardId())
    .then((res) => {
      card.likeCard(res.likes);
    })
    .catch((err) => alert(err))  
  } else {
    api.delCardLike(card.getCardId())
    .then((res) => {
      card.dislikeCard(res.likes);
    })
    .catch((err) => alert(err))  
  }
}

//?????????????????????????? ?????????????? 
const api = new Api(apiConfig); 

const userInfo = new UserInfo (title,subtitle,avatarImg);

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

const avatarPopup = new PopupWithForm(editAvatarPopup,submitFormAvatarHandler);
avatarPopup.setEventListeners();

//???????????????? ?????????????????? ????????????
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([userData,inital??ards]) => {
    userInfo.setUserInfo(userData);
    cardSection.renderItems(inital??ards);
  })
  .catch(err => console.error(err));

//?????????????????????? ???????????? ???? ?????????????? ????????????????
profileEditButton.addEventListener('click', openEditProfilePopupHandler);
avatarEditButton.addEventListener('click', openEditAvatarPopupHandler);
addButton.addEventListener('click', openNewItemPopup);
//?????????????????? ????????
const formEditProfileValidator = new FormValidator(validationSettings,editProfileForm);
formEditProfileValidator.enableValidation();
const newItemFormValidator = new FormValidator(validationSettings,newItemForm);
newItemFormValidator.enableValidation();
const avatarEditFormValidator = new FormValidator(validationSettings,editAvatarForm);
avatarEditFormValidator.enableValidation();


