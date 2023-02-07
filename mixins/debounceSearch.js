export default {
  data() {
    return {
      debounce: null
    }
  },
  methods: {
    debounceSearch(func) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        func()
      }, 900)
    }
  }
}
