<template>
  <div class="edit-box">
    <el-link @click.native="openQuestionnaire" type="primary">Edit</el-link>

    <el-dialog
      title="Edit Profile"
      :visible.sync="isDialogVisible"
      @close="$emit('onClose')"
      :lock-scroll="true"
      :fullscreen="true"
      :modal="false"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <ce-view-questionnaire :payload="url"></ce-view-questionnaire>
    </el-dialog>
  </div>
</template>
<script>
import ViewQuestionnaireVue from '../cases/ViewQuestionnaire.vue'
export default {
  name: 'edit-questionnaire',
  components: {
    ceViewQuestionnaire: ViewQuestionnaireVue
  },
  props: {
    questionnaireUrl: {
      type: String,
      required: false
    }
  },
  computed: {
    url() {
      return this.lodash.isNil(this.questionnaireUrl)
        ? this.defaultUrl
        : this.questionnaireUrl
    }
  },
  data() {
    return {
      isDialogVisible: false,
      defaultUrl:
        'https://casecloud.ca/form/formshare?formId=c92f13fc-38e5-4ec0-8abf-0c348716619d&siteId=CCP20175'
    }
  },
  methods: {
    openQuestionnaire() {
      this.isDialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-box {
  width: 30px;
  display: contents;
}
</style>
