//массив дефолтных карточек
const initialCards = [
  {
    place: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    place: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    place: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    place: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    place: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    place: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//настройки для валидации
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  errorClassTemplate: ".popup__input-error_type_",
  errorClassActive: "popup__input-error_active",
  inputHighlightedClass: "popup__input_highlighted",
};

//кнопка добавления новой карточки
const newCardAddButton = document.querySelector(".profile__card-button");

//кнопка для редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");

//селекторы элементов с информацией о пользователе
const userData = {
  userNameSelector: ".profile__name",
  userOccupationSelector: ".profile__occupation",
  userAvatarSelector: ".profile__avatar",
};

export {
  initialCards,
  validationConfig,
  newCardAddButton,
  editProfileButton,
  userData,
};
