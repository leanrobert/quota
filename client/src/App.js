import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import { initializeClients } from './reducers/clientsReducer'
import { getUser } from './reducers/loginReducer'

import ClientDetails from './pages/ClientDetails'
import HistoricDashboard from './pages/HistoricDashboard'
import WelcomePage from './pages/WelcomePage'
import Login from './pages/Login'

import Botonera from './components/Botonera'

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
          <Route path='/customers' element={<ClientDetails />} />
          <Route path='/' element={<WelcomePage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
