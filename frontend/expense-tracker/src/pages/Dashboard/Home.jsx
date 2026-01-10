import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/ useUserAuth'

const Home = () => {
    useUserAuth()
  return (
    <DashboardLayout activeMenu="dashboard">
      <div className='my-5 max-auto'></div>
    </DashboardLayout>
  )
}

export default Home