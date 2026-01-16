import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2, LuPencil } from 'react-icons/lu'

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete, onEdit }) => {

    const getAmountStyles = () =>
        type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"

    return (
        <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-white/5 transition-colors'>
            <div className='w-12 h-12 flex items-center justify-center text-2xl text-white bg-white/5 rounded-full border border-white/5'>
                {icon ? (
                    <span className='w-6 h-6 flex items-center justify-center'>{icon}</span>
                ) : (
                    <LuUtensils className='text-slate-400' />
                )}
            </div>

            <div className='flex-1 flex items-center justify-between'>
                <div>
                    <p className='text-sm text-slate-200 font-semibold'>{title}</p>
                    <p className='text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5'>{date}</p>
                </div>
            </div>

            <div className='flex items-center gap-3'>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${getAmountStyles()}`}>
                    <h6 className='text-xs font-bold'>
                        {type === "income" ? "+" : "-"} ${amount}
                    </h6>
                    {type === "income" ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
                </div>

                {!hideDeleteBtn && (
                    <div className='flex items-center gap-1'>
                        <button className='p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer'
                            onClick={onEdit}>
                            <LuPencil size={16} />
                        </button>
                        <button className='p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer'
                            onClick={onDelete}>
                            <LuTrash2 size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TransactionInfoCard