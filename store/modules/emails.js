const state = {
  box: [],
  isShowTagDialog: false,
  assignCaseDialogModel: false,
  payload: {},
  currentVDrawerVisibility: false,
  currentVDrawer: '',
  currentVDrawerSize: '25%',
  currentDrawer: '',
  currentDraverTitle: '',
  filtredData: []
}

const mutations = {
  setCurrentDrawer(state, drawer) {
    state.currentDrawer = drawer
  },
  setCurrentDrawerTitle(state, title) {
    state.currentDrawerTitle = title
  },
  resetDrawer(state) {
    state.currentDrawer = ''
  },
  setMail(state, data) {
    state.box = data.data.emails
  },
  deleteMail(state, data) {
    state.box = state.box.filter((elem) => elem.id !== data.data)
  },
  setFilterTags(state, settings) {
    state.box.tags = settings.tagList
  },
  setArchive(state, archive) {
    state.archive = archive
  },
  updateArchive(state, archive) {
    state.archive.push(archive)
  },
  showTagsDialog(state, model) {
    state.isShowTagDialog = model
  },
  setPayload(state, payload) {
    state.payload = payload
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
    state.payload = {}
  },
  setAssignCaseDialog(state, model) {
    state.assignCaseDialogModel = model
  },
  clearMail(state, type) {
    state.box = []
  },
  filtredData(state, data) {
    state.filtredData = data
  }
}

const actions = {
  setCurrentDrawer(context, drawer) {
    context.commit('setCurrentDrawer', drawer)
  },
  setCurrentDrawerTitle(context, title) {
    context.commit('setCurrentDrawerTitle', title)
  },
  resetDrawer(context) {
    context.commit('resetDrawer')
  },
  async setMail(context, data) {
    context.commit('setMail', data)
  },
  deleteMail(context, data) {
    context.commit('deleteMail', data)
  },
  setFilterTags(context, settings) {
    context.commit('setFilterTags', settings)
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
  setArchive(context, archive) {
    context.commit('setArchive', archive)
  },
  updateArchive(context, archive) {
    context.commit('updateArchive', archive)
  },
  showTagsDialog(context, model) {
    context.commit('showTagsDialog', model)
  },
  setPayload(context, payload) {
    context.commit('setPayload', payload)
  },
  resetPayload(context) {
    context.commit('resetPayload')
  },
  setAssignCaseDialog(context, model) {
    context.commit('setAssignCaseDialog', model)
  },
  clearMail(context, type) {
    context.commit('clearMail', type)
  },
  filtredData(context, data) {
    context.commit('filtredData', data)
  }
}

const getters = {
  getInbox(state) {
    return state.box
  },
  getInboxCount(state) {
    return state.box.length
  },
  getDialogModel(state) {
    return state.isShowTagDialog
  },
  getPayload(state) {
    return state.payload
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
