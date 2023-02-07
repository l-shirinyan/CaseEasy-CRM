<template>
  <div class="notes">
    <el-scrollbar style="height: 90vh">
      <h2>{{ fileName }}</h2>
      <div class="container">
        <el-form
          v-if="!loader"
          ref="form"
          :model="formModel"
          class="custom-form-style"
          style="margin-bottom: 10px"
          label-position="top"
        >
          <div v-if="addAndEdit">
            <el-form-item label="Date">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="formModel.created"
                type="date"
                placeholder="Pick a day"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="Subject (Optional)">
              <el-input v-model="formModel.subject"></el-input>
            </el-form-item>
            <el-form-item label="Notes" style="margin-bottom: 5px">
              <el-input
                type="textarea"
                rows="4"
                v-model="formModel.note"
              ></el-input>
            </el-form-item>
          </div>
          <div class="add-and-edit">
            <el-form-item>
              <el-button size="mini" @click="addNotes" type="primary">
                {{ addAndEdit ? 'Save' : '+Add Note' }}
              </el-button>
            </el-form-item>
            <el-form-item v-if="addAndEdit">
              <template slot="label">
                <div class="question">
                  <span> Make Note Private </span>
                  <el-tooltip
                    content="Private notes are only visible to your team, otherwise, public notes are displayed to the Client."
                  >
                    <i class="las la-question-circle"></i>
                  </el-tooltip>
                </div>
              </template>
              <label for=""></label>
              <el-radio-group v-model="formModel.notePrivate" size="small">
                <el-radio-button label="No"></el-radio-button>
                <el-radio-button label="Yes"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
        <div v-loading="loader">
          <el-scrollbar
            v-if="notes.length && !loader"
            style="
              min-height: 200px;
              max-height: 450px;
              height: 70vh;
              overflow-x: hidden;
              overflow-y: auto;
            "
          >
            <div style="margin-bottom: 50px" id="printArea">
              <div class="container__actions">
                <div style="float: right">
                  <el-button size="mini" type="icon" @click="openPrintDialog">
                    <i class="las la-print"></i
                  ></el-button>
                </div>
              </div>
              <ce-document-notes-list
                :notes="notes"
                :docId="document.id"
                @on-edit-doc-note="onHandleEditNote"
                @delete-note="deleteNotes"
              ></ce-document-notes-list>
            </div>
          </el-scrollbar>
          <div v-if="!notes.length && !loader" style="margin-left: 20px">
            <ce-empty-states
              header="No Document Note(s) Assigned"
              @getStarted="getStarted"
            >
            </ce-empty-states>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CeAvatar from '@/components/shared/CeAvatar'
import CeEmptyStates from '@/components/global/CeEmptyStates.vue'
import AtTa from 'vue-at/dist/vue-at-textarea'
import CeDocumentNotes from './CeDocumentNotes.vue'
import toastsMiddleware from '@/mixins/toastsMiddleware'

export default {
  mixins: [toastsMiddleware],
  components: {
    CeAvatar,
    AtTa,
    ceDocumentNotesList: CeDocumentNotes,
    CeEmptyStates
  },
  computed: {
    ...mapGetters({
      document: 'documents/getDocData'
    }),
    fileName() {
      return this.document.fileName.split('.')[0]
    }
  },
  data() {
    return {
      notesCount: 0,
      notes: [],
      formModel: {
        notePrivate: 'No'
      },
      dialogVisible: false,
      noteReply: '',
      addCaseInfo: {
        name: '',
        id: null
      },
      mode: 'C',
      addAndEdit: false,
      notes: [],
      loader: false
    }
  },
  watch: {
    document: {
      deep: true,
      immediate: true,
      handler() {
        this.getNotes()
      }
    }
  },
  mounted() {
    this.formModel.created = new Date()
  },
  methods: {
    getStarted() {
      this.addNotes()
    },
    deleteNotes() {
      this.getNotes()
    },
    async getNotes() {
      this.loader = true
      try {
        this.notes = await this.$DocumentService.documentNote({
          action: 'R',
          target: 'docnote',
          documentId: this.document.id
        })
        this.loader = false
      } catch (error) {
        this.loader = false
        console.error(error)
      }
    },
    async addNotes() {
      if (this.addAndEdit) {
        try {
          const data = {
            action: this.formModel.mode ? 'U' : 'C',
            target: 'docnote',
            documentId: this.document.id,
            date: this.formModel.created,
            subject: this.formModel.subject,
            hiddenNote: this.formModel.notePrivate === 'No' ? false : true,
            note: this.formModel.note
          }
          if (this.formModel.id) {
            data.id = this.formModel.id
          }
          const res = await this.$DocumentService.documentNote(data)
          if (res.success) {
            this.clearNoteForm()
            this.addAndEdit = false
            this.success('Success')
            this.getNotes()
          }
        } catch (error) {
          console.error(error)
          this.error('Failure')
        }
      } else {
        this.addAndEdit = true
      }
    },
    clearNoteForm() {
      for (const key in this.formModel) {
        this.formModel[key] = null
      }
      this.formModel.notePrivate = 'No'
    },
    onHandleEditNote(note) {
      this.addAndEdit = true
      this.formModel = {
        created: note.created,
        subject: note.subject,
        note: note.note,
        id: note.id,
        mode: note.mode
      }
    },
    openPrintDialog() {
      this.$htmlToPaper('printArea', {
        styles: [
          '../../assets/styles/case-theme/index.css',
          '../../assets/styles/main.scss'
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/element-variables.scss';
.notes {
  &__subject {
    margin-bottom: 8px;
  }

  &__sender {
    margin-bottom: 5px;
  }

  &__description {
    width: 98%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;

    &.collapsed {
      display: block;
    }
  }
  &__thread-message:hover {
    background: #e6e7eb;
    cursor: pointer;

    .edit-delete {
      display: block;
    }
  }

  &__reply {
    /deep/ & .el-textarea__inner {
      padding-right: 33px;
    }
  }
  .add-and-edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .question {
    display: flex;
    align-items: center;
    i {
      cursor: pointer;
      color: #2b70d6;
      font-size: 22px;
      margin-left: 5px;
    }
  }
}
</style>
