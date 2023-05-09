import React from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'

import { setSelectedClient } from '../reducers/selectedReducer'

import OLTFilterButton from './OLTFilterButton'

const quotaLimit = 2048

const MainBarChart = () => {
  const dispatch = useDispatch()

  const data = useSelector(({ clients }) => clients)

  const chartData = {
    series: [
      {
        name: 'Consumo Mensual',
        data: data.map(cliente => Math.round(cliente.consumo / 1024 / 1024 / 1024)).slice(0, 30)
      },
      {
        name: 'Quota restante',
        data: data.map(cliente => quotaLimit - Math.round(cliente.consumo / 1024 / 1024 / 1024) > 0 ? quotaLimit - Math.round(cliente.consumo / 1024 / 1024 / 1024) : 0).slice(0, 30)
      }
    ],
    options: {
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      chart: {
        id: 'basic-bar',
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const cliente = chartContext.w.config.xaxis.categories[config.dataPointIndex].match(/\d+/)[0]
            dispatch(setSelectedClient(cliente))
          }
        },
        stacked: true
      },
      xaxis: {
        categories: data.map(cliente => cliente.cliente).slice(0, 30),
        labels: {
          style: {
            fontSize: '9px'
          },
          rotate: -90,
          show: false,
          minHeight: 10,
          maxHeight: 150
        }
      },
      yaxis: {
        lables: {
          show: false
        }
      },
      colors: [
        function ({ value, seriesIndex }) {
          if (seriesIndex === 0) {
            if (value >= quotaLimit) {
              return '#ff0a2f'
            } else if (value >= quotaLimit * 0.75) {
              return '#ff950a'
            } else {
              return '#2450ff'
            }
          }

          return '#d37aff'
        }
      ],
      responsive: [
        {
          breakpoint: 700,
          options: {
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: '9px'
                },
                rotate: -90,
                show: false
              }
            }
          }
        }
      ]
    }
  }

  return (
    <>
      <OLTFilterButton />

      <div>
        <Chart
          type='bar'
          height={500}
          animations={{ enabled: false }}
          series={chartData.series}
          options={chartData.options}
        />
      </div>
    </>
  )
}

export default MainBarChart
