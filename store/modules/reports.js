const state = {
  columns: [],
  currentDrawerTitle: '',
  currentDrawer: '',
  reportName: ''
}

const mutations = {
  setReportColumns(state, columns) {
    state.columns = columns
  },
  resetDrawer(state) {
    state.currentDrawer = ''
  },
  setCurrentDrawer(state, content) {
    state.currentDrawer = content
  },
  setCurrentDrawerTitle(state, title) {
    state.currentDrawerTitle = title
  },
  setCurrentReportName(state, name) {
    state.reportName = name
  }
}

const actions = {
  setReportColumns(context, columns) {
    context.commit('setReportColumns', columns)
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
  setCurrentReportName(context, name) {
    context.commit('setCurrentReportName', name)
  }
}

const getters = {
  getColumns(state) {
    return state.columns
  },
  currentDrawer(state) {
    return state.currentDrawer
  },
  getCurrentDrawerTitle(state) {
    return state.currentDrawerTitle
  },
  getCurrentReportName(state) {
    return state.reportName
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
