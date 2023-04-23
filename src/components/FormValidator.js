export default class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._inputsList = this._form.querySelectorAll(config.inputSelector);
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClassTemplate = config.errorClassTemplate;
    this._errorClassActive = config.errorClassActive;
    this._inputHighlightedClass = config.inputHighlightedClass;
  }

  //отображение ошибки валидации
  _showInputError(input, errorTextElement) {
    errorTextElement.textContent = input.validationMessage;
    errorTextElement.classList.add(this._errorClassActive);
    input.classList.add(this._inputHighlightedClass);
  }

  //скрытие сообщения ошибки валидации
  _hideInputError(input, errorTextElement) {
    errorTextElement.classList.remove(this._errorClassActive);
    errorTextElement.textContent = "";
    input.classList.remove(this._inputHighlightedClass);
  }

  //переключатель состояния кнопки сабмита
  toggleSubmitButton() {
    if (this._form.checkValidity()) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }

  //проверка валидности ввода
  _checkInputValidity(input) {
    this._errorTextElement = this._form.querySelector(
      `${this._errorClassTemplate}${input.name}`
    );
    if (!input.validity.valid) {
      this._showInputError(input, this._errorTextElement);
    } else {
      this._hideInputError(input, this._errorTextElement);
    }
  }

  //установка слушателей проверки валидности и состояния кнопки сабмита
  _setEventListeners() {
    this._inputsList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleSubmitButton();
      });
    });
  }

  //запуск валидации
  enableValidation() {
    this._setEventListeners();
  }

  //сброс активных ошибок
  clearInputErrors() {
    this._inputsList.forEach((input) => {
      this._errorTextElement = this._form.querySelector(
        `${this._errorClassTemplate}${input.name}`
      );
      this._hideInputError(input, this._errorTextElement);
    });
  }
}
