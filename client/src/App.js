import React, { useEffect, useState } from 'react'
import Botonera from './components/Botonera'
import MainBarChart from './components/MainBarChart'
import { useDispatch, useSelector } from 'react-redux'
import { initializeClients } from './reducers/clientsReducer'
import ClientChart from './components/ClientChart'
import ClientDetails from './components/ClientDetails'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import { messageTelegram } from './services/telegramMessage'

const App = () => {
  const dispatch = useDispatch()
  const [timerId, setTimerId] = useState(null)
  const data = useSelector(({ clients }) => clients)

  useEffect(() => {
    dispatch(initializeClients())
  }, [dispatch])

  const myFunction = () => {
    const clients = data.filter(client => client.consumo / 1024 / 1024 / 1024 > 100)
    messageTelegram(clients);
  }

  useEffect(() => {
    const now = new Date()
    const desiredTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 30, 0); //8:30am
    const timeUntilDesiredTime = desiredTime.getTime() - now.getTime()

    if(data) {
      if (timeUntilDesiredTime > 0) {
        const timer = setTimeout(() => {
          myFunction()
          const recurringTimer = setInterval(() => {
            myFunction()
          }, 20 * 60 * 60 * 1000) //Every 24hours
          setTimerId(recurringTimer)
        }, timeUntilDesiredTime)
        setTimerId(timer)
      } else {
        myFunction()
        const recurringTimer = setInterval(() => {
          myFunction()
        }, 20 * 60 * 60 * 1000)
        setTimerId(recurringTimer)
      }
    }

    return () => {
      clearInterval(timerId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Container fluid style={{ padding: 0 }}>
      <Botonera />
      <Container fluid style={{ padding: '0 50px 0 50px' }}>
        <Routes>
          <Route path='/clientes' element={<ClientDetails />} />
          <Route path="/" element={<div><MainBarChart  /><ClientChart /></div>} />
        </Routes>
      </Container>
    </Container>
  )
}

export default App