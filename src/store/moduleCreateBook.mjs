import axios from "axios";

const VERIFY_URL= 'verifyUrl'

export default {
  namespaced:true,
  state: () => ({
    isUrlValid:false
  }),
  mutations: {
    verifyUrl(state, urlValidity){
      console.log("urlValidity:")
      console.log(urlValidity)
      // Update the state with the data provided
      state.isUrlValid= urlValidity;
      return state.isUrlValid
    }
  },
  actions: {
    verifyUrl({ state, commit, rootState }, payload){
      // query the BE for the data
      axios.get(payload)
      .then((res)=>{
        console.log("the res is")
        console.log(res)
        commit(VERIFY_URL, true)
      }).catch(error=>{
        // Temp error handler:
        
        // Display error in console for debugging
        console.log(`error is:`)
        console.log(error)
        commit(VERIFY_URL, false)
      })
      
    }
  },
  getters: {
    verifyUrl (state) {
      return state.isUrlValid
    },
  }
}