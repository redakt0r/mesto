import "./index.css";

import {
  validationConfig,
  newCardAddButton,
  editProfileButton,
  editAvatarButton,
  userData,
  apiConfig,
} from "../utils/constants.js";

import Section from "../components/Section";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/API";
import PopupWithSubmit from "../components/PopupWithSubmit";

//инстансы
const api = new Api(apiConfig);
const profileInfo = new UserInfo(userData);
const popupWithsubmit = new PopupWithSubmit(".popup_aim_submit");
const popupWithImage = new PopupWithImage(".popup_aim_picture");

const editProfilePopup = new PopupWithForm(".popup_aim_profile", (data) => {
  editProfilePopup.renderLoading(true);
  api
    .patchProfileData(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
    })
    .then(() => {
      editProfilePopup.close();
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
});

const editAvatarPopup = new PopupWithForm(".popup_aim_avatar", (data) => {
  editAvatarPopup.renderLoading(true);
  api
    .patchAvatar(data)
    .then((res) => {
      profileInfo.setUserInfo(res);
    })
    .then(() => {
      editAvatarPopup.close();
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
});

//установка данных пользователя с сервера
//отрисовка дефолтныйх карточек
Promise.all([api.getProfileData(), api.getInitialCards()])
  .then(([userData, cardsArray]) => {
    profileInfo.setUserInfo(userData);
    cardList.renderItems(cardsArray);
  })
  .catch((err) => {
    console.log(err);
  });

//запуск метода установки слушателей попапов
popupWithsubmit.setEventListeners();
popupWithImage.setEventListeners();
editAvatarPopup.setEventListeners();
editProfilePopup.setEventListeners();

//функция создания новой карточки
const renderInstanceCard = (item) => {
  item.openPopupFunction = () => {
    popupWithImage.open(item);
  };
  item.currentUserId = profileInfo.getUserInfo().userId;
  item.handleCardLikeButtonClick = (card) => {
    if (card.isLiked()) {
      api
        .deleteLike(item)
        .then((res) => {
          card.toggleLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    } else
      api
        .putLike(item)
        .then((res) => {
          card.toggleLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
  };
  item.handleDeleteButtonClick = (card) => {
    popupWithsubmit.open(() => {
      api
        .deleteCard(item)
        .then(() => {
          card.deleteCardOnFront();
          popupWithsubmit.close();
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    });
  };
  const instanceCard = new Card(item, "#cardTemplate");
  return instanceCard.generateCard();
};

//инстанс секции с карточками
const cardList = new Section(renderInstanceCard, ".cards__list");

//инстанс попапа добавления карточки
const addCardPopup = new PopupWithForm(".popup_aim_cards", (data) => {
  addCardPopup.renderLoading(true);
  api
    .postNewCard(data)
    .then((res) => {
      cardList.addItem(renderInstanceCard(res));
    })
    .then(() => {
      addCardPopup.close();
    })
    .finally(() => {
      setTimeout(() => {
        addCardPopup.renderLoading(false); //не для "искусственной задержки", а чтобы спрятать "мерцание" надписи на кнопке сабмита, видимое из-за плавного закрытия попапа(оставил для сравнения)
      }, 400);
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
});

//установка слушателей попапа добавления карточки
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

//открытие попапа редактирования профиля
editProfileButton.addEventListener("click", () => {
  formValidators.profile.toggleSubmitButton();
  formValidators.profile.clearInputErrors();
  editProfilePopup.setInputValues(profileInfo.getUserInfo());
  editProfilePopup.open();
});

//открытие попапа изменения аватара
editAvatarButton.addEventListener("click", () => {
  formValidators.avatar.toggleSubmitButton();
  formValidators.avatar.clearInputErrors();
  editAvatarPopup.open();
});
