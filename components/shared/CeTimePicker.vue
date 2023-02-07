<template>
  <vue-timepicker
    @change="change"
    :hour-range="[
      ['1p', '12p'],
      ['1a', '12a']
    ]"
    v-model="time"
    :format="format"
    class="custom-style"
    placeholder="Select time"
    ref="timePicker"
    :disabled="disabled"
  >
    <template v-slot:icon>
      <i class="el-input__icon el-icon-time"></i>
    </template>
  </vue-timepicker>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
export default {
  components: {
    VueTimepicker
  },
  data() {
    return {
      time: null,
      currentTime: null
    }
  },
  props: {
    model: {
      type: [String, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'hh:mm A'
    }
  },
  created() {
    this.time = this.model
  },
  watch: {
    model() {
      if (!this.model) {
        this.$refs.timePicker.clearTime()
      } else this.time = this.model
    }
  },
  methods: {
    change() {
      if (this.format !== 'hh:mm A') {
        this.currentTime = this.time
        this.$emit('change', this.currentTime)
      } else {
        this.currentTime = `${this.time.hh}:${this.time.mm} ${this.time.A}`
        if (this.model) {
          this.currentTime = this.time
          this.$emit('change', this.currentTime)
        }
        if (this.time.A && this.time.mm && this.time.hh) {
          this.$emit('change', this.currentTime)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vue__time-picker input.display-time {
  width: 100%;
}
.custom-style {
  width: 100%;
  position: relative;
  /deep/ input {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    color: #606266;
    padding-left: 35px;
    font-size: 15px;
    font-weight: 100;
  }
  /deep/ input:focus-visible {
    outline: none;
  }
  /deep/ .el-input__icon {
    margin-right: -15px;
    color: #c0c4cc;
    display: inline;
  }
  /deep/ .select-list {
    height: 200px;
  }
  /deep/ .dropdown {
    height: 200px;
    top: calc(2.2em + 22px);
    ::-webkit-scrollbar {
      width: 4px;
      border: 1px solid #d5d5d5;
    }

    ::-webkit-scrollbar-track {
      border-radius: 0;
      background: #eeeeee;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: #b0b0b0;
    }
    .hint {
      display: none;
    }
    .active {
      background-color: #2b70d6 !important;
    }
    li {
      padding: 0;
    }
  }
  // /deep/ .custom-icon{
  //     .el-icon-time{
  //         position: absolute;
  //     }
  //     .el-icon-circle-close{
  //         position: absolute;
  //         right: 0;
  //     }
  // }
  /deep/ .char {
    display: none;
  }
  /deep/ .disabled {
    background-color: #f5f7fa;
    cursor: not-allowed;
    border-color: #e4e7ed;
    color: #595959 !important;
  }
}
</style>
