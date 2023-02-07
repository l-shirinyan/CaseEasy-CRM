export default {
  methods: {
    handleFindInitial(str) {
      if (str === null || str === undefined) return ''

      let newStr = ''
      let dict = str.split(' ')
      for (let i in dict) {
        newStr += dict[i][0]
      }
      return newStr.toUpperCase()
    }
  }
}
