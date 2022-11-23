import Popup from "./popup.js";
export class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit){
        super(popup);
        this._inputs = this._popup.querySelectorAll('.popup__field');
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
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
            this.close();
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
}
