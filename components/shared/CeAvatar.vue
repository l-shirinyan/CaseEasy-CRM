<template>
  <el-avatar :style="borderAndColor" :size="size" :icon="icon">
    {{ initials }}
  </el-avatar>
</template>
<script>
export default {
  props: {
    initials: {
      type: String,
      required: true,
      default: ''
    },
    size: {
      type: String,
      required: false
    },
    isRandom: {
      type: Boolean,
      required: false
    },
    bgColor: {
      type: String,
      require: false
    },
    bordered: {
      type: Boolean,
      required: false
    },
    icon: {
      type: String,
      required: false
    }
  },
  computed: {
    color: function () {
      const colors = ['#0dcbcb', '#458DF6', '#BBB6B6', '#50D2D3']
      if (this.isRandom) {
        return `background-color: ${
          colors[Math.floor(Math.random() * colors.length)]
        }`
      } else if (this.bgColor !== null) {
        switch (this.bgColor) {
          case 'accent':
            return `background-color: ${colors[0]}`
          case 'primary':
            return `background-color: ${colors[1]}`
          case 'info':
            return `background-color: ${colors[2]}`
          case 'message':
            return `background-color: ${colors[3]}`
          default:
            return `background-color: ${colors[1]}`
        }
      } else {
        let color = ''
        switch (this.initials) {
          case 'P':
            color = colors[2]
            break
          case 'C':
            color = colors[0]
            break
          case 'B':
            color = colors[1]
            break
          default:
            color = colors[1]
        }
        return `background-color: ${color}`
      }
    },
    border: function () {
      if (this.bordered) {
        const colors = ['#1c6fe7', '#1c6fe7', '#999595']
        if (this.isRandom) {
          return `border: 1px solid ${
            colors[Math.floor(Math.random() * colors.length)]
          }`
        } else {
          let color = ''
          switch (this.initials) {
            case 'P':
              color = colors[2]
              break
            case 'C':
              color = colors[0]
              break
            case 'B':
              color = colors[1]
              break
            default:
              color = colors[1]
          }
          return `border: 1px solid ${color}`
        }
      } else {
        return ''
      }
    },
    borderAndColor() {
      return this.border + ';' + this.color
    }
  },
  data: function () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-avatar {
  text-transform: uppercase;
  text-align: center;
}
</style>
