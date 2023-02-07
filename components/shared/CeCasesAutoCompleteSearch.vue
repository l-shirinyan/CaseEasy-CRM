<template>
  <div class="auto-container">
    <el-autocomplete
      v-model="state"
      placeholder="Type case number or contact name"
      @select="handleSelect"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      class="full-width"
      popper-class="case-auto-complete-popper"
      ref="caseAutoComplete"
      popper-append-to-body
      prefix-icon="el-icon-search"
      v-if="!isSelected"
      autocomplete="off"
      auto-complete="off"
      name="caseSearch"
      id="caseSearchId"
      autocorrect="off"
      spellcheck="false"
    >
      <template slot-scope="{ item }">
        <div class="results-container">
          <el-row>
            <el-col :span="24">
              <div class="avatar">
                <ce-avatar
                  size="medium"
                  :initials="item.initial"
                  :isRandom="true"
                ></ce-avatar>
              </div>
              <div class="result-name">
                {{ item.firstName }} {{ item.lastName }}<br />
              </div>
              <div class="demo">
                {{ item.email }} <br />
                {{ item.dob }} <br />
              </div>
              <div class="info">
                {{ item.phone }} <br />
                {{ item.countryOfResidence }}
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="5" v-if="item.cases !== null">
            <el-col :span="24">
              <div class="cases-results">
                <ce-badge
                  type="primary-invert"
                  :text="`${item.count} Case(s) Found`"
                >
                </ce-badge>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-autocomplete>
    <div v-else class="selected-contact">
      <div class="text" v-if="size === 'large'">
        <span class="content">
          {{ selectedContact.fullName }}
        </span>
        <span class="content">
          {{ selectedCase }}
        </span>
        <span class="content">
          {{ selectedContact.email }}
        </span>
        <span class="content">
          {{ selectedContact.phone }}
        </span>
        <span class="content">
          {{ selectedCase }}
        </span>
      </div>
      <div v-else class="text">
        <span class="content">
          {{ selectedContact.fullName }}
        </span>
        <span class="content">
          {{ selectedCase }}
        </span>
      </div>
      <div class="action">
        <div style="float: right">
          <el-button type="primary" size="mini" @click="deselectContact">
            Change Case</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog
      :modal="false"
      title="Select Case"
      :visible.sync="isDialogVisible"
      width="60%"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <div class="cases-container">
        <el-table height="300" :data="selectedCases" style="width: 100%">
          <el-table-column prop="caseNumber" label="Case Number" width="150px">
            <template slot-scope="scope">
              {{ scope.row.caseNumber ? scope.row.caseNumber : '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="caseType" label="Case Type">
            <template slot-scope="scope">
              {{ scope.row.caseType ? scope.row.caseType : '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="submitted" label="Submitted Date">
            <template slot-scope="scope">
              {{ scope.row.submitted ? scope.row.submitted : '-' }}
            </template>
          </el-table-column>
          <el-table-column label="Action" width="150">
            <template slot-scope="scope">
              <el-button
                @click="handleSelectCase(scope.row)"
                type="primary"
                size="mini"
                >Select</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button @click="isDialogVisible = false">Close</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CeAvatarVue from './CeAvatar.vue'
import CeBadgeVue from './CeBadge.vue'
export default {
  components: {
    CeAvatar: CeAvatarVue,
    ceBadge: CeBadgeVue
  },
  props: {
    selectedCaseId: {
      type: Number,
      default() {
        return null
      }
    },
    isVisibleDialog: Boolean,
    size: {
      type: String,
      required: false,
      default: 'large'
    },
    clientId: {
      type: Number,
      default() {
        return null
      }
    }
  },
  mounted() {
    this.caseId = this.selectedCaseId
    if (this.selectedCaseId) {
      let selectedCase = this.loadContacts().find(
        (elem) => elem.id === this.caseId
      )
      this.handleSelect(selectedCase)
    } else {
      this.deselectContact()
    }
    if (this.clientId) {
      this.caseId = this.clientId
    }
  },
  data: function () {
    return {
      state: '',
      contacts: [],
      isSelected: false,
      caseId: null,
      selectedContact: {},
      isDialogVisible: false,
      selectedCases: [],
      selectedCase: null,
      response: null,
      autoSetting: 'off'
    }
  },
  watch: {
    isVisibleDialog() {
      if (this.isVisibleDialog) {
        this.caseId = this.selectedCaseId
      } else {
        this.caseId = null
        this.deselectContact()
      }
    },
    clientId() {
      if (this.clientId) {
        this.caseId = this.clientId
      }
    },
    caseId() {
      if (this.caseId) {
        let selectedCase = this.loadContacts().find(
          (elem) => elem.id === this.caseId
        )
        this.handleSelect(selectedCase)
      } else {
        this.deselectContact()
      }
    }
  },
  methods: {
    async querySearch(queryString, returnSuggestions) {
      if (queryString.length < 3) {
        this.$refs.caseAutoComplete.activated = false
      }
      try {
        if (queryString && queryString.length >= 3) {
          this.$refs.caseAutoComplete.activated = true
          this.response = await this.$ContactService.contactService({
            value: queryString
          })
          this.contacts = this.response.result
          let results = queryString
            ? this.contacts.filter(this.createFilter(queryString))
            : this.contacts
          returnSuggestions(results)
        }
      } catch (error) {
        console.error(error)
      }
    },
    createFilter(queryString) {
      return (contact) => {
        contact.fullName = `${contact.firstName} ${contact.lastName}`
        return contact.fullName
          .toLowerCase()
          .includes(queryString.toLowerCase())
      }
    },
    handleSelect(item) {
      if (
        this.lodash.isNil(item.cases) ||
        (item.cases.length <= 1 && !this.lodash.isNil(item.cases))
      ) {
        this.isSelected = true
        this.selectedContact = item
        this.selectedCase = item.cases.length ? item.cases[0].caseNumber : ''
        this.$emit('select-case', {
          contact: item,
          case: item.cases,
          initial: item.initial
        })
      } else {
        this.selectedCases = item.cases
        this.selectedContact = item
        this.isDialogVisible = true
      }
    },
    handleSelectCase(selectCase) {
      this.isSelected = true
      this.isDialogVisible = false
      this.selectedCase = selectCase.caseNumber

      this.$emit('select-case', {
        contact: this.selectedContact,
        case: selectCase
      })
    },
    deselectContact() {
      this.isSelected = false
      this.selectedContact = null
      this.selectedCase = null
      this.caseId = null
      this.$emit('deselect-case')
    },
    loadContacts() {
      return [
        {
          id: 0,
          firstName: '',
          lastName: '',
          fullName: '',
          emailAddress: '',
          dateOfBirth: '',
          phone: '',
          country: '',
          caseType: '',
          initials: '',
          cases: [
            {
              id: 0,
              caseNumber: '',
              type: '',
              submittedDate: ''
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/element-variables';

.auto-container {
  .full-width {
    width: 100%;
  }

  .selected-contact {
    flex: 1;
    display: flex;
    line-height: 2px;
    color: #2b70d6;
    background-color: #edf5ff;
    border: 1px solid #2b70d6;
    align-items: center;
    border-radius: 10px;
    min-height: 2vh;
    max-height: 5vh;
    padding: 5px 5px 5px 10px;

    .action {
      flex-basis: 17%;
      button {
        border-radius: 8px;
      }
    }
    .text {
      flex-basis: 83%;
      .content {
        color: black;
        padding-right: 20px;
      }
    }
  }
}
.results-container {
  /*display: flex;*/
  width: 100%;
  line-height: 1.75;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid #e0dfdf;
  .avatar {
    width: 40px;
    float: left;
    margin-right: 10px;
  }

  .demo {
    width: 40%;
    float: left;
    margin-right: 10px;
  }

  .info {
    width: 35%;
    float: left;
  }

  .result-name {
    display: block;
    font-family: $font-bold;
  }
  .cases-results {
    padding: 7px;
    color: $--color-primary;
    margin-bottom: 5px;
    padding-left: 50px;
  }
}
.cases-container {
  .case-col {
    margin-bottom: 5px;
  }
  .case-row {
    border-bottom: 1px solid #e0dfdf;
    margin-bottom: 5px;
  }
  .title {
    font-size: 11px;
    display: block;
    text-transform: uppercase;
    color: #000;
    font-family: $font-bold;
  }

  .info {
    display: block;
    color: #939191;
  }
}
</style>
