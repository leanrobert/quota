const { Client } = require('pg')
const dbRouter = require('express').Router()

const clientData = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}

dbRouter.get('/:olt', async (req, res) => {
  const olt = req.params.olt
  const client = new Client(clientData)

  try {
    await client.connect();

    const result = await client.query(`
      with q1 as(
        SELECT
          (date_part('epoch',now()))::integer as ahora,
          (date_part('epoch',now()) -3600)::integer as unahora
      )
      SELECT
        replace(split_part(split_part(i.name,'ONU Bits send',2),'_zone',1),'_',' ') Cliente,
        SUM(g.value)/8 as Consumo
      FROM items i, history_uint g, hosts h, q1 q
      WHERE
        g.clock >= q.unahora AND g.clock <= q.ahora and
        (i.key_)~* 'onu.bs' and
        i.status = 0 and
        i.itemid = g.itemid and
        h.hostid = ${olt} and
        i.hostid = h.hostid and
        g.value<500000000
        group by cliente
        order by Consumo desc`
      );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error querying database' });
  } finally {
    await client.end();
  }
})

module.exports = dbRouter