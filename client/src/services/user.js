import axios from 'axios'
const baseUrl = '/api/login'

const login = async object => {
  const res = await axios.post(baseUrl, object)
  return res.data
}

export { login }