import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__picture");
    this._popupImageTitle = this._popup.querySelector(".popup__caption");
  }

  open({ link, name }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageTitle.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
