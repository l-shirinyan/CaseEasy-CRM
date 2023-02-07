import { BaseService } from './BaseService'

export class TeamService extends BaseService {
  async teamMembers(data) {
    return await this.axios.$post('Team', data)
  }
}
