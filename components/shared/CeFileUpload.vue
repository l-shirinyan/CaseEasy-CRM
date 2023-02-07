<template>
  <div class="container">
    <div class="avatar-container">
      <el-upload
        class="avatar-uploader"
        :class="{ 'avatar-uploader-big': big }"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="showFileList"
        :accept="accept"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :drag="drag"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else :class="[setUploadTypeIcon, setBigIcon]"></i>
      </el-upload>
      <div class="avatar-title">{{ setTitle }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ce-file-upload',
  props: {
    uploadType: {
      type: String,
      required: true
    },
    showFileList: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    big: {
      type: Boolean,
      required: false
    },
    docOnly: {
      type: Boolean,
      default: false,
      required: false
    },
    drag: {
      type: Boolean,
      default: false
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    photoUrl: {
      type: String,
      required: false
    }
  },
  computed: {
    setUploadTypeIcon: function () {
      return this.uploadType === 'image'
        ? 'las la-camera avatar-uploader-icon'
        : 'el-icon-plus avatar-uploader-icon'
    },
    setBigIcon: function () {
      return this.big ? 'big-icon' : ''
    },
    setTitle: function () {
      return this.title === null ? 'Upload File' : this.title
    },
    accept: function () {
      return this.uploadType === 'avatar' ? 'image/jpeg, image/png' : '*'
    }
  },
  mounted() {
    if (!this.lodash.isNil(this.photoUrl)) {
      this.imageUrl = this.photoUrl
    }
  },
  data() {
    return {
      imageUrl: '',
      directoryFilesCount: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      if (this.uploadType === 'image') {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('Avatar picture must be JPG format!')
        }
        if (!isLt2M) {
          this.$message.error('Avatar picture size can not exceed 2MB!')
        }
        return isJPG && isLt2M
      } else if (this.uploadType === 'logo' || this.uploadType === 'avatar') {
        const isJPG = file.type === 'image/jpeg'
        const isPng = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG && !isPng) {
          this.$message.error('Logo must be PNG or JPG format!')
        } else if (!isLt2M) {
          this.$message.error('Logo picture size can not exceed 2MB!')
        } else {
          this.$message.success('Successfuly uploaded logo')
          this.imageUrl = URL.createObjectURL(file)
          this.$emit('onUpload', true)
        }
        return (isJPG || isPng) && isLt2M
      } else {
        if (this.showMessage) {
          this.$message.success('Success, document was saved')
        }
        this.$emit(
          'document-saved',
          file.name,
          file.lastModifiedDate,
          file.type
        )
      }
    },
    onImageReUpload() {
      this.imageUrl = ''
      this.$emit('onUpload', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .avatar-container {
    flex: 1;
  }

  .avatar-title {
    display: block;
    text-align: center;
    font-size: 13px;
    width: 178px;
    padding-top: 10px;
    flex: 2;
  }
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 178px;
  width: 178px;
}
.avatar-uploader-big {
  width: 345px !important;
  height: 345px !important;
  display: grid;
  align-items: center;
  place-items: center;
  /deep/ & .el-upload-dragger {
    width: 345px !important;
    height: 345px !important;
    display: grid;
    align-items: center;
    place-items: center;
  }
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 36px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;

  &.big-icon {
    font-size: 82px;
  }
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
