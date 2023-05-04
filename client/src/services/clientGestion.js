import axios from 'axios'
const baseUrl = '/api/selected/client'

const getClient = async client => {
  const code = client.match(/\d+/)[0]
  const res = await axios.get(`${baseUrl}/${client}`)
  const res2 = await axios.get(`/api/clients/client/${code}`)
  return { ges: res.data, db: res2.data[0] }
}

export { getClient }
