const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
require('dotenv').config()

const apiToken = '5902602101:AAEPUTgJskBDja0sAMYzHhupwWPH_COXSrM'
const groupId = '-924275007'

const bot = new TelegramBot(apiToken)

const quotaLimit = 5120

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
      if(element.consumo / 1024 / 1024 / 1024 > quotaLimit) {
        messageC += `${element.cliente.trim()} <b>${Math.floor(element.consumo / 1024 / 1024 / 1024)}GB</b>\n`
      } else if(element.consumo / 1024 / 1024 / 1024 > quotaLimit * .75) {
        messageW += `${element.cliente.trim()} <b>${Math.floor(element.consumo / 1024 / 1024 / 1024)}GB</b>\n`
      } else if(element.consumo / 1024 / 1024 / 1024 > quotaLimit / 2){
        messageN += `${element.cliente.trim()} <b>${Math.floor(element.consumo / 1024 / 1024 / 1024)}GB</b>\n`
      }
    })
    bot.sendMessage(groupId, messageC + '\n' + messageW + '\n' + messageN, { parse_mode: 'HTML' })
  }
}

sendMessage()