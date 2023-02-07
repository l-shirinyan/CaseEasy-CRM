const state = {
  isValidLogoStep: false
}

const mutations = {
  checkLogoStepValidation(state, isValid) {
    state.isValidLogoStep = isValid
  }
}

const actions = {
  checkLogoStepValidation(context, isValid) {
    context.commit('checkLogoStepValidation', isValid)
  }
}

const getters = {
  getLogoValidation(state) {
    return state.isValidLogoStep
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
