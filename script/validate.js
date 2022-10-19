function setSubmitButton (button, state) {
    if (state) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled',true);
    }
}

function makeInputInvalid(input,settings) {
    input.classList.add(settings.inputErrorClass);
}

function makeInputValid(input,settings) {
    input.classList.remove(settings.inputErrorClass);
}

function toggleInputErrorState(input,settings) {
    if (!input.validity.valid) {
        makeInputInvalid(input,settings);
    } else {
        makeInputValid(input,settings);
    }
    const errorSpan = input.parentNode.querySelector(`#${input.name}-error`);
    errorSpan.textContent = input.validationMessage;
}

function toggleButtonState(submitButton,state) {
    setSubmitButton(submitButton,state);
}

function handleValidateInput(settings,evt) {
    const currentForm = evt.currentTarget;
    const submitButton = currentForm.querySelector(settings.submitButtonSelector);
    const currentField = evt.srcElement;
    toggleInputErrorState(currentField,settings);
    toggleButtonState(submitButton,currentForm.checkValidity());
}

function enableVaildation (settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach((form) => form.addEventListener('input',(evt) => handleValidateInput(settings,evt))); 
}
