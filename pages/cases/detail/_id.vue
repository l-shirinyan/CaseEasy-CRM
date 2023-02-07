<template>
  <!--<el-scrollbar style="height: 90vh">-->
  <div class="case-view-container">
    <div class="profile-card-header">
      <div class="profile-card">
        <ce-client-demographics
          :contactId="+$route.query.contact_id"
        ></ce-client-demographics>
      </div>
    </div>

    <div class="workflow">
      <ce-work-flow
        :addNewCaseWorkflow="addNewCaseWorkflow"
        @edit-workflow="editWorkflow"
        @addNewCaseWorkflow="addNewCaseWorkflow = false"
      ></ce-work-flow>
    </div>
    <div class="workflow-settings">
      <div style="position: relative; float: left">
        <el-button
          type="icon"
          @click="openAppDrawer"
          style="padding-right: 5px"
        >
          <img :src="require('@/assets/images/shape.svg')" alt="" />
          Applicants
          <ce-badge
            v-if="applicantCount"
            type="primary-invert"
            :text="applicantCount.toString()"
            style="display: inline; margin-left: 3%"
          >
          </ce-badge>
        </el-button>
        <el-button @click="openNotesDrawer" type="icon" size="mini">
          <i class="las la-clipboard"></i> Notes
          <ce-badge
            type="primary-invert"
            v-if="notesCount > 0"
            :text="notesCount.toString()"
          ></ce-badge>
        </el-button>
      </div>
      <div style="float: right; padding-top: 1.1%">
        <el-dropdown trigger="click" :append-to-body="true">
          <span style="color: #2b70d6; cursor: pointer">
            Workflow
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu
            class="workflow-dropdown"
            slot="dropdown"
            v-if="workflows && workflows.length"
          >
            <el-scrollbar style="height: 45vh">
              <el-dropdown-item
                @click.native="selectWorkflow(item.id)"
                v-for="item in workflows"
                :key="item.id"
                >{{ item.header }}</el-dropdown-item
              >
            </el-scrollbar>
            <el-dropdown-item class="add-new-workflow"
              ><el-button @click="addNewWorkflows" type="primary" size="mini"
                >Add New</el-button
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-card class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Profile" name="1">
          <ce-profile-page
            :caseId="+caseId"
            :contactId="+$route.query.contact_id"
            @openTeamEntriesModel="openTimeEntriesModal = true"
          ></ce-profile-page>
        </el-tab-pane>
        <el-tab-pane label="Questionnaires" name="2">
          <ce-questionnaire-page
            :caseNumber="demographicInfo.caseNumber"
          ></ce-questionnaire-page>
        </el-tab-pane>
        <el-tab-pane label="Documents" name="3">
          <ce-document-page
            @openDocNotesDrawer="openTaskAndDocNotesDrawer('documentNotesList')"
          ></ce-document-page>
        </el-tab-pane>
        <el-tab-pane label="Forms" name="5">
          <ce-form-page></ce-form-page>
        </el-tab-pane>
        <el-tab-pane name="6">
          <span slot="label">
            Tasks
            <ce-badge type="accent" :text="taskCount.toString()"></ce-badge>
          </span>
          <ce-task-page
            @openNotesDrawer="openTaskAndDocNotesDrawer('notesList')"
            @on-load-count="setTaskCount"
          ></ce-task-page>
        </el-tab-pane>
        <el-tab-pane label="Retainers" name="7">
          <ce-retainer-page></ce-retainer-page>
        </el-tab-pane>
        <el-tab-pane name="8">
          <span slot="label">
            Appointments
            <ce-badge
              v-if="appointmentsCount"
              type="accent"
              :text="appointmentsCount.toString()"
            ></ce-badge>
          </span>
          <ce-appointment-page
            @appointments-count="(val) => (appointmentsCount = val)"
          ></ce-appointment-page>
        </el-tab-pane>
        <el-tab-pane label="Communication" name="9">
          <ce-communication-page></ce-communication-page>
        </el-tab-pane>
        <el-tab-pane label="Billing" name="10">
          <el-tabs v-model="billingActiveName" type="card">
            <el-tab-pane label="Invoices" name="first">
              <ce-invoice-page :isCaseSpecific="true"></ce-invoice-page>
            </el-tab-pane>
            <el-tab-pane label="Receipts" name="second">
              <ce-receipts-page></ce-receipts-page>
            </el-tab-pane>
            <el-tab-pane label="Payments" name="third">
              <ce-transactions-page
                :isTransactionMode="true"
              ></ce-transactions-page>
            </el-tab-pane>
            <el-tab-pane label="Client Trust Account" name="fourth">
              <ce-transactions-page
                :isTransactionMode="false"
              ></ce-transactions-page>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!--Drawer-->
    <ce-h-drawer
      :payload="payload"
      @emit-payload="onEmitPayload"
      :title="title"
      ref="ceDrawer"
      module="cases"
    >
    </ce-h-drawer>
    <time-entries
      :isVisible="openTimeEntriesModal"
      @onCloseModal="(val) => (openTimeEntriesModal = val)"
    >
    </time-entries>
    <!-- Vertical Drawer -->
    <ce-vertical-drawer
      :no-padding="true"
      :module="vDModule"
      :title="vDrawerTitel"
      :payload="+caseId"
      :content="drawerContent"
      @emit-payload="getNotesCount"
    ></ce-vertical-drawer>
  </div>
  <!--</el-scrollbar>-->
</template>
<script>
import InvoiceVue from '../../../components/billing/tab-pages/invoice/Invoice.vue'
import ReceiptsVue from '../../../components/cases/billing/Receipts.vue'
import TransactionVue from '../../../components/billing/tab-pages/transactions/Transaction.vue'
import AppointmentsVue from '../../../components/cases/tabs-pages/Appointments.vue'
import CommunicationVue from '../../../components/cases/tabs-pages/Communication.vue'
import DocumentsPageVue from '../../../components/cases/tabs-pages/DocumentsPage.vue'
import FormsVue from '../../../components/cases/tabs-pages/Forms.vue'
import ProfileVue from '../../../components/cases/tabs-pages/Profile.vue'
import QuestionnairesVue from '../../../components/cases/tabs-pages/questionnaires/Questionnaires.vue'
import RetainersVue from '../../../components/cases/tabs-pages/Retainers.vue'
import TaskVue from '../../../components/cases/tabs-pages/Task.vue'
import CeHorizontalDrawerVue from '../../../components/global/CeHorizontalDrawer.vue'
import CeBadgeVue from '../../../components/shared/CeBadge.vue'
import CeCasesAutoCompleteSearchVue from '../../../components/shared/CeCasesAutoCompleteSearch.vue'
import CeClientDemographicsVue from '../../../components/shared/CeClientDemographics.vue'
import CeWorkFlowVue from '../../../components/shared/CeWorkFlow.vue'
import timeEntries from '../../../components/time-tracker/TimeEntries.vue'

export default {
  head: { title: 'CaseEasy CRM' },
  name: 'case-view-details',
  components: {
    ceWorkFlow: CeWorkFlowVue,
    ceClientDemographics: CeClientDemographicsVue,
    ceProfilePage: ProfileVue,
    ceQuestionnairePage: QuestionnairesVue,
    ceDocumentPage: DocumentsPageVue,
    ceHDrawer: CeHorizontalDrawerVue,
    ceBadge: CeBadgeVue,
    ceFormPage: FormsVue,
    ceTaskPage: TaskVue,
    ceAppointmentPage: AppointmentsVue,
    ceRetainerPage: RetainersVue,
    ceCommunicationPage: CommunicationVue,
    ceInvoicePage: InvoiceVue,
    ceTransactionsPage: TransactionVue,
    CeReceiptsPage: ReceiptsVue,
    ceCaseSearch: CeCasesAutoCompleteSearchVue,
    timeEntries
  },
  created() {
    this.getRelationships()
    this.getApplicantsCount()
    this.getWorkflows()
    this.getNotesCount()
    this.getTemplateNames()
    this.demographicInfo = {
      type: '',
      name: '',
      phone: '',
      email: '',
      age: 0,
      maritalStatus: '',
      job: '',
      caseNumber: ''
    }

    this.caseId = this.$route.params.id
    this.getTeamMembers()
  },
  beforeMount() {
    document.addEventListener('scroll', this.updateScroll)
  },
  data: function () {
    return {
      openTimeEntriesModal: false,
      caseId: '',
      demographicInfo: null,
      scrollPosition: null,
      activeName: '1',
      billingActiveName: 'first',
      payload: {},
      title: '',
      taskCount: 0,
      workflows: null,
      generateWorkflowId: null,
      notesCount: 0,
      selectedWorkflowId: null,
      addNewCaseWorkflow: false,
      applicantCount: 0,
      relationshipList: null,
      drawerContent: '',
      vDrawerTitel: '',
      vDModule: '',
      appointmentsCount: null
    }
  },
  methods: {
    async getTemplateNames() {
      try {
        let templateNames = await this.$CommunicationService.template({
          action: 'R',
          target: 'general'
        })
        this.$store.dispatch('communication/setTemplateNames', templateNames)
      } catch (error) {
        console.error(error)
      }
    },
    async getRelationships() {
      try {
        let res = await this.$CaseService.getRelationships({
          action: 'R',
          target: 'relationships'
        })
        if (res) {
          this.relationshipList = res
          this.$store.dispatch(
            `cases/setRelationshipList`,
            this.relationshipList
          )
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getNotesCount() {
      try {
        this.notesCount = await this.$CaseService.getNotesCount({
          action: 'R',
          countOnly: true,
          target: 'casenote',
          caseId: this.$route.params.id
        })
      } catch (error) {
        console.error(error)
      }
    },
    onEmitPayload(val) {
      if (val === 'D') {
        this.getWorkflows()
      } else {
        this.addNewCaseWorkflow = true
      }
    },
    editWorkflow(val) {
      this.title = 'Modify Workflow'
      this.payload = val
      this.$store.dispatch(
        'cases/setCurrentDrawer',
        'viewAddNewWorkflowComponent'
      )
      this.$refs.ceDrawer.showDrawer()
    },
    selectWorkflow(id) {
      this.selectedWorkflowId = id
      this.payload = id
      this.title = 'Preview Workflow'
      this.$store.dispatch('cases/setCurrentDrawer', 'previewWorkflowComponent')
      this.$refs.ceDrawer.showDrawer()
    },
    openAppDrawer() {
      this.module = 'cases'
      this.$store.dispatch('cases/setCurrentDrawer', 'viewApplicantDrawer')
      this.title = 'Applicants'
      this.payload = 'applicant'
      this.$refs.ceDrawer.showDrawer()
    },
    async getWorkflows() {
      try {
        this.workflows = await this.$CaseService.workflows({
          action: 'R',
          target: 'workflows'
        })
      } catch (error) {
        console.error(error)
      }
    },
    async addNewWorkflows() {
      try {
        this.payload = 'add'
        if (!localStorage.getItem('generateId')) {
          this.generateWorkflowId = await this.$CaseService.workflows({
            action: 'R',
            target: 'generate'
          })
          localStorage.setItem('generateId', this.generateWorkflowId)
        }
        this.title = 'Add Workflow'
        this.$store.dispatch(
          'cases/setCurrentDrawer',
          'viewAddNewWorkflowComponent'
        )
        this.$refs.ceDrawer.showDrawer()
      } catch (error) {
        console.error(error)
      }
    },
    async getTeamMembers() {
      let res = await this.$TeamService.teamMembers({
        action: 'R',
        target: 'general'
      })
      this.$store.dispatch('cases/setTeamMembers', res)
      this.$store.dispatch('tasks/setTasksMembers', res)
      this.$store.dispatch('calendars/setMembers', res)
    },
    async getApplicantsCount() {
      try {
        this.applicantCount = await this.$CaseService.applicant({
          action: 'R',
          target: 'applicants',
          contactId: this.$route.query.contact_id,
          caseId: this.$route.params.id,
          countOnly: true
        })
      } catch (error) {
        console.error(error)
      }
    },
    openWorkFlowDrawer() {
      this.title = 'Modify Workflow'
      this.$store.dispatch('cases/setCurrentDrawer', 'viewWorkflowComponent')
      this.$refs.ceDrawer.showDrawer()
    },
    setTaskCount(count) {
      this.taskCount = count
    },
    updateScroll() {
      const inner = document.getElementById('inner')
      this.scrollPosition = inner.offsetTop - document.body.scrollTop
    },
    onSelectCase(val) {
      this.$message.info(`Case switched to ${val.contact.fullName}`)
      this.$refs.caseSearch.deselectContact()
    },
    openTaskAndDocNotesDrawer(content) {
      this.vDrawerTitel = 'Notes'
      this.drawerContent = content
      this.vDModule = 'notes'
      this.$store.dispatch('notes/setCurrentVDrawer', content)
      this.$store.dispatch('notes/setVDrawerVisibility', true)
      this.$store.dispatch('notes/setCurrentVDrawerSize', '40%')
    },
    openNotesDrawer() {
      this.vDrawerTitel = 'Notes'
      this.drawerContent = 'genericNotes'
      this.vDModule = 'cases'
      this.$store.dispatch('cases/setCurrentVDrawer', 'genericNotes')
      this.$store.dispatch('cases/setVDrawerVisibility', true)
      this.$store.dispatch('cases/setCurrentVDrawerSize', '40%')
    },
    closeDrawer() {
      this.$refs.ceDrawer.handleClose()
      this.$store.dispatch(`cases/resetDrawer`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/element-variables';
.workflow {
  padding: 0px;
  list-style: none;
  overflow: hidden;
  overflow-x: auto;
  width: 100%;
  white-space: nowrap;
  margin-bottom: 0px;
}

.case-view-container {
  display: flex;
  flex-direction: column;

  /deep/ & .container {
    .main-box {
      overflow: hidden;
    }
  }
  .profile-card-header {
    flex-basis: 100%;
    display: flex;
    padding-bottom: 20px;

    .profile-card {
      flex-basis: 70%;
    }
  }
  .profile-card-small-header {
    flex-basis: 100%;
    height: 30px;
    margin-bottom: 10px;
    padding-top: 5px;
    padding-right: 10px;
    padding-left: 10px;
    background-color: $--color-primary;
    color: #fff;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    z-index: 2001;

    h3 {
      color: #fff;
      font-family: $font-semi;
    }
  }
  .workflow-settings {
    flex-basis: 100%;
    margin-top: 20px;
    margin-bottom: 5px;

    .el-dropdown-link-grey {
      color: #8c8989;
    }
  }
  .content {
    min-height: 600px;
  }
}
</style>
