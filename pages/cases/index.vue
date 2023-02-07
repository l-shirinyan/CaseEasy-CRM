<template>
  <div class="container">
    <h1>Cases</h1>
    <div class="page-actions-container">
      <div class="col-left">
        <ce-filter
          content="caseFilter"
          moduleName="cases"
          @set-filter-tags="onSetFilterTags($event)"
          @clear-all-filters="onClearFilterTags"
          title="Filter"
          class="space-content"
          :payload="filters"
        >
        </ce-filter>
        <ce-sort
          :sortOptions="sortOptions"
          @on-ascend="onAscendList"
          @on-descend="onDescendList"
        ></ce-sort>
        <el-button size="small" @click="exportCase">
          Export<i class="las la-cloud-download-alt"></i>
        </el-button>
      </div>
      <div class="actions">
        <el-dropdown trigger="click" @command="onHandleAddCase">
          <el-button type="primary" size="small">
            Add Case <i class="las la-plus-circle"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">
              <span class="select-button">
                <i class="las la-user-friends"></i>
              </span>
              Personal Case
            </el-dropdown-item>
            <el-dropdown-item command="business">
              <span class="select-button">
                <i class="las la-building"></i>
              </span>
              Business Case
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div>
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <div v-show="!loading" class="record-tags">
          <div class="count">
            <p>
              Viewing
              {{
                activeTab === 'client'
                  ? allClientCases.length
                  : allProspectCases.length
              }}
              of
              {{
                activeTab === 'client' ? clientCases.count : prospectCases.count
              }}
              records
            </p>
            <el-dropdown
              v-if="selectedCasesId.length"
              trigger="click"
              type="primary"
              class="bulk-options"
            >
              <el-button size="mini">
                <div>
                  Bulk Options
                  <el-divider
                    direction="vertical"
                    class="devider-vertical"
                  ></el-divider>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
              </el-button>
              <el-dropdown-menu class="bulk-options-menu" slot="dropdown">
                <el-dropdown-item @click.native="openActionModal('team')"
                  >Assign Team</el-dropdown-item
                >
                <el-dropdown-item @click.native="openActionModal('office')"
                  >Assign Office</el-dropdown-item
                >
                <el-dropdown-item @click.native="openActionModal('status')"
                  >Assign Status</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="openActionModal('client')"
                  v-if="activeTab === 'prospect'"
                  >Convert to Client</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="openActionModal('prospect')"
                  v-else
                  >Convert to Prospect</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="tags" v-if="filterTags.length > 0">
            <div>
              <ce-filter-tags
                module="cases"
                :tags="filterTags"
                :showClearAllButton="true"
                @clear-all-filters="onClearFilterTags"
              ></ce-filter-tags>
            </div>
          </div>
        </div>
        <el-tab-pane label="Clients" name="client"></el-tab-pane>
        <el-tab-pane label="Prospects" name="prospect"></el-tab-pane>
      </el-tabs>

      <div
        class="data-container"
        v-loading="loading"
        element-loading-text="Loading..."
      >
        <ce-case-tabs-data
          @getCaseTableData="refreshTableData"
          @getStarted="getStarted"
          @selectedCases="casesId"
          @openNotesDrawer="openNotesDrawer"
          @openAddApplicantDrawer="openAddApplicantDrawer"
          @onLoadMore="onLoadMore"
          :payload="allClientCases"
          :pagingEnabled="pagingEnabled"
          :hasMultiSelection="hasMultiSelection"
          :deSelectedCase="deSelectedCase"
          :loader="loader"
          :loadMore="loadMore"
          :load="loading"
          v-if="showClientCases"
        ></ce-case-tabs-data>
        <ce-case-tabs-data
          @getCaseTableData="refreshTableData"
          v-else-if="showProspectCases"
          @getStarted="getStarted"
          @selectedCases="casesId"
          @openNotesDrawer="openNotesDrawer"
          @openAddApplicantDrawer="openAddApplicantDrawer"
          @onLoadMore="onLoadMore"
          :payload="allProspectCases"
          :pagingEnabled="pagingEnabled"
          :hasMultiSelection="hasMultiSelection"
          :deSelectedCase="deSelectedCase"
          :loader="loader"
          :loadMore="loadMore"
          :load="loading"
        ></ce-case-tabs-data>
      </div>
    </div>

    <ce-horizontal-drawer
      @emit-payload="onEmitPayload"
      ref="ceHDrawer"
      :title="title"
      :module="moduleName"
      class="custom-drawer"
      :payload="payload"
      :data="selectQuestionnaire"
    ></ce-horizontal-drawer>

    <ce-vertical-drawer
      v-if="isNotes || emailDrawer"
      :no-padding="true"
      :module="moduleName"
      :title="titleDrawer"
      :payload="payload"
      @close-drawer="onCloseDrawer"
      :content="content"
      ref="ceVDrawer"
    ></ce-vertical-drawer>

    <ce-bulk-operations-dialog
      :heading="heading"
      :selectedItemsCount="selectedCasesId.length"
      :isVisible="openAssignTeamModal"
      :selectedItems="selectedCasesId"
      @onConfirmAction="onConfirmAction"
      @deSelect="deSelect"
      @cloaseDialog="openAssignTeamModal = false"
    >
      <template v-slot:content>
        <el-select
          v-if="actionType === 'team'"
          class="w-full custom-style-option"
          v-model="selectedMembers"
          multiple
        >
          <el-option
            v-for="(member, index) in teamMembers"
            :key="`members_${index}`"
            :value="member.id"
            :label="`${member.firstName} ${member.lastName}`"
          ></el-option>
        </el-select>
        <el-select
          v-if="actionType === 'status'"
          class="w-full custom-style-option"
          v-model="selectedStatus"
        >
          <el-option
            v-for="(status, index) in statuses"
            :key="`status_${index}`"
            :value="Number(status.key)"
            :label="status.value"
          ></el-option>
        </el-select>
        <el-select
          v-if="actionType === 'office'"
          class="w-full custom-style-option"
          v-model="selectedOffices"
          multiple
        >
          <el-option
            v-for="(office, index) in locationList"
            :key="`office_${index}`"
            :value="office.name"
            :label="office.name"
          ></el-option>
        </el-select>
      </template>
    </ce-bulk-operations-dialog>

    <ce-delete-dialog
      dialogTitle="Are You Sure Want To Delete ?"
      :isVisible="isOpenDeleteDialog"
      @onCloseModal="handleCancelDeletion"
      @onDeleteElement="handleDeleteCase"
    ></ce-delete-dialog>

    <ce-export-dialog
      :isVisible="isOpenExportDialog"
      :filterColumns="filterColumns"
      :activeTab="activeTab === 'client' ? 'C' : 'P'"
      @close-dialog="onCloseDialog"
    >
    </ce-export-dialog>
  </div>
</template>
<script>
import CeHorizontalDrawerVue from '../../components/global/CeHorizontalDrawer.vue'
import CeAvatarVue from '../../components/shared/CeAvatar.vue'
import CeBadgeVue from '../../components/shared/CeBadge.vue'
import CeDeleteDialogVue from '../../components/shared/CeDeleteDialog.vue'
import CeFilterVue from '../../components/shared/CeFilter.vue'
import CeSort from '../../components/shared/CeSort.vue'
import CeFilterTagsVue from '../../components/shared/CeFilterTags.vue'
import CeQuestionnaireBadgeVue from '../../components/shared/CeQuestionnaireBadge.vue'
import findInitial from '@/mixins/findInitial'
import exportCase from '../../components/cases/CaseExport.vue'
import cePageSize from '../../components/global/CePageSize.vue'
import CeVerticalDrawer from '../../components/global/CeVerticalDrawer'
import CaseTabsDataVue from '../../components/cases/CaseTabsData.vue'
import CeBulkOperationsDialog from '../../components/shared/CeBulkOperationsDialog.vue'
import toastsMiddleware from '@/mixins/toastsMiddleware'

export default {
  head: { title: 'Cases' },
  mixins: [findInitial, toastsMiddleware],
  components: {
    ceFilter: CeFilterVue,
    ceAvatar: CeAvatarVue,
    ceBadge: CeBadgeVue,
    ceBadgeQuestionnaire: CeQuestionnaireBadgeVue,
    ceFilterTags: CeFilterTagsVue,
    ceHorizontalDrawer: CeHorizontalDrawerVue,
    ceDeleteDialog: CeDeleteDialogVue,
    CeSort,
    ceExportDialog: exportCase,
    cePageSize,
    CeVerticalDrawer,
    ceCaseTabsData: CaseTabsDataVue,
    CeBulkOperationsDialog
  },
  data: function () {
    return {
      actionType: '',
      heading: '',
      sortOptions: [
        { label: 'Client Name', value: 'clientName' },
        { label: 'Opened Date', value: 'openedDate' },
        { label: 'Submission Date', value: 'submissionDate' },
        { label: 'Modified Date', value: 'modifiedDate' },
        { label: 'Approval Date', value: 'approvedDate' }
      ],
      totalCount: 20000,
      showTableActions: false,
      title: '',
      titleDrawer: 'Notes',
      isOpenDeleteDialog: false,
      currentItemIndex: null,
      hasMultiSelection: false,
      isNotes: false,
      clientCases: [],
      prospectCases: [],
      isOpenExportDialog: false,
      activeTab: 'client',
      payload: null,
      pageSize: 50,
      prospectPageNumber: 1,
      clientPageNumber: 1,
      loading: true,
      pagingEnabled: null,
      loadMore: false,
      allClientCases: [],
      allProspectCases: [],
      loader: true,
      sortMethod: null,
      sortType: null,
      filters: null,
      showClientCases: false,
      showProspectCases: false,
      renderViewCount: 10,
      caseTypes: [],
      addTypeName: null,
      selectQuestionnaire: [],
      selectedCasesId: [],
      emailDrawer: false,
      content: '',
      moduleName: ' cases',
      filterColumns: [],
      openAssignTeamModal: false,
      teamMembers: [],
      selectedMembers: [],
      selectedOffices: [],
      statuses: [],
      selectedStatus: '',
      deSelectedCase: null
    }
  },
  mounted() {
    this.loadActiveTabData()
    this.getFilters()
  },
  created() {
    this.getCaseTypes()
    this.getOfficeLocation()
    this.getTeamMembers()
    this.getCaseStatuses()
  },
  updated() {
    //this.loading = false
  },
  computed: {
    filterTags() {
      return this.$store.getters['cases/filterTags']
    }
  },
  watch: {
    filterTags: {
      deep: true,
      handler() {
        this.clientCases = []
        this.allClientCases = []
        this.prospectCases = []
        this.allProspectCases = []
        this.prospectPageNumber = 1
        this.clientPageNumber = 1
        this.loadActiveTabData()
      }
    }
  },
  methods: {
    async getCaseStatuses() {
      try {
        this.statuses = await this.$CaseService.getCaseStatus({ action: 'R' })
      } catch (error) {
        console.error(error)
      }
    },
    async onConfirmAction() {
      try {
        let caseIds = this.selectedCasesId.map((elem) => elem.id)
        let res
        if (this.actionType === 'team') {
          res = await this.$TeamService.teamMembers({
            action: 'U',
            caseIds,
            target: 'bulkAssign',
            assigneeIds: this.selectedMembers
          })
        }
        if (this.actionType === 'office') {
          res = await this.$CaseService.caseInformation({
            action: 'U',
            caseIds,
            target: 'bulkOffice',
            officeLocation: this.selectedOffices
          })
        }
        if (this.actionType === 'status') {
          res = await this.$CaseService.caseInformation({
            action: 'U',
            caseIds,
            target: 'bulkStatus',
            status: this.selectedStatus
          })
        }
        if (this.actionType === 'client' || this.actionType === 'prospect') {
          res = await this.$CaseService.caseInformation({
            action: 'U',
            caseIds,
            target: this.actionType === 'client' ? 'bulkClient' : 'bulkProspect'
          })
        }
        if (res) {
          this.success('Success')
          this.clientPageNumber = 1
          this.prospectPageNumber = 1
          if (this.activeTab === 'client') {
            this.showClientCases = true
            this.showProspectCases = false
            this.clientCases = []
            this.allClientCases = []
            this.getClientCases()
          } else {
            this.prospectCases = []
            this.allProspectCases = []
            this.getProspectCases()
            this.showClientCases = false
            this.showProspectCases = true
          }
          this.selectedCasesId = []
          this.openAssignTeamModal = false
        }
      } catch (error) {
        console.error(error)
      }
    },
    openActionModal(type) {
      this.selectedMembers = null
      this.selectedOffices = null
      this.selectedStatus = null
      this.actionType = type
      if (type === 'team') {
        this.heading = 'Bulk Assign Team Members to Cases'
      }
      if (type === 'office') {
        this.heading = 'Bulk Assign Office Location to Cases'
      }
      if (type === 'status') {
        this.heading = 'Bulk Assign Status to Cases'
      }
      if (type === 'client') {
        this.heading = 'Bulk Convert to Client Case Type'
      }
      if (type === 'prospect') {
        this.heading = 'Bulk Convert to Prospect Case Type'
      }
      this.openAssignTeamModal = true
    },
    async getTeamMembers() {
      try {
        this.teamMembers = await this.$TeamService.teamMembers({
          action: 'R',
          target: 'general'
        })
      } catch (error) {
        console.error(error)
      }
    },
    async getOfficeLocation() {
      try {
        this.locationList = await this.$CaseService.getAllOfficeList({
          action: 'R'
        })
        if (this.locationList) {
          this.$store.dispatch('cases/setLocationList', this.locationList)
        }
      } catch (error) {
        console.error(error)
      }
    },
    openEmailModal() {
      this.emailDrawer = true
      this.moduleName = 'emails'
      this.$nextTick(() => {
        this.titleDrawer = 'New Message'
        this.$store.dispatch('emails/setCurrentVDrawer', 'composeEmail')
        this.$store.dispatch('emails/setCurrentVDrawerSize', '75%')
        this.content = 'composeEmail'
        this.$refs?.ceVDrawer?.showDrawer()
      })
    },
    casesId(data) {
      this.deSelectedCase = null
      this.selectedCasesId = data
      if (!this.selectedCasesId.length) {
        this.openAssignTeamModal = false
      }
    },
    deSelect(item) {
      this.deSelectedCase = item
    },
    async getCaseTypes() {
      try {
        this.caseTypes = await this.$CaseService.getCaseTypes({
          action: 'R'
        })
      } catch (error) {
        console.error(error)
      }
    },
    getStarted() {
      let caseType = this.activeTab === 'client' ? 'personal' : 'business'
      this.onHandleAddCase(caseType)
    },
    async getFilters() {
      try {
        this.filters = await this.$FiltersService.getFilters({
          action: 'R',
          resource: 'cases'
        })
      } catch (error) {
        console.error(error)
      }
    },
    onLoadMore() {
      this.loadMore = true
      if (this.activeTab === 'prospect') {
        this.getProspectCases()
      } else {
        this.getClientCases()
      }
    },
    async getClientCases() {
      const data = {
        category: 'C',
        pageSize: this.pageSize,
        pageNumber: this.clientPageNumber
      }
      data.sort = this.getSortData()

      const filter = this.getFilterData()

      if (!this.lodash.isNil(filter)) {
        data.filter = filter
      }

      this.showProspectCases = false
      this.loading = true

      try {
        this.clientCases = await this.$CaseService.getCases(data)
        this.clientPageNumber = this.clientCases.nextPageNumber
        let cases = this.lodash.take(
          this.clientCases.data,
          this.renderViewCount
        )

        cases.forEach((element) => {
          this.allClientCases.push(element)
        })
        this.loadMore = false
        this.showClientCases = true
        this.loading = false
        this.pagingEnabled = this.clientCases.pagingEnabled

        setTimeout(() => {
          this.clientCases.data.splice(0, this.renderViewCount)
          this.clientCases.data.forEach((element) => {
            this.allClientCases.push(element)
          })
          for (const key in this.clientCases.filterColumns) {
            this.filterColumns.push({
              label: this.clientCases.filterColumns[key],
              key,
              checked: false
            })
          }
        }, 500)
      } catch (error) {
        console.error(error)
      }
    },
    async getProspectCases() {
      const data = {
        category: 'P',
        pageSize: this.pageSize,
        pageNumber: this.prospectPageNumber
      }

      data.sort = this.getSortData()

      const filter = this.getFilterData()

      if (!this.lodash.isNil(filter)) {
        data.filter = filter
      }

      this.showClientCases = false
      this.loading = true

      try {
        this.prospectCases = await this.$CaseService.getCases(data)
        this.prospectPageNumber = this.prospectCases.nextPageNumber

        let cases = this.lodash.take(
          this.prospectCases.data,
          this.renderViewCount
        )

        cases.forEach((element) => {
          this.allProspectCases.push(element)
        })

        this.loadMore = false

        this.showProspectCases = true
        this.loading = false
        this.pagingEnabled = this.prospectCases.pagingEnabled

        setTimeout(() => {
          this.prospectCases.data.splice(0, this.renderViewCount)
          this.prospectCases.data.forEach((element) => {
            this.allProspectCases.push(element)
          })
        }, 500)
      } catch (error) {
        console.error(error)
      }
    },
    getSortData() {
      if (this.sortType && this.sortMethod) {
        return {
          sortName: this.sortType,
          sortOrder: this.sortMethod
        }
      }
    },
    getFilterData() {
      let filter = {}

      if (this.filterTags && this.filterTags.length) {
        this.filterTags.forEach((elem) => {
          if (elem.filterType === 'Assignee') {
            filter.assigneeId = elem.id
          }
          if (elem.filterType === 'Referral Source') {
            filter.referralSource = {
              key: elem.key,
              codeName: elem.name
            }
          }
          if (elem.filterType === 'Status') {
            filter.statusId = elem.id
          }
          if (elem.filterType === 'Case Type') {
            filter.caseTypeId = elem.id
          }
          if (elem.filterType === 'Last Modified') {
            filter.range = elem.name
          }
        })
      }

      return filter
    },

    getBusinessCases() {},
    exportCase() {
      this.isOpenExportDialog = true
    },
    onCloseDialog() {
      this.isOpenExportDialog = false
    },
    onSetFilterTags(tags) {
      this.$store.dispatch('cases/setFilterTags', tags)
    },
    onClearFilterTags() {
      this.$store.dispatch('cases/setFilterTags', [])
    },

    openNewCase() {
      this.$router.push('/cases/create')
    },
    onEmitPayload(data) {
      if (data.selectQuestionnaire) {
        this.$nextTick(() => {
          this.selectQuestionnaire = data
          if (this.addTypeName === 'personal') {
            this.title = 'Add Personal Case'
            this.$store.dispatch(
              'cases/setCurrentDrawer',
              'addPersonalCaseForm'
            )
            this.$refs.ceHDrawer.showDrawer()
          } else {
            this.title = 'Add Business Case'
            this.$store.dispatch(
              'cases/setCurrentDrawer',
              'addBusinessCaseForm'
            )
            this.$refs.ceHDrawer.showDrawer()
          }
        })
      }
    },
    handleCaseDetailView(caseItem) {
      this.$router.push(
        `/cases/detail/${caseItem.id}?contact_id=` + caseItem.contactId
      )
    },
    openAddApplicantDrawer() {
      this.title = 'Assign Questionnaire'
      this.moduleName = 'cases'
      this.$store.dispatch('cases/setCurrentDrawer', 'addApplicantQuestionnare')
      this.$refs.ceHDrawer.showDrawer()
    },
    onHandleAddCase(name) {
      this.addTypeName = name
      this.moduleName = 'cases'
      this.payload = this.caseTypes
      if (this.addTypeName === 'personal') {
        this.title = 'Add Personal Case'
        this.$store.dispatch('cases/setCurrentDrawer', 'addPersonalCaseForm')
        this.$refs.ceHDrawer.showDrawer()
      } else {
        this.title = 'Add Business Case'
        this.$store.dispatch('cases/setCurrentDrawer', 'addBusinessCaseForm')
        this.$refs.ceHDrawer.showDrawer()
      }
    },
    openNotesDrawer(row) {
      this.content = 'genericNotes'
      this.moduleName = 'cases'
      this.payload = row
      this.isNotes = true
      this.$store.dispatch('cases/setCurrentVDrawer', 'genericNotes')
      this.$store.dispatch('cases/setVDrawerVisibility', true)
      this.$store.dispatch('cases/setCurrentVDrawerSize', '40%')
    },
    onCloseDrawer() {
      ;(this.isNotes = false),
        (this.emailDrawer = false),
        (this.titleDrawer = 'Notes'),
        (this.moduleName = 'cases')
    },
    handleOpenDeleteDialog(index) {
      this.currentItemIndex = index
      this.isOpenDeleteDialog = true
    },
    handleCancelDeletion() {
      this.currentItemIndex = null
      this.isOpenDeleteDialog = false
    },
    handleDeleteCase() {},
    selectCase(id) {
      if (this.selectedCases.find((x) => x == id)) {
        this.selectedCases.splice(this.selectedCases.indexOf(id), 1)
      } else {
        this.selectedCases.push(id)
      }

      this.lodash.isNil(this.selectedCases) || this.selectedCases.length == 0
        ? (this.hasMultiSelection = false)
        : (this.hasMultiSelection = true)
    },
    onAscendList(val) {
      this.resetList(val, 'asc')
    },
    onDescendList(val) {
      this.resetList(val, 'desc')
    },
    resetList(val, sortOrder) {
      this.clientCases = []
      this.prospectCases = []
      this.allClientCases = []
      this.allProspectCases = []
      this.prospectPageNumber = 1
      this.clientPageNumber = 1
      this.sortType = val
      this.sortMethod = sortOrder
      this.loading = true
      this.loadActiveTabData()
    },
    handleTabClick(tabName) {
      this.selectedCasesId = []
      this.allClientCases = []
      this.allProspectCases = []
      this.prospectPageNumber = 1
      this.clientPageNumber = 1
      this.activeTab = tabName.name
      this.loadActiveTabData()
    },
    refreshTableData() {
      this.allClientCases = []
      this.allProspectCases = []
      this.prospectPageNumber = 1
      this.clientPageNumber = 1
      this.loadActiveTabData()
    },
    loadActiveTabData() {
      this.activeTab === 'client'
        ? this.getClientCases()
        : this.activeTab === 'prospect'
        ? this.getProspectCases()
        : this.getBusinessCases()
    },
    formatAppointmentDate(appDate) {
      return this.lodash.isNil(appDate) || this.lodash.isNil(appDate.date)
        ? ''
        : appDate.date
    },
    formatAppointmentTime(appDate) {
      return this.lodash.isNil(appDate) || this.lodash.isNil(appDate.time)
        ? ''
        : appDate.time
    },
    getDatePadding(index) {
      return index === 0 ? 'date-pad-30' : 'date-pad-40'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/element-variables.scss';
.actions {
  float: right;
}
.page-actions-container {
  display: flex;
  padding-bottom: 15px;

  .col-left {
    flex-basis: 50%;
    display: flex;
    justify-content: left;
    flex: 1;
    .el-button {
      padding: 4.5px 15px;
      /deep/ span {
        display: flex;
        align-items: center;
        i {
          margin-left: 4px;
        }
      }
    }
    .space-content {
      padding-right: 10px;
    }
    /deep/ .el-dropdown {
      .el-button {
        padding: 7px 20px;
        margin-right: 10px;
      }
    }
  }
  .actions {
    float: right;
  }
}

.list-container {
  display: flex;
  flex-direction: column;

  .bulk-actions {
    margin-bottom: 10px;
  }

  .card-list {
    $danger: $--color-danger;
    margin-bottom: 10px;

    /deep/ & .el-tabs--border-card > .el-tabs__content {
      padding-bottom: 0px;
    }

    /deep/ & .el-tab-pane {
      flex-basis: 100%;
      height: 135px;
      font-size: 14px;
      overflow-y: auto;

      .title {
        font-family: $font-semi;
        display: inline-block;
        color: #514c4c;
      }
      .text {
        display: block;
        padding-bottom: 5px;
        .color-danger {
          color: $--color-danger;
        }
      }
      .parent-container {
        display: flex;
        .selection {
          flex-basis: 2%;
          .id-counter {
            height: 15px;
            line-height: 1.5;
            font-size: 11px;
          }
        }
        .box-card-container {
          display: flex;
          flex-direction: column;
          flex-basis: 98%;
          .row {
            gap: 10px;
            display: flex;
            padding-bottom: 5px;
            .case-link {
              font-family: $font-semi;
              color: $--color-primary;
            }
          }
          .box-card {
            display: flex;
            flex-direction: row;
            gap: 10px;
            line-height: 1.5;

            .case-number {
              flex-basis: 2.5%;
              font-size: 11px;
            }
            .demo {
              flex-basis: 15%;
            }
            .case-type {
              flex-basis: 35%;
              .progress-bar {
                display: block;
                width: 70%;
              }
            }
            .noc {
              flex-basis: 15%;
            }
            .tags {
              flex-basis: 45%;
              display: flex;
              flex-direction: column;

              .tags-container {
                flex-basis: 100%;
                height: 40px;
              }
              .date-container {
                flex-basis: 100%;
                display: flex;

                .date-pad-30 {
                  width: 30%;
                  padding-right: 10px;
                }
                .date-pad-40 {
                  width: 40%;
                }
              }
            }
            .dates {
              flex-basis: 25%;
            }
            .contextual-button {
              flex: 2.5%;
              i {
                font-size: 24px;
              }
            }
            .questionnaires {
              flex-basis: 80%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              overflow-y: auto;
              max-height: 110px;
            }
          }
        }
      }
    }
  }
}
.page-size-custom-style {
  margin-bottom: 2px !important;
}
.load-more-button {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 10px;
  button {
    width: 190px;
  }
}
.record-tags {
  .count {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .tags {
    flex-basis: 70%;
    padding-bottom: 10px;
  }
}
.w-full {
  width: 100%;
}
.header-section {
  font-size: 17px;
  font-weight: 600;
  color: #000000;
}
ul li.el-dropdown-menu__item:hover {
  background-color: inherit;
}
.bulk-options {
  /deep/.el-button {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
    padding-top: 0px;
    padding-bottom: 0px;
    span {
      .devider-vertical {
        height: 30px;
        margin-right: 18px;
        background-color: #b3d8ff;
      }
      i {
        top: 6px;
        right: 4px;
        position: absolute;
      }
      color: #0475e9;
    }
  }
}
.dialog-body {
  .left-side {
    padding: 15px 10px 15px 0;
    max-height: 300px;
    h4 {
      color: #000000;
      font-weight: 400;
      margin: 0;
      padding: 0 0 12px 10px;
      border-bottom: 1px solid rgba(137, 137, 137, 0.1);
    }
    border-right: 3px solid rgba(137, 137, 137, 0.1);
    border-bottom: 3px solid rgba(137, 137, 137, 0.1);
    .question {
      display: flex;
      align-items: center;
      margin-top: 12px;
      span {
        font-size: 13px;
      }
      i {
        margin-top: 2px;
      }
    }
    .name-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 4px;
      .display-name {
        position: relative;
        padding-left: 20px;
        color: #000000;
        &::before {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50px;
          background-color: rgba(137, 137, 137, 0.3);
          left: 6px;
          top: 6px;
        }
      }
      .clear-icon {
        color: red;
        font-size: 18px;
        cursor: pointer;
      }
      &:hover {
        background: #eef6ff;
        .display-name::before {
          background: #0475e9;
        }
      }
    }
  }
  .right-side {
    padding: 20px 0 20px 20px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .warning {
      margin-bottom: 40px;
      .icon {
        display: flex;
        justify-content: center;
      }
      &-message {
        font-size: 16px;
        color: black;
        font-weight: 600;
      }
      &-icon-warning {
        color: #f7b217;
        font-size: 60px;
        margin-bottom: 20px;
      }
    }
  }
}
.dialog-footer {
  position: relative;
  margin-top: 10px;
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    height: 1px;
    width: 105%;
    background-color: rgba(137, 137, 137, 0.3);
  }
}
</style>
