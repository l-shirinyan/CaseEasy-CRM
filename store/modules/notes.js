const state = {
  currentVDrawerVisibility: false,
  currentVDrawer: '',
  currentVDrawerSize: '25%',
  notes: [],
  payload: '',
  taskDetails: null
}

const mutations = {
  setTaskDetails(state, data) {
    state.taskDetails = data
  },
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
  deleteNote(state, index) {
    state.notes.splice(index, 1)
  },
  resetPayload(state) {
    state.payload = {}
  },
  updateNote(state, data) {
    state.notes[data.id].note = data.note
  },
  setNotes(state, data) {
    state.notes.push(data)
  }
}

const actions = {
  setTaskDetails(context, data) {
    context.commit('setTaskDetails', data)
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
  setNotes(context, notes) {
    context.commit('setNotes', notes)
  },
  deleteNote(context, index) {
    context.commit('deleteNote', index)
  },
  resetPayload(context) {
    context.commit('resetPayload')
  },
  updateNote(context, data) {
    context.commit('updateNote', data)
  }
}

const getters = {
  getTaskDetails(state) {
    return state.taskDetails
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
  getNotes(state) {
    return state.notes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
