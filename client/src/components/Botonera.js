import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import logo from '../assets/images/favicon.png'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'

const Botonera = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg' style={{ padding: '15px 100px 15px 100px'}}>
      <Container fluid>
        <div style={{ marginLeft: '30px'}}>
          <Navbar.Brand href="/">
            <img alt="quota" src={logo} width="30" height="30" className="d-inline-block align-top" style={{ marginRight: '15px' }} />
            Quota
          </Navbar.Brand>
        </div>
        <div style={{ marginRight: '30px'}}>
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Link to="/clientes" style={{ color: 'lightgray', textDecoration: 'none', marginRight: '8px' }}>Clientes</Link>
              <Link href="/" onClick={logout} style={{ color: 'lightgray', textDecoration: 'none', marginRight: '8px' }}>Logout</Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  )
}

export default Botonera