import React from 'react'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { getFirstAndLastDay } from '../services/dateHelper'

const ClientChart = () => {
  const selected = useSelector(({ selected }) => selected)

  const time = getFirstAndLastDay(new Date())

  if(selected === null || selected.client.error) {
    return (
      <CardGroup>
        <Card>
          <Card.Header>
            No hay cliente o informacion del mismo seleccionado
          </Card.Header>
        </Card>
      </CardGroup>
    )
  }

  return (
    <CardGroup style={{ margin: '0 50px 0 50px'}}>
      <Card>
        <Card.Header>
          <h2><b>{selected.client.data.customer_data.code}</b> - {selected.client.data.customer_data.name} {selected.client.data.customer_data.lastname}</h2>
        </Card.Header>
        <Card.Body>
          <div>
            <p><u>Nodo:</u> {selected.client.data.connection_data.connection.node}</p>
            <p><u>Ip:</u> {selected.client.data.connection_data.connection.ip}</p>
            <p><u>Plan:</u> {selected.client.data.connection_data.connection.plan}</p>
            <p><u>Estado:</u><b> {selected.client.data.account_data.a_status}</b></p>
            <Button
              target='_blank'
              href={`https://gestion.westnet.com.ar/index.php?r=sale%2Fcustomer%2Fview&id=${selected.client.data.customer_data.idcustomer}`}
            >
              Gestion
            </Button>
            <Link to={`/clientes`} style={{ marginLeft: '10px' }}>
              <Button variant='success'>Detalles del cliente</Button>
            </Link>

          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
            <h2>Quota del Mes</h2>
          </Card.Header>
        <Card.Body>
          <iframe
            src={`http://172.16.17.254/d-solo/nLVnJh24k/dashboard-clientes?orgId=1&var-cliente=${selected.nombre.trim().split(' ').join('+')}&from=${Date.parse(time.firstDayOfMonth)}&to=${Date.parse(time.lastDayOfMonth)}&kiosk=&panelId=18`}
            width="100%"
            height="100%"
            title={selected.nombre}
          />
        </Card.Body>
      </Card>
    </CardGroup>
  )
}

export default ClientChart