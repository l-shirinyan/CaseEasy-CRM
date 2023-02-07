import { BaseService } from './BaseService'
export class DashboardService extends BaseService {
  async apiDashboard(data) {
    const response = await this.axios.$post('Dashboard', data)
    return response
  }
  DashboardService(data) {
    return this.apiDashboard(data)
  }
  DrillDown(data) {
    return this.apiDashboard(data)
  }
  getTasks(data) {
    return this.axios.$post('Tasks', data)
  }
  getAppointments(data) {
    return this.axios.$post('Calendar', data)
  }
  getReminders(data) {
    return this.axios.$post('Reminders', data)
  }
}
