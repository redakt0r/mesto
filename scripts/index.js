const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup");

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

editProfileButton.addEventListener("click", function () {
  editPopup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
});

const closePopup = document.querySelector(".popup__close-button");

closePopup.addEventListener("click", function () {
  editPopup.classList.remove("popup_opened");
});

const formElement = document.querySelector(".popup__container");
const nameInput = formElement.querySelector(".popup__input_name_name");
const occupationInput = formElement.querySelector(
  ".popup__input_name_occupation"
);

/* const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation"); */

/* nameInput.value = profileName.textContent;
occupationInput.value = profileOccupation.textContent; */

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
  editPopup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", handleFormSubmit);
