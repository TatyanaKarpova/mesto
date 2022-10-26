export default class UserInfo {
    constructor({profileName, profileOccupation, profileAvatar}) {
        this._profileName = profileName;
        this._profileOccupation = profileOccupation;
        this._profileAvatar = profileAvatar;
    }

    getUserInfo() {
        this._userInfo = {
            name: this._profileName.textContent,
            occupation: this._profileOccupation.textContent,
            avatar: this._profileAvatar.src
        };      
        return this._userInfo;
    }

    setUserInfo(userInfo) {
        if (userInfo.name && userInfo.occupation && userInfo.avatar) {
            this._profileName.textContent = userInfo.name;
            this._profileOccupation.textContent = userInfo.occupation;
            this._profileAvatar.src = userInfo.avatar;
        }
    }
}