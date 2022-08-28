let button = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let title = document.querySelector('.profile__title');
let popupTitle = document.querySelector("input[name='title']");
let subtitle = document.querySelector('.profile__subtitle');
let popupSubtitle = document.querySelector("input[name='subtitle']");
let saveButton = document.querySelector('.popup__button');
let close = document.querySelector('.popup__close-icon');
let closeNewItemButton = document.getElementById('newitemclose');
let formElement = document.querySelector('.popup__form');
const listElement = document.querySelector('.elements__list');
const newItem = document.querySelector('.newitem');
const submitFormElement = document.getElementById('submitnewcard');
const placeInput = document.querySelector("input[name='place']");
const urlInput = document.querySelector("input[name='imagelink']");

function addCard(item) {
    htmlList = `
    <li class="elements__element">
    <img class="elements__image" src="${item.link}" alt="${item.place}">
    <button type="button" class="elements__trash-button">
      <img class="elements__trash" src="./images/trash.svg">
      </button>
    <div class="elements__caption">
      <h2 class="elements__text">${item.place}</h2>
      <button type="button" class="elements__like-button">
        <img class="elements__like-icon" src="./images/like.svg" alt="нравится">
        <img class="elements__like-icon-active" src="./images/like_active.svg" alt="нравится">
      </button>
    </div>
  </li>
    `;
    listElement.insertAdjacentHTML("afterbegin",htmlList);
    let like = listElement.querySelector('.elements__like-button');
    like.addEventListener('click',function () {
      like.lastElementChild.classList.toggle('elements__like-icon-active_on');
    });
    let trash = listElement.querySelector('.elements__trash-button');
    trash.addEventListener('click',function () {
        trash.parentNode.remove();
    });


  }
function editProfile() {
  popupTitle.value = title.textContent;
  popupSubtitle.value = subtitle.textContent;
  popup.classList.add('popup_opened');
}
function addItem() {
  newItem.classList.add('newitem_opened');
}
function closeNewItem() {
  newItem.classList.remove('newitem_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  title.textContent = popupTitle.value;
  subtitle.textContent = popupSubtitle.value;
  popup.classList.remove('popup_opened');
  }

function closePopup () {
    newItem.classList.remove('newitem_opened');
    popup.classList.remove('popup_opened');
}
function submitButtonHandler(evt) {
  evt.preventDefault(); 
  let card =  [
    {
    place: placeInput.value,
    link: urlInput.value
    }
  ]
  addCard(card[0]);
  console.log(card);
  newItem.classList.remove('newitem_opened');
}

initialCards.forEach(addCard);
button.addEventListener('click', editProfile);
addButton.addEventListener('click', addItem);
close.addEventListener('click', closePopup);
closeNewItemButton.addEventListener('click',closeNewItem);
formElement.addEventListener('submit', formSubmitHandler);
submitFormElement.addEventListener('submit', submitButtonHandler);
