<template>
  <div class="select-container">
    <el-dropdown trigger="click">
      <span :class="setFontColor">
        {{ text }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          @click.native="onChange(item)"
          v-for="(item, index) in options"
          :key="index"
        >
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'ce-select',
  props: {
    options: {
      type: Array,
      required: true
    },
    currentText: '',
    cssClass: {
      type: String,
      default: 'link'
    }
  },
  mounted() {
    this.getText()
  },
  computed: {
    setFontColor() {
      return this.text === 'Select' ? 'link' : 'active-link'
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    getText() {
      this.lodash.isNil(this.currentText)
        ? (this.text = 'Select')
        : (this.text = this.currentText)
    },
    onChange(item) {
      this.text = item.name
      this.$emit('onSelectChange', item.id)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/element-variables.scss';
.select-container {
  .link {
    color: $--color-gray;
  }

  .active-link {
    color: #fff;
  }
}
</style>
