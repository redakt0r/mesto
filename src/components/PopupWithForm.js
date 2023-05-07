import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._submitFormFunction = submitFormFunction;
    this._inputsList = this._popupForm.querySelectorAll(".popup__input");
    this._submitButton = this._popup.querySelector(".popup__save-button");
    this._submitButtonInitialTextContent = this._submitButton.textContent;
  }

  getInputValues() {
    const formValues = {};
    this._inputsList.forEach((input) => {
      const value = input.value;
      const name = input.name;
      formValues[name] = value;
    });
    return formValues;
  }

  setInputValues(data) {
    this._inputsList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFormFunction(this.getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else
      this._submitButton.textContent = this._submitButtonInitialTextContent;
  }
}
