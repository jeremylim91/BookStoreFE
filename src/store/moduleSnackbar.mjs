 
 
export default {
  namespaced:true,
 state: () => ({
    snackbar:false,
    snackbarContent:""
  }),
  mutations:{
    triggerSnackbar(state, data){
      state.snackbar=true
    },
    setSnackbar(state, data){
      state.snackbar=data
    },
    setSnackbarContent(state, data){
      state.snackbarContent=data
    }
  },
  actions:{
    triggerSnackbar({state, commit, rootState}, payload){
      commit("triggerSnackbar", payload)
    },
    setSnackbar({state, commit, rootState}, payload){
      commit('setSnackbar', payload)
    },
    setSnackbarContent({state, commit, rootState}, payload){
      commit('setSnackbarContent', payload)
    }
  }, 
  getters: {
    getSnackbar(state, getters, rootState){
      return state.snackbar
    },
    getSnackbarContent(state, getters, rootState){
      return state.snackbarContent
    }
  }
}