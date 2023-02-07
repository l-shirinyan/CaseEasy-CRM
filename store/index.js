import Vuex from 'vuex'
import Vue from 'vue'
import tasks from './modules/tasks'
import cases from './modules/cases'
import calendars from './modules/calendars'
import search from './modules/search'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      tasks,
      cases,
      calendars,
      search,
    }
  })
}

export default createStore
