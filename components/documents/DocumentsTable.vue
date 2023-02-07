<template>
  <div class="documents">
    <el-table
      :show-header="false"
      ref="expandTable"
      @row-click="handleRowClick"
      :data="docsTypes"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-card>
            <el-collapse class="documents__uploaded__collapse">
              <div v-if="scope.row.folders.length">
                <el-collapse-item
                  v-for="(folder, index) in scope.row.folders"
                  :key="index"
                >
                  <template slot="title">
                    <div class="documents__uploaded__info">
                      <div class="documents__uploaded__folder-icon">
                        <img
                          src="@/assets/images/folder_icon.svg"
                          alt="folder-icon"
                        />
                      </div>
                      <div class="documents__uploaded__dir">
                        <span class="documents__uploaded__name">{{
                          folder.name
                        }}</span>
                        <span class="documents__uploaded__count"
                          >Found {{ folder.count }} file(s)
                        </span>
                      </div>
                    </div>
                  </template>

                  <el-table
                    ref="multipleTable"
                    :data="folder.documents"
                    class="documents__table"
                    @select-all="handleChangeSelect"
                    @selection-change="selectItem"
                    style="width: 100%"
                  >
                    <el-table-column type="selection" :value="true" width="55">
                    </el-table-column>
                    <el-table-column
                      label="Document Name"
                      sortable
                      class-name="table-column-name"
                    >
                      <template slot-scope="scope">
                        <img
                          :src="scope.row.ext | fileIcon()"
                          alt="icon"
                          class="pdf-button"
                          @click="
                            openPreviewDrawer(scope.row.id, scope.row.ext)
                          "
                        />
                        <span
                          class="documents__uploaded__file-name"
                          v-if="!scope.row.allowUpload"
                        >
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="scope.row.fileName"
                            placement="bottom"
                          >
                            <span
                              class="pdf-name preview-document"
                              @click="
                                openPreviewDrawer(scope.row.id, scope.row.ext)
                              "
                            >
                              {{ scope.row.fileName }}
                            </span>
                          </el-tooltip>
                        </span>
                        <span v-if="scope.row.allowUpload">
                          <span class="file-name-color">
                            {{ scope.row.fileName }}
                          </span>
                          <el-tooltip
                            class="item"
                            effect="dark"
                            content="Upload Document"
                            placement="bottom"
                          >
                            <img
                              class="upload_icon"
                              @click="handleOpenUploadDrawer(scope.row)"
                              :src="require('@/assets/images/upload_icon.svg')"
                              alt=""
                            />
                          </el-tooltip>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="Description" sortable>
                      <template slot-scope="scope">
                        <el-tooltip
                          class="item"
                          effect="dark"
                          :content="scope.row.heading"
                          placement="bottom"
                        >
                          <span>
                            {{ scope.row.heading }}
                          </span>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="lastUpdated"
                      width="200"
                      label="Last Updated"
                      sortable
                    >
                    </el-table-column>
                    <el-table-column label="Actions" width="120">
                      <template slot-scope="scope">
                        <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                            Options<i
                              class="el-icon-arrow-down el-icon--right"
                            ></i>
                            {{ scope.size }}
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                              @click.native="handleOpenUploadDrawer(scope.row)"
                              >Upload</el-dropdown-item
                            >
                            <el-dropdown-item
                              @click.native="handleEditName(scope.$index)"
                              >Edit</el-dropdown-item
                            >
                            <el-dropdown-item
                              @click.native="
                                handleOpenDeleteModal(
                                  'client',
                                  index,
                                  scope.$index
                                )
                              "
                              >Delete</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
              </div>
              <ce-empty-states
                v-else
                :header="scope.row.header"
                :details="scope.row.details"
                @getStarted="openDrawer"
              >
              </ce-empty-states>
            </el-collapse>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div style="display: flex">
            <div class="documents__uploaded__dir">
              <span class="documents__uploaded__name size">{{
                scope.row.name
              }}</span>
              <span class="documents__uploaded__count"
                >Displaying ({{ scope.row.count }}) folders
              </span>
            </div>
            <div v-if="scope.row.progress" class="document-progress-bar">
              <el-tooltip
                class="tooltip-max-width"
                :content="`${scope.row.progress.completed} of ${scope.row.progress.count} documents completed`"
              >
                <ce-progress-bar
                  :progressData="scope.row.progress"
                  text="documents received"
                >
                </ce-progress-bar>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <ce-horizontal-drawer
      ref="ceDrawer"
      title="Preview Document"
      class="custom-drawer"
      :payload="documentURL"
      @onClose="closeRequestDrawer"
      module="cases"
    ></ce-horizontal-drawer>
  </div>
</template>

<script>
import CeHorizontalDrawerVue from '../global/CeHorizontalDrawer.vue'
import CeEmptyStates from '@/components/global/CeEmptyStates.vue'
import CeBadgeVue from '../shared/CeBadge.vue'
import docsTypes from '../../mixins/docsTypes.js'
export default {
  mixins: [docsTypes],
  components: {
    CeEmptyStates,
    ceBadge: CeBadgeVue,
    ceHorizontalDrawer: CeHorizontalDrawerVue
  },
  props: {
    tableData: {
      type: [Object, Array],
      required: true
    },
    uploadedFileExtension: {
      type: String,
      required: false
    },
    toggleEdit: {
      type: Array,
      required: false
    },
    payload: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      header: 'No Documents Created',
      details:
        "There are no Documents created as yet in your Shared Library. Consider your Shared Library to be a private Repository for your firm so that all team members have access to all the templates and generic letters needed. Don't store client specific documents here as all team members will have access.",
      selected: false,
      payloadData: {},
      currentTableId: '0',
      documents: [],
      statuses: [
        { label: 'Pending', value: 'pending' },
        { label: 'In Review', value: 'inReview' },
        { label: 'Approve', value: 'approve' },
        { label: 'Not approved', value: 'notApproved' },
        { label: 'Shared', value: 'shared' },
        { label: 'E-Sign', value: 'eSign' }
      ],
      selectedItems: [],
      documentURL: null
    }
  },
  watch: {
    tableData: {
      deep: true,
      immediate: true,
      handler() {
        if (this.$route.path !== '/shared-library') {
          this.tableData.data.forEach((elem) => {
            const library = this.docsTypes.find(
              (item) => item.name === elem.library
            )
            if (!this.lodash.isNil(library)) {
              library.count = elem.count
              library.folders = elem.folders
              library.progress = elem.progress
            } else {
              library.count = 0
              library.folders = []
              library.progress = []
            }
          })
        } else {
          this.docsTypes = this.docsTypes.filter(
            (elem) => elem.name === 'Shared Library'
          )
          let data = this.tableData.data.find(
            (elem) => elem.library === 'Shared Library'
          )
          this.docsTypes[0].count = data.count
          this.docsTypes[0].folders = data.folders
          this.docsTypes[0].progress = data.progress
          this.$nextTick(() => {
            this.$refs.expandTable.toggleRowExpansion(this.docsTypes[0])
          })
        }
      }
    }
  },
  mounted() {
    if (this.$route.path === '/shared-library') {
    }
  },
  created() {
    this.payloadData = this.payload
    this.currentTableId = Object.keys(this.tableData)[0]
  },
  filters: {
    fileIcon(ext) {
      switch (ext) {
        case '.pdf':
          return require('@/assets/images/pdf_button.svg')
        case '.xls':
          return require('@/assets/images/xls_button.svg')
        case '.docx':
          return require('@/assets/images/unknown_document.svg')
        case '.doc':
          return require('@/assets/images/unknown_document.svg')
        case '.jpg':
          return require('@/assets/images/jpg_button.svg')
        default:
          return require('@/assets/images/unknown_document.svg')
      }
    }
  },
  methods: {
    async openPreviewDrawer(id, ext) {
      try {
        if (ext) {
          let res = await this.$CaseService.fileManager({
            action: 'R',
            target: 'document',
            Id: id,
            caseId: this.$route.params.id
          })
          this.$axios.get(res, { responseType: 'blob' }).then((val) => {
            const type = val.headers['content-type']
            var blob = new Blob([val.data], { type })

            if (type !== ('application/xls' || 'application/x-xls')) {
              this.documentURL = window.URL.createObjectURL(blob)
              this.$store.dispatch('cases/setCurrentDrawer', 'PreviewDocument')
              this.$refs.ceDrawer.showDrawer()
              return
            } else {
              var link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.click()
            }
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
    closeRequestDrawer() {},
    selectItem(row) {
      this.selectedItems = row.map((elem) => {
        return elem.id
      })
      this.$emit('onChange', this.selectedItems)
    },
    setBadgeType(status) {
      return status === 'Uploaded' ? 'success' : 'primary'
    },
    openDrawer() {
      this.$store.dispatch('cases/setCurrentDrawer', 'viewUploadPopup')
      this.$refs.ceDrawer.showDrawer()
    },
    async handleRowClick(row) {
      this.$refs.expandTable.toggleRowExpansion(row)
    },
    handleChangeSelect(v) {
      if (v.length) {
        this.selected = true
      } else {
        this.selected = false
      }
      this.$emit('onChange', this.selected)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/element-variables.scss';
.documents {
  padding: 0px 0px 0px 0px;
  &__title {
    margin-bottom: 42px;
  }

  &__actions {
    width: 100%;

    &__label {
      font-size: 14px;
      color: #000000;
    }

    &__input {
      padding-left: 7px;
      margin-left: 18px;
      margin-top: 1px;
      background: #ffffff;
      border: 1px solid #e0dfdf;
      box-sizing: border-box;
      width: 330px;
      outline: none;
      height: 36px;
      border-radius: 5px 0px 0px 5px;
    }

    &__button {
      background: #2b70d6;
      border-radius: 0px 5px 5px 0px;
      margin-left: -4px;
      width: 115px;
      height: 36px;
      border: none;
      outline: none;
      cursor: pointer;
      color: white;
      font-size: 14px;

      &.right-floated {
        border-radius: 6px;
        width: 145px;
        height: 36px;
        float: right;
        margin-top: -3px;
      }
    }
  }

  &__results-count {
    width: 100%;
    height: 35px;
  }

  &__create {
    width: 100%;
    border-radius: 5px;
    background: #ffffff;
    border: 1px solid #e0dfdf;
    box-sizing: border-box;
    border-radius: 5px;

    &__title {
      font-family: Nunito;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      color: black;
      margin-bottom: 22px;
    }

    .centered {
      display: grid;
      align-items: center;
      place-items: center;
    }

    &__subtitle {
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #817f7f;
      margin-top: 19px;
      margin-bottom: 136px;
    }
  }

  &__not-uploaded {
    padding-top: 123px;
  }

  &__uploaded {
    &__info {
      display: flex;
      gap: 7px;
    }

    &__count {
      color: #6a6a6c;
      font-size: 13px;
    }

    &__name {
      display: block;
      font-size: 15px;
      color: black;
    }

    &__dir {
      display: inline-block;
      padding-top: 6px;
    }

    &__folder-icon {
      padding-top: 8px;
      padding-left: 8px;
    }

    &__file-name {
      text-overflow: ellipsis;
      white-space: nowrap;
      .pdf-name {
        margin-left: 8px;
      }
    }

    &__collapse {
      /deep/.el-table__row {
        td {
          border-bottom: 1px solid #ebeef5;
        }
      }
      /deep/ & .el-collapse-item__header {
        line-height: normal;
      }
    }
  }

  &__select {
    /deep/ & input {
      border: none;
    }
  }

  &__table {
    /deep/ & th {
      color: black !important;
      font-weight: 600;
    }

    /deep/ & th .cell {
      color: black !important;
    }

    /deep/ & td:nth-child(2) .cell {
      position: relative;
      color: #2b70d6;
      padding-right: 25px;
      white-space: nowrap !important;
    }
    /deep/ & td:nth-child(2):hover {
      .edit-icon {
        display: block;
        font-size: 16px;
        color: #6a6a6c;
        cursor: pointer;
        text-align: center;
      }
    }
  }

  &__assign-button {
    float: right;
    margin-top: -18px;
  }

  &__dialog {
    /deep/ & .el-dialog__header {
      padding: 24px;
    }

    /deep/ & .el-dialog__title {
      color: black;
      font-weight: 600;
      font-size: 18px;
    }

    /deep/ & .el-dialog__body {
      padding: 24px;
    }

    &__input {
      width: 330px;
      display: block;
      margin-top: 5px;
    }
  }
}

.documents__table {
  /deep/ & th {
    color: black !important;
    font-family: $font-bold;
  }

  /deep/ & .el-table__fixed::before {
    display: none;
  }
  /deep/ & .el-table__fixed-right::before {
    display: none;
  }

  /deep/ & th .cell {
    color: black !important;
  }

  /deep/ & td:nth-child(2) .cell {
    color: #2b70d6;
    white-space: nowrap !important;
  }
}
.d-flex {
  display: flex;
}
.edit-icon {
  display: none;
}
.cell-document-name {
  overflow: hidden;
  width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.change-input {
  /deep/ & input {
    height: 33px;
    width: 90%;
  }
}
.preview-document,
.pdf-button {
  cursor: pointer;
}
</style>
