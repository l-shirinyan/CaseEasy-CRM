import { BaseService } from './BaseService'

export class InvoiceService extends BaseService {
  async invoiceService(data) {
    return await this.axios.$post('invoices', data)
  }
  previewInvoice(data) {
    return this.axios.$post('filemanager', data)
  }
  downloadInvoice(data) {
    return this.axios.$post('invoices', data)
  }
}
