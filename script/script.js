const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const title = document.querySelector('.profile__title');
const popupTitle = document.querySelector("input[name='title']");
const subtitle = document.querySelector('.profile__subtitle');
const popupSubtitleInput = document.querySelector("input[name='subtitle']");
const close = document.querySelector('.popup__close-button');
const closeNewItemButton = document.querySelector('.new-item__close-button');
const formElement = document.querySelector('.popup__form');
const listElement = document.querySelector('.elements__list');
const newItemElement = document.getElementById('new-item');
const submitFormAddElement = document.getElementById('submitnewcard');
const placeInput = document.querySelector("input[name='place']");
const urlInput = document.querySelector("input[name='imagelink']");
const fullViewImage = document.querySelector('.image-popup__image');
const imgPopupElement = document.querySelector('.image-popup');
const closeFullvieweImageBtn = document.querySelector('.image-popup__close-button');
const imgPopupCaptionElement = document.querySelector('.image-popup__caption');
const templateElement = document.querySelector('#template').content;

function createCard (link,place) {  
  const itemTemplate = templateElement.cloneNode(true);
  itemTemplate.querySelector('.elements__image').setAttribute('src',link);
  itemTemplate.querySelector('.elements__image').setAttribute('alt',place);
  itemTemplate.querySelector('.elements__text').textContent = place;
  return itemTemplate;
}

function addCard(item) {
    listElement.prepend(createCard(item.link,item.place));
    const like = listElement.querySelector('.elements__like-button');
    like.addEventListener('click',function () {
      like.classList.toggle('elements__like-button_on');
    });
    const trash = listElement.querySelector('.elements__trash-button');
    trash.addEventListener('click',function () {
      trash.parentNode.remove();
    });
    const imageElement = listElement.querySelector('.elements__image'); 
    imageElement.addEventListener('click',function () {
      fullViewImage.setAttribute('src',item.link);
      imgPopupElement.classList.add('image-popup_opened');
      imgPopupCaptionElement.textContent = item.place;
    });
  }
function openEditProfilePopup() {
  popupTitle.value = title.textContent;
  popupSubtitleInput.value = subtitle.textContent;
  popup.classList.add('popup_opened');
}
function addNewItemPopup() {
  newItemElement.classList.add('new-item_opened');
}
function closeNewItem() {
  newItemElement.classList.remove('new-item_opened');
}
function formProfileSubmitHandler (evt) {
  evt.preventDefault(); 
  title.textContent = popupTitle.value;
  subtitle.textContent = popupSubtitleInput.value;
  popup.classList.remove('popup_opened');
}

function closePopup () {
    newItemElement.classList.remove('new-item_opened');
    popup.classList.remove('popup_opened');
}
function submitButtonHandler(evt) {
  evt.preventDefault(); 
  addCard({place: placeInput.value,link: urlInput.value});
  newItemElement.classList.remove('new-item_opened');
}
function closeFullViewImg () {
  imgPopupElement.classList.remove('image-popup_opened');
}

initialCards.forEach(addCard);
profileEditButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', addNewItemPopup);
close.addEventListener('click', closePopup);
closeNewItemButton.addEventListener('click',closeNewItem);
formElement.addEventListener('submit',formProfileSubmitHandler);
submitFormAddElement.addEventListener('submit',submitButtonHandler);
closeFullvieweImageBtn.addEventListener('click',closeFullViewImg);