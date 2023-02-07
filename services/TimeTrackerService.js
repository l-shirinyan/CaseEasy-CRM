import { BaseService } from './BaseService'

export class TimeTrackerService extends BaseService {
  async timeTracker(data) {
    return await this.axios.$post('TimeTracker', data)
  }
  async timers(data) {
    return await this.axios.$post('Timers', data)
  }
  async activityTracker(data) {
    return await this.axios.$post('ActivityTracker', data)
  }
}
