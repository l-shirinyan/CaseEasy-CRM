import { BaseService } from './BaseService'

export class TransactionService extends BaseService {
  transactions(data) {
    return this.axios.$post('transactions', data)
  }
  payments(data) {
    return this.axios.$post('payments', data)
  }
  async createRetainerSchedule(data) {
    /*
      data = {
        userId: 1,
        amount: 0.0,
        taxRate: 0.0,
        description: "",
        dueOnDate: "Jan 12, 2021",
        specificDate: "Jan 12, 2021"
      }
      */
    try {
      /*const response = await this.props.$axios.$post('createRetainerSchedule', data)

         return response && response.body ? response.body : null*/

      return { res: data }
    } catch (e) {
      console.error(e)
    }
  }
  async createRetainerVariables(data) {
    /*
    data = {
      administrativeFee: 0.0,
      otherFess: 0.0,
      governmentFee: 0.0,
      professionalFee: 0.0,
      userId: 1,
    }
    */
    /*const response = await this.props.$axios.$post("createRetainerVariables", data)

      return response && response.body ? response.body : null*/

    return { res: data }
  }
  async createRetainerLetter(data) {
    /*
    data = {
      templateId: 1,
      letterName: "",
      userId: 1
    }
    */
    try {
      /*const response = await this.props.$axios.$post("createRetainerLetter", data)

        return response && response.body ? response.body : null*/

      return { res: data }
    } catch (e) {
      console.error(e)
    }
  }
  async getRetainerLetters() {
    try {
      /*const response = await this.props.$axios.$get("getRetainerLetters")

        return response && response.body ? response.body : null*/

      return { res: data }
    } catch (e) {
      console.error(e)
    }
  }
  async updateTask(data) {
    /*
      data = {
        id: 1,
        taskType: "C",
        caseNumber: ""
        name: "",
        dueDate: "Jan 2, 2021",
        timeDue: "12:02:00 AM",
        priorityId: 1,
        statusId: 2,
        mentions: [{
            id: 1
        }],
        assignees: [{id:1}],
        notes: ""
      }
      */
    /*const response = await this.props.$axios.$patch('updateTask', data)

      return response && response.body ? response.body : null*/

    return { res: data }
  }
  async deleteTask(data) {
    /*
      data = {
        id: "1"
      }
      */
    /*const response = await this.props.$axios.$delete('deleteTask', data)

      return response && response.body ? response.body : null*/

    return { res: data }
  }
}
