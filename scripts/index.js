import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//переменные для редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

//попапы
const profilePopup = document.querySelector(".popup_aim_profile");
const picturePopup = document.querySelector(".popup_aim_picture");
const newCardPopup = document.querySelector(".popup_aim_cards");

//переменные для сохранения новой карточки
const newCardForm = newCardPopup.querySelector(".popup__form_aim_cards");
const placeInput = newCardForm.querySelector(".popup__input_name_place");
const linkInput = newCardForm.querySelector(".popup__input_name_link");
const newCardSaveButton = newCardForm.querySelector(".popup__save-button");

//закрытие попапа по Escape
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

//для открытия попапа
function openPopup(popup) {
  document.addEventListener("keydown", closePopupEscape);
  popup.classList.add("popup_opened");
}

//для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  //удаление слушателя закрытия по Escape
  document.removeEventListener("keydown", closePopupEscape);
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

//слушатель клика по кнопке закрытия или по оверлею
popupCloseButtonsList.forEach(function (closeButton) {
  const popup = closeButton.closest(".popup");
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
});

//переменные для сохранения изменений профиля
const profileForm = profilePopup.querySelector(".popup__form_aim_profile");
const nameInput = profileForm.querySelector(".popup__input_name_name");
const occupationInput = profileForm.querySelector(
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
profileForm.addEventListener("submit", handleFormProfileSubmit);

//переменные для добавления карточек
const newCardAddButton = document.querySelector(".profile__card-button");

//для открытия попапа добавления карточек
function openNewCardPopup() {
  newCardForm.reset();
  newCardSaveButton.classList.add("popup__save-button_disabled");
  newCardSaveButton.disabled = true;
  openPopup(newCardPopup);
}

//открытие попапа добавления карточек
newCardAddButton.addEventListener("click", openNewCardPopup);

//переменные для добавления карточек
const elementsContainer = document.querySelector(".cards__list");

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

//функция добавления карточки в разметку
function renderCard(container, element) {
  container.prepend(element);
}

//добавление новой карточки
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const cardData = {
    name: name,
    link: link,
  };
  const card = new Card(cardData, "#cardTemplate", openPicturePopup);
  const cardElement = card.generateCard();
  renderCard(elementsContainer, cardElement);
  closePopup(newCardPopup);
}

//запуск добавления карточки по сабмиту
newCardForm.addEventListener("submit", handleFormCardSubmit);

//создание и отрисовка дефолтных карточек
initialCards.forEach((item) => {
  const card = new Card(item, "#cardTemplate", openPicturePopup);
  const cardElement = card.generateCard();
  renderCard(elementsContainer, cardElement);
});

//настройки для валидации
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  errorClassTemplate: ".popup__input-error_type_",
  errorClassActive: "popup__input-error_active",
  inputHighlightedClass: "popup__input_highlighted",
};

//инстанс формы новой карточки
const formValidatorCard = new FormValidator(
  ".popup__form_aim_cards",
  validationConfig
);

//инстанс формы редактирования профиля
const formValidatorProfile = new FormValidator(
  ".popup__form_aim_profile",
  validationConfig
);

//запуск валидации форм
formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();
