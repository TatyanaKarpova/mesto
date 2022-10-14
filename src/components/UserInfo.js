export default class UserInfo {
    constructor({profileName, profileOccupation}) {
        this._profileName = profileName;
        this._profileOccupation = profileOccupation;
    }

    getUserInfo() {
        this._userInfo = {
            name: this._profileName.textContent,
            occupation: this._profileOccupation.textContent
        };      
        return this._userInfo;
    }

    setUserInfo(userInfo) {
        this._profileName.textContent = userInfo.name;
        this._profileOccupation.textContent = userInfo.occupation;
    }
}