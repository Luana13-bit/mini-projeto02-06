
// storage.js
export const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('produtos')) || [];
  },

  set(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }
};