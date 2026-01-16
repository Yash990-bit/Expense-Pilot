import React, { useState, useEffect } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30DaysExpenses = ({ data }) => {

  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareExpenseBarChartData(data)
    setChartData(result)

    return () => { }
  }, [data])
  return (
    <div className='card bg-white/[0.02] border-white/5 md:col-span-2'>
      <div className='flex items-center justify-between mb-2'>
        <h5 className='text-sm font-bold uppercase tracking-[0.2em] text-slate-500'>Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  )
}

export default Last30DaysExpenses