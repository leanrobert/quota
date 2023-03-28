import React from 'react'
import { useDispatch } from 'react-redux'
import { selectNode } from '../reducers/clientsReducer'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'

const olts = [
  { olt: "Decimo", id: 22969 },
  { olt: "Aromos", id: 22975 },
  { olt: "Hudson", id: 12829 },
  { olt: "Ugarteche", id: 12830 },
  { olt: "Walmart", id: 22970 },
  { olt: "Grutas", id: 22974 },
  { olt: "Flavimari", id: 17437 },
  { olt: "Castrol", id: 22973 },
  { olt: "Beltran", id: 22972 },
  { olt: "Cano", id: 22971 },
]

const Botonera = () => {
  const dispatch = useDispatch()

  const handleClick = (id) => {
    dispatch(selectNode(id))
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg' style={{ marginBottom: '15px'}}>
      <Container fluid>
        <Navbar.Brand href="/">Quota</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Offcanvas id='navbar-nav' placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>Quota</Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3' defaultActiveKey={olts[0].id}>
              {olts.map(olt => (
                <Nav.Item key={olt.id}>
                  <Nav.Link
                    eventKey={olt.id}
                    onClick={() => handleClick(olt.id)}
                  >
                    {olt.olt}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Botonera