import { BaseService } from './BaseService'

export class DocumentService extends BaseService {
  getDocuments(data) {
    return this.axios.$post('documents', data)
  }
  downloadDocuments(data) {
    return this.axios.$post('documents', data)
  }
  documentNote(data) {
    return this.axios.$post('notes', data)
  }
}
