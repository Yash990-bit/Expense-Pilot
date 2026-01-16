import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex gap-6 bg-white/[0.03] backdrop-blur-3xl p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all duration-500 group'>
      <div className={`w-16 h-16 flex items-center justify-center text-3xl text-white ${color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <div className='flex flex-col justify-center'>
        <h6 className='text-xs text-slate-500 mb-1 font-bold uppercase tracking-widest'>{label}</h6>
        <span className='text-3xl font-bold text-white tracking-tight'>${value}</span>
      </div>
    </div>
  )
}

export default InfoCard