const { Client } = require('pg')
const dbRouter = require('express').Router()

const clientData = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}

const defineMonthDates = (monthName = null) => {
  const today = new Date()
  const year = today.getFullYear()
  let month

  if (monthName) {
    month = new Date(`${monthName} 1, ${year}`).getMonth() + 1
  } else {
    month = today.getMonth() + 1
  }

  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  const format = date => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  const firstDayFormatted = format(firstDayOfMonth);
  const lastDayFormatted = format(lastDayOfMonth)

  return { start: firstDayFormatted, end: lastDayFormatted }
}

dbRouter.get('/', async (req, res) => {
  const client = new Client(clientData)
  const monthName = req.query.month || ''
  const { start, end } = defineMonthDates(monthName)

  try {
    await client.connect();

    const result = await client.query(`
      SELECT
        REPLACE(SPLIT_PART(SPLIT_PART(i.name, 'ONU Bits received', 2), '_zone', 1), '_', ' ') AS Cliente,
        SUM(g.download_sum) AS Consumo
      FROM
        (SELECT itemid, name, status, hostid FROM items WHERE key_ LIKE 'onu.br%') i
        JOIN history_test g ON i.itemid = g.itemid
        JOIN hosts h ON i.hostid = h.hostid
      WHERE
        i.status = 0
        AND i.name LIKE '%ONU Bits received%'
        AND i.name NOT LIKE '%Nodo%'
        AND i.name NOT LIKE '%NODO%'
        AND i.name NOT LIKE '%UEN%'
        AND i.name NOT LIKE '%BIGWAY%'
        AND i.name NOT LIKE '%OPTIX%'
        AND g.date_sum >= '${start} 00:00:00.00' AND g.date_sum <= '${end} 23:59:59'
        AND i.name NOT LIKE '%87574%'
        AND i.name NOT LIKE '%NO%DESCRIPTION%'
      GROUP BY Cliente
      ORDER BY Consumo DESC
      LIMIT 50
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error querying database ' + err });
  } finally {
    await client.end();
  }
})

dbRouter.get('/:olt', async (req, res) => {
  const olt = req.params.olt
  const client = new Client(clientData)
  const monthName = req.query.month || null
  const { start, end } = defineMonthDates(monthName)

  try {
    await client.connect();

    const result = await client.query(`
      SELECT
        REPLACE(SPLIT_PART(SPLIT_PART(i.name, 'ONU Bits received', 2), '_zone', 1), '_', ' ') AS Cliente,
        SUM(g.download_sum) AS consumo
      FROM
        (SELECT itemid, name, status, hostid FROM items WHERE key_ LIKE 'onu.br%') i
        JOIN history_test g ON i.itemid = g.itemid
        JOIN hosts h ON i.hostid = h.hostid
      WHERE
        i.status = 0
        AND h.hostid = ${olt}
        AND i.name LIKE '%ONU Bits received%'
        AND i.name NOT LIKE '%Nodo%'
        AND i.name NOT LIKE '%NODO%'
        AND i.name NOT LIKE '%UEN%'
        AND i.name NOT LIKE '%BIGWAY%'
        AND i.name NOT LIKE '%OPTIX%'
        AND g.date_sum >= '${start} 00:00:00.00' AND g.date_sum <= '${end} 23:59:59'
        AND i.name NOT LIKE '%87574%'
        AND i.name NOT LIKE '%NO%DESCRIPTION%'
      GROUP BY Cliente
      ORDER BY consumo DESC
      LIMIT 50
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error querying database' });
  } finally {
    await client.end();
  }
})

dbRouter.get('/client/:id', async (req, res) => {
  const user = req.params.id
  const client = new Client(clientData)
  const monthName = req.query.month || ''
  const { start, end } = defineMonthDates(monthName)

  try {
    await client.connect();

    const result = await client.query(`
      SELECT
        REPLACE(SPLIT_PART(SPLIT_PART(i.name, 'ONU Bits received', 2), '_zone', 1), '_', ' ') AS Cliente,
        SUM(g.download_sum) AS Consumo
      FROM
        (SELECT itemid, name, status, hostid FROM items WHERE key_ LIKE 'onu.br%') i
        JOIN history_test g ON i.itemid = g.itemid
        JOIN hosts h ON i.hostid = h.hostid
      WHERE
        i.status = 0
        AND i.name LIKE '%ONU Bits received%'
        AND i.name NOT LIKE '%Nodo%'
        AND i.name NOT LIKE '%NODO%'
        AND i.name NOT LIKE '%UEN%'
        AND i.name NOT LIKE '%BIGWAY%'
        AND i.name NOT LIKE '%OPTIX%'
        AND g.date_sum >= '${start} 00:00:00.00' AND g.date_sum <= '${end} 23:59:59'
        AND i.name LIKE '%${user}%'
        AND i.name NOT LIKE '%NO%DESCRIPTION%'
      GROUP BY Cliente
      ORDER BY Consumo DESC
      LIMIT 50
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error querying database ' + err });
  } finally {
    await client.end();
  }
})

module.exports = dbRouter