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

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileOccupation.textContent = data.occupation;
    }
}