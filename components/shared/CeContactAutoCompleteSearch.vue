<template>
  <el-form
    :model="formModel"
    :rules="formRules"
    ref="formRules"
    class="form-autocomplete"
  >
    <el-form-item prop="contact">
      <div class="auto-container">
        <el-autocomplete
          :value="formModel.state"
          @input="($event) => (formModel.state = $event)"
          :placeholder="placeholder"
          :fetch-suggestions="querySearch"
          :debounce="1000"
          ref="autocomplete"
          @select="handleSelect"
          @focus="autocompleteFocus"
          :trigger-on-focus="false"
          class="full-width"
          prefix-icon="el-icon-search"
          v-if="!isSelected"
        >
          <template slot-scope="{ item }">
            <div class="results-container">
              <div class="avatar">
                <ce-avatar
                  size="medium"
                  :initials="item.initial"
                  :isRandom="true"
                ></ce-avatar>
              </div>
              <div class="demo">
                <p class="text-black">
                  {{ item.firstName }} {{ item.lastName }}
                </p>
                <p class="text-black" v-if="item.email">{{ item.email }}</p>
                <p class="text-black" v-if="item.dob">{{ item.dob }}</p>
              </div>
              <div class="info">
                <p class="text-black">{{ item.phone }}</p>
                <p class="text-black">{{ item.countryOfResidence }}</p>
              </div>
            </div>
          </template>
        </el-autocomplete>
        <div>
          <div v-if="isSelected" class="selected-contact">
            <div class="text">
              <span class="content">
                {{ selectedContact.firstName }} {{ selectedContact.lastName }}
              </span>
              <span class="content">
                {{ selectedContact.email }}
              </span>
              <span class="content">
                {{ selectedContact.phone }}
              </span>
            </div>
            <div class="action">
              <div style="float: right">
                <el-button type="primary" size="mini" @click="changeContact">
                  Change</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import CeAvatarVue from './CeAvatar.vue'
import debounceSearch from '../../mixins/debounceSearch'

export default {
  mixins: [debounceSearch],
  components: {
    CeAvatar: CeAvatarVue
  },
  mounted() {
    this.setValue()
    this.contacts = this.loadContacts()
    this.$refs.autocomplete.$children[1].showPopper = false
  },
  data: function () {
    return {
      showValidation: true,
      formModel: {
        state: null
      },
      contacts: [],
      isSelected: false,
      selectedContact: {},
      formRules: {
        contact: [
          {
            required: true,
            message: 'Please select Contact',
            trigger: 'change'
          }
        ]
      }
    }
  },
  props: {
    currentSelectedContact: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Type contact name'
    },
    clearContact: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentSelectedContact: {
      deep: true,
      handler() {
        if (
          this.currentSelectedContact &&
          this.currentSelectedContact !== null &&
          Object.keys(this.currentSelectedContact).length &&
          typeof this.currentSelectedContact !== 'undefined'
        ) {
          this.setValue()
        }
      }
    },
    clearContact: {
      deep: true,
      handler() {
        if (this.clearContact === true) {
          this.isSelected = false
          this.$emit('emit-clearContact')
        }
      }
    }
  },
  methods: {
    autocompleteFocus() {
      this.$nextTick(() => {
        if (
          this.$refs.autocomplete.value &&
          this.$refs.autocomplete.value.length < 3
        ) {
          this.$refs.autocomplete.$children[1].showPopper = false
        }
      })
    },
    setValue() {
      if (
        this.currentSelectedContact !== null &&
        Object.keys(this.currentSelectedContact).length &&
        typeof this.currentSelectedContact !== 'undefined'
      ) {
        this.handleSelect(this.currentSelectedContact)
      }
      if (
        this.currentSelectedContact === null ||
        typeof this.currentSelectedContact === 'undefined' ||
        !Object.keys(this.currentSelectedContact).length
      ) {
        this.changeContact()
      }
    },
    querySearch(queryString, returnSuggestions) {
      this.$nextTick(async () => {
        if (queryString.length < 3) {
          this.$refs.autocomplete.activated = false
        } else {
          this.$refs.autocomplete.activated = true
          try {
            const response = await this.$ContactService.contactService({
              value: queryString
            })
            this.contacts = response.result
            let results = queryString
              ? this.contacts.filter(this.createFilter(queryString))
              : this.contacts
            returnSuggestions(results)
          } catch (error) {
            console.error(error)
          }
        }
      })
    },
    createFilter(queryString) {
      if (queryString.length) {
        return (contact) => {
          contact.fullName = `${contact.firstName} ${contact.lastName}`
          return contact?.fullName
            .toLowerCase()
            .includes(queryString.toLowerCase())
        }
      }
    },
    handleSelect(item) {
      this.isSelected = true
      this.selectedContact = item
      this.$refs['formRules'].resetFields()
      this.$emit('select-contact', item)
    },
    changeContact() {
      this.isSelected = false
      this.selectedContact = null
      this.$emit('deselect-contact', null)
    },
    loadContacts() {
      return [
        {
          id: 0,
          firstName: '',
          lastName: '',
          fullName: '',
          emailAddress: '',
          dateOfBirth: '',
          phone: '',
          country: '',
          initials: ''
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.form-autocomplete {
  /deep/.el-form-item {
    width: 100%;
  }
}
.auto-container {
  .full-width {
    width: 100%;
  }

  .selected-contact {
    flex: 1;
    display: flex;
    line-height: 2px;
    color: #2b70d6;
    background-color: #edf5ff;
    border: 1px solid #2b70d6;
    align-items: center;
    border-radius: 10px;
    min-height: 2vh;
    max-height: 5vh;
    padding: 5px 5px 5px 10px;

    .action {
      flex-basis: 20%;
      button {
        border-radius: 8px;
      }
    }
    .text {
      flex-basis: 80%;
      .content {
        color: black;
        padding-right: 20px;
      }
    }
  }
}
.results-container {
  display: flex;
  line-height: 1.75;
  padding-bottom: 15px;
  padding-top: 15px;
  border-bottom: 1px solid #e0dfdf;
  .avatar {
    flex-basis: 5%;
    margin-top: 2px;
    @media only screen and (min-width: 1460px) {
      flex-basis: 4%;
    }
    @media only screen and (min-width: 1620px) {
      flex-basis: 3%;
    }
  }

  .demo {
    flex-basis: 100%;
  }

  .info {
    text-align: right;
  }
}
/deep/.el-input.is-disabled .el-input__inner {
  color: #595959 !important;
}
.text-black {
  color: #000000;
  margin: 0;
}
</style>
