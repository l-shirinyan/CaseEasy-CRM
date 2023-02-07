<template>
  <div class="horizontal-drawer">
    <el-drawer
      :visible.sync="isDrawer"
      :direction="direction"
      :size="size"
      :modal="false"
      :before-close="handleClose"
      :title="checkDrawerTitle()"
    >
      <div
        class="drawer-content"
        :class="{ 'no-padding': noPadding }"
        :style="`background-color: ${setBgColor}`"
      >
        <div class="content">
          <slot name="drawerContent">
            <component
              :is="setComponent"
              :payload="payload"
              :data="data"
              @onUploadFile="uploadFileAndCloseModal"
              @emit-payload="onEmitPayload"
              @close-filter-drawer="handleClose"
            ></component>
          </slot>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import BusinessDetailsVue from '../contacts/business/BusinessDetails.vue'
import AddClientDetailsVue from '../contacts/client/AddClientDetails.vue'
import ClientDetailsVue from '../contacts/client/ClientDetails.vue'
import UploadPopupVue from '../documents/upload/UploadPopup.vue'
import AttachFilePopupVue from '../documents/upload/AttachFilePopup.vue'
import EditFilePopupVue from '../documents/upload/EditFilePopup.vue'
import CeShareContentVue from '../shared/CeShareContent.vue'
import AddTaskPopupVue from '../tasks/addtask/AddTaskPopup'
import HomePopupVue from '../home/homePopup.vue'
import PreviewWorkflow from '../cases/workflow/PreviewWorkflow.vue'
import AddNewWorkflow from '../cases/workflow/AddNewWorkflow.vue'
import ScoreCardVue from '../cases/tabs-pages/questionnaires/ScoreCard.vue'
import ApplicantVue from '../cases/tabs-pages/questionnaires/AddApplicant.vue'
import AddTemplatePopupVue from '../retainers/AddTemplatePopup'
import SetupTemplatePopupVue from '../retainers/SetupTemplatePopup'
import ViewDocumentPopupVue from '../retainers/ViewDocumentPopup'
import AddRetainersPopup from '../retainers/AddRetainersPopup.vue'
import AddAndEditScheduleDrawer from '../cases/AddAndEditScheduleDrawer.vue'
import ViewEmailAttachments from '../emails/ViewEmailAttachments'
import ReportPopupVue from '../trust-accounts/ReportPopup'
import ViewHistoryPopupVue from '../triggers/ViewHistoryPopup'
import AddAndEditInvoiceVue from '../invoices/AddAndEditInvoice.vue'
import ReconciliationVue from '../reports/Reconciliation'
import RunReportsVue from '../reports/RunReports'
import ReportResultsVue from '../reports/ReportResults'
import AddReceiptVue from '../receipts/AddReceipt'
import EditReceiptVue from '../receipts/EditReceipt'
import ViewReceipts from '../receipts/ViewReceipts'
import FundTransactionVue from '../transactions/FundTransaction'
import CeClientInfoFullDetailsVue from '../shared/CeClientInfoFullDetails.vue'
import AddBusinessFormVue from '../contacts/business/AddBusinessForm.vue'
import ViewQuestionnaireVue from '../cases/ViewQuestionnaire.vue'
import Transaction from '../transactions/TransactionDrawer.vue'
import viewAddAppointmentVue from '../calendars/AddAppointmentDrawer.vue'
import DocumentRequestVue from '../cases/DocumentRequest.vue'
import PersonalCaseForm from '../cases/forms/PersonalCaseForm.vue'
import ApplicantDrawer from '../cases/ApplicantDrawer.vue'
import BusinessCaseForm from '../cases/forms/BusinessCaseForm.vue'
import SendCommunicationDrawer from '../communications/SendCommunicationDrawer.vue'
import PreviewDocument from '../cases/PreviewDocument.vue'
import ComposeEmail from '../emails/ComposeEmail.vue'
import BulkEmail from '../emails/BulkEmail.vue'
export default {
  name: 'ce-h-drawer',
  components: {
    viewClientComponent: ClientDetailsVue,
    viewBusinessComponent: BusinessDetailsVue,
    addClientComponent: AddClientDetailsVue,
    viewUploadPopup: UploadPopupVue,
    viewEditFilePopup: EditFilePopupVue,
    viewAttachFilePopup: AttachFilePopupVue,
    viewAddTaskPopup: AddTaskPopupVue,
    shareContentComponent: CeShareContentVue,
    viewLearnMorePopup: HomePopupVue,
    viewAddNewWorkflowComponent: AddNewWorkflow,
    previewWorkflowComponent: PreviewWorkflow,
    viewScoreCardComponent: ScoreCardVue,
    addApplicantQuestionnare: ApplicantVue,
    viewAddTemplatePopup: AddTemplatePopupVue,
    viewSetupTemplatePopup: SetupTemplatePopupVue,
    viewDocumentViewer: ViewDocumentPopupVue,
    addRetainersPopup: AddRetainersPopup,
    EmailAttachmentsPopup: ViewEmailAttachments,
    viewReportPopup: ReportPopupVue,
    viewViewHistoryDrawer: ViewHistoryPopupVue,
    addAndEditInvoiceComponent: AddAndEditInvoiceVue,
    viewReconcilationPopup: ReconciliationVue,
    viewRunReportPopup: RunReportsVue,
    viewReportResultsPopup: ReportResultsVue,
    viewAddClientPopup: AddReceiptVue,
    EditReceiptPopup: EditReceiptVue,
    ViewReceiptPopup: ViewReceipts,
    viewFundTransactionPopup: FundTransactionVue,
    viewClientFullInfoComponent: CeClientInfoFullDetailsVue,
    addBusinessContactForm: AddBusinessFormVue,
    viewQuestionnaire: ViewQuestionnaireVue,
    TransactionDrawer: Transaction,
    viewAddAppointmentVue: viewAddAppointmentVue,
    documentRequestComponent: DocumentRequestVue,
    addPersonalCaseForm: PersonalCaseForm,
    addBusinessCaseForm: BusinessCaseForm,
    SendCommunicationDrawer,
    viewApplicantDrawer: ApplicantDrawer,
    viewAddAndEditScheduleDrawer: AddAndEditScheduleDrawer,
    PreviewDocument: PreviewDocument,
    ComposeEmail: ComposeEmail,
    BulkEmail: BulkEmail
  },
  computed: {
    setComponent: function () {
      return this.$store.getters[`${this.module}/currentDrawer`]
    },
    drawerTitle: {
      get() {
        return this.$store.getters[`${this.module}/getCurrentDrawerTitle`]
      },
      set(newName) {
        return newName
      }
    },
    setBgColor() {
      return this.bgColor !== null ? this.bgColor : '#fff'
    },
    isBgColor() {
      return this.bgColor !== null
    }
  },
  data: function () {
    return {
      direction: 'btt',
      size: '100%',
      isDrawer: false
    }
  },
  props: {
    payload: null,
    data: null,
    title: {
      type: String,
      required: false
    },
    module: {
      type: String,
      required: true
    },
    noPadding: {
      type: Boolean,
      required: false
    },
    noScroll: {
      type: Boolean,
      required: false
    },
    bgColor: {
      type: String,
      required: false
    }
  },
  methods: {
    handleClose() {
      if (localStorage.getItem('generateId')) {
        localStorage.removeItem('generateId')
      }
      this.isDrawer = false
      this.$store.dispatch(`${this.module}/resetDrawer`)
      if (this.$route.path === '/contacts') {
        document.title = 'Contacts'
      }
      this.$emit('close-drawer')
    },
    showDrawer() {
      this.isDrawer = true
    },
    uploadFileAndCloseModal() {
      this.isDrawer = false
    },
    onEmitPayload(emitPayload, closeDrawer = true) {
      if (closeDrawer) {
        this.isDrawer = false
        this.$store.dispatch(`${this.module}/resetDrawer`)
      }
      this.$emit('emit-payload', emitPayload)
    },
    checkDrawerTitle() {
      return this.drawerTitle ? this.drawerTitle : this.title
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/styles/element-variables.scss';
.content {
  .dialog-body {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 236px);
  }
  .dialog-separator {
    border-top: solid 1px $--color-light-gray;
    margin-left: -20px;
  }
  .dialog-footer {
    gap: 16px;
    width: 100%;
    position: absolute;
    z-index: 10;
    background: #ffffff;
    bottom: 0;
    line-height: 5;
  }
}
</style>
<style scoped lang="scss">
.drawer-content {
  padding: 20px 0px 0px 20px !important;
  display: flex;
  flex-direction: column;
  min-width: 1200px;

  &.no-padding {
    padding: 0 !important;
  }
}
.no-scroll {
  height: 100vh !important;
}
</style>
