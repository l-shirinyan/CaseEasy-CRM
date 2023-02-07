<template>
  <el-dialog
    :visible.sync="isVisibleDialog"
    title="Document Details"
    :fullscreen="true"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
  >
    <div>
      <vue-pdf-app
        style="height: 85vh"
        :pdf="pdfLink"
        class="pdf-viewer"
      ></vue-pdf-app>
    </div>
  </el-dialog>
</template>

<script>
import VuePdfApp from 'vue-pdf-app'
import 'vue-pdf-app/dist/icons/main.css'
export default {
  props: {
    isVisible: Boolean
  },
  components: {
    VuePdfApp
  },
  data() {
    return {
      isVisibleDialog: false,
      pdfLink: 'http://localhost:3000/sample.pdf'
    }
  },
  watch: {
    isVisible() {
      this.isVisibleDialog = this.isVisible
    },
    isVisibleDialog() {
      if (!this.isVisibleDialog) {
        this.$emit('onClose')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pdf-viewer {
  width: 100%;
  height: 70vh;
}
</style>
