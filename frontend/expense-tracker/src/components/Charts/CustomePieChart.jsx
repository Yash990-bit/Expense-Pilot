import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, } from "recharts"

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className='bg-white p-3 shadow-lg rounded-lg border border-gray-100'>
                <p className='text-sm font-medium text-gray-800'>{payload[0].name}</p>
                <p className='text-primary text-lg font-bold'>${payload[0].value}</p>
            </div>
        )
    }
    return null
}

const CustomLegend = ({ payload }) => {
    return (
        <div className='flex flex-wrap justify-center gap-4 mt-4'>
            {payload.map((entry, index) => (
                <div key={`legend-${index}`} className='flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full' style={{ backgroundColor: entry.color }} />
                    <span className='text-xs text-gray-600 font-medium'>{entry.value}</span>
                </div>
            ))}
        </div>
    )
}

const CustomePieChart = ({ data, label, totalAmount, colors, showTextAnchor, }) => {
    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />

                {showTextAnchor && (
                    <>
                        <text
                            x='50%'
                            y='50%'
                            dy={-25}
                            textAnchor='middle'
                            fill='#666'
                            fontSize='14px'
                        >
                            {label}
                        </text>

                        <text
                            x='50%'
                            y='50%'
                            dy={8}
                            textAnchor='middle'
                            fill='#333'
                            fontSize='24px'
                            fontWeight='semi-bold'
                        >
                            {totalAmount}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomePieChart