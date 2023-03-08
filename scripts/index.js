//переменные для редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

//попапы
const profilePopup = document.querySelector(".popup_aim_profile");
const picturePopup = document.querySelector(".popup_aim_picture");
const newCardPopup = document.querySelector(".popup_aim_cards");

//для открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//открытие попапа редактирования профиля по клику + заполнение полей формы
editProfileButton.addEventListener("click", function () {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
});

//кнопки закрытия попапов
const profilePopupCloseButton = profilePopup.querySelector(
  ".popup__close-button_aim_profile"
);
const picturePopupCloseButton = picturePopup.querySelector(
  ".popup__close-button_aim_picture"
);
const newCardPopupCloseButton = newCardPopup.querySelector(
  ".popup__close-button_aim_cards"
);

//закрытие попапов без изменений
profilePopupCloseButton.addEventListener("click", function () {
  closePopup(profilePopup);
});
picturePopupCloseButton.addEventListener("click", function () {
  closePopup(picturePopup);
});
newCardPopupCloseButton.addEventListener("click", function () {
  closePopup(newCardPopup);
});

//переменные для сохранения изменений профиля
const formProfile = profilePopup.querySelector(".popup__form_aim_profile");
const nameInput = formProfile.querySelector(".popup__input_name_name");
const occupationInput = formProfile.querySelector(
  ".popup__input_name_occupation"
);

//функция сохранения изменений профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  closePopup(profilePopup);
}

//запуск функции сохранения по сабмиту
formProfile.addEventListener("submit", handleFormProfileSubmit);

//переменные для добавления карточек
const newCardAddButton = document.querySelector(".profile__card-button");

//открытие попапа добавления карточек
newCardAddButton.addEventListener("click", function () {
  openPopup(newCardPopup);
  placeInput.value = "";
  linkInput.value = "";
});

//переменные для добавления карточек
const elementsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#cardTemplate").content;

//удаление карточки по нажатию на корзину
function handleDeleteButtonClick(event) {
  const button = event.target;
  const card = button.closest(".cards__item");
  card.remove();
}

//тумблер для лайка
function handleLikeButtonClick(event) {
  const button = event.target;
  button.classList.toggle("card__like-button_active");
}

//картинка
const fullSizePicture = picturePopup.querySelector(".popup__picture");
const pictureTitle = picturePopup.querySelector(".popup__caption");

//функция создания карточки (клонирование темплейта с содержимым -> заполнение его полей ->
// -> установка слушателей на кнопки удаления, лайк, открытие попапа картинки ->
function createCard(card) {
  const newCard = cardTemplate.cloneNode(true);
  const cardTitle = newCard.querySelector(".card__title");
  cardTitle.textContent = card.name;
  const cardImage = newCard.querySelector(".card__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  const deleteButton = newCard.querySelector(".card__remove-button");
  deleteButton.addEventListener("click", handleDeleteButtonClick);
  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeButtonClick);
  const picture = newCard.querySelector(".card__image");
  picture.addEventListener("click", function () {
    openPopup(picturePopup);
    fullSizePicture.setAttribute("src", card.link);
    fullSizePicture.setAttribute("alt", card.name);
    pictureTitle.textContent = card.name;
  });
  return newCard;
}

//функция добавления карточки в разметку
function renderCard(container, element) {
  container.prepend(element);
}

//добавление дефолтных карточек при загрузке
initialCards.forEach(function (card) {
  renderCard(elementsContainer, createCard(card));
});

//переменные для сохранения новой карточки
const newCardForm = newCardPopup.querySelector(".popup__form_aim_cards");
const placeInput = newCardForm.querySelector(".popup__input_name_place");
const linkInput = newCardForm.querySelector(".popup__input_name_link");

//добавление новой карточки
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const card = {
    name: name,
    link: link,
  };
  renderCard(elementsContainer, createCard(card));
  closePopup(newCardPopup);
}

//запуск добавления карточки по сабмиту
newCardForm.addEventListener("submit", handleFormCardSubmit);
