import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatCurrency', (value, type, showCurrency = true) => {
  const typeCurrency = type || 'CAD'
  if (typeof value !== 'number') {
    return value
  }
  var formatter = new Intl.NumberFormat(`en-${typeCurrency.slice(0, 2)}`, {
    style: 'currency',
    currency: typeCurrency,
    minimumFractionDigits: 2
  })
  return `${showCurrency ? typeCurrency : ''} ${formatter.format(value)}`
})
Vue.filter('formatCurrencyV2', (value, symbol) => {
  if (typeof value !== 'number') {
    return value
  }
  return symbol + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.00'
})
Vue.filter('formatDate', (value) => {
  if (value && value !== '-') {
    return moment(String(value)).format('MMM D, YYYY')
  } else {
    return value
  }
})
Vue.filter('formatDateV2', (value) => {
  if (value && value !== '-') {
    return moment(String(value)).format('YYYY/MM/DD')
  } else {
    return value
  }
})

Vue.filter('formatNumber', (value) => {
  return parseInt(value).toLocaleString('en')
})
