import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'

function Expense() {
    const [expenseData, setExpenseData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchExpenseData = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
            if (response.data) {
                setExpenseData(response.data)
            }
        } catch (error) {
            console.log("Something went wrong. Please try again:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchExpenseData()
    }, [])

    return (
        <DashboardLayout activeMenu="Expense">
            <div className='my-5 mx-auto'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <ExpenseTransactions
                        transactions={expenseData}
                        onSeeMore={() => { }}
                    />

                    <Last30DaysExpenses
                        data={expenseData}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Expense
