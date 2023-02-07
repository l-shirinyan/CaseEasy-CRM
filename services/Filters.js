import { BaseService } from './BaseService'

export class FiltersService extends BaseService {
  getFilters(data) {
    return this.axios.$post('Filters', data)
  }
}
