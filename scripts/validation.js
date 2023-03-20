//отображение ошибки валидации
const showInputError = (
  input,
  errorTextElement,
  validationMessage,
  errorClassActive,
  inputHighlightedClass
) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(errorClassActive);
  input.classList.add(inputHighlightedClass);
};

//скрытие сообщения ошибки валидации
const hideInputError = (
  input,
  errorTextElement,
  errorClassActive,
  inputHighlightedClass
) => {
  errorTextElement.classList.remove(errorClassActive);
  errorTextElement.textContent = "";
  input.classList.remove(inputHighlightedClass);
};

//проверка валидности ввода
const checkInputValidity = (
  input,
  errorClassTemplate,
  errorClassActive,
  inputHighlightedClass
) => {
  const errorTextElement = document.querySelector(
    `${errorClassTemplate}${input.name}`
  );
  if (!input.validity.valid) {
    showInputError(
      input,
      errorTextElement,
      input.validationMessage,
      errorClassActive,
      inputHighlightedClass
    );
  } else {
    hideInputError(
      input,
      errorTextElement,
      errorClassActive,
      inputHighlightedClass
    );
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
  errorClassActive,
  inputHighlightedClass
) => {
  const inputsList = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector(submitButtonSelector);
  inputsList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(
        input,
        errorClassTemplate,
        errorClassActive,
        inputHighlightedClass
      );
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
      config.errorClassActive,
      config.inputHighlightedClass
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
  inputHighlightedClass: "popup__input_highlighted",
});
