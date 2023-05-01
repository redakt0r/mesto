import "./index.css";

import {
  validationConfig,
  newCardAddButton,
  editProfileButton,
  editAvatarButton,
  userData,
} from "../utils/constants.js";

import Section from "../components/Section";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/API";

//Токен: dc1cd803-f1c8-46ed-844f-d9d2bd71a19f
//Идентификатор группы: cohort-65

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-65",
  "dc1cd803-f1c8-46ed-844f-d9d2bd71a19f"
);

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
const cardList = new Section(renderInstanceCard, ".cards__list");

//отрисовка дефолтныйх карточек
api.getInitialCards().then((cardsArray) => {
  cardList.renderItems(cardsArray);
});

//инстанс попапа добавления карточки
const addCardPopup = new PopupWithForm(".popup_aim_cards", (item) => {
  api.postNewCard(item).then((res) => {
    cardList.addItem(renderInstanceCard(res));
  });
});

//инстанс попапа редактирования профиля
const editProfilePopup = new PopupWithForm(".popup_aim_profile", (data) => {
  api.patchProfileData(data).then((res) => {
    profileInfo.setUserInfo(res);
  });
});

//инстанс попапа изменения аватара
const editAvatarPopup = new PopupWithForm(".popup_aim_avatar", (data) => {
  api.patchAvatar(data).then((res) => {
    profileInfo.setUserInfo(res);
  });
});

//установка слушателей на попапы
editAvatarPopup.setEventListeners();
editProfilePopup.setEventListeners();
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
const profileInfo = new UserInfo(userData);

//открытие попапа редактирования профиля
editProfileButton.addEventListener("click", () => {
  formValidators.profile.toggleSubmitButton();
  formValidators.profile.clearInputErrors();
  editProfilePopup.setInputValues(profileInfo.getUserInfo());
  editProfilePopup.open();
});

//установка данных пользователя с сервера
api.getProfileData().then((result) => {
  profileInfo.setUserInfo(result);
});

editAvatarButton.addEventListener("click", () => {
  formValidators.avatar.toggleSubmitButton();
  formValidators.avatar.clearInputErrors();
  editAvatarPopup.open();
});
