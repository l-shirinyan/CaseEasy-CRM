import { BaseService } from './BaseService'
export class TimezoneService extends BaseService {
  getListTimeZone() {
    return this.axios.$post('Timezones')
  }
}
