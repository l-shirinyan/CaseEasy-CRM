import { BaseService } from './BaseService'

export class CommunicationService extends BaseService {
  async getChats(data) {
    return await this.axios.$post('Chats', data)
  }
  getMessage(data) {
    return this.axios.$post('messageshub', data)
  }
  template(data) {
    return this.axios.$post('templates', data)
  }
}
