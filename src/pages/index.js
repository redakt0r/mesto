import "./index.css";

import {
  initialCards,
  validationConfig,
  newCardAddButton,
  editProfileButton,
} from "../utils/constants.js";

import Section from "../components/Section";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

//инстанс попапа полноразмерной картинки
const popupWithImage = new PopupWithImage(".popup_aim_picture");

//запуск метода установки слушателей попапа полноразмерной картинки
popupWithImage.setEventListeners();

//функция создания новой карточки
const renderInstanceCard = (item) => {
  const instanceCard = new Card(item, "#cardTemplate", () => {
    popupWithImage.open(item);
  });
  return instanceCard.generateCard();
};

//инстанс секции с карточками
const cardList = new Section(
  {
    items: initialCards,
    renderer: renderInstanceCard,
  },
  ".cards__list"
);

//отрисовка дефолтныйх карточек
cardList.renderItems();

//инстанс попапа добавления карточки
const addCardPopup = new PopupWithForm(".popup_aim_cards", (item) => {
  cardList.addItem(renderInstanceCard(item));
});

//установка слушателей на попап добавления карточек
addCardPopup.setEventListeners();

//уиверсальный объект инстансов валидации
const formValidators = {};

//для включении валидации форм и записи в уиверсальный объект инстансов валидации
const enableValidation = (config) => {
  const formsList = Array.from(document.forms);
  formsList.forEach((form) => {
    const validator = new FormValidator(form, config);
    const formName = form.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

//открытие попапа добавления новой карточки и сброс полей фомры
newCardAddButton.addEventListener("click", () => {
  formValidators.cards.toggleSubmitButton();
  formValidators.cards.clearInputErrors();
  addCardPopup.open();
});

//инстанс информации профиля
const profileInfo = new UserInfo(".profile__name", ".profile__occupation");

//инстанс попапа добавления карточки
const editProfilePopup = new PopupWithForm(".popup_aim_profile", (data) => {
  profileInfo.setUserInfo(data);
});

editProfilePopup.setEventListeners();

//открытие попапа редактирования профиля
editProfileButton.addEventListener("click", () => {
  formValidators.profile.toggleSubmitButton();
  formValidators.profile.clearInputErrors();
  editProfilePopup.setInputValues(profileInfo.getUserInfo());
  editProfilePopup.open();
});
