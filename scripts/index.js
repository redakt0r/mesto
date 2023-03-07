//переменные для редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

//попапы
const profilePopup = document.querySelector(".popup_aim_profile");
const picturePopup = document.querySelector(".popup_aim_picture");
const cardsPopup = document.querySelector(".popup_aim_cards");

//универсальная функция открытия/закрытия попапа
function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

//открытие попапа редактирования профиля по клику + заполнение полей формы
editProfileButton.addEventListener("click", function () {
  togglePopup(profilePopup);
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
});

//кнопки закрытия попапов
const closeProfilePopup = profilePopup.querySelector(
  ".popup__close-button_aim_profile"
);
const closePicturePopup = picturePopup.querySelector(
  ".popup__close-button_aim_picture"
);
const closeCardsPopup = cardsPopup.querySelector(
  ".popup__close-button_aim_cards"
);

//закрытие попапов без изменений
closeProfilePopup.addEventListener("click", function () {
  togglePopup(profilePopup);
});
closePicturePopup.addEventListener("click", function () {
  togglePopup(picturePopup);
});
closeCardsPopup.addEventListener("click", function () {
  togglePopup(cardsPopup);
});

//переменные для сохранения изменений профиля
const formProfile = document.querySelector(".popup_aim_profile");
const nameInput = formProfile.querySelector(".popup__input_name_name");
const occupationInput = formProfile.querySelector(
  ".popup__input_name_occupation"
);

//функция сохранения изменений профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  togglePopup(profilePopup);
}

//запуск функции сохранения по нажатию на "Сохранить"
formProfile.addEventListener("submit", handleFormProfileSubmit);

//переменные для добавления карточек
const addCardButton = document.querySelector(".cards__add-button");

//открытие попапа добавления карточек
addCardButton.addEventListener("click", function () {
  togglePopup(cardsPopup);
});

//массив дефолтных карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//переменные для добавления дефолтных карточек
const elementsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#cardTemplate").content;

//удаление карточки по нажатию на корзину
function handleDeleteButtonClick(event) {
  const button = event.target;
  const card = button.closest(".cards__item");
  card.remove();
}

//тумблер для лайка
function handleLikeButtonClick(event) {
  const button = event.target;
  button.classList.toggle("card__like-button_active");
}

//картинка
const fullSizePicture = picturePopup.querySelector(".picture");
const pictureTitle = picturePopup.querySelector(".picture__title");

//функция создания карточки (клонирование темплейта с содержимым -> заполнение его полей ->
// -> установка слушателей на кнопку удаления, лайк, открытие попапа картинки ->
// -> добавление готовой карточки в начало секции cards)
function createCard(card) {
  const newCard = cardTemplate.cloneNode(true);
  const cardTitle = newCard.querySelector(".card__title");
  cardTitle.textContent = card.name;
  const cardImage = newCard.querySelector(".card__image");
  cardImage.setAttribute("src", card.link);
  const deleteButton = newCard.querySelector(".card__remove-button");
  deleteButton.addEventListener("click", handleDeleteButtonClick);
  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeButtonClick);
  const picture = newCard.querySelector(".card__image");
  picture.addEventListener("click", function () {
    togglePopup(picturePopup);
    fullSizePicture.setAttribute("src", card.link);
    pictureTitle.textContent = card.name;
  });
  elementsList.prepend(newCard);
}

//добавление дефолтных карточек при загрузке
initialCards.forEach(createCard);

//переменные для сохранения новой карточки
const formCard = document.querySelector(".popup_aim_cards");
const placeInput = formCard.querySelector(".popup__input_name_place");
const linkInput = formCard.querySelector(".popup__input_name_link");

//добавление новой карточки
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  const card = {
    name: name,
    link: link,
  };
  createCard(card);
  togglePopup(cardsPopup);
}

//запуск добавления карточки по сабмиту
formCard.addEventListener("submit", handleFormCardSubmit);
