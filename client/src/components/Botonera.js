import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const Botonera = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg' style={{ padding: '15px 100px 15px 100px'}}>
      <Container fluid>
        <div style={{ marginLeft: '30px'}}>
          <Navbar.Brand href="/">Quota</Navbar.Brand>
        </div>
        <div style={{ marginRight: '30px'}}>
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/clientes">Clientes</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  )
}

export default Botonera