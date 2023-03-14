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
const toggleSubmitButton = (form) => {
  const submitButton = form.querySelector(".popup__save-button");
  if (form.checkValidity()) {
    submitButton.classList.remove("popup__save-button_disabled");
    submitButton.disabled = false;
  } else {
    submitButton.classList.add("popup__save-button_disabled");
    submitButton.disabled = true;
  }
};

//установка слушателей ввода + отключение дефолтной отправки формы
const setEventListeners = (
  form,
  inputList,
  errorClassTemplate,
  errorClassActive
) => {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, errorClassTemplate, errorClassActive);
      toggleSubmitButton(form);
    });
  });
};

//валидация
const enebleValidation = (config) => {
  const form = document.querySelector(config.formSelector);
  const inputList = form.querySelectorAll(config.inputListSelector);
  setEventListeners(
    form,
    inputList,
    config.errorClassTemplate,
    config.errorClassActive
  );
};

//валидация профиля
enebleValidation({
  formSelector: ".popup__form_aim_profile",
  inputListSelector: ".popup__input",
  errorClassTemplate: ".popup__input-error_type_",
  errorClassActive: "popup__input-error_active",
});

//валидация новой карточки
enebleValidation({
  formSelector: ".popup__form_aim_cards",
  inputListSelector: ".popup__input",
  errorClassTemplate: ".popup__input-error_type_",
  errorClassActive: "popup__input-error_active",
});
