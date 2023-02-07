export default {
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      let currency = data[0] ? data[0].currency : null
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Total'
          return
        }
        const values = data.map((item) => Number(item[column.property]))
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      let newArray = sums.map((elem) => {
        if (typeof elem === 'number') {
          elem = this.$options.filters.formatCurrency(elem, currency, false)
        }
        return elem
      })
      return newArray
    }
  }
}
