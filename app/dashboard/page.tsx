import { KPICards } from '@/components/dashboard/KPICards'
import { FunnelChart } from '@/components/dashboard/FunnelChart'
import { SalesByHourChart } from '@/components/dashboard/SalesByHour'
import { PaymentPieChart } from '@/components/dashboard/PaymentPie'
import { CampaignManager } from '@/components/dashboard/CampaignManager'
import {
  mockKPIs,
  mockFunnel,
  mockSalesByHour,
  mockPaymentMethods,
  mockCampaigns,
} from '@/lib/mockData'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const investimento = mockKPIs.investimento
  const receita = mockKPIs.vendasBanco * 297
  const roas = receita / investimento

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Header */}
      <header className="border-b border-dark-700 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight">Meta Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Dados mock · Hoje · {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-yellow-400 border border-yellow-400/30 bg-yellow-400/10 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Mock Data
          </span>
        </div>
      </header>

      <main className="px-6 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* KPIs */}
        <KPICards data={mockKPIs} />

        {/* Funnel */}
        <FunnelChart steps={mockFunnel} />

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <SalesByHourChart data={mockSalesByHour} />
          </div>
          <div>
            <PaymentPieChart data={mockPaymentMethods} />
          </div>
        </div>

        {/* Campaign Manager */}
        <CampaignManager campaigns={mockCampaigns} />
      </main>
    </div>
  )
}
