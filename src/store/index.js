import Vue from 'vue';
import Vuex from 'vuex';
import moduleAllBooks from './moduleAllBooks.mjs';
import moduleSearch from './moduleSearch.mjs';
import moduleCreateBook from './moduleCreateBook.mjs';
import moduleUpdateBook from './moduleUpdateBook.mjs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    moduleAllBooks,
    moduleSearch,
    moduleCreateBook,
    moduleUpdateBook,
  },

  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
});
