import { BaseService } from './BaseService'

export class ReminderService extends BaseService {
  getReminders(target, caseId = null) {
    return this.axios.$post('Reminders', {
      caseId: caseId,
      action: 'R',
      target: target
    })
  }
  createReminder(reminder) {
    return this.axios.$post('Reminders', reminder)
  }
  deleteReminder(data) {
    return this.axios.$post('Reminders', {
      action: 'D',
      caseId: data.caseId,
      id: data.id
    })
  }
}
