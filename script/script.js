const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.getElementById('editProfileEl');
const popupElementsArray = document.querySelectorAll('.popup');
const title = document.querySelector('.profile__title');
const popupTitle = document.querySelector("input[name='title']");
const subtitle = document.querySelector('.profile__subtitle');
const popupSubtitleInput = document.querySelector("input[name='subtitle']");
const closeButton = document.querySelectorAll('.popup__close-button');
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
    const trash = listElement.querySelector('.elements__trash-button');
    const imageElement = listElement.querySelector('.elements__image'); 
    like.addEventListener('click', () => {like.classList.toggle('elements__like-button_on')});
    trash.addEventListener('click', () => {trash.parentNode.remove()});
    imageElement.addEventListener('click', () => {
      fullViewImage.setAttribute('src',item.link);
      imgPopupElement.classList.add('image-popup_opened');
      imgPopupCaptionElement.textContent = item.place;
    });
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

function submitButtonHandler(evt) {
  evt.preventDefault(); 
  addCard({place: placeInput.value,link: urlInput.value});
  closePopup(newItemElement);
}

function closeFullViewImg () {
  imgPopupElement.classList.remove('image-popup_opened');
}

function closeButtonHandler (item) {
  const closeButEl= item.querySelector('.popup__close-button');
  closeButEl.addEventListener('click', () => {closePopup(item)});
  }

function closePopup(popupItem) {
  console.log(popupItem);
  popupItem.classList.remove('popup_opened');
}

function openPopup(popupItem) {
  popupItem.classList.add('popup_opened');
}

initialCards.forEach(addCard);
profileEditButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', () => openPopup(newItemElement));
popupElementsArray.forEach(closeButtonHandler);
formElement.addEventListener('submit',formProfileSubmitHandler);
submitFormAddElement.addEventListener('submit',submitButtonHandler);
closeFullvieweImageBtn.addEventListener('click',closeFullViewImg);