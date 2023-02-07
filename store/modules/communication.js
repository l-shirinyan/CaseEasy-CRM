const state = {
  filterTags: [],
  currentDrawerTitle: '',
  currentDrawer: '',
  currentVDrawerVisibility: false,
  currentVDrawer: '',
  currentVDrawerSize: '25%',
  payloadDrawer: '',
  messageDrawer: '',
  templateNames: []
}

const mutations = {
  setTemplateNames(state, data) {
    state.templateNames = [...data].reduce((reducer, e) => {
      let name = e.header
      if (!reducer[name])
        reducer[name] = {
          elements: [{ name: e.name, id: e }]
        }
      else {
        reducer[name].elements.push(e)
      }
      return reducer
    }, {})
  },
  setFilterTags(state, tags) {
    state.filterTags = tags
  },
  setCurrentDrawerTitle(state, title) {
    state.currentDrawerTitle = title
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
  resetMessageDrawer(state) {
    state.payloadDrawer = {}
  }
}

const actions = {
  setTemplateNames(context, data) {
    context.commit('setTemplateNames', data)
  },
  setFilterTags(context, tags) {
    context.commit('setFilterTags', tags)
  },
  setCurrentDrawerTitle(context, title) {
    context.commit('setCurrentDrawerTitle', title)
  },
  resetDrawer(context) {
    context.commit('resetDrawer')
  },
  setCurrentDrawer(context, drawer) {
    context.commit('setCurrentDrawer', drawer)
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
  resetPayload(context) {
    context.commit('resetPayload')
  },
  resetMessageDrawer(context) {
    context.commit('resetMessageDrawer')
  }
}

const getters = {
  getTemplateNames(state) {
    return state.templateNames
  },
  filterTags(state) {
    return state.filterTags
  },
  getCurrentDrawerTitle(state) {
    return state.currentDrawerTitle
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
  getPayload(state) {
    return state.payload
  },
  getMessage(state) {
    return state.payload
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
