<template>
  <div class="notes-container__timeline">
    <h4 style="margin-bottom: 30px">Total ({{ notesCount }}) results</h4>

    <el-timeline>
      <el-timeline-item
        icon="las la-clipboard-list"
        type="primary"
        size="large"
        v-for="note in notes"
        :key="`note_${note.id}`"
      >
        <div class="activity-header">
          <div style="display: flex; justify-content: space-between">
            <span class="title">{{ note.subject }}</span>
            <span class="time-stamp">{{ note.created | formatDate }} </span>
          </div>
          <span class="owner"
            ><div></div>
            {{ note.createdBy }}</span
          >
        </div>

        <el-card>
          <div class="note-card-text">{{ note.note }}</div>
          <div class="note-card-actions">
            <el-button type="text" @click="editDocNote(note)">
              <i class="las la-pencil-alt"></i>
            </el-button>
            <el-button
              style="color: red"
              type="text"
              @click="deleteDocNote(note.id)"
            >
              <i class="las la-trash-alt"></i>
            </el-button>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <!--delete dialog-->
    <ce-delete-dialog
      :isVisible="showDeleteDialog"
      :bodyAppended="true"
      :isModal="true"
      dialogTitle="Delete this task note"
      @onDeleteElement="handleDeleteNote"
      @onCloseModal="showDeleteDialog = false"
    ></ce-delete-dialog>
  </div>
</template>
<script>
import CeDeleteDialogVue from './CeDeleteDialog.vue'
import toastsMiddleware from '@/mixins/toastsMiddleware'

export default {
  mixins: [toastsMiddleware],
  name: 'notes-list',
  components: {
    ceDeleteDialog: CeDeleteDialogVue
  },
  props: {
    notes: {
      type: Array,
      required: true
    },
    docId: {
      type: Number
    }
  },
  computed: {
    notesCount() {
      return this.notes.length
    }
  },
  data() {
    return {
      showDeleteDialog: false,
      currentDocNoteId: null
    }
  },
  methods: {
    deleteDocNote(id) {
      this.currentDocNoteId = id
      this.showDeleteDialog = true
    },
    async handleDeleteNote() {
      try {
        let res = await this.$DocumentService.documentNote({
          action: 'D',
          id: this.currentDocNoteId,
          target: 'docnote'
        })
        if (res) {
          this.success('Success')
          this.showDeleteDialog = false
          this.$emit('delete-note')
        }
      } catch (error) {
        this.showDeleteDialog = false
        console.error(error)
      }
    },
    editDocNote(note) {
      this.editedNote = {
        id: note.id,
        name: '',
        subject: note.subject,
        note: note.note,
        created: note.created,
        mode: 'E'
      }
      this.$emit('on-edit-doc-note', this.editedNote)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/element-variables';
.el-timeline {
  padding-left: 10px;
  .el-timeline-item {
    padding-right: 2%;
  }
}
.notes-container {
  display: flex;
  flex-direction: column;
  color: $font-color;

  &__timeline {
    margin-right: 15px;
    .note-card-actions {
      float: right;
      top: 0;
      width: 60px;
      display: flex;
    }

    .activity-header {
      margin-bottom: 10px;

      .title {
        font-family: $font-semi;
        font-size: 14px;
        display: block;
        width: 100%;
      }
      .owner {
        width: 40%;
        height: 16px;
        font-size: 13px;
        color: $font-color;
      }
      .time-stamp {
        width: 50%;
        color: $font-color;
        text-align: right;
      }
    }
  }
}
</style>
