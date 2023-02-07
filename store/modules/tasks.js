const state = {
  filterTags: [],
  currentDrawer: '',
  currentVDrawerVisibility: false,
  currentVDrawer: '',
  currentVDrawerSize: '25%',
  tasksMembers: []
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
  tasksMembers(state, members) {
    state.tasksMembers = members
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
  setTasksMembers(context, members) {
    context.commit('tasksMembers', members)
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
  getTaskMembers(state) {
    return state.tasksMembers
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
