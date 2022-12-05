export default class popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByOverlay = this._closeByOverlay.bind(this);
    this._closeButEl= this._popup.querySelector('.popup__close-button');
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _closeByOverlay (evt) {
    if (evt.target.classList.contains("popup_opened")){
      this.close();
    }
  }
  setEventListeners() {
    this._closeButEl.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', this._closeByOverlay); 
  }
}
