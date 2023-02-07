<template>
  <el-container class="body">
    <div style="width: 100%">
      <nuxt />
    </div>
  </el-container>
</template>

<script>
export default {
  middleware: 'token'
}
</script>

<style scoped lang="scss">
.body {
  height: 100vh;
}
</style>
