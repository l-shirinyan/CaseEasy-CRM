<template>
  <el-container class="container">
    <el-aside class="steps-side">
      <div class="logo">
        <img src="@/assets/images/logo_full.svg" alt="" />
      </div>
      <el-scrollbar style="height: 400px">
        <ce-steps :active="active"></ce-steps>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-scrollbar style="height: 100vh; width: 100%">
        <nuxt />
        <div class="actions" v-if="active !== 2">
          <a @click.prevent="onPrevious" v-if="active !== 0" class="text-button"
            >Previous</a
          >
          <el-button
            type="primary"
            @click="onContinue"
            :disabled="!getLogoValidation && active === 1"
            >Continue</el-button
          >
          <a @click.prevent="onContinue" class="text-button__gray"
            >Skip and do later</a
          >
        </div>
        <div class="actions complete" v-else>
          <a @click.prevent="onPrevious" v-if="active !== 0" class="text-button"
            >Previous</a
          >
          <el-button type="primary" @click="handleOpenCompleteDialog"
            >Complete</el-button
          >
          <a class="text-button last" @click="handleOpenSkipDialog"
            >Skip Adding Team Members</a
          >
        </div>
      </el-scrollbar>
    </el-container>
    <ce-warning-dialog
      :is-visible="isVisibleWarningDialog"
      dialog-title="Are you sure you want to skip adding your team members ?"
      @onCloseModal="onCloseSkipDialog"
    ></ce-warning-dialog>
    <ce-success-dialog
      :is-visible="isVisibleSuccessDialog"
      @onClose="handleCloseSuccessDialog"
      @onComplete="handleComplete"
      @onClickNo="handleRedirectToDashboard"
      dialog-title="Onboarding completed successfully"
      dialog-subtitle="Would you like to procceed to Help <br /> & Resources tour?"
    ></ce-success-dialog>
  </el-container>
</template>

<script>
import CeWarningDialog from '@/components/shared/CeWarningDialog'
import CeSuccessDialog from '@/components/shared/CeSuccessDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'onboarding',
  components: {
    CeWarningDialog,
    CeSuccessDialog
  },
  data() {
    return {
      active: 0,
      isVisibleWarningDialog: false,
      isVisibleSuccessDialog: false
    }
  },
  computed: {
    ...mapGetters({
      isValidLogo: 'onboarding/getLogoValidation'
    }),
    getLogoValidation: {
      get() {
        return this.isValidLogo
      },
      set(newVal) {
        return newVal
      }
    }
  },
  methods: {
    onContinue() {
      if (this.active < 2) {
        this.active += 1
      }
      if (this.active === 1) {
        this.$router.push('/onboarding/upload-logo')
      }
      if (this.active === 2) {
        this.$router.push('/onboarding/team-members')
      }
    },
    handleOpenSkipDialog() {
      this.isVisibleWarningDialog = true
    },
    handleOpenCompleteDialog() {
      this.isVisibleSuccessDialog = true
    },
    onPrevious() {
      if (this.active >= 0) {
        this.active -= 1
      }
      if (this.active === 0) {
        this.$router.push('/onboarding/company-info')
      }
      if (this.active === 1) {
        this.$router.push('/onboarding/upload-logo')
      }
    },
    onCloseSkipDialog() {
      this.isVisibleWarningDialog = false
    },
    handleCloseSuccessDialog() {
      this.isVisibleSuccessDialog = false
    },
    handleComplete() {
      this.handleCloseSuccessDialog()
      this.$router.push('/home')
    },
    handleRedirectToDashboard() {
      this.handleCloseSuccessDialog()
      this.$router.push('/dashboards')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/onboarding/style.scss';
</style>
