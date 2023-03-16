//отображение ошибки валидации
const showInputError = (
  errorTextElement,
  validationMessage,
  errorClassActive
) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(errorClassActive);
};

//скрытие сообщения ошибки валидации
const hideInputError = (errorTextElement, errorClassActive) => {
  errorTextElement.classList.remove(errorClassActive);
  errorTextElement.textContent = "";
};

//проверка валидности ввода
const checkInputValidity = (input, errorClassTemplate, errorClassActive) => {
  const errorTextElement = document.querySelector(
    `${errorClassTemplate}${input.name}`
  );
  if (!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, errorClassActive);
    input.classList.add("popup__input_highlighted");
  } else {
    hideInputError(errorTextElement, errorClassActive);
    input.classList.remove("popup__input_highlighted");
  }
};

//тумблер кнопки "сохранить"
const toggleSubmitButton = (form, submitButton, inactiveButtonClass) => {
  if (form.checkValidity()) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  } else {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }
};

//установка слушателей ввода + тумблера кнопки "сохранить"
const setEventListeners = (
  form,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  errorClassTemplate,
  errorClassActive
) => {
  const inputsList = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector(submitButtonSelector);
  inputsList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, errorClassTemplate, errorClassActive);
      toggleSubmitButton(form, submitButton, inactiveButtonClass);
    });
  });
};

//валидация
const enableValidation = (config) => {
  const formsList = document.querySelectorAll(config.formSelector);
  formsList.forEach((form) => {
    setEventListeners(
      form,
      config.inputSelector,
      config.submitButtonSelector,
      config.inactiveButtonClass,
      config.errorClassTemplate,
      config.errorClassActive
    );
  });
};

//запуск валидации
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  errorClassTemplate: ".popup__input-error_type_",
  errorClassActive: "popup__input-error_active",
});
