const state = {
  filterTags: [],
  currentDrawer: '',
  currentVDrawerVisibility: false,
  currentVDrawer: '',
  currentVDrawerSize: '25%',
  payloadDrawer: '',
  teamMembers: [],
  taxRates: [],
  currencies: [],
  milestones: [],
  locationList: [],
  relationships: []
}

const mutations = {
  setRelationshipList(state, list) {
    state.relationships = list
  },
  setLocationList(state, list) {
    state.locationList = list
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
  resetPayload(state) {
    state.payloadDrawer = {}
  },
  setTeamMembers(state, data) {
    state.teamMembers = data
  },
  setTaxRates(state, data) {
    state.taxRates = data
  },
  setCurrencies(state, data) {
    state.currencies = data
  },
  setMilestones(state, data) {
    state.milestones = []
    data.forEach((elem, index) => {
      state.milestones.push({
        name: elem,
        id: elem
      })
    })
  }
}

const actions = {
  resetPayload(context) {
    context.commit('resetPayload')
  },
  setRelationshipList(context, list) {
    state.relationships = list
    context.commit('setRelationshipList', list)
  },
  setLocationList(context, list) {
    state.locationList = list
    context.commit('setLocationList', list)
  },
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
  setTeamMembers(context, data) {
    context.commit('setTeamMembers', data)
  },
  setTaxRates(context, data) {
    context.commit('setTaxRates', data)
  },
  setCurrencies(context, data) {
    context.commit('setCurrencies', data)
  },
  setMilestones(context, data) {
    context.commit('setMilestones', data)
  }
}

const getters = {
  getRelationshipList(state) {
    return state.relationships
  },
  getLocationList(state) {
    return state.locationList
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
  getTeamMembers(state) {
    return state.teamMembers
  },
  getTaxRates(state) {
    return state.taxRates
  },
  getCurrencies(state) {
    return state.currencies
  },
  getMilestones(state) {
    return state.milestones
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
