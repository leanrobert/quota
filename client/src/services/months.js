import axios from 'axios'
const baseUrl = '/api/months'

const getMonths = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

export { getMonths }
