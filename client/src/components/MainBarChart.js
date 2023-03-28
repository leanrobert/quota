import React from 'react'
import Chart from 'react-apexcharts'
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedClient } from '../reducers/selectedReducer';

const MainBarChart = () => {
  const dispatch = useDispatch()

  const data = useSelector(({ clients }) => clients)

  const chartData = {
    series: [
      {
        name: "consumo",
        data: data.map(cliente => Math.round(cliente.consumo / 1024 / 1024)).slice(0, 30)
      }
    ],
    options: {
      chart: {
        id: "basic-bar",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const arrayID = config.selectedDataPoints[0][0]
            const consumo = config.w.config.series[0].data[arrayID]
            const cliente = chartContext.legend.legendHelpers.w.config.xaxis.categories[arrayID]
            dispatch(setSelectedClient(cliente, consumo))
          }
        }
      },
      xaxis: {
        categories: data.map(cliente => cliente.cliente),
        labels: {
          style: {
              fontSize: '9px'
          },
          rotate: -90
        }
      },
    },
  };

  return (
    <Container fluid>
      <Chart
        type='bar'
        height={500}
        width='100%'
        animations={{enabled: false}}
        series={chartData.series}
        options={chartData.options}
      />
    </Container>
  )
}

export default MainBarChart