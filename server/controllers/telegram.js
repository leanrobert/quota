const TelegramBot = require('node-telegram-bot-api')
const telegramRouter = require('express').Router()

const apiToken = process.env.BOT_TELEGRAM_TOKEN
const groupId = process.env.TELEGRAM_GROUP_ID

const bot = new TelegramBot(apiToken)

telegramRouter.post('/', (req, res) => {
  const data = req.body.data
  let messageC = '⛔ <b>Clientes que exeden la quota</b>\n'
  let messageW = '⚠️ <b>Clientes que superan el 75% de uso</b>\n'
  let messageN = '🔎 <b>Clientes que supera el 50% de uso</b>\n'

  if(data.length > 0) {
    data.map(element => {
      if(element.consumo / 1024 / 1024 / 1024 > 200) {
        messageC += `${element.cliente.trim()}\n`
      } else if(element.consumo / 1024 / 1024 / 1024 > 150) {
        messageW += `${element.cliente.trim()}\n`
      } else {

      }
    })
    bot.sendMessage(groupId, messageC + '\n' + messageW + '\n' + messageN, { parse_mode: 'HTML' })
  }

  res.status(200)
})

module.exports = telegramRouter