const validationSettings = {
    formSelector: '.popup__form', 
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button', 
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__field_error',
    errorClass: 'popup__error_visible'
}

function setSubmitButton (button, state) {
    if (state) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled',true);
    }
}

function showError(input,settings) {
    input.classList.add(settings.inputErrorClass);
}

function hideError(input,settings) {
    input.classList.remove(settings.inputErrorClass);
}

function isValidField (input,settings) {
    if (!input.validity.valid) {
        showError(input,settings);
    } else {
        hideError(input,settings);
    }
    const errorSpan = input.parentNode.querySelector(`#${input.name}-error`);
    errorSpan.textContent = input.validationMessage;
}

function handleValidateInput(settings,evt) {
    const currentForm = evt.currentTarget;
    const submitButton = currentForm.querySelector(settings.submitButtonSelector);
    const currentField = evt.srcElement;
    isValidField(currentField,settings);
    if (currentForm.checkValidity()) {
        setSubmitButton(submitButton,true);
    } else {
        setSubmitButton(submitButton,false);
    }
}

function sendForm(evt) {
    evt.preventDefault();
    const currentForm = evt.target;
    if (currentForm.checkValidity()) {
        console.log('форма отправлена');
        evt.target.reset();
    }
    else {
        console.log('нененне');
    }
}

function enableVaildation (settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach((form) => form.addEventListener('input',(evt) => handleValidateInput(settings,evt))); 
}
