import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex gap-6 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl shadow-2xl shadow-black/20 border border-white/10'>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl shrink-0`}>
        {icon}
      </div>
      <div>
        <h6 className='text-sm text-slate-400 mb-1 font-medium'>{label}</h6>
        <span className='text-[22px] font-bold text-white'>${value}</span>
      </div>
    </div>
  )
}

export default InfoCard