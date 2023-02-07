const state = {
  filterTags: [],
  currentDrawer: '',
  documents: {},
  reduseDocuments: [],
  docData: null
}

const mutations = {
  setDocData(state, data) {
    state.docData = data
  },
  setCurrentDrawer(state, drawer) {
    state.currentDrawer = drawer
  },
  resetDrawer(state) {
    state.currentDrawer = ''
  },
  setDocuments(state, data) {
    if (!Object.keys(state.documents).length) {
      state.documents = data
    } else {
      data.data.forEach((elem) => {
        state.documents.data.push(elem)
      })
    }
  },
  deleteDocument(state, data) {
    let collapseData = state.reduseDocuments[data.index].documents.find(
      (elem) => elem.id == data.id
    )
    state.reduseDocuments[data.index].documents.splice(
      state.reduseDocuments[data.index].documents.indexOf(collapseData),
      1
    )
  },
  clearDocuments(state) {
    state.documents = []
    state.reduseDocuments = []
  },
  editDocument(state, data) {
    let a = state.reduseDocuments[data.index].documents.findIndex(
      (elem) => elem.id === data.id
    )
    if (data.index !== data.payload.library) {
      state.reduseDocuments[data.index].documents.splice(a, 1)
      state.reduseDocuments[data.payload.library].documents.push(data.payload)
    } else {
      state.reduseDocuments[data.index].documents.splice(a, 1, data.payload)
    }
  }
}

const actions = {
  setDocData(context, data) {
    context.commit('setDocData', data)
  },
  setCurrentDrawer(context, drawer) {
    context.commit('setCurrentDrawer', drawer)
  },
  resetDrawer(context) {
    context.commit('resetDrawer')
  },
  setDocuments(context, data) {
    context.commit('setDocuments', data)
  },
  deleteDocument(context, data) {
    context.commit('deleteDocument', data)
  },
  clearDocuments(context) {
    context.commit('clearDocuments')
  },
  editDocument(context, data) {
    context.commit('editDocument', data)
  }
}

const getters = {
  getDocData(state) {
    return state.docData
  },
  currentDrawer(state) {
    return state.currentDrawer
  },
  getDocuments(state) {
    return state.documents
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
