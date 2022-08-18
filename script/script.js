let button = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let title = document.querySelector('.profile__title');
let popupTitle = document.querySelector("input[name='title']");
let subtitle = document.querySelector('.profile__subtitle');
let popupSubtitle = document.querySelector("input[name='subtitle']");
let saveButton = document.querySelector('.popup__button');
let close = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__form');

function editProfile() {
    popupTitle.value = title.textContent;
    popupSubtitle.value = subtitle.textContent;
    popup.classList.add('popup_opened');
};
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    title.textContent = popupTitle.value;
    subtitle.textContent = popupSubtitle.value;
    popup.classList.remove('popup_opened');
}
function closePopup () {
    popup.classList.remove('popup_opened');
}

button.addEventListener('click', editProfile);
close.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);