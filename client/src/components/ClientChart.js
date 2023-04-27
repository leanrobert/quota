import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFirstAndLastDay } from '../services/dateHelper'
import Layout from './Layout'

const ClientChart = () => {
  const selected = useSelector(({ selected }) => selected)

  const time = getFirstAndLastDay(new Date())

  if (selected === null || selected.client.error) {
    return (
      <Layout className='py-8 flex justify-center text-center'>
        <div className='rounded-full bg-gray-200 border border-solid border-gray-800 py-2 w-1/2'>
          <p className='font-semibold'>
            No hay cliente seleccionado o información del mismo
          </p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout className='pt-2 flex text-center'>
      <div className='w-full flex flex-col items-center justify-evenly gap-8 lg:flex-row'>
        <div className='w-full border rounded-lg'>
          <div className='rounded-t-lg bg-sky-200 py-1'>
            <h2><b>{selected.client.data.customer_data.code}</b> - {selected.client.data.customer_data.name} {selected.client.data.customer_data.lastname}</h2>
          </div>
          <div className='p-1'>
            <div>
              <div><u>Nodo:</u> {selected.client.data.connection_data.connection.node}</div>
              <div><u>Ip:</u> {selected.client.data.connection_data.connection.ip}</div>
              <div><u>Plan:</u> {selected.client.data.connection_data.connection.plan}</div>
              <div><u>Estado:</u><b> {selected.client.data.account_data.a_status}</b></div>
              <div className='m-2'>
                <button
                  className='rounded-full bg-lime-600 text-white py-2 px-3 mr-2 hover:bg-lime-500'
                  target='_blank'
                  href={`https://gestion.westnet.com.ar/index.php?r=sale%2Fcustomer%2Fview&id=${selected.client.data.customer_data.idcustomer}`}
                >
                  Gestion
                </button>
                <Link to='/clientes' className=''>
                  <button className='rounded-full bg-sky-600 text-white py-2 px-3 mr-2 hover:bg-sky-500'>Detalles</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full border rounded-lg'>
          <div className='rounded-t-lg bg-sky-200 py-1'>
            <h2>Quota del Mes</h2>
          </div>
          <div className='py-1'>
            <iframe
              src={`http://172.16.17.254/d-solo/nLVnJh24k/dashboard-clientes?orgId=1&var-cliente=${selected.nombre.trim().split(' ').join('+')}&from=${Date.parse(time.firstDayOfMonth)}&to=${Date.parse(time.lastDayOfMonth)}&kiosk=&panelId=18`}
              width='100%'
              height='100%'
              title={selected.nombre}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ClientChart
