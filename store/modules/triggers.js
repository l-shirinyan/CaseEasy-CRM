const state = {
  currentDrawerTitle: '',
  currentDrawer: '',
  triggerTable: []
}

const mutations = {
  setCurrentDrawerTitle(state, title) {
    state.currentDrawerTitle = title
  },
  setCurrentDrawer(state, drawer) {
    state.currentDrawer = drawer
  },
  resetDrawer(state) {
    state.currentDrawer = ''
  },
  setTriggerTable(state, data) {
    state.triggerTable = data
  },
  addTriggerTable(state, newData) {
    state.triggerTable.push(newData)
  },
  deleteFromTriggerTable(state, index) {
    state.triggerTable.splice(index, 1)
  },
  deleteSelectedFromTriggerTable(state, items) {
    state.triggerTable = state.triggerTable.filter(
      (elem) => !items.includes(elem)
    )
  },
  setCurrentRowStatus(state, index) {
    state.triggerTable[index].isActive = !state.triggerTable[index].isActive
  }
}

const actions = {
  setCurrentDrawerTitle(context, title) {
    context.commit('setCurrentDrawerTitle', title)
  },
  resetDrawer(context) {
    context.commit('resetDrawer')
  },
  setCurrentDrawer(context, drawer) {
    context.commit('setCurrentDrawer', drawer)
  },
  setTriggerTable(context, data) {
    context.commit('setTriggerTable', data)
  },
  addTriggerTable(context, newData) {
    context.commit('addTriggerTable', newData)
  },
  deleteFromTriggerTable(context, index) {
    context.commit('deleteFromTriggerTable', index)
  },
  deleteSelectedFromTriggerTable(context, items) {
    context.commit('deleteSelectedFromTriggerTable', items)
  },
  setCurrentRowStatus(context, index) {
    context.commit('setCurrentRowStatus', index)
  }
}

const getters = {
  getCurrentDrawerTitle(state) {
    return state.currentDrawerTitle
  },
  currentDrawer(state) {
    return state.currentDrawer
  },
  getTriggerTable(state) {
    return state.triggerTable
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
