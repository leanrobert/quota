const axios = require('axios')
const gestionRouter = require('express').Router()

let token = null

const generateToken = async () => {
  try {
    const data = JSON.stringify({
      "username": process.env.GESTION_USERNAME,
      "password": process.env.GESTION_PASSWORD,
      "client_id": process.env.GESTION_CLIENT_ID,
      "client_secret": process.env.GESTION_CLIENT_SECRET,
      "grant_type": process.env.GESTION_GRANT_TYPE
    })

    const config = {
      method: 'get',
      url: 'https://gestion.westnet.com.ar/index.php?r=ivr/v1/auth/token',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    }

    const response = await axios(config)
    return {
      info: response.data.access_token,
      date: new Date()
    }
  } catch(error) {
    console.log({ error: 'Problem with token' })
  }
}

gestionRouter.get('/client/:client', async (req, res) => {
  if(token === null) {
    token = await generateToken()
  }

  try {
    const config = {
      method: 'POST',
      url: 'https://gestion.westnet.com.ar/index.php',
      params: {r: 'ivr/v1/customer/get-data-customer'},
      headers: {
        cookie: 'PHPSESSID=39i6qrsat0rhghl976085skb12; _csrf=78e5bdf17af7e991eb77b0df5335271274767bcc1334add8afbd19cf82d08263a%253A2%253A%257Bi%253A0%253Bs%253A5%253A%2522_csrf%2522%253Bi%253A1%253Bs%253A32%253A%2522mWILDLnl2EomPz_BoxxIFyebzZvpfOSk%2522%253B%257D',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.info}`
      },
      data: {code: `${req.params.client}`}
    };

    const response = await axios(config)
    res.json(response.data)
  } catch (error) {
    token = await generateToken()
    res.status(400).json({ error: 'No se pudo obtener datos ' + error.message })
  }
})

module.exports = gestionRouter