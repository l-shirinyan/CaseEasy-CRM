<template>
  <div class="pagination">
    <div style="z-index: 1">
      <span class="text-black">Page Size</span>
      <el-select
        class="pagination-select"
        placeholder="10"
        v-model="pageStep"
        @change="$emit('on-change-page-size', pageStep)"
      >
        <el-option
          v-for="(item, index) in pageSteps"
          :key="`pageStep_${index}`"
          :value="item"
          :label="item | formatNumber"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ce-page-size',
  data() {
    return {
      pageSteps: [100, 250, 350, 500, 750, 1000, 5000, 10000],
      pageStep: 100
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 8px;
  margin-bottom: -30px;
  .pagination-select {
    width: 93px;
  }
}
.text-black {
  color: black;
}
</style>
