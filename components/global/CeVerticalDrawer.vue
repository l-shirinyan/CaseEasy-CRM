<template>
  <div class="vertical-drawer">
    <el-drawer
      :visible.sync="isDrawer"
      :direction="direction"
      :destroy-on-close="true"
      :size="getCurrentDrawerSize"
      :modal="false"
      :before-close="handleClose"
      :wrapperClosable="true"
      :title="title"
    >
      <div class="drawer-content" :class="{ 'no-padding': noPadding }">
        <slot name="drawerContent">
          <component
            :is="setComponent"
            :is-archive="isArchive"
            v-if="resetDrawer"
            :mail-list="mailList"
            :payload="payload"
            :selectedMailBox="selectedMailBox"
            @emit-payload="onEmitPayload"
          ></component>
        </slot>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import CaseFilterVue from '../cases/CaseFilter.vue'
import ClientFilterVue from '../contacts/client/ClientFilter.vue'
import TaskFilterVue from '../tasks/TaskFilter.vue'
import TrustAccountFilterVue from '../trust-accounts/TrustAccountFilter'
import ComposeEmailVue from '../emails/ComposeEmail'
import ExtendEmailVue from '../emails/ExtendEmail'
import ReceiptsFilterVue from '../receipts/ReceiptsFilter'
import { mapGetters } from 'vuex'
import TransactionsFilterVue from '../transactions/TransactionsFilter.vue'
import TimersActivityVue from '../time-tracker/TimersActivity'
import InvoiceFilterVue from '../billing/tab-pages/invoice/InvoiceFilter.vue'
import DocumentNotesList from '../shared/CeDocumentNotesList'
import UserNotificationsVue from '../user/UserNotifications'
import NotesListVue from '../shared/CeTaskNotesList'
import CalendarsPopupVue from '../calendars/CalendarsPopup.vue'
import CeGenericNotesVue from '../shared/CeGenericNotes.vue'
import CommunicationFilter from '../communications/CommunicationFilter.vue'
import CalendarDetailsDrawer from '../calendars/CalendarDetailsDrawer.vue'
import MessageDetail from '../emails/MessageDetail.vue'
export default {
  name: 'ce-v-drawer',
  components: {
    clientFilter: ClientFilterVue,
    caseFilter: CaseFilterVue,
    taskFilter: TaskFilterVue,
    trustAccountFilter: TrustAccountFilterVue,
    composeEmail: ComposeEmailVue,
    extendEmail: ExtendEmailVue,
    timersActivity: TimersActivityVue,
    receiptsFilter: ReceiptsFilterVue,
    transactionsFilter: TransactionsFilterVue,
    invoiceFilter: InvoiceFilterVue,
    documentNotesList: DocumentNotesList,
    userNotification: UserNotificationsVue,
    notesList: NotesListVue,
    calendarsList: CalendarsPopupVue,
    genericNotes: CeGenericNotesVue,
    communicationFilter: CommunicationFilter,
    CalendarDetails: CalendarDetailsDrawer,
    messageDetail: MessageDetail
  },
  computed: {
    setCurrentModuleDrawerModel() {
      return this.$store.getters[`${this.module}/getCurrentVDrawerVisibility`]
    },
    setCurrentModuleDrawerSize() {
      return this.$store.getters[`${this.module}/getCurrentVDrawerSize`]
    },
    setComponent: function () {
      return (this.componentContent = this.content)
    },
    isDrawer: {
      get() {
        return this.setCurrentModuleDrawerModel
      },
      set(newVal) {
        return newVal
      }
    },
    getCurrentDrawerSize: {
      get() {
        return this.setCurrentModuleDrawerSize
      },
      set(newVal) {
        return newVal
      }
    }
  },
  data: function () {
    return {
      direction: 'rtl',
      resetDrawer: true,
      componentContent: ''
    }
  },
  props: {
    content: {
      type: String,
      required: true
    },
    isArchive: {
      type: Boolean,
      required: false
    },
    module: {
      type: String,
      required: true
    },
    payload: null,
    title: {
      type: String,
      required: false
    },
    mailList: {
      type: Array,
      required: false
    },
    noPadding: {
      type: Boolean,
      required: false,
      default: false
    },
    selectedMailBox: {
      type: String
    }
  },
  methods: {
    handleClose() {
      this.$store.dispatch(`${this.module}/resetVDrawer`)
      this.$store.dispatch(`${this.module}/resetPayload`)
      this.$store.dispatch(`${this.module}/setVDrawerVisibility`, false)
      setTimeout(() => {
        this.$store.dispatch(`${this.module}/resetCurrentVDrawerSize`)
      }, 100)
      this.$emit('close-drawer')
    },
    showDrawer() {
      this.$store.dispatch(`${this.module}/setVDrawerVisibility`, true)
    },
    onEmitPayload(payloadData, closeDraver = true) {
      if (closeDraver) {
        this.isDrawer = false
        this.$store.dispatch(`${this.module}/resetDrawer`)
      }
      this.$emit('emit-payload', payloadData)
    }
  }
}
</script>
<style lang="scss" scoped>
.drawer-content {
  padding: 20px 20px 5px 20px;
}
.no-padding {
  padding: 20px 5px 20px 20px !important;
}
</style>
