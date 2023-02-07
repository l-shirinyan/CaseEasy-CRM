import { BaseService } from './BaseService'
export class CalendarService extends BaseService {
  calendarService(data) {
    return this.axios.$post('Calendar', data)
  }
}
