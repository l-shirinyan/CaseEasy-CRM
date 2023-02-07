const state = {
  filterTags: [],
  currentDrawer: '',
  currentVDrawerVisibility: false,
  currentVDrawer: '',
  currentVDrawerSize: '25%',
  clientData: {
    clientInfo: {},
    paidToData: {},
    details: {},
    receiptInfo: {},
    currentFiledsCount: [1]
  },
  receiptData: null,
  drawerTitle: ''
}

const mutations = {
  setFilterTags(state, tags) {
    state.filterTags = tags
  },
  setCurrentDrawer(state, drawer) {
    state.currentDrawer = drawer
  },
  resetDrawer(state) {
    state.currentDrawer = ''
  },
  setCurrentVDrawer(state, content) {
    state.currentVDrawer = content
  },
  setVDrawerVisibility(state, model) {
    state.currentVDrawerVisibility = model
  },
  setCurrentVDrawerSize(state, size) {
    state.currentVDrawerSize = size
  },
  resetCurrentVDrawerSize(state) {
    state.currentVDrawerSize = '25%'
  },
  resetVDrawer(state) {
    state.currentVDrawer = ''
  },
  setClientData(state, data) {
    state.clientData = data
  },
  setReceiptData(state, data) {
    state.receiptData = data
  },
  setCurrentDrawerTitle(state, title) {
    state.drawerTitle = title
  }
}

const actions = {
  setFilterTags(context, tags) {
    context.commit('setFilterTags', tags)
  },
  setCurrentDrawer(context, drawer) {
    context.commit('setCurrentDrawer', drawer)
  },
  resetDrawer(context) {
    context.commit('resetDrawer')
  },
  setCurrentVDrawerSize(context, size) {
    context.commit('setCurrentVDrawerSize', size)
  },
  resetCurrentVDrawerSize(context) {
    context.commit('resetCurrentVDrawerSize')
  },
  setCurrentVDrawer(context, content) {
    context.commit('setCurrentVDrawer', content)
  },
  resetVDrawer(context) {
    context.commit('resetVDrawer')
  },
  setVDrawerVisibility(context, model) {
    context.commit('setVDrawerVisibility', model)
  },
  setClientData(context, data) {
    context.commit('setClientData', data)
  },
  setReceiptData(context, data) {
    context.commit('setReceiptData', data)
  },
  setCurrentDrawerTitle(context, title) {
    context.commit('setCurrentDrawerTitle', title)
  }
}

const getters = {
  filterTags(state) {
    return state.filterTags
  },
  currentDrawer(state) {
    return state.currentDrawer
  },
  getCurrentVDrawer(state) {
    return state.currentVDrawer
  },
  getCurrentVDrawerVisibility(state) {
    return state.currentVDrawerVisibility
  },
  getCurrentVDrawerSize(state) {
    return state.currentVDrawerSize
  },
  getClientData(state) {
    return state.clientData
  },
  getReceiptData(state) {
    return state.receiptData
  },
  getCurrentDrawerTitle() {
    return state.drawerTitle
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
