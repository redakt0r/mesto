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

//для открытие попапа редактирования профиля
function openProfilePopup() {
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
  openPopup(profilePopup);
}

//открытие попапа редактирования профиля по клику + заполнение полей формы
editProfileButton.addEventListener("click", openProfilePopup);

//псевдомассив кнопок закрытия попапов
const popupCloseButtonsList = document.querySelectorAll(".popup__close-button");

popupCloseButtonsList.forEach(function (closeButton) {
  const popup = closeButton.closest(".popup");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
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

//для открытия попапа добавления карточек
function openNewCardPopup() {
  placeInput.value = "";
  linkInput.value = "";
  openPopup(newCardPopup);
}

//открытие попапа добавления карточек
newCardAddButton.addEventListener("click", openNewCardPopup);

//переменные для добавления карточек
const elementsContainer = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#cardTemplate").content.firstElementChild;

//удаление карточки по нажатию на корзину
/* function handleDeleteButtonClick(event) {
  const button = event.target;
  const card = button.closest(".cards__item");
  card.remove();
} */
function handleDeleteButtonClick(card) {
  card.remove();
}

//тумблер для лайка
function handleLikeButtonClick(event) {
  event.target.classList.toggle("card__like-button_active");
}

//картинка
const fullSizePicture = picturePopup.querySelector(".popup__picture");
const pictureTitle = picturePopup.querySelector(".popup__caption");

//для открытия попапа полноразмерной картинки
function openPicturePopup(link, name) {
  fullSizePicture.setAttribute("src", link);
  fullSizePicture.setAttribute("alt", name);
  pictureTitle.textContent = name;
  openPopup(picturePopup);
}

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
  deleteButton.addEventListener("click", function () {
    handleDeleteButtonClick(newCard);
  });
  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeButtonClick);
  const picture = newCard.querySelector(".card__image");
  picture.addEventListener("click", function () {
    openPicturePopup(card.link, card.name);
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
