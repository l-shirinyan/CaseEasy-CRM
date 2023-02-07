const state = {
  payload: null,
  total: null
}

const mutations = {
  setPayload(state, payload) {
    state.payload = payload
  },
  setTotal(state, total) {
    state.total = total
  }
}

const actions = {
  setPayload(context, payload) {
    context.commit('setPayload', payload)
  },
  setTotal(context, total) {
    context.commit('setTotal', total)
  }
}

const getters = {
  getPayload(state) {
    return state.payload
  },
  getTotal(state) {
    return state.total
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
