const { Client } = require('pg')
const dbRouter = require('express').Router()

const clientData = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}

dbRouter.get('/', async (req, res) => {
  const client = new Client(clientData)

  try {
    await client.connect()

    const result = await client.query(`
      SELECT
        DATE_TRUNC('month', g.date_sum) AS Month,
        SUM(g.download_sum) AS Download
      FROM
        (SELECT itemid, name, status, hostid FROM items WHERE key_ LIKE 'onu.br%') i
        JOIN history_test g ON i.itemid = g.itemid
        JOIN hosts h ON i.hostid = h.hostid
      WHERE
        i.status = 0
        AND h.hostid = 22969
        AND i.name LIKE '%ONU Bits received%'
        AND i.name NOT LIKE '%Nodo%'
        AND i.name NOT LIKE '%NODO%'
        AND i.name NOT LIKE '%UEN%'
        AND i.name NOT LIKE '%BIGWAY%'
        AND i.name NOT LIKE '%OPTIX%'
        AND g.date_sum >= DATE_TRUNC('year', NOW())::DATE
        AND i.name NOT LIKE '%87574%'
      GROUP BY Month
      ORDER BY Month ASC
    `)

    const monthsData = [
      {
        month: "January",
        download: 0
      },
      {
        month: "February",
        download: 0
      },
      {
        month: "March",
        download: 0
      },
      {
        month: "April",
        download: 0
      },
      {
        month: "May",
        download: 0
      },
      {
        month: "June",
        download: 0
      },
      {
        month: "July",
        download: 0
      },
      {
        month: "August",
        download: 0
      },
      {
        month: "September",
        download: 0
      },
      {
        month: "October",
        download: 0
      },
      {
        month: "November",
        download: 0
      },
      {
        month: "December",
        download: 0
      }
    ]

    result.rows.forEach((row) => {
      const index = new Date(row.month).getMonth()
      if (index !== -1) {
        monthsData[index].download = isNaN(parseFloat(row.download)) ? 0 : parseFloat(row.download)
      }
    })

    res.status(200).json(monthsData)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error querying database ' + err });
  }
})

module.exports = dbRouter