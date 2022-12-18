export class UserInfo {
    constructor(userElement,aboutElement,avatarElement) {
        this._titleElement= userElement;
        this._subtitleElement = aboutElement;
        this._avatarElement = avatarElement;
    }
    getUserInfo() {
        const title = this._titleElement.textContent;
        const subtitle = this._subtitleElement.textContent;
        return ({title,subtitle});
    }
    setUserInfo(data){
        this._userId = data._id;
        this._avatarElement.src = data.avatar;
        this._titleElement.textContent = data.name;
        this._subtitleElement.textContent = data.about;
    }
    getUserId () {
        return this._userId;
    }
}