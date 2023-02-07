<template>
  <div style="margin-bottom: 25px">
    <el-row>
      <el-col :span="span">
        <div style="display: flex; justify-content: flex-end">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              Insert Template<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="ready-templates-dropdown">
              <div
                v-for="(elem, index) in readyTemplates"
                class="template"
                :key="index"
              >
                <span class="heading">{{ index }}</span>
                <el-dropdown-item
                  v-for="(item, i) in elem.elements"
                  :key="`readyTemplate_${i}`"
                  @click.native="insertTemplate(item.id)"
                >
                  {{ item.name }}
                </el-dropdown-item>
                <div :key="index" class="divider"></div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row class="drawer-row">
      <el-col :span="span">
        <div class="editor">
          <editor
            api-key="yc6tnaqmauoxq2y74uggzqb1l2g5ffxj7hocpfnmmrsjuks0"
            ref="editor"
            v-model="emailTemplate"
            :init="{
              height: 350,
              menubar: false,
              globals: {
                tinymce: true
              },
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              menu: {
                tc: {
                  title: 'Comments',
                  items: 'addcomment showcomments deleteallconversations'
                }
              },
              fontsize_formats:
                '8px 10px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 34px 38px 42px 48px 54px 60px',
              menubar: 'file edit view insert format tools table tc',
              toolbar:
                'undo redo | formatselect | fontsizeselect | fontselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help | \
                link image | print | forecolor | backcolor'
            }"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  components: {
    editor: Editor
  },
  props: {
    readyTemplates: [Array, Object],
    mailTemplate: String,
    span: {
      type: Number,
      default() {
        return 20
      }
    }
  },
  data() {
    return {
      emailTemplate: null
    }
  },
  watch: {
    mailTemplate: {
      deep: true,
      handler() {
        this.emailTemplate = this.mailTemplate
      }
    }
  },
  methods: {
    insertTemplate(id) {
      this.$emit('emailTemplate', id)
    }
  },
  mounted() {
    this.emailTemplate = this.mailTemplate ? this.mailTemplate : ''
  }
}
</script>

<style lang="scss" scoped></style>
