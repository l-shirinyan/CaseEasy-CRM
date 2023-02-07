<template>
  <div>
    <div class="centered">
      <ce-file-upload
        uploadType="document"
        @document-saved="onFileUpload"
        title="Drag and drop your document here"
      ></ce-file-upload>
    </div>
  </div>
</template>

<script>
import CeFileUpload from '../../shared/CeFileUpload'
export default {
  name: 'AttachFilePopup',
  components: {
    CeFileUpload
  },
  methods: {
    onFileUpload() {
      this.$emit('onUploadFile')
    }
  }
}
</script>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
}
h2 {
  text-align: center;
}
</style>
