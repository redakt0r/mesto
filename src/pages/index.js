import "./index.css";

import {
  initialCards,
  validationConfig,
  newCardAddButton,
  editProfileButton,
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
  fetch("https://mesto.nomoreparties.co/v1/cohort-65/cards", {
    method: "POST",
    headers: {
      authorization: "dc1cd803-f1c8-46ed-844f-d9d2bd71a19f",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: item.place,
      link: item.link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((res) => {
      console.log(res);
      const item = {};
      item.place = res.name;
      item.link = res.link;
      const instanceCard = new Card(item, "#cardTemplate", () => {
        popupWithImage.open(item);
      });
      console.log(instanceCard.generateCard());
      return instanceCard.generateCard();
    });
};

//инстанс секции с карточками
const cardList = new Section(
  {
    items: {},
    renderer: renderInstanceCard,
  },
  ".cards__list"
);

//отрисовка дефолтныйх карточек
//cardList.renderItems();

//инстанс попапа добавления карточки
const addCardPopup = new PopupWithForm(".popup_aim_cards", (item) => {
  console.log(renderInstanceCard(item));
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
const profileInfo = new UserInfo(userData);

//инстанс попапа редактирования профиля
const editProfilePopup = new PopupWithForm(".popup_aim_profile", (data) => {
  api.patchProfileData(data).then((res) => {
    profileInfo.setUserInfo(res);
  });
});

editProfilePopup.setEventListeners();

//открытие попапа редактирования профиля
editProfileButton.addEventListener("click", () => {
  formValidators.profile.toggleSubmitButton();
  formValidators.profile.clearInputErrors();
  editProfilePopup.setInputValues(profileInfo.getUserInfo());
  editProfilePopup.open();
});

//установка данных с сервера
api.getProfileData().then((result) => {
  profileInfo.setUserInfo(result);
});
