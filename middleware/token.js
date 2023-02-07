import Cookies from 'js-cookie'
export default function ({ redirect }) {
  if (Cookies.get('token')) {
    return redirect('/home')
  }
}
