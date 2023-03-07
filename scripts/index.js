//переменные для редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_aim_profile");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

//открытие попапа редактирования профиля по клику + заполнение полей формы
editProfileButton.addEventListener("click", function () {
  profilePopup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
});

//переменные для закрытия попапа редактирования профиля
const closePopup = document.querySelector(".popup__close-button_aim_profile");

//переменные для сохранения изменений профиля
const formProfileElement = document.querySelector(".popup_aim_profile");
const nameInput = formProfileElement.querySelector(".popup__input_name_name");
const occupationInput = formProfileElement.querySelector(
  ".popup__input_name_occupation"
);

//функция сохранения изменений профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  profilePopup.classList.remove("popup_opened");
}

//запуск функции сохранения по нажатию на "Сохранить"
formProfileElement.addEventListener("submit", handleFormSubmit);

//закрытие попапа редактирования профиля без изменений
closePopup.addEventListener("click", function () {
  profilePopup.classList.remove("popup_opened");
});

//переменные для добавления карточек
const addCardButton = document.querySelector(".cards__add-button");
const placePopup = document.querySelector(".popup_aim_cards");

//открытие попапа добавления карточек
addCardButton.addEventListener("click", function () {
  placePopup.classList.add("popup_opened");
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

//добавление дефолтных карточек при загрузке
initialCards.forEach(createCard);

//функция удаления карточки по нажатию на корзину
function handleDeleteButtonClick(event) {
  const button = event.target;
  const card = button.closest(".cards__item");
  card.remove();
}

//функция тумблера для лайка
function handleLikeButtonClick(event) {
  const button = event.target;
  button.classList.toggle("card__like-button_active");
}

const popupPicture = document.querySelector(".popup_aim_picture");
const picture = popupPicture.querySelector(".card__image");
//открытиe попапа картинки
function openPicture() {
  popupPicture.classList.add("popup_opened");
}

//функция создания карточки (клонирование темплейта с содержимым -> заполнение его полей -> установка слушателей на
// кнопку удаления, лайк -> добавление готовой карточки в начало секции cards)
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
  picture.addEventListener("click", openPicture);
  elementsList.prepend(newCard);
}

/* const cardForm = [
  {
    name: "новинка",
    link: "https://picsum.photos/200/300",
  },
  {
    name: "новинка",
    link: "https://picsum.photos/200/300",
  },
]; */
