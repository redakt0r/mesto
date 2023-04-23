export default class UserInfo {
  constructor(userNameSelector, userOccupationSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userOccupation = document.querySelector(userOccupationSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      occupation: this._userOccupation.textContent,
    };
    return this._userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userOccupation.textContent = data.occupation;
  }
}
