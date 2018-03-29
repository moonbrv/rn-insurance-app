import apisauce from 'apisauce'

const routes = {
  getTypes: () => `api.php?action=query&list=categorymembers&cmtitle=Category:Types_of_insurance&cmtype=subcat&format=json&origin=*`
}

const create = (baseURL = 'https://en.wikipedia.org/w') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  if (__DEV__) {
    api.addMonitor(console.log)
  }

  const getInsurances = () => api.get(routes.getTypes())

  return {
    getInsurances
  }
}

const instance = create()

export default instance
