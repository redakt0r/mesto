export default class Card {
  constructor(data, templateSelector, openPopupFunction) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._openPopupFunction = openPopupFunction;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  _handleCardLikeButtonClick() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleCardLikeButtonClick();
    });
    this._deleteCardButton.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });
    this._image.addEventListener("click", () => {
      this._openPopupFunction(this._link, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title = this._element.querySelector(".card__title");
    this._title.textContent = this._name;
    this._cardLikeButton = this._element.querySelector(".card__like-button");
    this._deleteCardButton = this._element.querySelector(
      ".card__remove-button"
    );
    this._setEventListeners();
    return this._element;
  }
}