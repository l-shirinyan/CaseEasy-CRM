const state = {
  filterTags: [],
  currentDrawer: '',
  currentVDrawerVisibility: false,
  currentVDrawer: '',
  currentVDrawerSize: '25%',
  flatFeeValue: null,
  expenseValue: null,
  timeEntryValue: null,
  milestoneValue: null,
  note: null,
  paymentPlan: null,
  caseUser: null,
  taxType: null,
  totalAmount: null
}

const mutations = {
  setFilterTags(state, tags) {
    state.filterTags = tags
  },
  setTaxType(state, data) {
    state.taxType = data
  },
  setTotalAmount(state, data) {
    state.totalAmount = data
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
  setNoteValue(state, model) {
    state.note = model
  },
  setPaymentPlanValue(state, model) {
    state.paymentPlan = model
  },
  setCaseUser(state, model) {
    state.caseUser = model
  }
}

const actions = {
  setFilterTags(context, tags) {
    context.commit('setFilterTags', tags)
  },
  setTaxType(context, data) {
    context.commit('setTaxType', data)
  },
  setTotalAmount(context, data) {
    context.commit('setTotalAmount', data)
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
  setNoteValue(context, value) {
    context.commit('setNoteValue', value)
  },
  setPaymentPlanValue(context, value) {
    context.commit('setPaymentPlanValue', value)
  },
  setCaseUser(context, value) {
    context.commit('setCaseUser', value)
  }
}

const getters = {
  getTaxType(state) {
    return state.taxType
  },
  getTotalAmount(state) {
    return state.totalAmount
  },
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
  getNoteValue(state) {
    return state.note
  },
  getPaymentPlanValue(state) {
    return state.paymentPlan
  },
  getCaseUser(state) {
    return state.caseUser
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
