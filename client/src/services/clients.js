import axios from 'axios'
const baseUrl = '/api/clients'

const getOLT = async olt => {
  if (olt === 1) {
    const res = await axios.get(`${baseUrl}`)
    return res.data
  } else {
    const res = await axios.get(`${baseUrl}/${olt}`)
    return res.data
  }
}

export { getOLT }
