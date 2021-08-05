import axios from './axiosConfigs.js';

const VERIFY_URL = 'verifyUrl';
const CREATE_BOOK = 'createBook';

export default {
  namespaced: true,
  state: () => ({
    isUrlValid: false,
    newBook: {},
    isBookAdded: false,
  }),
  mutations: {
    verifyUrl(state, urlValidity) {
      console.log('urlValidity:');
      console.log(urlValidity);
      // Update the state with the data provided
      state.isUrlValid = urlValidity;
      return state.isUrlValid;
    },
    createBook(state, data) {
      console.log(`data in mutations after creating book:`);
      console.log(data);
      // update the new book state
      state.newBook = data;
    },
    toggleIsBookAdded(state, data) {
      // setTimeout(() => {
      //   state.isBookAdded = false;
      // }, 6000);
      state.isBookAdded = !state.isBookAdded;
    },
  },
  actions: {
    verifyUrl({ state, commit, rootState }, payload) {
      // query the BE for the data
      axios
        .get(payload)
        .then((res) => {
          console.log('the res is');
          console.log(res);
          commit(VERIFY_URL, true);
        })
        .catch((error) => {
          // Temp error handler:

          // Display error in console for debugging
          console.log(`error is:`);
          console.log(error);
          commit(VERIFY_URL, false);
        });
    },
    createBook({ state, commit, rootState }, payload) {
      axios
        .post('/books/insert', payload)
        .then(({ data }) => {
          
          // Trigger the snackbar
          commit("moduleSnackbar/triggerSnackbar", data, {root:true})
          // commit('toggleIsBookAdded');
          commit(CREATE_BOOK, data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleIsBookAdded({ state, commit, rootState }) {
      commit('toggleIsBookAdded');
    },
  },
  getters: {
    verifyUrl(state) {
      return state.isUrlValid;
    },
    getNewBook(state) {
      return state.newBook;
    },
    getIsBookAdded(state) {
      return state.isBookAdded;
    },
  },
};
