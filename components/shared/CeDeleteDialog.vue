<template>
  <el-dialog
    class="delete-dialog"
    :visible.sync="isVisible"
    :top="dialogPosition"
    :append-to-body="bodyAppended"
    :show-close="isShowCloseIcon"
    :modal="isModal"
    width="400px"
    :close-on-click-modal="false"
  >
    <div class="dialog-body">
      <i class="el-icon-close delete-icon"></i>
      <span class="dialog-body-text">{{ dialogTitle }}</span>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="onCancel">Cancel</el-button>
      <el-button type="primary" @click="onConfirm" size="big"
        >Confirm</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CeDeleteDialog',
  props: {
    isVisible: {
      type: Boolean
    },
    dialogPosition: {
      type: String,
      default: '20%'
    },
    isShowCloseIcon: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      required: true
    },
    isModal: {
      type: Boolean,
      required: false,
      default: true
    },
    bodyAppended: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onConfirm() {
      this.$emit('onDeleteElement')
      this.onCancel()
    },
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
  word-break: break-word;
}
.dialog-body {
  display: flex;
  justify-content: center;
  height: auto !important;
}
.delete-dialog {
  /deep/.dialog-footer {
    position: inherit;
  }
}
.delete-icon {
  color: red;
  font-size: 33px;
}
::v-deep {
  .el-dialog__header {
    display: none !important;
  }
}
</style>
