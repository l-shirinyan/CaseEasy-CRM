<template>
  <div class="search-bar">
    <div v-if="searchIcon" class="search-icon" @click="onSearchIcon">
      <i class="las la-search" style="font-size: 30px"></i>
    </div>
    <el-popover
      trigger="manual"
      placement="bottom-end"
      width="1200"
      v-click-outside="closePopover"
      v-model="visible"
      popper-class="popover-custom-style"
    >
      <div class="popover-body">
        <el-row :gutter="10">
          <el-col :span="4" v-if="response && response.count !== 0">
            <div class="left-bar">
              <el-menu default-active="1" class="el-menu-vertical-demo">
                <el-menu-item
                  v-for="(item, index) in menuItems"
                  :key="item.id"
                  :index="(index + 1).toString()"
                  @click="sortByType(item.id)"
                >
                  <i :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                  <span style="float: right">
                    <ce-badge
                      type="accent"
                      :text="item.count.toString()"
                    ></ce-badge
                  ></span>
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col
            :span="response && response.count === 0 ? 24 : 20"
            class="onHover"
          >
            <div class="right-bar">
              <el-scrollbar
                style="height: 80vh"
                v-if="response && response.count !== 0"
              >
                <div
                  class="popover-body__item"
                  v-for="(item, index) in sortedResponse"
                  :key="`heading_${index}`"
                  :id="`type_${index}`"
                >
                  <div
                    class="popover-body__item--header"
                    v-if="item.elements.length"
                  >
                    <h1>{{ item.heading }}s</h1>
                    <el-divider class="heading-divider"></el-divider>
                  </div>
                  <div class="popover-body__item--content">
                    <el-table :data="item.elements" @row-click="onView">
                      <el-table-column prop="name" label="Name">
                        <template slot-scope="scope">
                          <i
                            :class="searchResultIcon(scope.row.recordType)"
                          ></i>
                          <span>{{ scope.row.name }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.heading === 'contact'"
                        label="Email"
                      >
                        <template slot-scope="scope">
                          <span>{{
                            scope.row.email ? scope.row.email : '-'
                          }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.heading === 'contact'"
                        label="Dob"
                      >
                        <template slot-scope="scope">
                          <span>{{ scope.row.Dob ? scope.row.Dob : '-' }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        v-if="item.heading !== 'contact'"
                        label="Case Number"
                      >
                        <template slot-scope="scope">
                          <span>{{
                            scope.row.caseNumber ? scope.row.caseNumber : '-'
                          }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        width="200"
                        prop="created"
                        label="Created Date"
                      ></el-table-column>
                      <el-table-column prop="name" label="Matched By">
                        <template slot-scope="scope">
                          <span>
                            <ce-badge
                              v-for="(tag, index) in scope.row.matchedBy"
                              :key="`matched_badge_${index}`"
                              type="primary"
                              :text="tag"
                            ></ce-badge
                          ></span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-scrollbar>
              <div v-else class="popover-body__no-data">
                <img src="../../assets/images/cloud-search.svg" alt="" />
                <h2>No results were found for "{{ typingWord }}"</h2>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-input
        slot="reference"
        v-show="!searchIcon || search"
        v-model="search"
        ref="searchInput"
        @input="debounceSearch(onSearch)"
        @blur="blurInput"
        @focus="onSearchFocus"
        placeholder="Search for a client or case"
        prefix-icon="las la-search"
        class="search-input"
      ></el-input>
    </el-popover>

    <el-dropdown trigger="click" class="create-dropdown">
      <el-button type="primary">
        My Portals
        <el-divider direction="vertical" class="devider-vertical"></el-divider>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in actionsList"
          :key="`action_${index}`"
        >
          <el-link :href="item.route" target="_blank">{{ item.name }}</el-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <div class="help">
          <i class="el-icon-question"></i> <span>Help</span>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown"
        ><span class="dropdown-group-name">RESOURCE</span>
        <el-dropdown-item class="custom-dropdown-item"
          ><a href="https://support.caseeasy.ca/" target="_blank"
            ><span>Support articles</span>
            <i class="las la-external-link-alt"></i></a
        ></el-dropdown-item>
        <el-dropdown-item class="custom-dropdown-item"
          ><a href="https://learn.caseeasy.ca/" target="_blank"
            ><span>Training videos</span>
            <i class="las la-external-link-alt"></i></a
        ></el-dropdown-item>
        <el-dropdown-item class="custom-dropdown-item"
          ><a
            href="https://support.caseeasy.ca/en/collections/3611275-updates-and-fixes"
            target="_blank"
            ><span>Latest updates</span>
            <i class="las la-external-link-alt"></i></a
        ></el-dropdown-item>

        <el-dropdown-item
          class="custom-dropdown-item"
          @click.native="openLiveChat"
          >Live Chat
          <i class="las la-headset"></i>
        </el-dropdown-item>
        <el-divider class="divider"></el-divider>
        <span class="dropdown-group-name">GET IN TOUCH</span>
        <el-dropdown-item class="custom-dropdown-item"
          ><a href="https://forms.gle/dBRfE9zFoCaBiCnN6" target="_blank"
            >Share feedback</a
          >
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div style="position: relative">
      <div class="red-circle" v-if="notifications > 0">
        <span class="notifications-count">{{ getNotifications }}</span>
      </div>
      <el-button type="text" @click="showVertDrawer">
        <img src="@/assets/images/bell 1.svg" alt="" />
      </el-button>
    </div>
    <el-dropdown trigger="hover">
      <ce-avatar
        :initials="handleFindInitial(initials)"
        class="avatar"
      ></ce-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="dialogEditProfile = true"
          >Edit Profile</el-dropdown-item
        >
        <el-dropdown-item @click.native="dialogChangePassword = true"
          >Change Password</el-dropdown-item
        >
        <el-dropdown-item @click.native="onLogout">Sign out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <ce-vertical-drawer
      content="userNotification"
      ref="ceVDrawer"
      module="searchBox"
      title="Notifications"
    ></ce-vertical-drawer>
    <el-dialog
      title=""
      :visible.sync="dialogEditProfile"
      :append-to-body="true"
      width="400px"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <el-form :model="formEditProfile" label-position="top">
        <el-form-item label="First Name" prop="firstName">
          <el-input
            v-model="formEditProfile.firstName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Last name" prop="lastName">
          <el-input
            v-model="formEditProfile.lastName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input
            v-model="formEditProfile.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="License Membership" prop="license">
          <el-input
            v-model="formEditProfile.license"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Time Zone" prop="timeZone">
          <el-select
            v-model="formEditProfile.timezone"
            placeholder="Select"
            class="timezone"
            filterable
          >
            <el-option
              v-for="(item, index) in timeZone"
              :key="`timezone_${index}`"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateProfile()">Update</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Change Password"
      :visible.sync="dialogChangePassword"
      :modal-append-to-body="false"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form :model="formChangePassword" label-position="top">
        <el-form-item label="New Password" prop="newPassword">
          <el-input
            v-model="formChangePassword.newPassword"
            type="password"
            autocomplete="off"
          ></el-input>
          <span class="password-error" :hidden="isPasswordHidden"
            >Password does not match</span
          >
        </el-form-item>
        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input
            v-model="formChangePassword.confirmPassword"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button type="primary" @click="updatePassword()">Update</el-button>
      </span>
    </el-dialog>
    <div class="cursor-loader" v-if="isLoadingData"></div>
  </div>
</template>

<script>
import CeAvatar from '../shared/CeAvatar'
import CeVerticalDrawer from '../global/CeVerticalDrawer'
import ActivityEntryDialog from '../user/ActivityEntryDialog'
import debounceSearch from '../../mixins/debounceSearch'
import CeBadge from '../shared/CeBadge'
import findInitial from '@/mixins/findInitial'
import ClickOutside from 'vue-click-outside'
import globals from '../../mixins/globals'

export default {
  mixins: [findInitial, debounceSearch, globals],
  components: {
    CeAvatar,
    CeVerticalDrawer,
    ActivityEntryDialog,
    CeBadge
  },
  directives: {
    ClickOutside
  },
  props: {
    notificationsCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getNotifications() {
      const notifcationCount =
        this.notifications <= 99 ? this.notifications : '99+'
      this.$notify.warning({
        title: `${localStorage.getItem('firstName')}`,
        dangerouslyUseHTMLString: true,
        message: `You have <b>(${notifcationCount})</b> unread notification(s)`,
        offset: 50,
        duration: 8000
      })
      return notifcationCount
    },
    sortedResponse() {
      this.initializeMenu()
      if (!this.response) {
        return
      }
      let data = [...this.response.results].reduce((reducer, e) => {
        let name = e.recordType
        if (!reducer[name])
          reducer[name] = {
            heading: name,
            elements: [e]
          }
        else {
          reducer[name].elements.push(e)
        }
        return reducer
      }, {})
      for (let key in data) {
        let current = this.menuItems.find((elem) => elem.id === key)
        !this.lodash.isNil(current)
          ? (current.count = data[key].elements.length)
          : (current.count = 0)
      }
      return data
    },
    initials() {
      return `${localStorage.getItem('firstName')} ${localStorage.getItem(
        'lastName'
      )}`
    }
  },
  data() {
    return {
      typingWord: '',
      notifications: 0,
      timeZone: null,
      isLoadingData: false,
      response: null,
      visible: false,
      search: null,
      searchIcon: true,
      isPasswordHidden: true,
      dialogEditProfile: false,
      dialogChangePassword: false,
      formEditProfile: '',
      formChangePassword: {
        newPassword: '',
        confirmPassword: ''
      },

      actionsList: [],
      menuItems: []
    }
  },
  watch: {
    notificationsCount() {
      this.notifications = this.notificationsCount
    }
  },
  methods: {
    initializeMenu() {
      this.menuItems = [
        {
          id: 'case',
          icon: 'las la-briefcase',
          name: 'Cases',
          count: 0
        },
        {
          id: 'contact',
          icon: 'las la-user',
          name: 'Contacts',
          count: 0
        }
      ]
    },
    openLiveChat() {
      Intercom('show')
    },
    sortByType(index) {
      let id = `type_${index}`
      let elem = document.getElementById(id)
      elem?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' })
    },
    onView(row) {
      if (row.recordType === 'case') {
        this.visible = false
        this.$router.push(
          `/cases/detail/${row.caseId}?contact_id=${row.contactId}`
        )
      } else if (row.recordType === 'contact') {
        this.visible = false
        this.$router.push(`/contacts?id=${row.contactId}`)
      }
    },
    searchResultIcon(type) {
      if (type === 'contact') {
        return 'las la-user'
      } else if (type === 'case') {
        return 'las la-briefcase'
      } else {
        return 'las la-building'
      }
    },
    onSearchFocus() {
      if (!this.response) {
        return
      }
      this.visible = true
    },
    showVertDrawer() {
      this.$store.dispatch('searchBox/setCurrentVDrawer', 'timersActivity')
      this.$store.dispatch('searchBox/setCurrentVDrawerSize', '35%')
      this.notifications = 0
      this.$refs.ceVDrawer.showDrawer()
    },
    closePopover() {
      this.visible = false
    },
    async onSearch() {
      this.visible = false
      if (this.search.length >= 3) {
        try {
          this.isLoadingData = true
          this.response = await this.$SearchService.searchService({
            searchterm: this.search
          })
          if (!this.response.results.length) {
            this.typingWord = this.search
          }
          this.isLoadingData = false
          this.visible = true
        } catch (error) {
          console.error(error)
        }
      } else {
        this.visible = false
        this.response = null
      }
    },
    onLogout() {
      this.$AuthService.logOutUser()
    },
    onSearchIcon() {
      this.searchIcon = false
      this.$nextTick(() => {
        this.$refs['searchInput'].focus()
      })
    },
    blurInput() {
      if (!this.search) {
        this.searchIcon = true
      }
    },
    updatePassword() {
      if (
        this.formChangePassword.newPassword ===
          this.formChangePassword.confirmPassword &&
        !this.formChangePassword.newPassword == ''
      ) {
        this.$ProfileService.updatePassword({
          action: 'U',
          target: 'password',
          profile: {
            id: this.formEditProfile.id,
            firstName: this.formEditProfile.firstName,
            lastName: this.formEditProfile.lastName,
            email: this.formEditProfile.email,
            license: this.formEditProfile.license,
            timezone: this.formEditProfile.timezone,
            newPassword: this.formChangePassword.newPassword
          }
        })
        this.dialogChangePassword = false
      } else {
        this.isPasswordHidden = false
      }
    },
    updateProfile() {
      this.$ProfileService.updateProfile({
        action: 'U',
        target: 'profile',
        profile: {
          id: this.formEditProfile.id,
          firstName: this.formEditProfile.firstName,
          lastName: this.formEditProfile.lastName,
          email: this.formEditProfile.email,
          license: this.formEditProfile.license,
          timezone: this.formEditProfile.timezone
        }
      })
      this.dialogEditProfile = false
    },
    timeZoneFormat() {
      this.$TimezoneService.getListTimeZone().then((data) => {
        this.timeZone = data?.map((timezoneformatmaping) => {
          return {
            text: timezoneformatmaping.timezone,
            value: timezoneformatmaping.name
          }
        })
      })
    }
  },
  async created() {
    this.actionsList = [
      {
        name: 'IRCC Portal',
        route:
          'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/partners-service-providers/authorized-paid-representatives-portal.html'
      },
      {
        name: 'Client Portal',
        route: `https://casecloud.ca/Login/Login?siteId=${this.getSiteId}`
      },
      {
        name: 'PR Portal',
        route: 'https://prson-srpel.apps.cic.gc.ca/en/rep/login'
      }
    ]

    const response = await this.$NotificationService.notification({
      email: this.getEmail,
      siteid: this.getSiteId,
      countOnly: true,
      filter: ''
    })
    this.notifications = response
    this.formEditProfile = await this.$ProfileService.getProfileDetails({
      action: 'R'
    })
    this.timeZone = this.timeZoneFormat()
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/element-variables.scss';
.onHover {
  cursor: pointer;
}
.cursor-loader {
  cursor: wait;
  background: transparent;
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 110000;
}
.popover {
  &-body {
    width: 100%;
    .left-bar {
      border: 1px solid #eae9e7;
      border-radius: 5px;
    }
    .right-bar {
      width: 98%;
      border: 1px solid #eae9e7;
      padding: 10px;
      border-radius: 5px;
    }
    &__no-data {
      height: 400px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        margin: 0 auto;
        width: 100px;
      }
    }

    &__item {
      &--header {
        text-transform: capitalize;
        .heading-divider {
          margin: 0 0 11px 0;
        }
      }

      &--content {
        margin-bottom: 21px;
      }
    }
  }
}
.search-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  width: auto;
}
.create-dropdown {
  /deep/ & .el-button-group {
    width: 183px;
  }
  /deep/ & .el-dropdown__caret-button {
    padding: 11.4px 9px;
  }
}
.plus-icon {
  font-size: 20px;
}
.title {
  display: flex;
  align-items: center;
  gap: 7px;
}
.avatar {
  cursor: pointer;
}
.search-input {
  width: 300px;
}
.red-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  left: 48.7%;
  top: 21%;
  display: grid;
  place-items: center;
  align-items: center;
  background: #ff7d7d;
}
.notifications-count {
  font-size: 10px;
  color: white;
  font-family: $font-semi;
}
.devider-vertical {
  height: 28px;
  margin-right: 0;
}
.create-dropdown {
  /deep/ & .el-button {
    padding: 2px 8px 2px 20px;
    margin-bottom: 4px;
  }
}
.timezone {
  width: 100%;
}
.search-icon {
  cursor: pointer;
  i {
    color: #ada4a4;
    opacity: 0.8;
  }
}
.password-error {
  color: red;
}
.el-menu-item {
  i {
    margin-right: 0px !important;
  }
}
.help {
  display: flex;
  align-items: center;
  color: #898989;
  .el-icon-question {
    font-size: 20px;
  }
}
.dropdown-group-name {
  padding: 0 20px;
  font-weight: 600;
  font-size: 13px;
}
.divider {
  margin: 5px 0 15px !important;
}
.custom-dropdown-item,
.custom-dropdown-item:hover {
  font-weight: 600;
  font-size: 13px;
  color: #2b70d6;
  a {
    font-weight: 600;
    font-size: 13px;
    text-decoration: none;
    display: flex;
    align-items: center;
    i {
      margin-left: 5px;
    }
  }
}
</style>
