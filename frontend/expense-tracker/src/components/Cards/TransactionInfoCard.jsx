import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2, LuPencil } from 'react-icons/lu'

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete, onEdit }) => {

    const getAmountStyles = () =>
        type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"

    return (
        <div className='group relative flex items-center gap-5 mt-2 p-4 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all duration-300'>
            <div className='w-12 h-12 flex items-center justify-center text-xl text-white bg-white/[0.05] rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors'>
                {icon ? (
                    <span className='w-6 h-6 flex items-center justify-center'>{icon}</span>
                ) : (
                    <LuUtensils className='text-slate-400' />
                )}
            </div>

            <div className='flex-1 flex items-center justify-between'>
                <div className='flex flex-col'>
                    <p className='text-[13px] text-white font-medium'>{title}</p>
                    <p className='text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1'>{date}</p>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${getAmountStyles()}`}>
                    <h6 className='text-xs font-bold tracking-tight'>
                        {type === "income" ? "+" : "-"} ${amount}
                    </h6>
                    {type === "income" ? <LuTrendingUp size={12} /> : <LuTrendingDown size={12} />}
                </div>

                {!hideDeleteBtn && (
                    <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <button className='p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer'
                            onClick={onEdit}>
                            <LuPencil size={14} />
                        </button>
                        <button className='p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer'
                            onClick={onDelete}>
                            <LuTrash2 size={14} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TransactionInfoCard