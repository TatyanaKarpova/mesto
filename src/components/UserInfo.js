export default class UserInfo {
    constructor({ profileName, profileOccupation, profileAvatar }) {
      this._profileName = profileName;
      this._profileOccupation = profileOccupation;
      this._profileAvatar = profileAvatar;
    }
  
    getUserInfo() {
      this._userInfo = {
        name: this._profileName.textContent,
        about: this._profileOccupation.textContent,
        avatar: this._profileAvatar.src,
      };
      return this._userInfo;
    }
  
    setUserInfo(userInfo) {
      this._profileName.textContent = userInfo.name;
      this._profileOccupation.textContent = userInfo.about;
      this._profileAvatar.src = userInfo.avatar;
    }
  }  