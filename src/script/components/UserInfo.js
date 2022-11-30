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
        this._titleElement.textContent = data.title;
        this._subtitleElement.textContent = data.subtitle;
    }
}