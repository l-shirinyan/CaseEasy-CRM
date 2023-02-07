import { BaseService } from './BaseService'
export class RetainersService extends BaseService {
  getLetters(data) {
    return this.axios.$post('Letters', data)
  }
  getMilestones() {
    return this.axios.$post('Milestones', { action: 'R' })
  }
  schedules(data) {
    return this.axios.$post('Schedules', data)
  }
  getTemplates() {
    return this.axios.$post('Templates', {
      action: 'R',
      target: 'general'
    })
  }
  mappingId(data) {
    return this.axios.$post('templates', data)
  }
  getLetter(data) {
    return this.axios.$post('Letters', data)
  }
  livePrewiev(data) {
    return this.axios.$post('filemanager', data)
  }
  getScheduleTemplates() {
    return this.axios.$post('Schedules', {
      action: 'R',
      target: 'templates'
    })
  }
}
