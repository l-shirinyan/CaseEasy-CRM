import Cookies from 'js-cookie'

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.common['Authorization'] = token
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      Cookies.remove('token')
      redirect('/')
    }
    //TODO: Send error to API
  })
}
