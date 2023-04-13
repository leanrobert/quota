const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
require('dotenv').config()

const apiToken = process.env.BOT_TELEGRAM_TOKEN
const groupId = process.env.TELEGRAM_GROUP_ID

const bot = new TelegramBot(apiToken)

const getData = async () => {
  const data = await axios.get('http://localhost/api/clients')
  return data
}

const sendMessage = async () => {
  const { data } = await getData()

  let messageC = '⛔ <b>Clientes que exeden la quota</b>\n'
  let messageW = '⚠️ <b>Clientes que superan el 75% de uso</b>\n'
  let messageN = '🔎 <b>Clientes que supera el 50% de uso</b>\n'

  if(data.length > 0) {
    data.map(element => {
      if(element.consumo / 1024 / 1024 / 1024 > 200) {
        messageC += `${element.cliente.trim()} <b>${element.consumo / 1024 / 1024 / 1024}GB</b>\n`
      } else if(element.consumo / 1024 / 1024 / 1024 > 150) {
        messageW += `${element.cliente.trim()} <b>${element.consumo / 1024 / 1024 / 1024}GB</b>\n`
      } else if(element.consumo / 1024 / 1024 / 1024 > 100){
        messageN += `${element.cliente.trim()} <b>${element.consumo / 1024 / 1024 / 1024}GB</b>\n`
      }
    })
    bot.sendMessage(groupId, messageC + '\n' + messageW + '\n' + messageN, { parse_mode: 'HTML' })
  }
}

sendMessage()