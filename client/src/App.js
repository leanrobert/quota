import React, { useEffect } from 'react'
import Botonera from './components/Botonera'
import MainBarChart from './components/MainBarChart'
import { useDispatch } from 'react-redux'
import { initializeClients } from './reducers/clientsReducer'
import ClientChart from './components/ClientChart'
import ClientDetails from './components/ClientDetails'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeClients())
  }, [dispatch])

  return (
    <Container>
      <Botonera />
      <Routes>
        <Route path='/clientes' element={<ClientDetails />} />
        <Route path="/" element={<div><MainBarChart  /><ClientChart /></div>} />
      </Routes>
    </Container>
  )
}

export default App