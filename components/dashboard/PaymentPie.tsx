'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { PaymentMethod } from '@/types'

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-700 border border-dark-500 rounded-lg px-3 py-2">
        <p className="text-xs text-gray-400">{payload[0].name}</p>
        <p className="text-sm font-bold text-white">{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

export function PaymentPieChart({ data }: { data: PaymentMethod[] }) {
  return (
    <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
      <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-2">Método de Pagamento</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={78}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => <span className="text-xs text-gray-400">{value}</span>}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
