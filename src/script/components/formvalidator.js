export class FormValidator {
    constructor (settings,form) {
        this._settings = settings;
        this._form = form;
        this._submitButton = form.querySelector(this._settings.submitButtonSelector);;
    }
    _setSubmitButton (state) {
        if (state) {
            this._submitButton.removeAttribute('disabled');
        } else {
            this.disableSubmitButton();
        }
    }

    _makeInputInvalid(input) {
        input.classList.add(this._settings.inputErrorClass);
    }
    
    _makeInputValid(input) {
        input.classList.remove(this._settings.inputErrorClass);
    }
    
    _toggleInputErrorState(input) {
        if (!input.validity.valid) {
            this._makeInputInvalid(input,this._settings);
        } else {
            this._makeInputValid(input,this._settings);
        }
        const _errorSpan = input.parentNode.querySelector(`#${input.name}-error`);
        _errorSpan.textContent = input.validationMessage;
    }    
    _toggleButtonState(state) {
        this._setSubmitButton(state);
    }

    _handleValidateInput(evt) {
        const _currentField = evt.srcElement;
        this._toggleInputErrorState(_currentField,this._settings);
        this._toggleButtonState(this._form.checkValidity());
    }
    disableSubmitButton() {
        this._submitButton.setAttribute('disabled',true);
    }
    enableValidation () {
        this._form.addEventListener('input',(evt) => this._handleValidateInput(evt)); 
    }
}