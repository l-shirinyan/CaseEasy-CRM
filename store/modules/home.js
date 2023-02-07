const state = {
  currentDrawer: ''
}

const mutations = {
  setCurrentDrawer(state, drawer) {
    state.currentDrawer = drawer
  },
  resetDrawer(state) {
    state.currentDrawer = ''
  }
}

const actions = {
  setCurrentDrawer(context, drawer) {
    context.commit('setCurrentDrawer', drawer)
  },
  resetDrawer(context) {
    context.commit('resetDrawer')
  }
}

const getters = {
  currentDrawer(state) {
    return state.currentDrawer
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
