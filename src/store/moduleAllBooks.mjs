import axios from "./axiosConfigs.js"

const GET_ALL_BOOOKS_DATA="getAllBooksData" 

export default {
  namespaced:true,
  state: () => ({
    count: 0,
    allBooksData: []
  }),
  mutations: {
    increment (state) {
      // `state` is the local module state
      state.count++
    },
    getAllBooksData(state, data){
      console.log("data in mutations is:")
      console.log(data)
      // Update the state with the data provided
      state.allBooksData= [...data];
    
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    },
    getAllBooksData({ state, commit, rootState }, payload){
      // query the BE for the data
      axios.get("/books/findAll")
      .then(({data})=>{
        console.log("allBooksData from BE is:")
        console.log(data)
        commit(GET_ALL_BOOOKS_DATA, data)
      }).catch(error=>{
        // Temp error handler:
        alert("There was an error getting the data. Please refresh your page and try again")
        // Display error in console for debugging
        console.log(`error is:`)
        console.log(error)
      })
      
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    },
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    },
    getAllBooksData(state, getters, rootState){
      return state.allBooksData;
    }
  }
}