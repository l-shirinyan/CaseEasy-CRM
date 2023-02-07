import { BaseService } from './BaseService'

export class NotificationService extends BaseService {
  async notification(data) {
    return await this.axios.$post('Notifications', data)
  }
}
