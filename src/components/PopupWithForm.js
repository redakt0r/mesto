import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._submitFormFunction = submitFormFunction;
  }

  getInputValues() {
    this._inputsList = this._popupForm.querySelectorAll(".popup__input");
    const formValues = {};
    this._inputsList.forEach((input) => {
      const value = input.value;
      const name = input.name;
      formValues[name] = value;
    });
    return formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFormFunction(this.getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
