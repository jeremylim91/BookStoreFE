import axios from "./axiosConfigs.js"

export const GET_SEARCH_RESULTS="getSearchResults" 

export default {
  namespaced:true,
  state: () => ({
    searchResults: [],
  }),
  mutations: {
    getSearchResults(state, data){
      console.log("data in mutations is:")
      console.log(data)
      // Update the state with the data provided
      state.searchResults= [...data];
    
    }
  },
  actions: {
    getSearchResults({ state, commit, rootState },  payload){
      console.log("payload is:")
      console.log(payload)

      // query the BE for the data
      axios.get(`/books/findByText?text=${payload}`)
      .then(({data})=>{
        console.log("search results from BE is:")
        console.log(data)
        commit(GET_SEARCH_RESULTS, data)
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
    getSearchResults(state, getters, rootState){
      console.log("inside getter")
      console.log(state.searchResults)
      return state.searchResults;
    }
  }
}