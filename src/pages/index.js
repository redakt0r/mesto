import "./index.css";

import {
  initialCards,
  validationConfig,
  newCardAddButton,
  newCardForm,
  profileForm,
  editProfileButton,
  inputName,
  inputOccupation,
} from "../components/constants.js";

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
    renderer: (item) => {
      return renderInstanceCard(item);
    },
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

//открытие попапа добавления новой карточки и сброс полей фомры
newCardAddButton.addEventListener("click", () => {
  formValidatorCard.toggleSubmitButton();
  formValidatorCard.clearInputErrors();
  addCardPopup.open();
});

//инстанс формы новой карточки
const formValidatorCard = new FormValidator(newCardForm, validationConfig);

//инстанс формы редактирования профиля
const formValidatorProfile = new FormValidator(profileForm, validationConfig);

//запуск валидации форм
formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();

//инстанс информации профиля
const profileInfo = new UserInfo(".profile__name", ".profile__occupation");

//инстанс попапа добавления карточки
const editProfilePopup = new PopupWithForm(".popup_aim_profile", () => {
  profileInfo.setUserInfo(editProfilePopup.getInputValues());
});

editProfilePopup.setEventListeners();

//открытие попапа редактирования профиля
editProfileButton.addEventListener("click", () => {
  formValidatorProfile.toggleSubmitButton();
  formValidatorProfile.clearInputErrors();
  inputName.value = profileInfo.getUserInfo().name;
  inputOccupation.value = profileInfo.getUserInfo().occupation;
  editProfilePopup.open();
});
