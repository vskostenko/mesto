export class Api {
    constructor(options) {
      // тело конструктора
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
          .then(res => {
            if (res.ok) {
              return res.json();
            }      
            return Promise.reject(`Ошибка: ${res.status}`);
          })
        } 
    getUserInfo() {
            return fetch(`${this._baseUrl}/users/me`, {
              method: 'GET',
              headers: this._headers,
            })
            .then(res => {
              if (res.ok) return res.json();
              return Promise.reject(`Ошибка: ${res.status}`);             
            })
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
        .then(res => {
            if (res.ok) {
              return res.json();
            }      
            return Promise.reject(`Ошибка: ${res.status}`);
        })     
    }
    addCard(data) {
        console.log(data);
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          })
        })
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);             
        })
    }
    delCard(cardId){
      console.log(cardId);
      return fetch(`${this._baseUrl}/cards/${cardId}/`, {
        method: 'DELETE',
        headers: this._headers
        })
      .then(res => {
          if (res.ok) return res.json();
          return Promise.reject(`Ошибка: ${res.status}`);             
      })
    }
    addCardLike(cardId){
      return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers})
        .then(res => {
          if (res.ok) return res.json();
          return Promise.reject(`Ошибка: ${res.status}`);             
      })
    }
    delCardLike(cardId){
      return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers})
        .then(res => {
          if (res.ok) return res.json();
          return Promise.reject(`Ошибка: ${res.status}`);             
      })
    }
  }