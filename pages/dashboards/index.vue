<template>
  <div>
    <h1>Dashboard</h1>
    <div class="content-head">
      <el-select
        v-model="payload.filter"
        class="custom-input members-list"
        placeholder="Select Filter"
      >
        <el-option
          v-for="(item, index) in members"
          :key="`member_${index}`"
          :label="`${item.firstName} ${item.lastName}`"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span class="text-black seperate" v-if="payload.filter"
        >Currently viewing</span
      >
      <ce-badge
        v-if="payload.filter"
        :text="selectedMember"
        type="primary"
      ></ce-badge>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="General" name="first">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bordered-box">
              <el-row v-if="response && response.task.count > 0">
                <div class="d-flex">
                  <span class="number"> {{ response.task.count }}</span>
                  <div>
                    <span class="text-black title block">Tasks</span>
                    <span class="block"
                      >Next Task Due: {{ response.task.dueDate }} at
                      {{ response.task.dueTime }}</span
                    >
                    <el-button
                      type="text"
                      class="view-button"
                      @click="isOpenTaskModal = true"
                    >
                      <span>View All Tasks</span>
                      <i class="el-icon-right"></i>
                    </el-button>
                  </div>
                </div>
              </el-row>
              <el-row v-else>
                <el-col :span="24">
                  <div class="no-upcoming">
                    <span class="text-black title block"
                      >No Upcoming Tasks</span
                    >
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bordered-box">
              <el-row v-if="response.appointment && response.appointment.count">
                <div class="d-flex">
                  <span class="number">{{ response.appointment.count }}</span>
                  <div>
                    <span class="text-black title block"> Appointments</span>
                    <span class="block upcoming-date"
                      >Next Appointments: {{ response.appointment.dueDate }} at
                      {{ response.appointment.dueTime }}</span
                    >
                    <el-button
                      type="text"
                      class="view-button"
                      @click="getAppointments"
                    >
                      <span>View All Appointments</span>
                      <i class="el-icon-right"></i>
                    </el-button>
                  </div>
                </div>
              </el-row>
              <el-row v-else>
                <el-col :span="24">
                  <div class="no-upcoming">
                    <span class="text-black title block"
                      >No Upcoming Appointments</span
                    >
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <approval-metric
              :payload="approvalMetric"
              :years="years"
              @changeYear="getApprovalMetric"
            />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7" class="left-col">
            <prospects-clients-chart
              @openDrillDownModal="handleOpenDrillDownModal"
              @onSelectContactModalOptions="handleOpenContactModal"
              :assigneeId="payload.filter"
            ></prospects-clients-chart>
          </el-col>
          <el-col :span="17" class="right-col">
            <case-by-type-chart
              @openDrillDownModal="handleOpenDrillDownModal"
              @onSelectContactModalOptions="handleOpenContactModal"
              :assigneeId="payload.filter"
            ></case-by-type-chart>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7" class="left-col">
            <case-by-status-chart
              @openDrillDownModal="handleOpenDrillDownModal"
              @onSelectContactModalOptions="handleOpenContactModal"
              :assigneeId="payload.filter"
            ></case-by-status-chart>
          </el-col>
          <el-col :span="17" class="right-col">
            <reminders :assigneeId="payload.filter"></reminders>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Performance Metrics" name="second">
        <el-row :gutter="20">
          <el-col :span="24">
            <retainers-invoices-payments-chart
              @onSelectContactModalOptions="handleOpenContactModal"
              @openDrillDownModal="handleOpenDrillDownModal"
              @chanegFinanceYear="chanegFinanceYear"
              @chanegCurrencyType="chanegCurrencyType"
              :years="years"
              :currencyData="currencyData"
              :assigneeId="payload.filter"
            ></retainers-invoices-payments-chart>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <client-insights-by-age-chart
              :assigneeId="payload.filter"
            ></client-insights-by-age-chart>
          </el-col>
          <el-col :span="12">
            <referral-sources-chart
              :assigneeId="payload.filter"
            ></referral-sources-chart>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="View Tasks"
      :visible.sync="isOpenTaskModal"
      width="80%"
      fullscreen
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <general-task-board
        ref="taskBoard"
        @onSelect="onSelectRow"
        @onDelete="handleOpenDeleteDialog"
        :table-data="tableData"
        :loader="false"
      ></general-task-board>
    </el-dialog>
    <appointments-dialog
      @onClose="handleClose"
      @getAppointments="getAppointments"
      :appointmentLoader="loadAppointment"
      :is-open="isOpenAppointmentModal"
      :appointments="appointments"
    ></appointments-dialog>
    <el-dialog
      class="chart-data"
      :title="!drillDownLoader ? contactModalOptions.title : ''"
      :visible.sync="contactModalOptions.isOpen"
      :modal-append-to-body="false"
      width="90%"
      :close-on-click-modal="false"
    >
      <div v-loading="drillDownLoader" style="height: 400px">
        <template
          v-if="
            drillDown &&
            (drillDown.data.cases ||
              drillDown.data.contacts ||
              drillDown.data.data) &&
            !drillDownLoader
          "
        >
          <el-table
            :lock-scroll="false"
            :data="
              drillDown.data.cases
                ? drillDown.data.cases
                : drillDown.data.contacts
                ? drillDown.data.contacts
                : drillDown.data.data
            "
            stripe
            height="400"
            style="width: 100%"
          >
            <el-table-column type="index"> </el-table-column>
            <el-table-column
              label="Amount"
              width="130"
              v-if="
                drillDown.data &&
                (drillDown.name === 'Payments' ||
                  drillDown.name === 'Invoices' ||
                  drillDown.name === 'Retainers')
              "
            >
              <template slot-scope="scope">
                <el-link
                  :underline="false"
                  type="primary"
                  @click="
                    redirectCase(
                      scope.row.caseId,
                      scope.row.id,
                      scope.row.contactId
                    )
                  "
                >
                  {{ drillDown.symbol
                  }}{{
                    scope.row.amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }}.00
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="Name">
              <template slot-scope="scope">
                <div class="table-row">
                  <span class="row-top">
                    <el-link target="t_blank" :underline="false" type="primary">
                      <span
                        v-if="
                          drillDown.data &&
                          (drillDown.name === 'Prospects' ||
                            drillDown.name === 'Clients')
                        "
                        @click="redirectContact(scope.row.id)"
                      >
                        {{
                          scope.row.displayName
                            ? scope.row.displayName
                            : `${scope.row.fname} ${scope.row.lname}`
                        }}
                      </span>
                      <span
                        v-else
                        @click="
                          redirectCase(
                            scope.row.caseId,
                            scope.row.id,
                            scope.row.contactId
                          )
                        "
                      >
                        {{
                          scope.row.displayName
                            ? scope.row.displayName
                            : `${scope.row.fname} ${scope.row.lname}`
                        }}
                      </span>
                    </el-link>
                  </span>
                  <span
                    v-if="
                      drillDown.name === 'Clients' ||
                      drillDown.name === 'Prospects'
                    "
                    >{{ scope.row.maritalStatus }}</span
                  >
                  <span v-else class="row-buttom">
                    {{ scope.row.caseNumber }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="
                drillDown.data &&
                (drillDown.name === 'Prospects' || drillDown.name === 'Clients')
              "
              label="Contact"
            >
              <template slot-scope="scope">
                <div class="table-row">
                  <span class="row-top">
                    {{ scope.row.email ? scope.row.email : '-' }}
                  </span>
                  <span class="row-buttom">
                    {{ scope.row.phone ? scope.row.phone : '-' }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="caseType"
              v-if="
                drillDown.name !== 'Prospects' &&
                drillDown.name !== 'Clients' &&
                drillDown.chartName !== 'caseByTypes'
              "
              label="Case Type"
            >
              <template slot-scope="scope">
                <div class="table-row">
                  <span class="row-top">
                    {{ scope.row.caseType }}
                  </span>
                  <span class="row-buttom">
                    <ce-badge
                      :text="
                        scope.row.caseStatus
                          ? scope.row.caseStatus
                          : scope.row.status
                      "
                    ></ce-badge>
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="caseType"
              v-if="drillDown.chartName === 'caseByTypes'"
              label="Case Status"
            >
              <template slot-scope="scope">
                <div class="table-row">
                  <span class="row-buttom">
                    <ce-badge
                      :text="
                        scope.row.caseStatus
                          ? scope.row.caseStatus
                          : scope.row.status
                      "
                    ></ce-badge>
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Job Title / NOC">
              <template slot-scope="scope">
                <div class="table-row">
                  <el-tooltip
                    v-if="scope.row.jobTitle"
                    :content="scope.row.jobTitle"
                  >
                    <span class="row-top job-title">
                      {{ scope.row.jobTitle }}
                    </span>
                  </el-tooltip>
                  <span class="row-buttom"> {{ scope.row.nocCode }} </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Age"
              v-if="
                drillDown.data &&
                (drillDown.name === 'Prospects' || drillDown.name === 'Clients')
              "
              width="100"
            >
              <template>
                <div class="table-row">
                  <span class="row-buttom"> - </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Created Date" width="150">
              <template slot-scope="scope">
                <div class="table-row">
                  <span class="row-top">
                    {{ scope.row.creationDate | createDate }}
                  </span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-dialog>
    <ce-delete-dialog
      dialogTitle="Are you sure want to delete ?"
      :body-appended="true"
      :isVisible="isOpenDeleteDialog"
      @onDeleteElement="handleConfirmDeleteTask"
      @onCloseModal="onCancelDeletion"
    ></ce-delete-dialog>
    <ce-delete-dialog
      dialogTitle="Are you sure want to delete ?"
      :body-appended="true"
      :isVisible="isOpenDeleteSelectedDialog"
      @onDeleteElement="handleConfirmDeleteSelected"
      @onCloseModal="onCancelDeleteSelected"
    ></ce-delete-dialog>
  </div>
</template>

<script>
import CeBadge from '../../components/shared/CeBadge'
import GeneralTaskBoard from '../../components/tasks/GeneralTaskBoard'
import CeAvatar from '../../components/shared/CeAvatar'
import RetainersInvoicesPaymentsChart from '../../components/dashboards/RetainersInvoicesPaymentsChart'
import CaseByTypeChart from '../../components/dashboards/CaseByTypeChart'
import ReferralSourcesChart from '../../components/dashboards/ReferralSourcesChart'
import ClientInsightsByAgeChart from '../../components/dashboards/ClientInsightsByAgeChart'
import Reminders from '../../components/dashboards/Reminders'
import CaseByStatusChart from '../../components/dashboards/CaseByStatusChart'
import ProspectsClientsChart from '../../components/dashboards/ProspectsClientsChart.vue'
import AppointmentsDialog from '../../components/dashboards/AppointmentsDialog.vue'
import ApprovalMetric from '../../components/dashboards/ApprovalMetric.vue'
import CeDeleteDialog from '../../components/shared/CeDeleteDialog'
import moment from 'moment'

export default {
  head: { title: 'Dashboards' },
  name: 'index',
  components: {
    CeBadge,
    GeneralTaskBoard,
    CeAvatar,
    RetainersInvoicesPaymentsChart,
    CaseByTypeChart,
    Reminders,
    CaseByStatusChart,
    ProspectsClientsChart,
    AppointmentsDialog,
    CeDeleteDialog,
    ApprovalMetric,
    ClientInsightsByAgeChart,
    ReferralSourcesChart
  },
  data() {
    return {
      payload: {
        filter: null
      },
      target: 'all',
      currencyType: 'CAD',
      financeyear: new Date().getFullYear(),
      years: [],
      currencyData: [],
      response: {
        task: {
          count: 0
        }
      },
      isOpenAppointmentModal: false,
      isOpenDeleteDialog: false,
      tableData: [],
      isOpenTaskModal: false,
      memberAppointmentCount: 3,
      members: [],
      contactModalOptions: {
        title: '',
        isOpen: false
      },
      currentRowIndex: null,
      currentSelectedItems: [],
      isOpenDeleteSelectedDialog: false,
      appointments: {},
      drillDown: null,
      appointmentLoader: false,
      drillDownLoader: false,
      approvalMetric: null,
      loadAppointment: false,
      activeName: 'first'
    }
  },
  watch: {
    'payload.filter'() {
      this.getApprovalMetric(new Date().getFullYear())
      this.getDashboardService()
    }
  },
  filters: {
    createDate(data) {
      return moment(data).format('ll')
    },
    formatCurrency(value, type, showCurrency) {
      const typeCurrency = type || 'CAD'
      if (typeof value !== 'number') {
        return value
      }
      var formatter = new Intl.NumberFormat(`en-${typeCurrency.slice(0, 2)}`, {
        style: 'currency',
        currency: typeCurrency,
        minimumFractionDigits: 2
      })
      return `${showCurrency ? typeCurrency : ''} ${formatter.format(value)}`
    }
  },
  computed: {
    selectedMember() {
      const selected = this.members.find(
        (elem) => elem.id === this.payload.filter
      )
      return `${selected.firstName} ${selected.lastName}`
    }
  },
  methods: {
    async getApprovalMetric(year) {
      try {
        this.approvalMetric = await this.$DashboardService.DashboardService({
          assigneeId: this.payload.filter,
          target: 'approvals',
          financeYear: year
        })
      } catch (error) {
        console.error(error)
      }
    },
    redirectContact(id) {
      let routeData = this.$router.resolve({
        path: '/contacts',
        query: { contactId: id }
      })
      window.open(routeData.href, '_blank')
    },
    redirectCase(caseId, id, contactId) {
      let routeData = this.$router.resolve({
        path: `/cases/detail/${caseId ? caseId : id}?contact_id=` + contactId
      })
      window.open(routeData.href, '_blank')
    },
    handleOpenDrillDownModal() {
      this.contactModalOptions.isOpen = true
      this.drillDownLoader = true
    },
    handleOpenContactModal(payload) {
      this.drillDown = payload
      if (payload.mony) {
        this.contactModalOptions.title = `${
          payload.name
        }(${this.$options.filters.formatCurrency(
          payload.mony,
          payload.currencyType,
          true
        )}) - ${payload.data.count} Cases found`
      } else if (payload.name === 'Prospects' || payload.name === 'Clients') {
        this.contactModalOptions.title = `${payload.name} - ${payload.data.count} Contacts found`
      } else {
        this.contactModalOptions.title = `${payload.name} - ${payload.data.count} Cases found`
      }
      this.drillDownLoader = false
    },
    handleClose() {
      this.isOpenAppointmentModal = false
    },
    handleOpenDeleteDialog(index) {
      this.currentRowIndex = index
      this.isOpenDeleteDialog = true
    },
    handleConfirmDeleteTask() {
      this.tableData.splice(this.currentRowIndex, 1)
      this.onCancelDeletion()
    },
    onCancelDeletion() {
      this.currentRowIndex = null
      this.isOpenDeleteDialog = false
    },
    onSelectRow(items) {
      this.currentSelectedItems = items
    },
    onEdit() {
      const indexList = []
      for (let i in this.currentSelectedItems) {
        indexList.push(this.currentSelectedItems[i].id - 1)
      }
      this.$refs.taskBoard?.handleEditSelectedRows(indexList)
    },
    handleDeleteSelectedRows() {
      this.isOpenDeleteSelectedDialog = true
    },
    handleConfirmDeleteSelected() {
      this.tableData = this.tableData.filter(
        (elem) => !this.currentSelectedItems.includes(elem)
      )
      this.onCancelDeleteSelected()
    },
    onCancelDeleteSelected() {
      this.selectedRows = []
      this.isOpenDeleteSelectedDialog = false
    },
    async getDashboardService() {
      try {
        this.response = await this.$DashboardService.DashboardService({
          target: 'all',
          assigneeId: this.payload.filter
        })
        this.approvalMetric = this.response.approvalMetric
        this.currencyData = this.response.currency.map((elem, index) => {
          return {
            id: index,
            name: elem
          }
        })
        this.years = this.response.years.reverse()
      } catch (error) {
        console.error(error)
      }
    },
    chanegFinanceYear(year) {
      this.financeyear = year
    },
    chanegCurrencyType(type) {
      this.currencyType = type
    },
    async getTasks() {
      const data = {
        action: 'R',
        filter: {
          dueDate: { criteria: 'upcoming' }
        },
        assigneeId: this.payload.filter
      }
      try {
        var results = await this.$DashboardService.getTasks(data)
        this.tableData = results.data
      } catch (error) {
        console.error(error)
      }
    },
    async getAppointments() {
      this.isOpenAppointmentModal = true
      this.loadAppointment = true
      const data = {
        action: 'R',
        target: 'dashboard',
        assigneeId: this.payload.filter
      }
      try {
        this.appointments = await this.$DashboardService.getAppointments(data)
        this.loadAppointment = false
      } catch (error) {
        this.loadAppointment = false
        console.error(error)
      }
    },
    async getTeamMembers() {
      try {
        this.members = await this.$TeamService.teamMembers({
          action: 'R',
          target: 'dashboard'
        })
        this.payload.filter = this.members[0].id
      } catch (error) {
        console.error(error)
      }
    },
    setColor(status) {
      return status === 'NOT PAID'
        ? 'danger'
        : status === 'PARTIAL'
        ? 'warning'
        : 'success'
    }
  },
  created() {
    this.getTeamMembers()
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/element-variables.scss';
.text-black {
  color: black;
}
.small-line-height {
  margin-top: 4px;
  margin-bottom: -4px;
}
.d-flex {
  display: flex;
  gap: 7px;
  align-items: center;
}
.block {
  display: block;
}
.title {
  font-family: $font-bold;
  font-size: 18px;
  margin-top: 6px;
}
// .custom-input {
//   width: 330px;
// }
.seperate {
  margin-left: 28px;
}
.number {
  font-weight: bold;
  font-size: 36px;
  color: #2b70d6;
  margin-right: 6px;
}
.content-head {
  margin-bottom: 21px;
}
.view-button {
  padding-top: 4px;
  padding-bottom: 4px;
  /deep/ span:first-child {
    i {
      margin-left: 5px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.gray {
  color: gray;
}
.bulk-actions {
  display: flex;
  justify-content: flex-end;
}
::v-deep {
  .el-dialog__body {
    padding: 0 20px 20px 20px;
  }
}
.chart-data {
  /deep/ .el-dialog__header {
    padding-bottom: 17px;
  }
  /deep/.cell {
    line-height: 20px;
    height: 100%;
  }
  /deep/ .el-table td {
    height: 55px !important;
    padding: 5px 0;
    border: none;
  }
  /deep/ .el-table::before {
    height: 0;
  }
  /deep/ .el-table th.is-leaf {
    border: none;
  }
}
.loader {
  /deep/.el-loading-mask {
    top: 20px;
  }
}
.no-upcoming {
  height: 76px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
::v-deep .members-list {
  .el-input {
    display: flex;
  }
  input {
    border: none;
    color: #2b70d6;
    background-color: #f3f2ef;
    padding: 0;
    width: 160px;
  }
  input::placeholder {
    color: #2b70d6;
  }
  .el-select__caret {
    color: #2b70d6 !important;
  }
  .el-input__suffix {
    position: unset;
    margin-left: -15px;
  }
}
.table-row {
  width: 100%;
  height: 25px;
  margin-bottom: 10px;
  .row-top {
    display: block;
    height: 16px;
    font-size: 16px;
    font-family: $font-semi;
  }

  .row-buttom {
    color: #8c8989;
    font-weight: 500;
    font-size: 12px;
    display: block;
    margin-top: 4px;
  }
  .header-badge {
    height: 30px;
  }
}
.upcoming-date {
  font-size: 13px;
  margin-top: 3px;
}
.job-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
