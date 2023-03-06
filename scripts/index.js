const editProfileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_aim_profile");

const profileName = profilePopup.querySelector(".profile__name");
const profileOccupation = profilePopup.querySelector(".profile__occupation");

editProfileButton.addEventListener("click", function () {
  profilePopup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
});

const closePopup = document.querySelector(".popup__close-button_aim_profile");

closePopup.addEventListener("click", function () {
  profilePopup.classList.remove("popup_opened");
});

const addCardButton = document.querySelector(".profile__add-button");
const placePopup = document.querySelector(".popup_aim_cards");
addCardButton.addEventListener("click", function () {
  placePopup.classList.add("popup_opened");
});

const formProfileElement = document.querySelector(".popup_aim_profile");
const nameInput = formProfileElement.querySelector(".popup__input_name_name");
const occupationInput = formProfileElement.querySelector(
  ".popup__input_name_occupation"
);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  profilePopup.classList.remove("popup_opened");
}

formProfileElement.addEventListener("submit", handleFormSubmit);

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

const elementsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#cardTemplate").content;

function handleDeleteButtonClick(event) {
  const button = event.target;
  const card = button.closest(".cards__item");
  card.remove();
}

function handleLikeButtonClick(event) {
  const button = event.target;
  button.classList.toggle("card__like-button_active");
}

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
  elementsList.prepend(newCard);
}

initialCards.forEach(createCard);

const cardForm = [
  {
    name: "новинка",
    link: "https://picsum.photos/200/300",
  },
  {
    name: "новинка",
    link: "https://picsum.photos/200/300",
  },
];

//addCardButton.addEventListener("click", console.log("ad"));
