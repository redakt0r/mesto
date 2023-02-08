const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup");

editProfileButton.addEventListener("click", function () {
  editPopup.classList.add("popup_opened");
});

const closePopup = document.querySelector(".popup__close-button");

closePopup.addEventListener("click", function () {
  editPopup.classList.remove("popup_opened");
});

const nameInput = document.querySelector(".popup__name-field");
const occupationInput = document.querySelector(".popup__occupation-field");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const profileName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
}
