const state = {
  payload: [],
  currentVDrawerVisibility: false,
  currentVDrawer: '',
  currentVDrawerSize: '25%',
  payloadDrawer: '',
  currentDrawer: '',
  members: []
}

const mutations = {
  setMembers(state, members) {
    state.members = members
  },
  setFilterTags(state, settings) {
    state.inbox[settings.index].tags = settings.tagList
  },
  setPayload(state, payload) {
    let newArr = []
    payload.forEach((elem) => {
      if (elem.isEnabled) {
        newArr.unshift(elem)
      } else {
        newArr.push(elem)
      }
    })
    state.payload = newArr
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
  resetDrawer(state) {
    state.currentDrawer = ''
  },
  resetPayload(state) {
    state.payloadDrawer = {}
  },
  addPayload(state, calendar) {
    state.payload.push(calendar)
  },
  deleteCalendar(state, index) {
    state.payload.find((elem, idx) => idx === index).isEnabled = false
    // state.payload = state.payload.filter((elem, idx) => idx !== index)
  },
  editCalendar(state, settings) {
    state.payload[settings.index].name = settings.change.name
    state.payload[settings.index].color = settings.change.fontColor
    state.payload[settings.index].bgColor = settings.change.bgColor
    state.payload[settings.index].dragBgColor = settings.change.bgColor
    state.payload[settings.index].borderColor = settings.change.bgColor
    state.payload[settings.index].isEnabled = settings.change.isEnabled
  },
  setCurrentDrawer(state, drawer) {
    state.currentDrawer = drawer
  }
}

const actions = {
  setMembers(context, members) {
    context.commit('setMembers', members)
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
  resetDrawer(context) {
    context.commit('resetDrawer')
  },
  setVDrawerVisibility(context, model) {
    context.commit('setVDrawerVisibility', model)
  },
  setPayload(context, payload) {
    context.commit('setPayload', payload)
  },
  addPayload(context, calendar) {
    context.commit('addPayload', calendar)
  },
  resetPayload(context) {
    context.commit('resetPayload')
  },
  deleteCalendar(context, index) {
    context.commit('deleteCalendar', index)
  },
  editCalendar(context, settings) {
    context.commit('editCalendar', settings)
  },
  setCurrentDrawer(context, drawer) {
    context.commit('setCurrentDrawer', drawer)
  }
}

const getters = {
  getMembers(state) {
    return state.members
  },
  getCurrentVDrawer(state) {
    return state.currentVDrawer
  },
  getAssignCaseDialogModel(state) {
    return state.assignCaseDialogModel
  },
  getCurrentVDrawerVisibility(state) {
    return state.currentVDrawerVisibility
  },
  getCurrentVDrawerSize(state) {
    return state.currentVDrawerSize
  },
  getPayload(state) {
    return state.payload
  },
  currentDrawer(state) {
    return state.currentDrawer
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
