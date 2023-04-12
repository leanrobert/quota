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
    await client.connect();

    const result = await client.query(`
      SELECT
        REPLACE(SPLIT_PART(SPLIT_PART(i.name, 'ONU Bits received', 2), '_zone', 1), '_', ' ') AS Cliente,
        SUM(g.download_sum) AS Consumo
      FROM
        (SELECT itemid, name, status, hostid FROM items WHERE key_ LIKE 'onu.br%') i
        JOIN history_uint_aggregate g ON i.itemid = g.itemid
        JOIN hosts h ON i.hostid = h.hostid
      WHERE
        i.status = 0
        AND i.name LIKE '%ONU Bits received%'
        AND i.name NOT LIKE '%Nodo%'
        AND i.name NOT LIKE '%NODO%'
        AND i.name NOT LIKE '%UEN%'
        AND i.name NOT LIKE '%BIGWAY%'
        AND i.name NOT LIKE '%OPTIX%'
      GROUP BY Cliente
      ORDER BY Consumo DESC
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

dbRouter.get('/:olt', async (req, res) => {
  const olt = req.params.olt
  const client = new Client(clientData)

  try {
    await client.connect();

    const result = await client.query(`
      SELECT
        REPLACE(SPLIT_PART(SPLIT_PART(i.name, 'ONU Bits received', 2), '_zone', 1), '_', ' ') AS Cliente,
        SUM(g.download_sum) AS consumo
      FROM
        (SELECT itemid, name, status, hostid FROM items WHERE key_ LIKE 'onu.br%') i
        JOIN history_uint_aggregate g ON i.itemid = g.itemid
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

module.exports = dbRouter