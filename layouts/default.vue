<template>
  <el-container class="container">
    <ce-navigation @change-collapse="onChangeCollapse($event)"></ce-navigation>
    <el-container>
      <el-header class="fixed-header">
        <time-tracker-box ref="timeTrackerBox"></time-tracker-box>
        <ce-search-box :notificationsCount="notifications"></ce-search-box>
      </el-header>
      <div class="main-box">
        <div class="main-padding">
          <nuxt />
        </div>
        <el-footer class="footer">
          <div>
            <div>
              <div class="align-center">
                <span class="text-black">Email Support</span>
                <el-link class="primary" href="mailto:support@caseeasy.ca"
                  >support@caseeasy.ca</el-link
                >
              </div>
            </div>
            <div class="bottom-content">
              <span class="text-black">Support Hours</span>
              <span class="date">Mon - Fri 10:00 AM - 6:00 PM EST</span>
            </div>
          </div>
          <div>
            <div class="bottom-content">
              <span class="text-black"> </span>
              <span class="copyright"
                >&copy; <span id="year">{{ year }}</span> Aubyn Innovations Inc.
                All Rights Reserved.</span
              >
            </div>
          </div>
          <div id="google_translate_element"></div>
          <div class="progress-bar">
            <el-progress
              :percentage="storageUsage.percentage"
              :color="progresBarColor"
              :text-inside="false"
            ></el-progress>
            <div class="info">
              {{ storageUsage.message }}
            </div>
          </div>
        </el-footer>
      </div>
    </el-container>
    <inactivity-modal
      :isOpenDialog="isOpenDialog"
      @onRestart="restartTimer"
    ></inactivity-modal>
  </el-container>
</template>

<script>
import CeNavigationVue from '../components/global/CeNavigation'
import TimeTrackerBox from '../components/time-tracker/TimeTrackerBox'
import CeSearchBox from '../components/global/CeSearchBox'
import InactivityModal from '../components/global/InactivityModal.vue'
import globals from '../mixins/globals'
import CeProgressBar from '../components/shared/CeProgressBar.vue'
import variables from '@/assets/styles/element-variables.scss'

const getIdleValue = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(0)
  }, 300)
})

export default {
  middleware: 'auth',
  mixins: [globals],
  name: 'default',
  components: {
    'ce-navigation': CeNavigationVue,
    'time-tracker-box': TimeTrackerBox,
    'ce-search-box': CeSearchBox,
    InactivityModal,
    CeProgressBar
  },
  data: function () {
    return {
      collapseMenu: false,
      idleInterval: null,
      idleValue: null,
      isOpenDialog: false,
      notifications: 0,
      storageUsage: null
    }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
    progresBarColor() {
      switch (this.storageUsage.color) {
        case 'primary':
          return variables.primary
        case 'accent':
          return variables.accent
        case 'warning':
          return variables.warning
        case 'danger':
          return variables.danger
        case 'success':
          return variables.success
        default:
          return variables.primary
      }
    }
  },
  methods: {
    onChangeCollapse(isCollapse) {
      this.collapseMenu = isCollapse
    },
    timerIncrement() {
      this.idleValue += 1
      if (this.idleValue > localStorage.getItem('timeout')) {
        if (!this.isOpenDialog) {
          this.isOpenDialog = true
        }
        this.clearIdleInterval()
      }
    },
    setIdleInterval() {
      this.idleInterval = setInterval(this.timerIncrement, 60000)
    },
    clearIdleInterval() {
      clearInterval(this.idleInterval)
      this.idleValue = 0
    },
    restartTimer() {
      this.clearIdleInterval()
      this.setIdleInterval()
      this.isOpenDialog = false
    },
    async getNotificationsCount() {
      const response = await this.$NotificationService.notification({
        email: this.getEmail,
        siteid: this.getSiteId,
        countOnly: true,
        filter: ''
      })
      this.notifications = response
    },
    refreshNotification() {
      setInterval(this.getNotificationsCount, 900000)
    }
  },
  watch: {
    $route(to, from) {
      this.getNotificationsCount()
    }
  },
  mounted() {
    this.refreshNotification()
    getIdleValue.then((val) => {
      this.idleValue = val
    })
    this.setIdleInterval()
  },
  created() {
    this.storageUsage = JSON.parse(localStorage.getItem('storageUsage'))
    document.addEventListener('keypress', () => {
      if (this.idleValue > 0) {
        this.clearIdleInterval()
        this.setIdleInterval()
      }
    })
    document.addEventListener('mousemove', () => {
      if (this.idleValue > 0) {
        this.clearIdleInterval()
        this.setIdleInterval()
      }
    })
    window.intercomSettings = {
      api_base: 'https://api-iam.intercom.io',
      app_id: 'prikjzze',
      role: localStorage.getItem('role'),
      paid: localStorage.getItem('paid'),
      email: localStorage.getItem('email'),
      name: localStorage.getItem('name'),
      user_id: localStorage.getItem('id'),
      avatar: {
        type: 'avatar',
        image_url: localStorage.getItem('avatar')
      },
      company: {
        company_id: localStorage.getItem('avatar'),
        created_at: localStorage.getItem('siteId'),
        name: localStorage.getItem('company_name'),
        plan: localStorage.getItem('plan'),
        size: localStorage.getItem('size'),
        website: localStorage.getItem('website'),
        industry: 'CRM'
      }
    }
    ;(function () {
      var w = window
      var ic = w.Intercom
      if (typeof ic === 'function') {
        ic('reattach_activator')
        ic('update', w.intercomSettings)
      } else {
        var d = document
        var i = function () {
          i.c(arguments)
        }
        i.q = []
        i.c = function (args) {
          i.q.push(args)
        }
        w.Intercom = i
        var l = function () {
          var s = d.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.src = 'https://widget.intercom.io/widget/prikjzze'
          var x = d.getElementsByTagName('script')[0]
          x.parentNode.insertBefore(s, x)
        }
        if (document.readyState === 'complete') {
          l()
        } else if (w.attachEvent) {
          w.attachEvent('onload', l)
        } else {
          w.addEventListener('load', l, false)
        }
      }
    })()
    Intercom('update', { hide_default_launcher: true })
  }
}
</script>
<style lang="scss" scoped>
.progress-bar {
  margin-right: 25px;
  max-width: 186px;
  width: 100%;
  line-height: 20px !important;
  /deep/.el-progress__text {
    display: none;
  }
  /deep/.el-progress-bar__innerText {
    display: none;
  }
  /deep/.el-progress-bar {
    padding-right: 0;
  }
}
.info {
  font-size: 11px;
  color: #8c8989;
}
.left-content {
  margin-left: 40px;
}
.fixed-header {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background-color: #fff;
  z-index: 1999 !important;
}
.footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: white;
  margin-top: auto;
  padding-top: 15px;
  padding-bottom: 15px;
  height: 70px !important;
}
.left-content {
  margin-right: 40px;
  display: flex;
}
.primary {
  color: #2b70d6;
}
.text-black {
  color: black;
  font-weight: bold;
}
.date {
  color: black;
}
.copyright {
  color: #9b9b9b;
  font-size: 12px;
}
.top-content {
  display: flex;
  padding-top: 7px;
  justify-content: space-between;
}
.align-center {
  display: flex;
  align-items: center;
  gap: 8px;
}

.main-box {
  height: calc(100vh - 60px);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background: #f3f2ef;
}
.main-padding {
  padding: 10px 20px;
}
.bottom-content {
  padding-top: 4px;
}
</style>
