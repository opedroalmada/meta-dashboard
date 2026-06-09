'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { SalesByHour as SalesByHourType } from '@/types'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-700 border border-dark-500 rounded-lg px-3 py-2">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-bold text-white">{payload[0].value} vendas</p>
      </div>
    )
  }
  return null
}

export function SalesByHourChart({ data }: { data: SalesByHourType[] }) {
  const max = Math.max(...data.map((d) => d.vendas))

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
      <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-4">Vendas por Horário</h2>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barSize={14} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
          <XAxis
            dataKey="hora"
            tick={{ fill: '#6b7280', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={2}
          />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,107,0,0.05)' }} />
          <Bar dataKey="vendas" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.hora}
                fill={entry.vendas === max ? '#FF6B00' : 'rgba(255,107,0,0.35)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
