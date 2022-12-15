export class UserInfo {
    constructor(userSelector,aboutSelector) {
        this._titleElement= userSelector;
        this._subtitleElement = aboutSelector;
    }
    getUserInfo() {
        const title = this._titleElement.textContent;
        const subtitle = this._subtitleElement.textContent;
        return ({title,subtitle});
    }
    setUserInfo(data){
        this._userId = data._id;
        console.log(data._id);
        this._titleElement.textContent = data.name;
        this._subtitleElement.textContent = data.about;
    }
    getUserId () {
        return this._userId;
    }
}