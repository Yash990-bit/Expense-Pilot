import React from 'react'

function Income() {
    return (
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'>
                <div className='grid gird-cols-1 gap-6'>
                    <div className=''>
                        <IncomeOverview
                        transactions={incomeData}
                        onAddIncome={()=>setOpenAddIncomeModal(true)}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Income
