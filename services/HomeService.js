import { BaseService } from './BaseService'
export class HomeService extends BaseService {
  async getLatestNews() {
    try {
      const url = encodeURIComponent(
        'https://api.io.canada.ca/io-server/gc/news/en/v2?dept=departmentofcitizenshipandimmigration&sort=publishedDate&orderBy=desc&publishedDate%3E=2021-07-23&pick=50&format=atom&atomtitle=Immigration,%20Refugees%20and%20Citizenship%20Canada'
      )
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?count=50&api_key=c0gt4fgae64cmynnpyuvayfrqpslp6grdfabqisu&rss_url=${url}`
      )
        .then((data) => {
          return data.json()
        })
        .then((dataJson) => {
          return dataJson.items
        })
      return response
    } catch (e) {
      console.error(e)
    }
  }
  latestFeed(data) {
    return this.axios.$post('LatestFeed', data)
  }
  async getLatestProducts() {
    try {
      // const response = await this.props.$axios.$get('/getLatestProducts')
      // return response && response.data ? response.data : null*/
      return {
        0: [
          {
            name: 'smth',
            description:
              'Check out our E-Signature software to get important documents signed without the hassle. No need to Print and Scan the Use of a Representative Form or any PDFs, integrates with the CRM',
            imageUrl: require('@/assets/images/case-easy-sign.png'),
            url: 'https://caseeasy.ca/Sign?utm_source=crm&utm_medium=home_page_learnbutton'
          },
          {
            name: 'smth',
            description:
              'IMEDA Immigration Education Alliance is a non-profit organization created by your colleagues to provide you with relevant hands-on immigration education and practical tools.',
            imageUrl:
              'https://caseeasy.ca/assets.2.0/img/brand-logo/imeda_logo_signature_2022.png',
            url: 'https://www.imeda.ca?utm_source=caseeasy'
          }
        ],
        1: [
          {
            name: 'smth',
            description:
              'Check out our E-Signature software to get important documents signed without the hassle. No need to Print and Scan the Use of a Representative Form or any PDFs, integrates with the CRM',
            imageUrl: require('@/assets/images/case-easy-sign.png'),
            url: 'https://caseeasy.ca/Sign?utm_source=crm&utm_medium=home_page_learnbutton'
          },
          {
            name: 'smth',
            description:
              'IMEDA Immigration Education Alliance is a non-profit organization created by your colleagues to provide you with relevant hands-on immigration education and practical tools.',
            imageUrl:
              'https://caseeasy.ca/assets.2.0/img/brand-logo/imeda_logo_signature_2022.png',
            url: 'https://www.imeda.ca?utm_source=caseeasy'
          }
        ]
      }
    } catch (e) {
      console.error(e)
    }
  }
}
