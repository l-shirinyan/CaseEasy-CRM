const state = {
  currentDrawerTitle: '',
  currentDrawer: '',
  letterTableData: [],
  deleteDialogModel: false
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
  setLetterTableData(state, data) {
    data.forEach((element) => {
      state.letterTableData.push(element)
    })
  },
  addLetterTableData(state, newData) {
    state.letterTableData.push(newData)
  },
  setDeleteDialog(state, model) {
    state.deleteDialogModel = model
  },
  deleteFromLetterTable(state, index) {
    state.letterTableData.splice(index, 1)
  },
  deleteSelectedFromLetterData(state, items) {
    state.letterTableData = state.letterTableData.filter(
      (elem) => !items.includes(elem)
    )
  },
  clearRetainers(state) {
    state.letterTableData = []
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
  setLetterTableData(context, data) {
    context.commit('setLetterTableData', data)
  },
  addLetterTableData(context, newData) {
    context.commit('addLetterTableData', newData)
  },
  setDeleteDialog(context, model) {
    context.commit('setDeleteDialog', model)
  },
  deleteFromLetterTable(context, index) {
    context.commit('deleteFromLetterTable', index)
  },
  deleteSelectedFromLetterData(context, items) {
    context.commit('deleteSelectedFromLetterData', items)
  },
  clearRetainers(context) {
    context.commit('clearRetainers')
  }
}

const getters = {
  getCurrentDrawerTitle(state) {
    return state.currentDrawerTitle
  },
  currentDrawer(state) {
    return state.currentDrawer
  },
  getLetterTableData(state) {
    return state.letterTableData
  },
  getDeleteDialogModel(state) {
    return state.deleteDialogModel
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
