export class Card {
    constructor(item,templateElement,handleCardClick) {
      this._place = item.place;
      this._link = item.imagelink;
      this._itemTemplate = templateElement.querySelector('.elements__element').cloneNode(true);
      this._itemTemplateImage = this._itemTemplate.querySelector('.elements__image');
      this._handleCardClick = handleCardClick;
      this._cardElement = this._getElementFromTemplate();
      this._likeElement =this._cardElement.querySelector('.elements__like-button');
      this._trashElement = this._cardElement.querySelector('.elements__trash-button');
      this._imageElement = this._cardElement.querySelector('.elements__image'); 
    }
    _getElementFromTemplate() {
      this._itemTemplateImage.setAttribute('alt',this._place);
      this._itemTemplateImage.setAttribute('src',this._link);
      this._itemTemplate.querySelector('.elements__text').textContent = this._place;
      return this._itemTemplate;
    }
    _setEventListeners () {
      this._likeElement.addEventListener('click', ()=> this._likeHandler());
      this._trashElement.addEventListener('click', () => this._removeCardHandler());
      this._imageElement.addEventListener('click', () => this._handleCardClick(this._place,this._link));
    }
    _likeHandler() {
      this._likeElement.classList.toggle('elements__like-button_on');
    }
    _removeCardHandler() {
      this._cardElement.remove();
    }
    getCard () {
        this._setEventListeners();
        return this._cardElement;
    }
  }
  