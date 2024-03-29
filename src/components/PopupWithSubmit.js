import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFormFunction();
    });
    super.setEventListeners();
  }

  //переопределение метода открытия, добавление функции сабмита
  open(submitFormFunction) {
    super.open();
    this._submitFormFunction = submitFormFunction;
  }
}
