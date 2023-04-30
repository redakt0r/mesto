export default class UserInfo {
  constructor({
    userNameSelector,
    userOccupationSelector,
    userAvatarSelector,
  }) {
    this._userName = document.querySelector(userNameSelector);
    this._userOccupation = document.querySelector(userOccupationSelector);
    this._userAvatarSelector = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      about: this._userOccupation.textContent,
    };
    return this._userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userOccupation.textContent = data.about;
    this._userAvatarSelector.src = data.avatar;
  }
}
