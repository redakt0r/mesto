import { initialCards, validationConfig } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//попапы
const profilePopup = document.querySelector(".popup_aim_profile");
const picturePopup = document.querySelector(".popup_aim_picture");
const newCardPopup = document.querySelector(".popup_aim_cards");

//переменные для сохранения новой карточки
const newCardForm = newCardPopup.querySelector(".popup__form_aim_cards");
const placeInput = newCardForm.querySelector(".popup__input_name_place");
const linkInput = newCardForm.querySelector(".popup__input_name_link");

//переменные для сохранения изменений профиля
const profileForm = profilePopup.querySelector(".popup__form_aim_profile");
const nameInput = profileForm.querySelector(".popup__input_name_name");
const occupationInput = profileForm.querySelector(
  ".popup__input_name_occupation"
);

//инстанс формы новой карточки
const formValidatorCard = new FormValidator(newCardForm, validationConfig);

//инстанс формы редактирования профиля
const formValidatorProfile = new FormValidator(profileForm, validationConfig);

//запуск валидации форм
formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();

//переменные для редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

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
  formValidatorProfile.clearInputErrors();
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
const elementsContainer = document.querySelector(".cards__list");

//для открытия попапа добавления карточек
function openNewCardPopup() {
  newCardForm.reset();
  formValidatorCard.toggleSubmitButton();
  formValidatorCard.clearInputErrors();
  openPopup(newCardPopup);
}

//открытие попапа добавления карточек
newCardAddButton.addEventListener("click", openNewCardPopup);

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

//инстанс карточки и ее создание
function renderInstanceCard(name, link) {
  const instanceCard = new Card(name, link, "#cardTemplate", openPicturePopup);
  const cardElement = instanceCard.generateCard();
  renderCard(elementsContainer, cardElement);
}

//добавление новой карточки
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  renderInstanceCard(placeInput.value, linkInput.value);
  closePopup(newCardPopup);
}

//запуск добавления карточки по сабмиту
newCardForm.addEventListener("submit", handleFormCardSubmit);

//создание и отрисовка дефолтных карточек
initialCards.forEach((item) => {
  renderInstanceCard(item.name, item.link);
});
