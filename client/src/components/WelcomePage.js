import React from 'react'
import Layout from './Layout'
import MainBarChart from './MainBarChart'
import ClientChart from './ClientChart'

const WelcomePage = () => {
  return (
    <Layout className='py-4'>
      <MainBarChart />
      <ClientChart />
    </Layout>
  )
}

export default WelcomePage
