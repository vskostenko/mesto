import Popup from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit){
        super(popup);
        this._inputs = this._popup.querySelectorAll('.popup__field');
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popup.querySelector('.popup__button');
        this._buttonCaption = this._submitButton.value;
    }
    _getInputValues(){
        const data = {};
        this._inputs.forEach((input) => {
          data[input.name] = input.value;
        });
        return data;
    }
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit',(evt)=> {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            })
        }
    setInputValues(data) {
        this._inputs.forEach((input) => {
        input.value = data[input.name];
      });
    }      
    close() {
        super.close();
        this._form.reset();
    }
    renderLoading(flag) {
        if (flag) {
          this._submitButton.value = "Сохранение...";
        } else {
          this._submitButton.value = this._buttonCaption;
        }
      }
}
