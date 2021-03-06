import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { AxiosCommomService } from './AxiosCommomService'

export class AxiosService {
  static headers
  static url

  static init(key, url) {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: key,
    }
    this.url = url
  }

  static getThreads = async () => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri: '/threads',
    }
    try {
      const {
        data: { resource: items },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })
      return items.items
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error loading threads ${error}`)
      return []
    }
  }
  static getContacts = async () => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri: '/contacts',
    }

    try {
      const {
        data: {
          resource: { items },
        },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })

      return items
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error loading contacts ${error}`)
      return []
    }
  }
  static getApplication = async () => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri: '/configuration/caller',
    }
    try {
      const {
        data: {
          resource: { items },
        },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })
      const application = items.find((e) => e.name === 'Application')
      return { ...application, shortName: application.caller.split('@')[0] }
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error loading application ${error}`)
      return { shortName: 'botId' }
    }
  }
}
