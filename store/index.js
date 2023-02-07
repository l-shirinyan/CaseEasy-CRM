import Vuex from 'vuex'
import Vue from 'vue'
import contacts from './modules/contacts'
import retainers from './modules/retainers'
import emails from './modules/emails'
import timeTracker from './modules/timeTracker'
import transactions from './modules/transactions'
import tasks from './modules/tasks'
import home from './modules/home'
import cases from './modules/cases'
import documents from './modules/documents'
import trustAccounts from './modules/trustAccounts'
import receipts from './modules/receipts'
import searchBox from './modules/searchBox'
import triggers from './modules/triggers'
import onboarding from './modules/onboarding'
import reports from './modules/reports'
import invoices from './modules/invoices'
import notes from './modules/notes'
import calendars from './modules/calendars'
import communication from './modules/communication'
import search from './modules/search'
import billing from './modules/billing'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      contacts,
      retainers,
      emails,
      timeTracker,
      transactions,
      tasks,
      home,
      cases,
      documents,
      trustAccounts,
      receipts,
      searchBox,
      triggers,
      onboarding,
      reports,
      invoices,
      notes,
      calendars,
      communication,
      search,
      billing
    }
  })
}

export default createStore
