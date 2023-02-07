import { BaseService } from './BaseService'
export class ProfileService extends BaseService {
  async apiProfileDetails(data) {
    const response = await this.axios.$post('Profile', data)
    return response
  }
  getProfileDetails(data) {
    return this.apiProfileDetails(data)
  }
  updateProfile(data) {
    return this.apiProfileDetails(data)
  }
  updatePassword(data) {
    return this.apiProfileDetails(data)
  }
}
