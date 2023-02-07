<template>
  <el-dialog
    class="delete-dialog"
    @close="onCancel"
    :visible.sync="isVisibleDialog"
    :append-to-body="bodyAppended"
    :show-close="isShowCloseIcon"
    width="20%"
    :close-on-click-modal="false"
  >
    <div class="dialog-body">
      <div class="circle-icon">
        <i class="las la-exclamation"></i>
      </div>
      <span class="dialog-body-text">{{ dialogTitle }}</span>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="onCancel">Cancel</el-button>
      <el-button type="primary" @click="onCancel" size="big">Ok</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CeDeleteDialog',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    isShowCloseIcon: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      required: true
    },
    bodyAppended: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      isVisibleDialog: false
    }
  },
  watch: {
    isVisible() {
      this.isVisibleDialog = this.isVisible
    },
    isVisibleDialog() {
      if (!this.isVisibleDialog) {
        this.onCancel()
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit('onCloseModal')
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-body-text {
  color: black;
  margin-top: 8px;
  padding-right: 30px;
  margin-left: 20px;
}
.dialog-body {
  display: flex;
  justify-content: center;
}
::v-deep {
  .el-dialog__header {
    display: none !important;
  }
}
.circle-icon {
  background: #edf5ff;
  border: 0.5px solid rgba(43, 112, 214, 0.4);
  box-sizing: border-box;
  border-radius: 50%;
  place-content: center;
  align-items: center;
  place-items: center;
  margin-top: 10px;
  color: #2b70d6;
  padding-left: 2px;
  display: grid;
  width: 43px;
  height: 31px;
}
</style>
