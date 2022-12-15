import Popup from "./Popup.js";
export class PopupWithConfirm extends Popup {
    constructor(popup, submitHandle) {
        super(popup);
        this._form = this._popup.querySelector('.popup__form');
        this._submitHandle = submitHandle;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',(evt)=> {
            evt.preventDefault();
            this._submitHandle(this._card);
            this.close();
        })
    }
    open(card){
        super.open();
        this._card = card;
    }
}