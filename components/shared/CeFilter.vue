<template>
  <div class="filter-container">
    <el-button
      @click="showDrawer"
      type="info"
      class="filter-button"
      size="small"
    >
      Filter <i class="las la-filter"></i>
    </el-button>
    <ce-v-drawer
      :payload="payload"
      :content="content"
      :module="moduleName"
      :title="title"
      ref="ceVDrawer"
    ></ce-v-drawer>
  </div>
</template>
<script>
import CeVerticalDrawerVue from '../global/CeVerticalDrawer.vue'
export default {
  name: 'ce-filter',
  components: {
    ceVDrawer: CeVerticalDrawerVue
  },
  props: {
    payload: null,
    content: {
      type: String,
      required: true
    },
    moduleName: {
      type: String
    },
    title: {
      type: String,
      required: false
    },
    big: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    showDrawer() {
      this.$refs.ceVDrawer.showDrawer()
      this.$store.dispatch(`${this.moduleName}/setVDrawerVisibility`, true)
    },
    closeDrawer() {
      this.$refs.ceVDrawer.handleClose()
      this.$store.dispatch(`${this.moduleName}/setVDrawerVisibility`, false)
    }
  }
}
</script>
<style lang="scss" scoped></style>
