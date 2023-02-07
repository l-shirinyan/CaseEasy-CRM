const state = {
  filterTags: [],
  currentDrawer: '',
  currentVDrawerVisibility: false,
  currentVDrawer: '',
  currentVDrawerSize: '25%',
  currentDrawerTitle: ''
}

const mutations = {
  setFilterTags(state, tags) {
    state.filterTags = tags
  },
  setCurrentDrawer(state, drawer) {
    state.currentDrawer = drawer
  },
  setCurrentDrawerTitle(state, title) {
    state.currentDrawerTitle = title
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
  }
}

const actions = {
  setFilterTags(context, tags) {
    context.commit('setFilterTags', tags)
  },
  setCurrentDrawer(context, drawer) {
    context.commit('setCurrentDrawer', drawer)
  },
  setCurrentDrawerTitle(context, title) {
    context.commit('setCurrentDrawerTitle', title)
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
  getCurrentDrawerTitle() {
    return state.currentDrawerTitle
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
