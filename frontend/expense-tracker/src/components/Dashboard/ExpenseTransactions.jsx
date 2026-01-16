import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className='card bg-white/[0.02] border-white/5'>
            <div className='flex items-center justify-between mb-2'>
                <h5 className='text-sm font-bold uppercase tracking-[0.2em] text-slate-500'>Expenses</h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MM YYYY")}
                        amount={expense.amount}
                        type='expense'
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseTransactions