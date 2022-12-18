export class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
    _errorDispatcher (res) {
      if (res.ok) {
        return res.json()}
      return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
          })
          .then(res => this._errorDispatcher(res))
        } 
    getUserInfo() {
            return fetch(`${this._baseUrl}/users/me`, {
              method: 'GET',
              headers: this._headers,
            })
            .then(res => this._errorDispatcher(res))
        }
            
    editProfile (data) {
        return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: data.title,
            about: data.subtitle
          })
        })
        .then(res => this._errorDispatcher(res))     
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          })
        })
        .then(res => this._errorDispatcher(res))
    }

    delCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/`, {
        method: 'DELETE',
        headers: this._headers
        })
        .then(res => this._errorDispatcher(res))
    }

    addCardLike(cardId){
      return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers})
        .then(res => this._errorDispatcher(res))
    }

    delCardLike(cardId){
      return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers})
        .then(res => this._errorDispatcher(res))
    }
    
    updateAvatar(data){
       return fetch(`${this._baseUrl}users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.link
          })
        })
        .then(res => this._errorDispatcher(res))
    }
}

