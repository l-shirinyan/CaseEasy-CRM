<template>
  <span :class="[cssClass, size, isDoc]" @click="$emit('preview')">
    <img
      :src="extensionIcon"
      alt="pdf"
      v-if="isComposeEmailDoc"
      width="18"
      class="doc-icon"
    />
    <span class="badge-text" v-if="!highlightFilter.length">{{ text }}</span>
    <span v-else
      ><text-highlight :queries="highlightFilter">{{
        text
      }}</text-highlight></span
    >
  </span>
</template>
<script>
import TextHighlight from 'vue-text-highlight'
export default {
  name: 'ce-badge',
  components: {
    TextHighlight
  },
  props: {
    type: {
      type: String,
      required: false
    },
    big: {
      type: Boolean,
      required: false
    },
    highlightFilter: {
      type: Array,
      default() {
        return []
      }
    },
    fileExtension: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    },
    isComposeEmailDoc: {
      type: Boolean,
      required: false
    }
  },
  data: function () {
    return {
      cssProperty: []
    }
  },
  computed: {
    cssClass: function () {
      switch (this.type) {
        case 'primary':
          return ['badge', 'badge-primary']
        case 'accent':
          return ['badge', 'badge-accent']
        case 'warning':
          return ['badge', 'badge-warning']
        case 'danger':
          return ['badge', 'badge-danger']
        case 'success':
          return ['badge', 'badge-success']
        case 'primary-invert':
          return ['badge', 'badge-primary-invert']
        case 'info-invert':
          return ['badge', 'badge-info-invert']
        case 'info':
          return ['badge', 'badge-info']
        default:
          return ['badge', 'badge-primary']
      }
    },
    extensionIcon: function () {
      switch (this.fileExtension) {
        case '.pdf':
          return require('@/assets/images/pdf_button.svg')
        case '.txt':
          return require('@/assets/images/txt_button.svg')
        case '.html':
          return require('@/assets/images/html_button.svg')
        case '.xlsx':
          return require('@/assets/images/xls_button.svg')
        case '.png':
          return require('@/assets/images/png_button.svg')
        case '.docx':
          return require('@/assets/images/unknown_document.svg')
        case '.dat':
          return require('@/assets/images/dat_button.svg')
        case '.jpeg':
        case '.jpg':
          return require('@/assets/images/jpg_button.svg')
        default:
          return require('@/assets/images/unknown_document.svg')
      }
    },
    size: function () {
      return this.big === true ? 'big-padding' : ''
    },
    isDoc: function () {
      return this.isComposeEmailDoc ? 'doc-badge' : ''
    }
  },
  methods: {
    splitText() {
      return !this.lodash.isNil(this.text) && this.text.includes('.')
        ? this.text.split('.')[0]
        : this.text
    }
  }
}
</script>
<style lang="scss" scoped>
.badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.85em;
  font-weight: 900;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  margin-right: 5px;
  max-height: 20px;

  &.big-padding {
    padding: 0.5em 2.65em;
  }
  &.doc-badge {
    border: 0.5px solid rgba(43, 112, 214, 0.4);
    box-sizing: border-box;
    border-radius: 23px;
    padding: 10px 13px 4px 13px;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .doc-icon {
      float: left;
      margin-top: -5px;
    }
    .badge-text {
      margin-left: 8px;
    }
  }
}

.badge-primary-invert {
  background-color: #2b70d6;
  color: #edf5ff;
}

.badge-info-invert {
  background-color: #8c8989;
  color: #fefefe;
}

.badge-info {
  background-color: #2b70d6;
  color: #fefefe;
}
.badge-info-invert {
  color: #8c8989;
  background-color: #fefefe;
}

.badge-primary {
  color: #2b70d6;
  background-color: #edf5ff;
}

.badge-accent {
  background-color: #39cccc;
  color: #fff;
}

.badge-success {
  color: #2fbb0c;
  background-color: #e1ffd2;
}

.badge-warning {
  color: #ff490f;
  background-color: #ffdfba;
}

.badge-danger {
  color: #ff0f0f;
  background-color: #ffd4d4;
}
</style>
