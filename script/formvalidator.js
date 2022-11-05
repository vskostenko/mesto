export class FormValidator {
    constructor (settings,form) {
        this._settings = settings
        this._form = form;
    }

    _setSubmitButton (button, state) {
        if (state) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled',true);
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
    _toggleButtonState(submitButton,state) {
        this._setSubmitButton(submitButton,state);
    }

    _handleValidateInput(evt) {
        const _currentForm = evt.currentTarget;
        const _submitButton = _currentForm.querySelector(this._settings.submitButtonSelector);
        const _currentField = evt.srcElement;
        this._toggleInputErrorState(_currentField,this._settings);
        this._toggleButtonState(_submitButton,_currentForm.checkValidity());
    }

    enableValidation () {
        this._form.addEventListener('input',(evt) => this._handleValidateInput(evt)); 
    }
}