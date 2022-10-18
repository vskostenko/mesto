const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('#editProfileEl');
const popupElementsArray = document.querySelectorAll('.popup');
const title = document.querySelector('.profile__title');
const popupTitle = document.querySelector("input[name='title']");
const subtitle = document.querySelector('.profile__subtitle');
const popupSubtitleInput = document.querySelector("input[name='subtitle']");
const closeButton = document.querySelectorAll('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const listElement = document.querySelector('.elements__list');
const newItemElement = document.querySelector('#new-item');
const submitFormAddElement = document.querySelector('#submitnewcard');
const placeInput = document.querySelector("input[name='place']");
const urlInput = document.querySelector("input[name='imagelink']");
const fullViewImage = document.querySelector('.popup__image');
const imgPopupElement = document.querySelector('#image-popup');
const imgPopupCaptionElement = document.querySelector('.popup__image-caption');
const templateElement = document.querySelector('#template').content;

function createCard (item) {  
  const itemTemplate = templateElement.cloneNode(true);
  itemTemplate.querySelector('.elements__image').setAttribute('src',item.link);
  itemTemplate.querySelector('.elements__image').setAttribute('alt',item.place);
  itemTemplate.querySelector('.elements__text').textContent = item.place;
  listElement.prepend(itemTemplate);
  const like = listElement.querySelector('.elements__like-button');
  const trash = listElement.querySelector('.elements__trash-button');
  const imageElement = listElement.querySelector('.elements__image'); 
  like.addEventListener('click', () => {like.classList.toggle('elements__like-button_on')});
  trash.addEventListener('click', () => {trash.parentNode.remove()});
  imageElement.addEventListener('click', () => {
    fullViewImage.setAttribute('src',item.link);
    imgPopupCaptionElement.textContent = item.place;
    openPopup(imgPopupElement);
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
  createCard({place: placeInput.value,link: urlInput.value});
  closePopup(newItemElement);
}

function addCloseButtonHandler (item) {
  const closeButEl= item.querySelector('.popup__close-button');
  closeButEl.addEventListener('click', () => {closePopup(item)});
}

function closePopup(popupItem) {
  popupItem.classList.remove('popup_opened');
  document.removeEventListener('keydown', (evt) => closePopupByEscape (evt));
  popupItem.removeEventListener('click', (evt) => closePopupByOverlay (evt));
}

function openPopup(popupItem) {
  popupItem.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => closePopupByEscape (evt));
  popupItem.addEventListener('click', (evt) => closePopupByOverlay (evt));
  
}

function closePopupByOverlay (evt) {
  if (evt.target.classList.contains("popup_opened")){
    closePopup(evt.target);
  }
}

function closePopupByEscape (evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
}



initialCards.forEach(createCard);
profileEditButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', () => openPopup(newItemElement));
popupElementsArray.forEach(addCloseButtonHandler);
formElement.addEventListener('submit',formProfileSubmitHandler);
submitFormAddElement.addEventListener('submit',submitButtonHandler);
enableVaildation(validationSettings);