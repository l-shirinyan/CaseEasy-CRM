<template>
  <el-container class="body">
    <el-header class="fixed-header">
      <img src="@/assets/images/logo_full.svg" alt="" />
    </el-header>
    <el-scrollbar style="height: 100vh; width: 100%; background: #f8f8f8">
      <nuxt />
    </el-scrollbar>
  </el-container>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
<style lang="scss" scoped>
.fixed-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #fff;
  z-index: 1999 !important;
}
</style>
