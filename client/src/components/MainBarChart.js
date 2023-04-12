import React from 'react'
import Chart from 'react-apexcharts'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedClient } from '../reducers/selectedReducer';
import { selectNode } from '../reducers/clientsReducer';

const olts = [
  { olt: "Decimo", id: 22969 },
  { olt: "Aromos", id: 22975 },
  { olt: "Hudson", id: 12829 },
  { olt: "Ugarteche", id: 12830 },
  { olt: "Walmart", id: 22970 },
  { olt: "Grutas", id: 22974 },
  { olt: "Flavimari", id: 17437 },
  { olt: "Castrol", id: 22973 },
  { olt: "Beltran", id: 22972 },
  { olt: "Cano", id: 22971 },
]

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
            const cliente = chartContext.legend.legendHelpers.w.config.xaxis.categories[arrayID]
            dispatch(setSelectedClient(cliente))
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

  const handleClick = (id) => {
    dispatch(selectNode(id))
  }

  return (
    <Container fluid>
      <Navbar>
        <Nav className='justify-content-end flex-grow-1 pe-3' defaultActiveKey={olts[0].id}>
          {olts.map(olt => (
            <Nav.Item key={olt.id}>
              <Nav.Link eventKey={olt.id} onClick={() => handleClick(olt.id)}>
                {olt.olt}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Navbar>
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