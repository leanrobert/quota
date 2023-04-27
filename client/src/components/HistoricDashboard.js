import React from 'react'
import Chart from 'react-apexcharts'
import Container from 'react-bootstrap/Container'

const data = [
  {
    cliente: ' 87574 - Castellano Joaquin',
    month: '2023-04',
    download: '708516430046.00000000',
    plan: '120MB'
  },
  {
    cliente: ' 127617 - Sociedad Espanola de Socorros Mutuos Mendoza',
    month: '2023-04',
    download: '26398852784.00000000',
    plan: '120MB'
  },
  {
    cliente: ' 148716 - Solis Palacios Luciana Viviana',
    month: '2023-04',
    download: '19178927438.00000000',
    plan: '120MB'
  },
  {
    cliente: ' 143527 - Daszkal Matias Ariel',
    month: '2023-04',
    download: '14416467242.00000000',
    plan: '120MB'
  },
  {
    cliente: ' 84504 - Squef Adrian',
    month: '2023-04',
    download: '13454442861.00000000',
    plan: '120MB'
  },
  {
    cliente: ' 153437 - SA Delta',
    month: '2023-04',
    download: '13053811622.00000000',
    plan: '120MB'
  },
  {
    cliente: ' 131522 - Gonzalez Andres Roberto',
    month: '2023-04',
    download: '12090383727.00000000',
    plan: '120MB'
  },
  {
    cliente: ' 179601 - Cortes Merino Levi Daniel',
    month: '2023-04',
    download: '11942251424.000000000000',
    plan: '120MB'
  },
  {
    cliente: ' 155468 - Dattola Juan Jose',
    month: '2023-04',
    download: '11764139174.00000000',
    plan: '120MB'
  },
  {
    cliente: ' 40946-DIAZ NORA BEATRIZ',
    month: '2023-04',
    download: '11398192549.00000000',
    plan: '50MB'
  },
  {
    cliente: ' 150956 - Malargue Municipalidad de',
    month: '2023-04',
    download: '11128442126.00000000',
    plan: '50MB'
  },
  {
    cliente: ' 143242 - Alonso Susana Del Carmen',
    month: '2023-04',
    download: '10662010513.00000000',
    plan: '50MB'
  },
  {
    cliente: ' 153449 - Ferro German Gustavo',
    month: '2023-04',
    download: '9990933412.000000000000',
    plan: '50MB'
  },
  {
    cliente: ' 135737 - Oronel Maria Cecilia',
    month: '2023-04',
    download: '9348686219.000000000000',
    plan: '20MB'
  },
  {
    cliente: ' 98160 - S.A. SUNSET PORT',
    month: '2023-04',
    download: '8471551353.00000000',
    plan: '20MB'
  },
  {
    cliente: ' 168863 - ROBERTO MAXIMILIANO PEnARANDA',
    month: '2023-04',
    download: '8436904284.000000000000',
    plan: '20MB'
  },
  {
    cliente: ' 131442 - Videla  Gisela Virginia',
    month: '2023-04',
    download: '8311465649.00000000',
    plan: '20MB'
  },
  {
    cliente: ' 78470 - NICOSIA MARIA JOSE LOURDES',
    month: '2023-04',
    download: '8042510963.000000000000',
    plan: '20MB'
  },
  {
    cliente: ' 152416 - Prevision Social Mutual Casa del Maestro y',
    month: '2023-04',
    download: '7624597072.00000000',
    plan: '20MB'
  },
  {
    cliente: ' 178391 - Perez Andrea Veronica',
    month: '2023-04',
    download: '7580770408.000000000000',
    plan: '20MB'
  },
  {
    cliente: ' 188249 - Castro Jorge Bernabe',
    month: '2023-04',
    download: '7515413404.000000000000',
    plan: '20MB'
  },
  {
    cliente: ' 103446 - carlos silvia lorena',
    month: '2023-04',
    download: '7393467879.00000000',
    plan: '20MB'
  },
  {
    cliente: ' (WESTNET) 202559- ANA PAULA SANCHEZ PALMES',
    month: '2023-04',
    download: '7277954566.00000000',
    plan: '20MB'
  },
  {
    cliente: ' 90870 - ruffa jose eduardo',
    month: '2023-04',
    download: '7263043379.000000000000',
    plan: '20MB'
  },
  {
    cliente: ' 135738 - Paz Claudio Fernando',
    month: '2023-04',
    download: '7084214592.00000000',
    plan: '20MB'
  },
  {
    cliente: ' 105733- EMPLEADO  FABIO PACO',
    month: '2023-04',
    download: '6921424298.000000000000',
    plan: '20MB'
  },
  {
    cliente: ' 181812 - S.A. FRANQUICIAS DEL OESTE S.A.',
    month: '2023-04',
    download: '6757839740.00000000',
    plan: '20MB'
  },
  {
    cliente: ' 101364 - Villafane Palma Ignacio Benjamin',
    month: '2023-04',
    download: '6637216560.000000000000',
    plan: '20MB'
  },
  {
    cliente: ' 142023 - Perez  Daniel Fernando',
    month: '2023-04',
    download: '6486584296.00000000',
    plan: '20MB'
  },
  {
    cliente: ' 136465 - Flores Fernanda Celeste',
    month: '2023-04',
    download: '6414926399.000000000000',
    plan: '20MB'
  }
]

const HistoricDashboard = () => {
  const yearlyData = {
    series: [
      {
        name: 'Consumo total',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3]
      }
    ],
    options: {
      chart: {
        id: 'basic-bar',
        events: {
          /* dataPointSelection: (event, chartContext, config) => {
            const cliente = chartContext.w.config.xaxis.categories[config.dataPointIndex]
            dispatch(setSelectedClient(cliente))
          } */
        },
        stacked: true
      },
      xaxis: {
        categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
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
        data: data.map(c => Math.round(c.download / 1024 / 1024 / 1024))
      }
    ],
    options: {
      chart: {
        id: 'basic-bar',
        events: {
          /* dataPointSelection: (event, chartContext, config) => {
            const cliente = chartContext.w.config.xaxis.categories[config.dataPointIndex]
            dispatch(setSelectedClient(cliente))
          } */
        },
        stacked: true
      },
      labels: data.map(c => c.plan),
      xaxis: {
        categories: data.map(c => c.cliente),
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

  const planData = {
    series: [data.filter(c => c.plan === '120MB').length, data.filter(c => c.plan === '50MB').length, data.filter(c => c.plan === '20MB').length],
    options: {
      chart: {
        id: 'basic-bar',
        events: {
          /* dataPointSelection: (event, chartContext, config) => {
            const cliente = chartContext.w.config.xaxis.categories[config.dataPointIndex]
            dispatch(setSelectedClient(cliente))
          } */
        },
        stacked: true
      },
      labels: ['120MB', '50MB', '20MB'],
      xaxis: {
        categories: data.map(c => c.cliente),
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
    <Container>
      <h2 style={{ paddingTop: '50px' }}>Consumo anual por mes</h2>
      <Container fluid>
        <Chart
          type='bar'
          height={250}
          width='100%'
          series={yearlyData.series}
          options={yearlyData.options}
          className='z-0'
        />
      </Container>
      <h3 style={{ paddingTop: '50px' }}>Consumo mensual por cliente</h3>
      <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Chart
          style={{ flex: 8 }}
          type='area'
          height={350}
          width='100%'
          series={monthyData.series}
          options={monthyData.options}
          className='z-0'
        />
        <Chart
          type='pie'
          height={350}
          width='100%'
          series={planData.series}
          options={planData.options}
          className='z-0'
        />
      </Container>
    </Container>
  )
}

export default HistoricDashboard
