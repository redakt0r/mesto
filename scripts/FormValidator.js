export default class FormValidator {
  constructor(formSelector, config) {
    this._form = document.querySelector(formSelector);
    this._inputsList = this._form.querySelectorAll(config.inputSelector);
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClassTemplate = config.errorClassTemplate;
    this._errorClassActive = config.errorClassActive;
    this._inputHighlightedClass = config.inputHighlightedClass;
  }

  //отображение ошибки валидации
  _showInputError(
    input,
    errorTextElement,
    validationMessage,
    errorClassActive,
    inputHighlightedClass
  ) {
    errorTextElement.textContent = validationMessage;
    errorTextElement.classList.add(errorClassActive);
    input.classList.add(inputHighlightedClass);
  }

  //скрытие сообщения ошибки валидации
  _hideInputError(
    input,
    errorTextElement,
    errorClassActive,
    inputHighlightedClass
  ) {
    errorTextElement.classList.remove(errorClassActive);
    errorTextElement.textContent = "";
    input.classList.remove(inputHighlightedClass);
  }

  //переключатель состояния кнопки сабмита
  _toggleSubmitButton(form, submitButton, inactiveButtonClass) {
    if (form.checkValidity()) {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    } else {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    }
  }

  //проверка валидности ввода
  _checkInputValidity(
    input,
    errorClassTemplate,
    errorClassActive,
    inputHighlightedClass,
    form
  ) {
    this._errorTextElement = form.querySelector(
      `${errorClassTemplate}${input.name}`
    );
    if (!input.validity.valid) {
      this._showInputError(
        input,
        this._errorTextElement,
        input.validationMessage,
        errorClassActive,
        inputHighlightedClass
      );
    } else {
      this._hideInputError(
        input,
        this._errorTextElement,
        errorClassActive,
        inputHighlightedClass
      );
    }
  }

  //установка слушателей проверки валидности и состояния кнопки сабмита
  _setEventListeners(inputsList) {
    inputsList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(
          input,
          this._errorClassTemplate,
          this._errorClassActive,
          this._inputHighlightedClass,
          this._form
        );
        this._toggleSubmitButton(
          this._form,
          this._submitButton,
          this._inactiveButtonClass
        );
      });
    });
  }

  //запуск валидации
  enableValidation() {
    this._setEventListeners(this._inputsList);
  }
}
