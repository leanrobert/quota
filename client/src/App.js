import React, { useEffect } from 'react'
import Botonera from './components/Botonera'
import MainBarChart from './components/MainBarChart'
import { useDispatch, useSelector } from 'react-redux'
import { initializeClients } from './reducers/clientsReducer'
import ClientChart from './components/ClientChart'
import ClientDetails from './components/ClientDetails'
import Container from 'react-bootstrap/Container'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import { getUser } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(initializeClients())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  if(!user || !user.token) {
    return (
      <Login />
    )
  }

  return (
    <Container fluid style={{ padding: 0 }}>
      <Botonera />
      <Container fluid style={{ padding: '0 50px 0 50px' }}>
        <Routes>
          <Route path='/clientes' element={<ClientDetails />} />
          <Route path="/" element={<div><MainBarChart  /><ClientChart /></div>} />
          <Route path="*" element={<Navigate to="/" />}  />
        </Routes>
      </Container>
    </Container>
  )
}

export default App