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
   
      // Update the state with the data provided
      state.allBooksData= [...data];
    
    }
  },
  actions: {
    
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
    },
    deleteBook({state, commit, rootstate}, payload){
      console.log('payload is:')
      console.log(payload)
      axios.delete(`/books/deleteBook?bookId=${payload}`)
      .then(({data})=>{
        console.log("data from deleting book")
        console.log(data)

        commit("moduleSnackbar/triggerSnackbar", data, {root:true})
        
        commit("getAllBooksData", data)
      })
      .catch(error=> {
        alert("There was an error performing this task. Please refresh your page and try again")
        console.log(error)
      })
    }
  },
  getters: {
    getAllBooksData(state, getters, rootState){
      return state.allBooksData;
    }
  }
}