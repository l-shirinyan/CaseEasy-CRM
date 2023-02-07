const state = {
  invoice: []
}

const mutations = {
  setInvoiceData(state, data) {
    data.forEach((elem) => {
      state.invoice.push(elem)
    })
  },
  clearInvoice(state) {
    state.invoice = []
    state.reduceInvoice = []
  }
}

const actions = {
  setInvoiceData(context, data) {
    context.commit('setInvoiceData', data)
  },
  clearInvoice(context) {
    context.commit('clearInvoice')
  }
}

const getters = {
  getInvoiceData(state) {
    return state.invoice
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
