import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import "react-datepicker/dist/react-datepicker.css";
import { setSelectedClient } from '../reducers/selectedReducer'

const ClientDetails = () => {
  const dispatch = useDispatch()
  const selected = useSelector(({ selected }) => selected)

  const [startDate, setStartDate] = useState(new Date() - (60 * 60 * 24 * 1000))
  const [endDate, setEndDate] = useState(new Date())
  const [client, setClient] = useState('')

  const handleDates = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const handleSearch = e => {
    e.preventDefault()
    dispatch(setSelectedClient(client))
    setClient('')
  }

  return (
    <Container style={{ padding: 0 }}>
      <Form style={{ marginBottom: '30px', backgroundColor: 'lightg', padding: '15px', display: 'flex', gap: 20 }} onSubmit={handleSearch}>
        <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 13, gap: 20 }}>
          <Form.Label style={{ marginBottom: 0 }} >Buscar Cliente</Form.Label>
          <Form.Control style={{ flex: 9 }} type='text' placeholder='Cliente' value={client} onChange={e => setClient(e.target.value)} />
        </Form.Group>
        <Button style={{ flex: 1 }} type='submit'>Buscar</Button>
      </Form>
      { selected ? (
        selected.client.error !== "true" ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2>{selected.client.data.customer_data.code} - {selected.client.data.customer_data.name} {selected.client.data.customer_data.lastname}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center'}}>
                <div style={{ width: '200px' }}>Seleccionar Fechas</div>
                <DatePicker
                  selected={startDate}
                  onChange={handleDates}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  showDisabledMonthNavigation
                  a
                />
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
          </>
        ) : (
          <Container>
            El Client no ha sido encontrado, filtrar por numero de cliente
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button style={{ display: 'block', marginTop: '10px' }} variant='secondary'>Go Back</Button>
            </Link>
          </Container>
        )
      ) : (
        <Container>
          No hay ningun cliente Seleccionado
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button style={{ display: 'block', marginTop: '10px' }} variant='secondary'>Go Back</Button>
          </Link>
        </Container>
      )}
    </Container>
  )
}

export default ClientDetails