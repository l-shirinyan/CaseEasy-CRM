import { BaseService } from './BaseService'

export class TaskService extends BaseService {
  async tasksApi(data) {
    if (!data.caseId) {
      delete data.caseId
    }
    return await this.axios.$post('Tasks', data)
  }
  async getTasks(data) {
    return await this.axios.$post('tasks', data)
  }
  async taskNote(data) {
    return await this.axios.post('Notes', data)
  }
  async taskBulkOperations(data) {
    return await this.axios.$post('tasks', data)
  }
}
