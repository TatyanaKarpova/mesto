export default class UserInfo {
    constructor({profileName, profileOccupation}) {
        this._profileName = profileName;
        this._profileOccupation = profileOccupation;
    }

    getUserInfo() {
        this._userInfo = {
            userName: this._profileName.textContent,
            userOccupation: this._profileOccupation.textContent
        }
        return this._userInfo;
    }

    setUserInfo(userInfo) {
        this._profileName.textContent = userInfo.userName;
        this._profileOccupation.textContent = userInfo.userOccupation;
    }
}