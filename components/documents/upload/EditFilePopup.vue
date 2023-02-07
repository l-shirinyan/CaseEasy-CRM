<template>
  <el-form
    hide-required-asterisk
    @submit.native.prevent="onSubmit('ruleForm')"
    :model="payloadData"
    label-position="top"
    :rules="rules"
    ref="ruleForm"
  >
    <div>
      <div class="dialog-body">
        <div class="upload">
          <div class="col-left">
            <div>
              <el-form-item
                label="Folder Name"
                prop="folder"
                class="custom-style-option"
              >
                <el-select
                  v-model="payloadData.folder"
                  filterable
                  allow-create
                  default-first-option
                  class="upload__select-custom"
                  placeholder="Create or Select from the list"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="Document Name" prop="documentName">
                <el-input
                  type="text"
                  v-model="payloadData.documentName"
                  placeholder="Enter file name"
                  class="upload__input"
                  id="document-name"
                ></el-input>
              </el-form-item>
            </div>
            <div class="dialog-footer">
              <div class="dialog-separator"></div>
              <el-button
                type="primary"
                native-type="submit"
                style="margin-top: 20px"
                >Edit</el-button
              >
            </div>
          </div>
          <div class="col-right">
            <ce-file-upload
              class="upload__file"
              :showFileList="false"
              :showMessage="false"
              uploadType="document"
              title="Drag and drop your document here"
              :drag="true"
              @document-saved="documentSaved"
            ></ce-file-upload>
          </div>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import CeFileUpload from '../../shared/CeFileUpload'
export default {
  components: {
    CeFileUpload
  },
  props: {
    payload: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      caseDetails: null,
      options: [
        {
          value: 'My Documents',
          label: 'My Documents'
        },
        {
          value: 'Client Documents',
          label: 'Client Documents'
        },
        {
          value: 'Government Submissions',
          label: 'Government Submissions'
        },
        {
          value: 'Team Shared Library',
          label: 'Team Shared Library'
        }
      ],
      payloadData: {
        folder: [],
        documentName: ''
      },
      rules: {
        folder: [
          { required: true, trigger: 'blur', message: 'this field is required' }
        ],
        documentName: [
          { required: true, trigger: 'blur', message: 'this field is required' }
        ]
      },
      file: {}
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && Object.keys(this.file).length) {
          this.$emit('emit-payload', {
            status: 'edit',
            fileName: this.payloadData.documentName,
            uploadDate: this.file.uploadDate,
            fileType: this.file.fileType,
            folderName: this.payloadData.folder
          })
          this.$message.success('Succesfully uploaded!')
        } else if (!this.file.length) {
          this.$message.error('No document uploaded')
          return false
        }
      })
    },
    documentSaved(fileName, uploadDate, fileType) {
      this.payloadData.documentName = fileName
      this.file = {
        fileName: fileName,
        uploadDate: uploadDate,
        fileType: fileType
      }
    }
  },
  mounted() {
    this.file = this.payload
    this.payloadData.folder = this.payload.library
    this.payloadData.documentName = this.payload.name
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/element-variables.scss';

.upload {
  padding: 34px;
  display: flex;
  justify-content: space-between;
  width: 60%;
  /deep/ .el-upload-dragger {
    width: 178px !important;
    height: 178px !important;
  }
  &__title {
    font-family: $font-bold;
    font-size: 18px;
    line-height: 25px;
    color: black;
    margin-bottom: 20px;
  }

  &__file {
    float: left;
  }

  &__label {
    display: block;
    margin-bottom: 10px;
    margin-top: 30px;
  }

  &__input {
    display: block;
    margin-top: 7px;
    width: 330px;
    outline: none;
    height: 36px;
  }

  &__select-custom {
    /deep/ & .el-input__inner {
      width: 330px;
    }
  }
}
.col-right {
  padding-top: 30px;
}
.case-search {
  display: block;
  width: 60%;
  margin-left: 34px;
}
</style>
