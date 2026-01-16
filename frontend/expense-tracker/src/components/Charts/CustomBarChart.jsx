import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import CustomTooltip from './CustomTooltip'

const CustomBarChart = ({ data }) => {

    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb"
    }



    return (
        <div className='mt-6'>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />

                    <XAxis
                        dataKey="category"
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />

                    <Bar
                        dataKey="amount"
                        fill="#FF8042"
                        radius={[10, 10, 0, 0]}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                        ))}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}

export default CustomBarChart