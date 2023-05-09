export default class Card {
  constructor(
    {
      name,
      link,
      likes,
      currentUserId,
      owner,
      _id,
      openPopupFunction,
      handleCardLikeButtonClick,
      handleDeleteButtonClick,
    },
    templateSelector
  ) {
    this._place = name;
    this._link = link;
    this._likes = likes;
    this._userId = currentUserId;
    this._ownerId = owner._id;
    this._cardId = _id;

    this._openPopupFunction = openPopupFunction;
    this._handleCardLikeButtonClick = handleCardLikeButtonClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;

    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  deleteCardOnFront() {
    this._element.remove();
  }

  isLiked() {
    return this._likes.find((item) => item._id === this._userId);
  }

  toggleLikes(likes) {
    this._likesQuantity.textContent = likes.length;
    this._likes = likes;
    if (this.isLiked()) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleCardLikeButtonClick(this);
    });
    if (this._deleteCardButton) {
      this._deleteCardButton.addEventListener("click", () => {
        this._handleDeleteButtonClick(this);
      });
    }
    this._image.addEventListener("click", () => {
      this._openPopupFunction(this._link, this._place);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._image.src = this._link;
    this._image.alt = this._place;
    this._title = this._element.querySelector(".card__title");
    this._title.textContent = this._place;

    this._cardLikeButton = this._element.querySelector(".card__like-button");

    this._likesQuantity = this._element.querySelector(".card__like-counter");
    this.toggleLikes(this._likes);

    this._deleteCardButton = this._element.querySelector(
      ".card__remove-button"
    );
    if (this._ownerId !== this._userId) {
      this._deleteCardButton.remove();
    }

    this._setEventListeners();
    return this._element;
  }
}
