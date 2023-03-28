import axios from 'axios'
const baseUrl = '/api/clients'

const getOLT = async olt => {
  const res = await axios.get(`${baseUrl}/${olt}`)
  return res.data
}

export { getOLT }