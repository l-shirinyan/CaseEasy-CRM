import { BaseService } from './BaseService'

export class EmailService extends BaseService {
  getEmailData(data) {
    return this.axios.$post('Emails', data)
  }
  getMailboxes(data) {
    return this.axios.$post('Emails', data)
  }
  archiveEmails(data) {
    return this.axios.$post('Emails', data)
  }
}
