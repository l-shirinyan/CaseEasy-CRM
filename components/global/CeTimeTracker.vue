<template>
  <div style="display: flex">
    <el-button
      class="btn"
      @click="handleTimerStart"
      type="primary"
      v-if="isPaused && !defaultOpened"
      plain
      ><div><i class="las la-play"></i><span>Timer</span></div></el-button
    >
    <el-button
      type="primary"
      class="play-button"
      @click="handleTimerPause"
      v-else
    >
      <el-tooltip effect="dark" content="Pause timer" placement="bottom">
        <i class="las la-pause"></i>
      </el-tooltip>
    </el-button>
    <div v-if="!isPaused || defaultOpened" class="timer-box">
      {{ timerStaticValue ? timerStaticValue : timeTotal }}
    </div>
    <el-button
      type="primary"
      v-if="!isPaused || defaultOpened"
      class="timer-button"
      @click="handleSaveTimeEntry"
    >
      <el-tooltip effect="dark" content="Save timer" placement="bottom">
        <i class="las la-save"></i>
      </el-tooltip>
    </el-button>
    <el-button
      type="primary"
      v-if="!isPaused || defaultOpened"
      class="clear-timer"
      @click="ClearTimer"
    >
      <el-tooltip effect="dark" content="Clear timer" placement="bottom">
        <i class="las la-times"></i>
      </el-tooltip>
    </el-button>
    <el-button
      v-if="showTimeEntryButton"
      type="primary"
      plain
      class="timer-button-set btn"
      @click="openTrackActivityDialog"
    >
      <div>
        <img
          class="high-low-icon"
          src="@/assets/images/high-low.svg"
          alt="high-low"
        /><span>Track Activity</span>
      </div>
    </el-button>
    <el-dialog
      width="60%"
      title="Activity Tracker"
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="isVisibleDialog"
      @close="$emit('onClose')"
    >
      <activity-tracker-form></activity-tracker-form>
    </el-dialog>
  </div>
</template>

<script>
import CeContactAutoCompleteSearch from '../../components/shared/CeContactAutoCompleteSearch'
import CeGenericAutoCompleteVue from '../../components/shared/CeGenericAutoComplete.vue'
import toastsMiddleware from '@/mixins/toastsMiddleware'
import ActivityTrackerForm from '../../components/shared/CeActivityTrackerForm.vue'
import moment from 'moment'

export default {
  mixins: [toastsMiddleware],
  name: 'ceTimeTracker',
  components: {
    ceGenericSearch: CeGenericAutoCompleteVue,
    CeContactAutoCompleteSearch,
    ActivityTrackerForm
  },
  props: {
    showTimeEntryButton: {
      type: Boolean,
      required: false,
      default: true
    },
    defaultOpened: {
      type: Boolean,
      required: false,
      dafault: false
    },
    timerStaticValue: {
      type: String,
      required: false
    },
    startTime: {
      type: String,
      required: false
    },
    pauseTime: {
      type: String,
      required: false
    },
    saved: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isPaused: true,
      count: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      timer: null,
      isVisibleDialog: false
    }
  },
  computed: {
    timeTotal() {
      if (!this.startTime) {
        return '00:00:00'
      } else {
        return (
          (this.hours < 10 ? '0' + this.hours : this.hours) +
          ':' +
          (this.minutes < 10 ? '0' + this.minutes : this.minutes) +
          ':' +
          (this.seconds < 10 ? '0' + this.seconds : this.seconds)
        )
      }
    }
  },
  methods: {
    openTrackActivityDialog() {
      this.isVisibleDialog = true
    },
    ClearTimer() {
      this.isPaused = true
      this.$emit('onClearTimer')
    },
    startTimer() {
      if (this.defaultOpened) {
        return
      }

      this.isPaused = false
      this.timer = setInterval(() => {
        const startTime = moment.utc(this.startTime)
        const currentTime = moment()
        const ms = currentTime.diff(startTime)
        const time = moment.duration(ms)
        this.hours = time.hours()
        this.minutes = time.minutes()
        this.seconds = time.seconds()
      }, 1000)
    },
    stopTimer() {
      this.isPaused = true
      clearInterval(this.timer)
    },
    getAdjustStartTime() {
      const startTime = moment.utc(this.startTime)
      const pauseTime = moment.utc(this.pauseTime)
      const resumeTime = moment().valueOf()
      const trackIntervalMs = pauseTime.diff(startTime)
      const differenceMs = resumeTime - trackIntervalMs
      const time = moment(differenceMs).toISOString()
      return time
    },
    handleTimerPause() {
      this.$emit('onTimerPause', moment().toISOString())
    },
    handleTimerStart() {
      if (!this.startTime && !this.pauseTime) {
        this.$emit('onTimerStart', moment().toISOString())
      } else {
        this.$emit('onTimerResume', this.getAdjustStartTime())
      }
    },
    handleSaveTimeEntry() {
      this.$emit('onTimerPause', moment().toISOString())
      this.$emit(
        'onTimerSave',
        this.timerStaticValue ? this.timerStaticValue : this.timeTotal
      )
    }
  },
  watch: {
    startTime: {
      immediate: true,
      handler(timestamp) {
        if (timestamp && this.isPaused) {
          this.startTimer()
        }
      }
    },
    pauseTime: {
      immediate: true,
      handler(timestamp) {
        if (timestamp && !this.isPaused) {
          this.stopTimer()
        }
      }
    },
    saved: {
      handler() {
        if (this.saved) {
          this.seconds = 0
          this.minutes = 0
          this.hours = 0
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/element-variables';

.play-button,
.timer-button,
.timer-button-set {
  padding: 0 0 !important;
  margin-left: 3px !important;

  i {
    margin-left: 2px;
  }
}
.timer-button {
  margin-left: -2px !important;
  transition: 0s;
}
.clear-timer {
  padding: 0 1px 0 4px;
  margin-right: 5px;
}
.timer-box {
  color: #2b70d6;
  background: #edf5ff;
  border: 1px solid #2b70d6;
  box-sizing: border-box;
  padding: 5px 5px;
  margin-left: -3px;
}
.btn {
  height: 30px;
  padding: 0 10px !important;
  border-radius: 6px;
  border: solid 1px #cce3ff;
  margin-right: 5px !important;
  margin-left: 5px !important;
  div {
    display: flex;
    align-items: center;
    font-weight: 600;
  }
}
.high-low-icon {
  width: 16px;
  margin-right: 5px;
}
.timer-button-set:hover,
.timer-button-set:focus {
  .high-low-icon {
    filter: invert(88%) sepia(170%) saturate(22%) hue-rotate(279deg)
      brightness(137%) contrast(107%) !important;
  }
}
.activity-tracker {
  .dialog-label {
    display: block;
  }
  .client-search {
    display: flex;
    gap: 3px;
    margin-bottom: 40px;
  }
  .full-width {
    width: 100%;
  }
  .label {
    color: #bbb6b6;
  }
  .el-input {
    /deep/.el-input__inner {
      border: 1px solid #e0dfdf;
      border-radius: 5px;
    }
  }
  /deep/.el-form-item__content {
    line-height: 25px;
  }
  .mr-5 {
    margin-right: 25px;
  }
  /deep/.el-textarea__inner {
    min-height: 130px !important;
  }
  .save-cancel-btn {
    width: 110px;
    height: 40px;
    border-radius: 6px;
  }
}
</style>
