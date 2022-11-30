import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__image-caption');
  }
  open (caption, link) {
    this._popupImage.src = link;
    this._popupCaption.textContent = caption;
    this._popupImage.alt = caption;
    super.open();
  }
}
