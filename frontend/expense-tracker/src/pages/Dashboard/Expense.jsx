import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import { useUserAuth } from '../../hooks/useUserAuth'
import toast from 'react-hot-toast'

function Expense() {

    useUserAuth()
    const [expenseData, setExpenseData] = useState([])
    const [loading, setLoading] = useState(false)
    const[openDeleteAlert,setOpenDeleteAlert]=useState({
        show:false,
        data:null
    })

    const[openAddExpenseModal,setOpenAddExpenseModal]=useState(false)



    const fetchExpenseDetials = async () => {
        if (loading) return
        setLoading(true)
        try {
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)
            if (response.data) {
                setExpenseData(response.data)
            }
        } catch (error) {
            console.log("Something went wrong. Please try again:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddExpense = async (expense) => {
        const {category, amount, date, icon } = expense

        if (!category.trim()) {
            toast.error('Category is required')
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be valid and greater then 0")
        }

        if (!date) {
            toast.error("Date is required")
        }

        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon
            })

            setOpenAddExpenseModal(false)
            toast.success("Expense added successfully")
            fetchExpenseDetails()
        } catch (error) {
            console.error("Error adding expense:",
                error.response?.data?.message || error.message
            )

        }
    };

    useEffect(()=>{
        fetchExpenseDetails()
    return ()=>{}
    })
    

    return (
        <DashboardLayout activeMenu="Expense">
            <div className='my-5 mx-auto'>
                <div className="grid grid-cols-1 gap-6">
                    <div className=''>
                    <ExpenseOverview
                        transactions={expenseData}
                        onExpenseIncome={()=>setOpenAddExpenseModal(true)}
                    />

                    <Last30DaysExpenses
                        data={expenseData}
                    />
                </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Expense
