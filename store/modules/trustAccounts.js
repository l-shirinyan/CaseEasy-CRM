const state = {
  filterTags: [],
  currentDrawer: '',
  currentVDrawerVisibility: false,
  currentVDrawer: '',
  currentVDrawerSize: '25%',
  note: null,
  flatFeeValue: null,
  expenseValue: null,
  timeEntryValue: null,
  milestoneValue: null,
  paymentPlan: null,
  overviewData: null
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
  setNoteValue(state, model) {
    state.note = model
  },
  setFlatFeeValue(state, model) {
    state.flatFeeValue = model
  },
  setExpenseValue(state, model) {
    state.expenseValue = model
  },
  setTimeEntryValue(state, model) {
    state.timeEntryValue = model
  },
  setMilestoneValue(state, model) {
    state.milestoneValue = model
  },
  setPaymentPlanValue(state, model) {
    state.paymentPlan = model
  },
  setOverviewData(state, model) {
    state.overviewData = model
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
  setNoteValue(context, value) {
    context.commit('setNoteValue', value)
  },
  setFlatFeeValue(context, value) {
    context.commit('setFlatFeeValue', value)
  },
  setExpenseValue(context, value) {
    context.commit('setExpenseValue', value)
  },
  setTimeEntryValue(context, value) {
    context.commit('setTimeEntryValue', value)
  },
  setMilestoneValue(context, value) {
    context.commit('setMilestoneValue', value)
  },
  setPaymentPlanValue(context, value) {
    context.commit('setPaymentPlanValue', value)
  },
  setOverviewData(context, value) {
    context.commit('setOverviewData', value)
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
  getFlatFeeValue(state) {
    return state.flatFeeValue
  },
  getExpenseValue(state) {
    return state.expenseValue
  },
  getTimeEntryValue(state) {
    return state.timeEntryValue
  },
  getMilestoneValue(state) {
    return state.milestoneValue
  },
  getOverviewData(state) {
    return state.overviewData
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
