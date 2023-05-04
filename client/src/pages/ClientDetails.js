import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'

import 'react-datepicker/dist/react-datepicker.css'

import { setSelectedClient } from '../reducers/selectedReducer'

import Layout from '../components/Layout'

const ClientDetails = () => {
  const dispatch = useDispatch()
  const selected = useSelector(({ selected }) => selected)

  const [endDate, setEndDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date(new Date() - (24 * 60 * 60 * 1000)))
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
    <Layout className='py-4'>
      <form className='flex items-center justify-end mb-4' onSubmit={handleSearch}>
        <label htmlFor='simple-search' className='sr-only'>Search</label>
        <div className='relative w-1/4 min-w-[120px]'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg aria-hidden='true' className='w-5 h-5 text-gray-500' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd' /></svg>
          </div>
          <input type='text' id='simple-search' className='bg-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5' placeholder='Cliente' value={client} onChange={e => setClient(e.target.value)} />
        </div>
        <button className='p-2.5 ml-2 text-sm font-medium rounded-full bg-sky-500 text-white hover:bg-sky-400 border border-sky-900 focus:ring-4 focus:outline-none focus:ring-blue-300' type='submit'>
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /></svg>
          <span className='sr-only'>Search</span>
        </button>
      </form>

      {selected
        ? (
            selected.client.ges.error !== 'true'
              ? (
                <>
                  <div className='flex justify-between items-end'>
                    <div>
                      <h2 className='font-bold text-medium text-center md:text-left md:text-xl lg:text-2xl'>
                        {selected.client.ges.data.customer_data.code} - {selected.client.ges.data.customer_data.name} {selected.client.ges.data.customer_data.lastname}
                      </h2>
                    </div>
                    <div className='flex flex-col gap-y-2 items-center text-center md:flex-row'>
                      <div className='xl:w-56'>
                        <p className='text-sm lg:text-base'>Seleccionar Fechas</p>
                      </div>
                      <DatePicker
                        selected={startDate}
                        onChange={handleDates}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        showDisabledMonthNavigation
                        className='bg-gray-700 rounded-full px-3 py-2 text-white w-48 text-sm lg:text-base lg:w-56'
                      />
                    </div>
                  </div>

                  <div className='w-full h-auto my-4 flex flex-col gap-4 lg:flex-row'>
                    <div className='w-full h-auto my-4 border rounded-lg'>
                      <div className='bg-sky-200 py-2 rounded-t-md w-full mb-3 px-4'>
                        <h2>Quota de cliente en tiempo filtrado</h2>
                      </div>
                      <div className='flex items-center justify-center'>
                        <iframe
                          src={`http://172.16.17.254/d-solo/nLVnJh24k/dashboard-clientes?orgId=1&var-cliente=${selected.nombre.trim().split(' ').join('+')}&from=${Date.parse(startDate)}&to=${Date.parse(endDate)}&panelId=22`}
                          width='450'
                          height='200'
                          title='Client quota'
                        />
                      </div>
                    </div>

                    <div className='w-full h-auto my-4 border rounded-lg'>
                      <div className='bg-sky-200 py-2 rounded-t-md w-full px-4'>
                        <h2>Detalles de la conexión</h2>
                      </div>
                      <div className='flex flex-col items-start justify-between'>
                        <div className='border w-full p-2 px-4'><u>Ip:</u> {selected.client.ges.data.connection_data.connection.ip}</div>
                        <div className='border w-full p-2 px-4 bg-sky-100'><u>Nodo:</u> {selected.client.ges.data.connection_data.connection.node}</div>
                        <div className='border w-full p-2 px-4'><u>Plan:</u> {selected.client.ges.data.connection_data.connection.plan}</div>
                      </div>
                    </div>

                    <div className='w-full h-auto my-4 border rounded-lg'>
                      <div className='bg-sky-200 py-2 rounded-t-md w-full px-4'>
                        <h2>Detalles del cliente</h2>
                      </div>
                      <div className='flex flex-col items-start justify-between'>
                        <div className='border w-full p-2 px-4'><u>Dirección:</u> {selected.client.ges.data.customer_data.address}</div>
                        <div className='border w-full p-2 px-4 bg-sky-100'><u>Email:</u> {selected.client.ges.data.customer_data.email}</div>
                        <div className='border w-full p-2 px-4'><u>Teléfono:</u> {selected.client.ges.data.connection_data.connection.phone_mobile}</div>
                      </div>
                    </div>
                  </div>

                  <div className='w-full h-auto my-4 border rounded-lg'>
                    <div className='bg-sky-200 py-2 rounded-t-md w-full mb-3 px-4'>
                      <h2>Consumo en tiempo filtrado</h2>
                    </div>
                    <div>
                      <iframe
                        src={`http://172.16.17.254/d-solo/nLVnJh24k/dashboard-clientes?from=${Date.parse(startDate)}&to=${Date.parse(endDate)}&var-cliente=${selected.nombre.trim().split(' ').join('+')}&orgId=1&panelId=2`}
                        width='100%'
                        height='400px'
                        title='Client consumption'
                      />
                    </div>
                  </div>

                </>
                )
              : (
                <>
                  <div className='py-8 flex justify-center text-center'>
                    <div className='rounded-full bg-gray-200 border border-solid border-gray-800 py-2 px-3 w-1/2'>
                      <p className='text-sm font-semibold md:text-base'>
                        El Client no ha sido encontrado, filtrar por numero de cliente
                        <Link to='/' className='ml-2 text-sky-500 hover:text-sky-400'>
                          <button type='button'>Go Back</button>
                        </Link>
                      </p>
                    </div>

                  </div>
                </>
                )
          )
        : (
          <div className='py-8 flex justify-center text-center'>
            <div className='rounded-full bg-gray-200 border border-solid border-gray-800 py-2 px-3 w-1/2'>
              <p className='text-sm font-semibold md:text-base'>
                No hay cliente seleccionado o información del mismo
              </p>
            </div>
          </div>
          )}
    </Layout>
  )
}

export default ClientDetails
