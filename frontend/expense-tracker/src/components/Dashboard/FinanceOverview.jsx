import React from 'react'
import CustomPieChart from "../Charts/CustomPieChart"

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"]


const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome }
  ]
  return (
    <div className='card bg-white/[0.02] border-white/5 md:col-span-2'>
      <div className='flex items-center justify-between mb-2'>
        <h5 className='text-sm font-bold uppercase tracking-[0.2em] text-slate-500'>Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  )
}

export default FinanceOverview