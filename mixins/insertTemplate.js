export default {
  methods: {
    async insertTemplate(id, format) {
      try {
        const data = {
          action: 'R',
          target: 'client',
          format,
          id
        }
        if (this.$route.query.contact_id) {
          data.contactId = this.$route.query.contact_id
        }
        if (this.$route.params.id) {
          data.caseId = this.$route.params.id
        }
        this.mailTemplate = await this.$CommunicationService.template(data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
