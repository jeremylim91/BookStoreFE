import axios from './axiosConfigs.js';

export default {
  namespaced: true,
  state: () => ({
    newBook: {},
  }),
  mutations: {
    // updateBook(state, data) {
    //   console.log(`data in mutations after updating book:`);
    //   console.log(data);
    //   // update the new book state
    //   state.newBook = data;
    // },
  },
  actions: {
    updateBook({ state, commit, rootState }, payload) {
      axios
        .put('/books/updateBook', payload)
        .then(({ data }) => {
          // trigger the snackbar
            commit("moduleSnackbar/triggerSnackbar", data, {root:true})

          // commit to getAllBooks data so that the data on the page is refreshed
          commit('moduleAllBooks/getAllBooksData', data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleIsBookAdded({ state, commit, rootState }) {
      commit('toggleIsBookAdded');
    },
  },
  getters: {},
};
