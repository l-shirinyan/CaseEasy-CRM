<template>
  <div>
    <h2>Placeholders</h2>
    <el-collapse
      style="min-height: 200px"
      v-loading="loader"
      v-model="activeName"
      accordion
      class="variables-collapse"
    >
      <el-collapse-item
        v-for="(item, index) in placeholdersData"
        :key="index"
        :title="item.placeholders[0].category"
        :name="index"
      >
        <el-table
          class="custom-table"
          width="100%"
          max-height="250"
          :data="item.placeholders"
          border
        >
          <el-table-column width="30">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                :content="copyTitle"
                placement="left"
              >
                <i
                  class="el-icon-copy-document"
                  @click="$emit('handleCopyToClipboard', scope.row.model)"
                ></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="placeholder" min-width="200"></el-table-column>
          <el-table-column prop="description" min-width="200"></el-table-column>
          <el-table-column prop="example" min-width="200"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placeholdersData: [],
      loader: false,
      copyTitle: 'copy'
    }
  },
  methods: {
    async getPlaceholders() {
      this.loader = true
      try {
        this.placeholdersData = await this.$CaseService.placeholders({
          action: 'R',
          caseId: this.$route.params.id,
          contactId: this.$route.query.contact_id
        })
        this.loader = false
      } catch (error) {
        console.error(error)
        this.loader = false
      }
    }
  },
  created() {
    this.getPlaceholders()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/element-variables.scss';

.variables-collapse {
  margin-bottom: 24px;
  /deep/ & .el-collapse-item__header {
    color: black;
    font-family: $font-bold;
  }
}
.custom-table {
  border: 1px solid #d4d8d9;
  overflow-x: auto;

  /deep/ & .el-table__header {
    display: none;
  }

  /deep/ & td {
    border-right: none;
    border-color: #d4d8d9;
  }

  /deep/ & td:nth-child(2) {
    font-family: $font-bold;
    color: black;
  }
  /deep/ & td:nth-child(1) {
    color: #b1a7a7;
  }

  /deep/ & td:nth-child(1):hover {
    color: #2b70d6;
    cursor: pointer;
  }
}
.custom-table::after {
  display: none;
}
</style>
