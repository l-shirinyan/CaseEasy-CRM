<template>
  <div class="filter-tags">
    <el-tooltip
      v-for="(tag, index) in tagsData"
      :key="tag.name"
      class="item"
      effect="dark"
      :content="tag.filterType"
      placement="bottom"
    >
      <el-tag
        closable
        effect="plain"
        :disableTransitions="true"
        @close="removeTag(index)"
        class="space-tags"
      >
        {{ tag.name }}
      </el-tag>
    </el-tooltip>
    <el-button
      type="primary"
      size="mini"
      v-if="showClearAllButton"
      @click="clearAllFilters"
      >Clear All</el-button
    >
  </div>
</template>
<script>
export default {
  name: 'ce-filter-tags',
  props: {
    tags: {
      type: Array,
      required: true
    },
    showClearAllButton: {
      type: Boolean,
      required: false
    },
    multipleTags: {
      type: Boolean,
      default: false
    },
    module: {
      type: String
    },
    mailIndex: {
      type: Number
    }
  },
  data() {
    return {
      tagsData: []
    }
  },
  created() {
    this.tagsData = this.tags
  },
  methods: {
    removeTag(index) {
      if (this.module === 'emails') {
        this.$store.dispatch(`${this.module}/setFilterTags`, {
          index: this.mailIndex,
          tagList: this.tags
        })
      } else {
        this.$store.dispatch(`${this.module}/setFilterTags`, this.tags)
      }
      if (this.multipleTags) {
        this.tagsData = this.tagsData.filter((val, key) => key !== index)
      } else {
        this.tagsData.splice(index, 1)
      }
    },
    clearAllFilters() {
      this.$emit('clear-all-filters')
    }
  },
  watch: {
    tags: {
      handler(newVal) {
        this.tagsData = newVal
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.space-tags {
  margin: 0 8px 8px 0;
}
</style>
