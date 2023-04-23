import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__picture");
    this._popupImageTitle = this._popup.querySelector(".popup__caption");
  }

  open({ link, place }) {
    this._popupImage.src = link;
    this._popupImage.alt = place;
    this._popupImageTitle.textContent = place;
    super.open();
  }
}

export default PopupWithImage;
