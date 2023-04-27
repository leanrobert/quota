import axios from 'axios'
const baseUrl = '/api/selected/client'

const getClient = async client => {
  const res = await axios.get(`${baseUrl}/${client}`)
  return res.data
}

export { getClient }
