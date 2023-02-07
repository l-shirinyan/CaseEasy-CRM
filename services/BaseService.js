let client = {}

export class BaseService {
  setClient(newClient) {
    client = newClient
  }
  get axios() {
    return client
  }
}
