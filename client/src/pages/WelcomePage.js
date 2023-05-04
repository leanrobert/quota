import React from 'react'

import Layout from '../components/Layout'
import MainBarChart from '../components/MainBarChart'
import ClientChart from '../components/ClientChart'

const WelcomePage = () => {
  return (
    <Layout className='py-4'>
      <MainBarChart />
      <ClientChart />
    </Layout>
  )
}

export default WelcomePage
