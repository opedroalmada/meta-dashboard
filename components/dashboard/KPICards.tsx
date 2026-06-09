'use client'

import { KPIData } from '@/types'

function fmt(n: number, prefix = 'R$ ', decimals = 2) {
  return prefix + n.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

interface CardProps {
  label: string
  value: string
  sub?: string
  subLabel?: string
  highlight?: boolean
}

function Card({ label, value, sub, subLabel, highlight }: CardProps) {
  return (
    <div className={`rounded-xl p-4 flex flex-col gap-1 border ${highlight ? 'bg-brand-orange/10 border-brand-orange/40' : 'bg-dark-800 border-dark-600'}`}>
      <p className="text-xs text-gray-400 uppercase tracking-widest">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-brand-orange' : 'text-white'}`}>{value}</p>
      {sub && (
        <p className="text-xs text-gray-500">
          {subLabel && <span className="text-gray-400">{subLabel}: </span>}
          {sub}
        </p>
      )}
    </div>
  )
}

export function KPICards({ data }: { data: KPIData }) {
  const ticket = 297
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      <Card
        label="Investimento"
        value={fmt(data.investimento)}
      />
      <Card
        label="Custo por Venda"
        value={fmt(data.custoVendaBanco)}
        sub={fmt(data.custoVendaMeta)}
        subLabel="Meta"
      />
      <Card
        label="Vendas (Banco)"
        value={String(data.vendasBanco)}
        sub={fmt(data.vendasBanco * ticket)}
        subLabel="Receita"
      />
      <Card
        label="Lucro"
        value={fmt(data.lucro)}
        highlight
      />
      <Card
        label="ROAS"
        value={data.roas.toFixed(2) + 'x'}
        sub={data.roas >= 2 ? 'Saudável' : 'Atenção'}
      />
      <Card
        label="Ticket Médio"
        value={fmt(ticket)}
        sub={`${data.vendasBanco} vendas`}
      />
    </div>
  )
}
