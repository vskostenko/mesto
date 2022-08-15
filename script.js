let button = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
// обработчик открытия попапа
button.addEventListener('click', function editProfile() {
    //title
    let title = document.querySelector('.profile__title');
    let popupTitle = document.querySelector("input[name='title']");
    popupTitle.value = title.innerHTML;
    //subtitle
    let subtitle = document.querySelector('.profile__subtitle');
    let popupSubtitle = document.querySelector("input[name='subtitle']");
    popupSubtitle.value = subtitle.innerHTML;
    popup.classList.add('popup__opened');
});
// обработчик закрытия попапа
let close = document.querySelector('.popup__close-icon');
close.addEventListener('click',function() {
    popup.classList.remove('popup__opened');
});
// обработчик нажатия кнопки "сохранить"
let saveButton = document.querySelector('.popup__button');
saveButton.addEventListener('click',function saveProfile(){
    let title = document.querySelector('.profile__title');
    let popupTitle = document.querySelector("input[name='title']");
    title.innerHTML = popupTitle.value;
    let subtitle = document.querySelector('.profile__subtitle');
    let popupSubtitle = document.querySelector("input[name='subtitle']");
    subtitle.innerHTML = popupSubtitle.value;
    popup.classList.remove('popup__opened');
});

