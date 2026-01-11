import React from 'react'

const CustomLegend = ({paylaod}) => {
  return (
    <div className='flex flex-wrap justify-center gap-2 mt-4 space-x-6'>
        {paylaod.map((entry,index)=>{
            <div key={`legend-${index}`} className='flex items-center space-x-2'>
                <div className=''
                    style={{backgroundColor: entry.color}}
                ></div>
                <span className=''>
                    {entry.value}
                </span>
            </div>
        })}
    </div>
  )
}

export default CustomLegend