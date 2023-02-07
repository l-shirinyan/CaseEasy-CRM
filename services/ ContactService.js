import { BaseService } from './BaseService'

export class ContactService extends BaseService {
  async contactService(data) {
    return await this.axios.$post('Contacts', data)
  }
  async getContacts(data) {
    return await this.axios.$post('contacts', data)
  }

  async getContactDetails(contactId, target) {
    return await this.axios.$post('ContactDetail', {
      target: target,
      action: 'R',
      contactId: contactId
    })
  }

  async getJobTitles() {
    return await this.axios.$post('JobTitles', {
      action: 'R',
      target: 'general'
    })
  }
  async reminders(data) {
    return await this.axios.$post('Reminders', data)
  }
  async billingDashboard(data) {
    return await this.axios.$post('Dashboard', data)
  }
  async getCountry(data) {
    return await this.axios.$post('ContactDetail', data)
  }
  async addContact(data) {
    return await this.axios.$post('Contacts', data)
  }
}
