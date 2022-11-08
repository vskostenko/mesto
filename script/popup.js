export function openPopup(popupItem) {
    popupItem.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
    popupItem.addEventListener('click', closePopupByOverlay); 
  }
export function closePopup(popupItem) {
    popupItem.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
    popupItem.removeEventListener('click', closePopupByOverlay);
  }
  
function closePopupByOverlay (evt) {
    if (evt.target.classList.contains("popup_opened")){
      closePopup(evt.target);
    }
  }
  
function closePopupByEscape (evt) {
    if (evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
  }