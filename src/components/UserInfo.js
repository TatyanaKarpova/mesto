export default class UserInfo {
    constructor({profileNameSelector, profileOccupationSelector}) {
        this._profileName = profileNameSelector;
        this._profileOccupation = profileOccupationSelector;
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