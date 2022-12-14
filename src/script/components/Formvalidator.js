export class FormValidator {
    constructor (settings,form) {
        this._settings = settings;
        this._form = form;
        this._submitButton = form.querySelector(this._settings.submitButtonSelector);
        this._inputList = form.querySelectorAll(this._settings.inputSelector);
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
        const _errorSpan = input.closest(".popup__form").querySelector(`#${input.name}-error`);
        _errorSpan.textContent = input.validationMessage;
    }
    
    _makeInputValid(input) {
        input.classList.remove(this._settings.inputErrorClass);
        const _errorSpan = input.closest(".popup__form").querySelector(`#${input.name}-error`); 
        _errorSpan.textContent = '';
    }
    
    _toggleInputErrorState(input) {
        if (!input.validity.valid) {
            this._makeInputInvalid(input,this._settings);
        } else {
            this._makeInputValid(input,this._settings);
        }
    }    
    _toggleButtonState(state) {
        this._setSubmitButton(state);
    }

    _handleValidateInput(evt) {
        const _currentField = evt.target;
        this._toggleInputErrorState(_currentField,this._settings);
        this._toggleButtonState(this._form.checkValidity());
    }

    resetError() {  
        this._inputList.forEach((input) => {
          // здесь очищаем ошибки валидации с помощью _hideInputError
          this._makeInputValid(input);
          });
        // актуализируем состояние кнопки
        this.disableSubmitButton();
        }
    disableSubmitButton() {
        this._submitButton.setAttribute('disabled',true);
    }
    
    _setEventListeners() {
        this._form.addEventListener('input',(evt) => this._handleValidateInput(evt)); 
    }

    enableValidation () {
        this._setEventListeners();
    }
}