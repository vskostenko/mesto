    import { openPopup } from "./index.js";
    import {fullViewImage, imgPopupElement, imgPopupCaptionElement} from "./global.js"

export class Card {
    constructor(item,templateElement) {
      this._place = item.place;
      this._link = item.link;
      this._itemTemplate = templateElement.querySelector('.elements__element').cloneNode(true);
      this._itemTemplateImage = this._itemTemplate.querySelector('.elements__image');
    }
    _getElementFromTemplate() {
      this._itemTemplateImage.setAttribute('alt',this._place);
      this._itemTemplateImage.setAttribute('src',this._link);
      this._itemTemplate.querySelector('.elements__text').textContent = this._place;
      return this._itemTemplate;
    }
    _setEventListeners (_listElement) {
      const _like = _listElement.querySelector('.elements__like-button');
      const _trash = _listElement.querySelector('.elements__trash-button');
      const _imageElement = _listElement.querySelector('.elements__image'); 
      _like.addEventListener('click', () => {_like.classList.toggle('elements__like-button_on')});
      _trash.addEventListener('click', () => {_trash.parentNode.remove()});
      _imageElement.addEventListener('click', () => {
        fullViewImage.setAttribute('src',this._link);
        fullViewImage.setAttribute('alt',this._place);
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
  