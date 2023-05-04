import axios from 'axios'
const baseUrl = '/api/clients'

const getOLT = async (olt, month = '') => {
  if (olt === 1) {
    return (await axios.get(`${baseUrl}?month=${month}`)).data
  } else {
    return (await axios.get(`${baseUrl}/${olt}?month=${month}`)).data
  }
}

export { getOLT }
