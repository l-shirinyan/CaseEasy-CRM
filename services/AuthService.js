import { BaseService } from './BaseService'
import Cookies from 'js-cookie'

export class AuthService extends BaseService {
  async authenticateUser(siteId, emailAddress, password) {
    return this.axios.$post('Auth', {
      siteId: siteId,
      userName: emailAddress,
      password: password
    })
  }

  logOutUser() {
    try {
      localStorage.removeItem('userId')
      localStorage.removeItem('email')
      localStorage.removeItem('lastName')
      localStorage.removeItem('firstName')
      localStorage.removeItem('license')
      localStorage.removeItem('upcomingRemindersDate')
      localStorage.removeItem('clientsAndBusinessesDate')
      localStorage.removeItem('caseByTypeDate')
      localStorage.removeItem('ReferralSources')
      localStorage.removeItem('ClientAge')
      localStorage.removeItem('caseByStatusDate')
      localStorage.removeItem('logo')
      localStorage.removeItem('mfaNotification')

      Cookies.remove('token')
    } catch (e) {
      console.error(e)
    } finally {
      window.location.href = '/'
    }
  }

  setUserStorage(response) {
    localStorage.setItem('id', response.userId)
    localStorage.setItem('email', response.email)
    localStorage.setItem('firstName', response.firstName)
    localStorage.setItem('lastName', response.lastName)
    localStorage.setItem('license', response.license)
    if (response.logo) {
      localStorage.setItem('logo', response.logo)
    }
    Cookies.set('token', response.token)
    localStorage.setItem('role', response.role)
    localStorage.setItem('paid', response.ispaid)
    localStorage.setItem('name', response.name)
    localStorage.setItem('avatar', response.avatar)
    localStorage.setItem('company_Id', response.companyId)
    localStorage.setItem('company_name', response.company)
    localStorage.setItem('plan', response.plan)
    localStorage.setItem('size', response.license)
    localStorage.setItem('website', response.website)
  }
  forgotSiteIDAndPassword(data) {
    return this.axios.$post('profile', data)
  }
  async setUpMFA(phone) {
    return this.axios.$post('Auth', {
      target: 'mfaSetup',
      userName: localStorage.getItem('email'),
      phone: phone,
      siteId: localStorage.getItem('siteId')
    })
  }
  async verifyMFA(code, isDeviceRegistered, mfaVerifyDate) {
    return this.axios.$post('Auth', {
      target: 'mfaVerify',
      userName: localStorage.getItem('email'),
      code: code,
      registeredDevice: isDeviceRegistered,
      registeredDeviceExpiry: mfaVerifyDate,
      siteId: localStorage.getItem('siteId')
    })
  }

  async notifyMFA() {
    return this.axios.$post('Auth', {
      target: 'mfaNotify',
      userName: localStorage.getItem('email'),
      siteId: localStorage.getItem('siteId')
    })
  }
}
