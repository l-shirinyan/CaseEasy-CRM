<template>
  <div class="error-box">
    <el-row :gutter="200" v-if="error.statusCode === 404">
      <el-col :span="12">
        <h1 class="error-box__code">404</h1>
        <div class="error-box__message">
          Ooops! You weren't <br />
          supposed to see this
        </div>
        <div class="error-box__message-sub">
          The page you're looking for no longer exists.
        </div>
        <div class="error-box__message-sub">
          Return to the
          <nuxt-link class="gray-link" to="/home">home page</nuxt-link> and
          remember: you haven't seen anything.
        </div>
      </el-col>
      <el-col :span="12">
        <img src="@/assets/images/error404.png" alt="" width="300" />
      </el-col>
    </el-row>
    <div v-else>
      <el-row :gutter="200" v-if="error.statusCode === 404">
        <el-col :span="12">
          <h1 class="error-box__code">500</h1>
          <div class="error-box__message">
            Error! An expected error has occurred
          </div>
          <div class="error-box__message-sub">
            Please contact us for assistance if this page continues.
          </div>
          <div class="error-box__message-sub">
            Return to the
            <nuxt-link class="gray-link" to="/home">home page</nuxt-link>
          </div>
        </el-col>
        <el-col :span="12">
          <img src="@/assets/images/error404.png" alt="" width="300" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error'
}
</script>

<style scoped lang="scss">
.error-box {
  display: grid;
  align-items: center;
  place-items: center;
  place-content: center;
  height: 70vh;

  &__code {
    font-size: 50px;
  }
  &__message {
    font-size: 40px;
    color: black;
    font-weight: 900;
  }
  &__message-sub {
    font-size: 15px;
    color: gray;
  }
  .gray-link {
    color: gray;
  }
  .gray-link:hover {
    color: #2b70d6;
  }
}
</style>
