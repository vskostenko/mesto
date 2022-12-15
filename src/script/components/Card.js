export class Card {
    constructor(item,templateElement,handleCardClick,handleDeleteCard,handleLikeClick,myUserId) {
      this._cardID = item._id;
      this._myUserId = myUserId;
      this._owner = item.owner;
      this._place = item.name;
      this._link = item.link;
      this._likes = item.likes;
      this._likesCount = item.likes.length;
      this._itemTemplate = templateElement.querySelector('.elements__element').cloneNode(true);
      this._itemTemplateImage = this._itemTemplate.querySelector('.elements__image');
      this._handleCardClick = handleCardClick;
      this._handleDeleteCard = handleDeleteCard;
      this._handleLikeClick = handleLikeClick;
      this._cardElement = this._getElementFromTemplate();
      this._likeElement =this._cardElement.querySelector('.elements__like-button');
      this._trashElement = this._cardElement.querySelector('.elements__trash-button');
      this._imageElement = this._cardElement.querySelector('.elements__image'); 
    }
    _getElementFromTemplate() {
      this._itemTemplateImage.setAttribute('alt',this._place);
      this._itemTemplateImage.setAttribute('src',this._link);
      this._itemTemplate.querySelector('.elements__text').textContent = this._place;
      this._setLikesCount(this._likesCount);
      return this._itemTemplate;
    }
    _setEventListeners () {
      this._likeElement.addEventListener('click', ()=> this._handleLikeClick(this));
      this._imageElement.addEventListener('click', () => this._handleCardClick(this._place,this._link));
      if (this._myUserId !== this._owner._id) {
        //ecли карточка не наша иконку корзины убираем
        this._trashElement.remove()
      } else {
        //ежели наша - навесим обработчик нажатия
      this._trashElement.addEventListener('click', () => this._handleDeleteCard(this));
      }
    }
    likeCard(likeCount) {
      this._likeElement.classList.add('elements__like-button_on');
      this._setLikesCount(likeCount);
    }
    dislikeCard(likeCount) {
        this._likeElement.classList.remove('elements__like-button_on');
        this._setLikesCount(likeCount);
      }
    _setLikesCount(likeCount) {
      this._itemTemplate.querySelector('.elements__like-count').textContent = likeCount;
    }
    isCardLiked() {
      return (this._likes.some((like) => like._id === this._myUserId))
      }  
    _removeCardHandler() {      
      this._cardElement.remove();
    }
    getCard () {
        if (this.isCardLiked()) {this.likeCard(this._likesCount)};//отобразим наши лайки
        this._setEventListeners();
        return this._cardElement;
    }
    getCardId () {
      return this._cardID;
    }
    delete = () => {
      this._cardElement.remove();
    }
  }
  