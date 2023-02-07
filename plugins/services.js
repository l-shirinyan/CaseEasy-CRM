import { AuthService } from '../services/AuthService'
import { NotificationService } from '../services/NotificationService'
import { HomeService } from '../services/HomeService'
import { DashboardService } from '../services/DashboardService'
import { TaskService } from '../services/TaskService'
import { TeamService } from '../services/TeamService'
import { CalendarService } from '../services/CalendarService'
import { CalTypeService } from '../services/CalTypeService'
import { CaseService } from '../services/CaseService'
import { ContactService } from '../services/ ContactService'
import { TransactionService } from '../services/TransactionService'
import { BaseService } from '../services/BaseService'
import { EmailService } from '../services/EmailService'
import { SearchService } from '../services/SearchService'
import { InvoiceService } from '../services/InvoiceService'
import { DocumentService } from '../services/DocumentService'
import { RetainersService } from '../services/RetainersService'
import { ReminderService } from '../services/ReminderService'
import { TimeTrackerService } from '../services/TimeTrackerService'
import { FiltersService } from '../services/Filters'
import { ProfileService } from '../services/ProfileService'
import { TimezoneService } from '../services/TimezoneService'
import { CommunicationService } from '../services/CommunicationService'
import { ScheduleService } from '../services/ScheduleService'

export default ({ app }, inject) => {
  const authService = new AuthService()
  const notificationService = new NotificationService()
  const homeService = new HomeService()
  const dashboardService = new DashboardService()
  const baseService = new BaseService()
  const taskService = new TaskService()
  const teamService = new TeamService()
  const calendarService = new CalendarService()
  const calTypeService = new CalTypeService()
  const caseService = new CaseService()
  const contactService = new ContactService()
  const profileService = new ProfileService()
  const timezoneService = new TimezoneService()
  baseService.setClient(app.$axios)
  const transactionService = new TransactionService()
  const searchService = new SearchService()
  const emailService = new EmailService()
  const invoiceService = new InvoiceService()
  const documentService = new DocumentService()
  const retainersService = new RetainersService()
  const reminderService = new ReminderService()
  const timeTrackerService = new TimeTrackerService()
  const filtersService = new FiltersService()
  const communicationService = new CommunicationService()
  const scheduleService = new ScheduleService()

  inject('AuthService', authService)
  inject('NotificationService', notificationService)
  inject('HomeService', homeService)
  inject('DashboardService', dashboardService)
  inject('ContactService', contactService)
  inject('TaskService', taskService)
  inject('TeamService', teamService)
  inject('CalendarService', calendarService)
  inject('CalTypeService', calTypeService)
  inject('CaseService', caseService)
  inject('TransactionService', transactionService)
  inject('SearchService', searchService)
  inject('EmailService', emailService)
  inject('InvoiceService', invoiceService)
  inject('DocumentService', documentService)
  inject('RetainersService', retainersService)
  inject('ReminderService', reminderService)
  inject('TimeTrackerService', timeTrackerService)
  inject('FiltersService', filtersService)
  inject('ProfileService', profileService)
  inject('TimezoneService', timezoneService)
  inject('CommunicationService', communicationService)
  inject('ScheduleService', scheduleService)
}
