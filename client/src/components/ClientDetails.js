import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import "react-datepicker/dist/react-datepicker.css";

const ClientDetails = () => {
  const selected = useSelector(({ selected }) => selected)

  const [startDate, setStartDate] = useState(new Date() - (60 * 60 * 24 * 1000))
  const [endDate, setEndDate] = useState(new Date())

  const handleDates = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  if (!selected) {
    return (
      <Container>
        No client Selected
        <Link to='/'>
          <Button style={{ display: 'block', marginTop: '10px' }}>Go Back</Button>
        </Link>
      </Container>
    )
  }

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>{selected.nombre}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          Seleccionar fechas <DatePicker selected={startDate} onChange={handleDates} startDate={startDate} endDate={endDate} selectsRange showDisabledMonthNavigation style={{ textAlign: 'center' }} />
        </div>
      </div>

      <Card style={{ margin: '10px'}}>
        <Card.Header>Quota de cliente en tiempo filtrado</Card.Header>
        <Card.Body style={{ display: 'flex'}}>
          <iframe
            src={`http://172.16.17.254/d-solo/nLVnJh24k/dashboard-clientes?orgId=1&var-cliente=${selected.nombre.trim().split(' ').join('+')}&from=${Date.parse(startDate)}&to=${Date.parse(endDate)}&kiosk=&panelId=18`}
            width="100%"
            height="200px"
            title='Client quota'
          />
        </Card.Body>
      </Card>

      <Card style={{ margin: '10px'}}>
        <Card.Header>Consumo en tiempo filtrado</Card.Header>
        <Card.Body>
          <iframe
            src={`http://172.16.17.254/d-solo/nLVnJh24k/dashboard-clientes?from=${Date.parse(startDate)}&to=${Date.parse(endDate)}&var-cliente=${selected.nombre.trim().split(' ').join('+')}&orgId=1&panelId=2`}
            width='100%'
            height='400px'
            title='Client consumption'
          />
        </Card.Body>
      </Card>

      <Card style={{ margin: '10px'}} border='primary'>
        <Card.Header>Detalles de la conexión</Card.Header>
        <ListGroup>
          <ListGroup.Item><u>Ip:</u> {selected.client.data.connection_data.connection.ip}</ListGroup.Item>
          <ListGroup.Item><u>Nodo:</u> {selected.client.data.connection_data.connection.node}</ListGroup.Item>
          <ListGroup.Item><u>Plan:</u> {selected.client.data.connection_data.connection.plan}</ListGroup.Item>
        </ListGroup>
      </Card>

      <Card style={{ margin: '10px'}}>
        <Card.Header>Detalles del cliente</Card.Header>
        <ListGroup>
          <ListGroup.Item><u>Dirección:</u> {selected.client.data.customer_data.address}</ListGroup.Item>
          <ListGroup.Item><u>Email:</u> {selected.client.data.customer_data.email}</ListGroup.Item>
          <ListGroup.Item><u>Teléfono:</u> {selected.client.data.connection_data.connection.phone_mobile}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  )
}

export default ClientDetails