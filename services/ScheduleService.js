import { BaseService } from './BaseService'
export class ScheduleService extends BaseService {
  async getMilestones(caseId) {
    const data = {
      target: 'stages',
      action: 'R',
      caseId: caseId
    }
    return this.axios.$post('Schedules', data)
  }

  async createMilestones(data, caseId) {
    const options = {
      target: 'stages',
      action: 'U',
      caseId: caseId,
      schedules: data
    }
    return this.axios.$post('Schedules', options)
  }
}
