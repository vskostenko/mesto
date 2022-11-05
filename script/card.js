
    const fullViewImage = document.querySelector('.popup__image');
    const imgPopupElement = document.querySelector('#image-popup');
    const imgPopupCaptionElement = document.querySelector('.popup__image-caption');
    import { openPopup } from "./index.js";
export class Card {
    constructor(item,templateElement) {
      this._place = item.place;
      this._link = item.link;
      this._templateElement=templateElement;
    }
    _getElementFromTemplate() {
      const _itemTemplate = this._templateElement.cloneNode(true);
      _itemTemplate.querySelector('.elements__image').setAttribute('src',this._link);
      _itemTemplate.querySelector('.elements__image').setAttribute('alt',this._place);
      _itemTemplate.querySelector('.elements__text').textContent = this._place;
      return _itemTemplate;
    }
    _setEventListeners (_listElement) {
      const _like = _listElement.querySelector('.elements__like-button');
      const _trash = _listElement.querySelector('.elements__trash-button');
      const _imageElement = _listElement.querySelector('.elements__image'); 
      _like.addEventListener('click', () => {_like.classList.toggle('elements__like-button_on')});
      _trash.addEventListener('click', () => {_trash.parentNode.remove()});
      _imageElement.addEventListener('click', () => {
        fullViewImage.setAttribute('src',this._link);
        imgPopupCaptionElement.textContent = this._place;
        openPopup(imgPopupElement);
      });
      return _listElement;
    }
    getCard () {
        const el = this._getElementFromTemplate();
        return (this._setEventListeners(el));   
    }
  }
  