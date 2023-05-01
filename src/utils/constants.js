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

//кнопки для редактирования профиля
const editProfileButton = document.querySelector(
  ".profile__edit-button_aim_info"
);
const editAvatarButton = document.querySelector(
  ".profile__edit-button_aim_avatar"
);

//селекторы элементов с информацией о пользователе
const userData = {
  userNameSelector: ".profile__name",
  userOccupationSelector: ".profile__occupation",
  userAvatarSelector: ".profile__avatar",
};

export {
  validationConfig,
  newCardAddButton,
  editProfileButton,
  userData,
  editAvatarButton,
};
