export interface KPIData {
  investimento: number
  custoVendaMeta: number
  custoVendaBanco: number
  vendasBanco: number
  lucro: number
  roas: number
}

export interface FunnelStep {
  label: string
  value: number
  delta?: number
  money?: string
}

export interface SalesByHour {
  hora: string
  vendas: number
}

export interface PaymentMethod {
  name: string
  value: number
  color: string
}

export interface Ad {
  id: string
  name: string
  status: 'ACTIVE' | 'PAUSED'
  instagramPostUrl?: string
  metrics: AdMetrics
}

export interface AdSet {
  id: string
  name: string
  status: 'ACTIVE' | 'PAUSED'
  budget: number
  budgetType: 'daily' | 'lifetime'
  ads: Ad[]
  metrics: AdMetrics
}

export interface Campaign {
  id: string
  name: string
  status: 'ACTIVE' | 'PAUSED'
  budget?: number
  budgetType: 'CBO' | 'ABO'
  adSets: AdSet[]
  metrics: AdMetrics
}

export interface AdMetrics {
  cpm: number
  impressoes: number
  cliques: number
  alcance: number
  vendasMeta: number
  vendasBanco: number
  custoVenda: number
  lucro: number
  roas: number
  investimento: number
}

export interface Sale {
  id: string
  valor: number
  campanha_id: string
  conjunto_id: string
  anuncio_id: string
  created_at: string
}
