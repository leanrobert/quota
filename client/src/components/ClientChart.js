import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Chart from 'react-apexcharts'

import Layout from './Layout'

const ClientChart = () => {
  const selected = useSelector(({ selected }) => selected)

  if (selected === null || selected.client.ges.error) {
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
            <h2><b>{selected.client.ges.data.customer_data.code}</b> - {selected.client.ges.data.customer_data.name} {selected.client.ges.data.customer_data.lastname}</h2>
          </div>
          <div className='p-1'>
            <div>
              <div><u>Nodo:</u> {selected.client.ges.data.connection_data.connection.node}</div>
              <div><u>Ip:</u> {selected.client.ges.data.connection_data.connection.ip}</div>
              <div><u>Plan:</u> {selected.client.ges.data.connection_data.connection.plan}</div>
              <div><u>Estado:</u><b> {selected.client.ges.data.account_data.a_status}</b></div>
              <div className='m-2'>
                <Link to={`https://gestion.westnet.com.ar/index.php?r=sale%2Fcustomer%2Fview&id=${selected.client.ges.data.customer_data.idcustomer}`} target='_blank'>
                  <button className='rounded-full bg-lime-600 text-white py-2 px-3 mr-2 hover:bg-lime-500'>Gestion</button>
                </Link>
                <Link to='/customers'>
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
          <div className='py-1 flex items-center justify-center'>
            <Chart
              type='radialBar'
              series={[Math.round(selected.client.db.consumo / 1024 / 1024 / 1024) / 51.2]}
              height={208}
              options={{
                plotOptions: {
                  radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    track: {
                      background: '#ccc',
                      startAngle: -135,
                      endAngle: 135
                    },
                    dataLabels: {
                      name: {
                        show: true
                      },
                      value: {
                        fontSize: '12px',
                        show: true,
                        formatter: (val) => {
                          return `${Math.round(val * 51.2 / 1024 * 100) / 100}TB (${Math.round(val)}%)`
                        }
                      }
                    }
                  }
                },
                fill: {
                  colors: [function ({ value, seriesIndex, w }) {
                    if (value < 50) {
                      return '#2450ff'
                    } else if (value >= 50 && value < 80) {
                      return '#ff950a'
                    } else {
                      return '#ff0a2f'
                    }
                  }]
                },
                labels: ['Download']
              }}
              width={208}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ClientChart
