import moment from 'moment'
const state = {
  isShowEntryDialog: false,
  currentVDrawerVisibility: false,
  currentVDrawer: '',
  currentVDrawerSize: '25%',
  payload: {},
  timeEntries: []
}

const mutations = {
  showSaveEntryDialog(state, value) {
    state.isShowEntryDialog = value
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
  resetPayload(state) {
    state.payload = {}
  },
  resetVDrawer(state) {
    state.currentVDrawer = ''
  },
  setTimeEntries(state, data) {
    state.timeEntries = data
  },
  deleteTimeEntries(state, index) {
    state.timeEntries.splice(index, 1)
  },
  editTimeEntries(state, data) {
    let item = state.timeEntries.find((elem) => elem.id === data.id)
    let time = data.data.saveCurrentTimerDuration.split(':')
    item.rate = data.data.rate
    item.activity = data.data.activity
    item.note = data.data.description
    item.hour = time[0].split('')[0] == 0 ? time[0].split('')[1] : time[0]
    item.minute = time[1].split('')[0] == 0 ? time[1].split('')[1] : time[1]
    item.second = time[2].split('')[0] == 0 ? time[2].split('')[1] : time[2]
    item.entryDisplayDate = moment(data.data.date).format('MMM D, yyyy')
  }
}

const actions = {
  showSaveEntryDialog(context, value) {
    context.commit('showSaveEntryDialog', value)
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
  resetPayload(context) {
    context.commit('resetPayload')
  },
  resetVDrawer(context) {
    context.commit('resetVDrawer')
  },
  setVDrawerVisibility(context, model) {
    context.commit('setVDrawerVisibility', model)
  },
  setTimeEntries(context, payload) {
    context.commit('setTimeEntries', payload)
  },
  deleteTimeEntries(context, index) {
    context.commit('deleteTimeEntries', index)
  },
  editTimeEntries(context, data) {
    context.commit('editTimeEntries', data)
  }
}

const getters = {
  getEntryDialogModel(state) {
    return state.isShowEntryDialog
  },
  getCurrentTimerDuration(state) {
    return state.currentTimerDuration
  },
  getCurrentTimerStartTime(state) {
    return state.currentTimerStartTime
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
  getPayload(state) {
    return state.payload
  },
  getTimeEntries(state) {
    return state.timeEntries
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
