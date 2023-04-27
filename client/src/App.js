import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Botonera from './components/Botonera'
import ClientDetails from './components/ClientDetails'
import HistoricDashboard from './components/HistoricDashboard'
import WelcomePage from './components/WelcomePage'
import Login from './components/Login'
import { initializeClients } from './reducers/clientsReducer'
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

  if (!user || !user.token) {
    return (
      <Login />
    )
  }

  return (
    <div>
      <Botonera />
      <div>
        <Routes>
          <Route path='/dashboards' element={<HistoricDashboard />} />
          <Route path='/clientes' element={<ClientDetails />} />
          <Route path='/' element={<WelcomePage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
