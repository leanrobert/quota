import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../reducers/loginReducer'
import logo from '../assets/images/favicon.png'

const Login = () => {
  const dispatch = useDispatch()
  const errorMessage = useSelector(({ user }) => user?.errorMessage)
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(logIn(user, pass))
    setPass('')
    setUser('')
  }

  return (
    <Container>
      <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: '100px' }}>
        <img alt="quota" src={logo} width="100" height="100" className="d-inline-block align-top" />
        <h1>Quota</h1>
        {errorMessage && <Alert variant='danger' key='danger'>{errorMessage}</Alert>}
      </Container>

      <Form
        style={{ padding: '20px 400px', display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="formUser">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username" value={user} onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPass" style={{ marginTop: '20px' }}>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder="Enter password" value={pass} onChange={e => setPass(e.target.value)} />
        </Form.Group>
        <Button variant='primary' type='submit' style={{ marginTop: '20px' }}>
          Log In
        </Button>
      </Form>
    </Container>
  )
}

export default Login