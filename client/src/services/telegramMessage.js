import axios from 'axios'
const baseUrl = '/api/telegram'

const messageTelegram = async data => {
  console.log(data);
  const res = await axios.post(`${baseUrl}`, { data })
  return res
}

export { messageTelegram }