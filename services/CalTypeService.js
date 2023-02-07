import { BaseService } from './BaseService'

export class CalTypeService extends BaseService {
  async calTypeService(data) {
    return await this.axios.$post('CalendarTypes', data)
  }
}
