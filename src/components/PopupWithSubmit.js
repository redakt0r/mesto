import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._submitFormFunction = submitFormFunction;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFormFunction();
      this.close();
    });
    super.setEventListeners();
  }
}
