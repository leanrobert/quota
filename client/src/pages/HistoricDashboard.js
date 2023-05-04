import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'

import { initializeMonths } from '../reducers/monthReducer'
import { filterDashboard } from '../reducers/clientsReducer'

import OLTFilterButton from '../components/OLTFilterButton'
import Layout from '../components/Layout'

const HistoricDashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeMonths())
  }, [dispatch])

  const months = useSelector(({ months }) => months)

  const clients = useSelector(({ clients }) => clients)

  const yearlyData = {
    series: [
      {
        name: 'Consumo total',
        data: months.map(map => Math.round(map.download / 1024 / 1024 / 1024))
      }
    ],
    options: {
      chart: {
        id: 'basic-bar',
        events: {
          dataPointSelection: (event, chartContext, config) => {
            dispatch(filterDashboard(1, chartContext.w.config.xaxis.categories[config.dataPointIndex]))
          }
        },
        stacked: true
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        labels: {
          rotate: -90
        }
      },
      stroke: {
        curve: 'smooth'
      }
    }
  }

  const monthyData = {
    series: [
      {
        name: 'Consumo total',
        data: clients.map(client => Math.round(client.consumo / 1024 / 1024 / 1024)).slice(0, 30)
      }
    ],
    options: {
      chart: {
        id: 'basic-bar',
        stacked: true
      },
      xaxis: {
        categories: clients.map(c => c.cliente),
        labels: {
          rotate: -90
        }
      },
      stroke: {
        curve: 'smooth'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeItensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9
        }
      }
    }
  }

  return (
    <Layout className='py-4'>
      <h2 style={{ paddingTop: '50px' }}>Consumo anual por mes</h2>
      <Chart
        type='bar'
        height={250}
        width='100%'
        series={yearlyData.series}
        options={yearlyData.options}
        className='z-0'
      />
      <h3 style={{ paddingTop: '50px' }}>Consumo mensual por cliente</h3>
      <OLTFilterButton />
      <Chart
        style={{ flex: 8 }}
        type='area'
        height={350}
        width='100%'
        series={monthyData.series}
        options={monthyData.options}
        className='z-0'
      />
    </Layout>
  )
}

export default HistoricDashboard
