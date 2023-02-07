<template>
  <div class="bg">
    <div>
      <img src="@/assets/images/no-data-icon.svg" width="100" alt="" />
    </div>
    <div>
      <h3 class="header">{{ header }}</h3>
      <p class="details">{{ details }}</p>
      <p class="details" v-if="action">
        Click
        <el-link @click="$emit('getStarted')" class="here">here</el-link> to get
        started
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ce-empty-states',
  props: {
    header: String,
    details: String,
    action: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.bg {
  background-color: inherit;
  padding: 30px 20px;
  text-align: center;
}
.header {
  color: #2d62d0;
}
.details {
  font-size: 13px;
  color: #a8a6a6;
}
.here {
  color: #2d62d0;
  margin-bottom: 3px;
}
</style>
