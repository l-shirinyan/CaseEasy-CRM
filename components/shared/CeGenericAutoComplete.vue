<template>
  <div class="auto-container">
    <el-select
      v-model="selectedType"
      filterable
      placeholder="type to search"
      class="full-width"
      @change="handleSelect"
    >
      <template>
        <el-scrollbar style="max-height: 150px; overflow-y: auto">
          <el-option
            v-for="item in lists"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-scrollbar>

        <div class="action-section">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-button
                @click="openNewLocationDialog"
                type="primary"
                size="mini"
              >
                {{ btnName }}</el-button
              >
            </el-col>
          </el-row>
        </div>
      </template>
    </el-select>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :modal="true"
      :modal-append-to-body="false"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-form ref="serviceForm" :rules="rules" :model="serviceForm">
        <el-form-item :label="newLocationInputNames" prop="name">
          <el-input v-model="serviceForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="Google Map Link"
          prop="location"
          v-if="isLocationDialog"
        >
          <el-input v-model="serviceForm.url"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" v-if="!isLocationDialog">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addType('serviceForm')"
          >Add New</el-button
        >
      </span>
      <span slot="footer" v-if="isLocationDialog">
        <el-button type="primary" @click="addType">Save</el-button>
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ce-generic-search',
  props: {
    lists: {
      type: Array,
      required: true
    },
    selectedItem: {
      type: String,
      required: false
    },
    btnName: {
      type: String,
      default: 'Add new'
    },
    dialogTitle: {
      type: String,
      default: 'Add New'
    },
    newLocationInputNames: {
      type: String,
      default: 'Name'
    },
    isLocationDialog: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.serviceTypes = this.lists
    !this.lodash.isNil(this.selectedItem)
      ? (this.selectedType = this.selectedItem)
      : ''
  },
  watch: {
    lists: {
      deep: true,
      handler() {
        this.serviceTypes = this.lists
        !this.lodash.isNil(this.selectedItem)
          ? (this.selectedType = this.selectedItem)
          : ''
      }
    },
    selectedItem() {
      this.selectedType = this.selectedItem
    }
  },
  data: function () {
    return {
      state: null,
      serviceTypes: [],
      serviceForm: {
        name: '',
        url: null
      },
      dialogVisible: false,
      selectedType: null,
      rules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            message: 'Please enter an activity title to add'
          }
        ],
        location: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  methods: {
    openNewLocationDialog() {
      this.dialogVisible = true
      ;(this.serviceForm.name = ''), (this.serviceForm.url = '')
    },
    querySearch(query) {
      if (query !== '') {
        setTimeout(() => {
          this.serviceTypes = this.lists.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 100)
      } else {
        this.serviceTypes = []
      }
    },
    handleSelect() {
      const item = this.serviceTypes.find((x) => x.id === this.selectedType)
      this.$emit('emitted-item', item)
    },
    addType(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const id = this.serviceTypes.length + 1
          if (this.isLocationDialog) {
            this.$emit('emitted-item-new-location', this.serviceForm)
          } else {
            this.$emit('emitted-item-new-add', this.serviceForm.name)
          }
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.auto-container {
  .full-width {
    width: 100%;
  }
}

.action-section {
  padding: 10px 0 20px 0;
  width: 100%;
  display: block;
  background-color: #f3fdff;
  text-align: center;
  border-top: 1px solid #e7eef0;
  margin-top: 10px;
}
</style>
-
