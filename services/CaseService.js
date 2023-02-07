import { BaseService } from './BaseService'

export class CaseService extends BaseService {
  async apiCases(data) {
    const response = await this.axios.$post('Cases', data)
    return response
  }
  async getCases(data) {
    const response = await this.axios.$post('cases', data)
    return response
  }

  casesSort(data) {
    return this.apiCases(data)
  }
  async apiTags(data) {
    const response = await this.axios.$post('Tags', data)
    return response
  }
  /**** Case Profile  ****/
  async getCaseTags(caseId) {
    return this.apiTags({
      caseId: caseId,
      action: 'R'
    })
  }

  async createCaseTag(caseId, tag) {
    return this.apiTags({
      caseId: caseId,
      action: 'C',
      tag: tag
    })
  }

  async deleteCaseTag(caseId, tag) {
    return this.apiTags({
      caseId: caseId,
      action: 'D',
      tag: tag
    })
  }

  async getCaseDetails(caseId, contactId) {
    const response = await this.axios.$post('CaseDetail', {
      action: 'R',
      target: 'detail',
      caseId: caseId,
      contactId: contactId
    })
    return response
  }

  async getCaseInformation(caseId) {
    return await this.axios.$post('CaseInformation', {
      caseId: caseId,
      action: 'R'
    })
  }

  async getCaseWorkflow(caseId) {
    return await this.axios.$post('Workflows', {
      caseId: caseId,
      target: 'case',
      action: 'R'
    })
  }
  getAppointments(data) {
    return this.axios.$post('Calendar', data)
  }
  async caseNotes(data) {
    return await this.axios.$post('Notes', data)
  }
  async apiCaseStatus(data) {
    const response = await this.axios.$post('CaseStatuses', data)
    return response
  }
  getCaseStatus(data) {
    return this.apiCaseStatus(data)
  }
  createCaseStatus(data) {
    return this.apiCaseStatus(data)
  }
  async apiCaseTypes(data) {
    const response = await this.axios.$post('CaseTypes', data)
    return response
  }
  getCaseTypes(data) {
    return this.apiCaseTypes(data)
  }
  createCaseType(data) {
    return this.apiCaseTypes(data)
  }
  getForms(data) {
    return this.axios.$post('Forms', data)
  }
  getDocuments(data) {
    return this.axios.$post('Documents', data)
  }
  getQuestionnaires(data) {
    return this.axios.$post('Questionnaires', data)
  }
  trustAccount(data) {
    return this.axios.$post('trustAccount', data)
  }
  checkList(data) {
    return this.axios.$post('Checklists', data)
  }
  workflows(data) {
    return this.axios.$post('workflows', data)
  }
  schedules(data) {
    return this.axios.$post('Schedules', data)
  }
  getTaxRates(data) {
    return this.axios.$post('Taxes', data)
  }
  milestones(data) {
    return this.axios.$post('Milestones', data)
  }
  getNotesCount(data) {
    return this.axios.$post('notes', data)
  }
  customizedFields(data) {
    return this.axios.$post('CustomFields', data)
  }
  caseInformation(data) {
    return this.axios.$post('CaseInformation', data)
  }
  applicant(data) {
    return this.axios.$post('applicants', data)
  }
  placeholders(data) {
    return this.axios.$post('placeholders', data)
  }
  fileManager(data) {
    return this.axios.$post('FileManager', data)
  }
  letters(data) {
    return this.axios.$post('Letters', data)
  }
  caseNumber(data) {
    return this.axios.$post('Cases', data)
  }
  createCase(data) {
    return this.axios.$post('Cases', data)
  }
  deleteCase(id) {
    return this.axios.$post('Cases', {
      action: 'D',
      caseId: id
    })
  }
  getReceipts(data) {
    return this.axios.$post('receipts', data)
  }
  createReceipts(data) {
    return this.axios.$post('receipts', data)
  }
  getAllOfficeList(data) {
    return this.axios.$post('offices', data)
  }
  saveNewLocation(data) {
    return this.axios.$post('offices', data)
  }
  editReceipt(data) {
    return this.axios.$post('receipts', data)
  }
  downloadReceipt(data) {
    return this.axios.$post('receipts', data)
  }
  getclientPortalURL(data) {
    return this.axios.$post('CaseDetail', data)
  }
  getRelationships(data) {
    return this.axios.$post('applicants', data)
  }
  deleteReceipts(data) {
    return this.axios.$post('receipts', data)
  }
  documents(data) {
    return this.axios.$post('Documents', data)
  }
  restore(data) {
    return this.axios.$post('caseinformation', data)
  }
}
