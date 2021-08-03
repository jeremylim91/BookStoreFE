import Vue from 'vue'
import Vuex from 'vuex'
import moduleAllBooks from "./moduleAllBooks.mjs"
import moduleSearch from './moduleSearch.mjs'
import moduleCreateBook from "./moduleCreateBook.mjs"

Vue.use(Vuex)

export default new Vuex.Store({
modules:{
  moduleAllBooks,
  moduleSearch,
  moduleCreateBook
},

  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
})
