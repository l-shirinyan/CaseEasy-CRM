import { BaseService } from './BaseService'
export class SearchService extends BaseService {
  searchService(data) {
    return this.axios.$post('Search', data)
  }
}
