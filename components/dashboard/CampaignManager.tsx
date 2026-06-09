'use client'

import { useState } from 'react'
import { Campaign, AdSet, Ad, AdMetrics } from '@/types'
import { ChevronDown, ChevronRight, Pause, Play, ExternalLink, DollarSign } from 'lucide-react'

function fmt(n: number) {
  return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtNum(n: number) {
  return n.toLocaleString('pt-BR')
}

function StatusBadge({ status }: { status: 'ACTIVE' | 'PAUSED' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
        status === 'ACTIVE'
          ? 'bg-green-500/15 text-green-400 border border-green-500/30'
          : 'bg-gray-500/15 text-gray-400 border border-gray-500/30'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'ACTIVE' ? 'bg-green-400' : 'bg-gray-500'}`} />
      {status === 'ACTIVE' ? 'Ativo' : 'Pausado'}
    </span>
  )
}

function MetricsRow({ m, showBudget }: { m: AdMetrics; showBudget?: boolean }) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-9 gap-2 mt-2 pt-2 border-t border-dark-600 text-xs">
      <div>
        <p className="text-gray-500">CPM</p>
        <p className="text-white font-medium">{fmt(m.cpm)}</p>
      </div>
      <div>
        <p className="text-gray-500">Impressões</p>
        <p className="text-white font-medium">{fmtNum(m.impressoes)}</p>
      </div>
      <div>
        <p className="text-gray-500">Cliques</p>
        <p className="text-white font-medium">{fmtNum(m.cliques)}</p>
      </div>
      <div>
        <p className="text-gray-500">Alcance</p>
        <p className="text-white font-medium">{fmtNum(m.alcance)}</p>
      </div>
      <div>
        <p className="text-gray-500">Vendas Meta</p>
        <p className="text-white font-medium">{m.vendasMeta}</p>
      </div>
      <div>
        <p className="text-gray-500">Vendas Banco</p>
        <p className="text-brand-orange font-medium">{m.vendasBanco}</p>
      </div>
      <div>
        <p className="text-gray-500">Custo/Venda</p>
        <p className="text-white font-medium">{fmt(m.custoVenda)}</p>
      </div>
      <div>
        <p className="text-gray-500">Lucro</p>
        <p className={`font-medium ${m.lucro > 0 ? 'text-green-400' : 'text-red-400'}`}>{fmt(m.lucro)}</p>
      </div>
      <div>
        <p className="text-gray-500">ROAS</p>
        <p className={`font-bold ${m.roas >= 2 ? 'text-green-400' : m.roas >= 1 ? 'text-yellow-400' : 'text-red-400'}`}>
          {m.roas.toFixed(2)}x
        </p>
      </div>
    </div>
  )
}

function BudgetEditor({
  budget,
  label,
  onSave,
}: {
  budget: number
  label: string
  onSave: (v: number) => void
}) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(String(budget))

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-orange transition-colors"
      >
        <DollarSign size={12} />
        {label}: {fmt(budget)}/dia
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400">{label}:</span>
      <input
        className="w-24 bg-dark-600 border border-brand-orange rounded px-2 py-0.5 text-xs text-white focus:outline-none"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        autoFocus
      />
      <span className="text-xs text-gray-500">/dia</span>
      <button
        onClick={() => { onSave(Number(val)); setEditing(false) }}
        className="text-xs text-green-400 hover:text-green-300 font-semibold"
      >
        Salvar
      </button>
      <button onClick={() => setEditing(false)} className="text-xs text-gray-500 hover:text-gray-300">
        ✕
      </button>
    </div>
  )
}

function AdRow({ ad, onToggle }: { ad: Ad; onToggle: (id: string) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="ml-8 border-l border-dark-600 pl-4 py-2">
      <div className="flex items-start gap-2 flex-wrap">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-gray-300 mt-0.5 shrink-0"
        >
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm text-gray-300 break-words">{ad.name}</p>
            <StatusBadge status={ad.status} />
            <button
              onClick={() => onToggle(ad.id)}
              className="p-1 rounded hover:bg-dark-600 text-gray-500 hover:text-white transition-colors"
              title={ad.status === 'ACTIVE' ? 'Pausar anúncio' : 'Ativar anúncio'}
            >
              {ad.status === 'ACTIVE' ? <Pause size={12} /> : <Play size={12} />}
            </button>
            {ad.instagramPostUrl && (
              <a
                href={ad.instagramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] text-brand-orange hover:text-brand-orange-light transition-colors border border-brand-orange/30 hover:border-brand-orange rounded-full px-2 py-0.5"
              >
                <ExternalLink size={10} />
                Ver no Instagram
              </a>
            )}
          </div>
          {open && <MetricsRow m={ad.metrics} />}
        </div>
      </div>
    </div>
  )
}

function AdSetRow({
  adSet,
  isABO,
  onToggle,
  onBudgetChange,
}: {
  adSet: AdSet
  isABO: boolean
  onToggle: (id: string) => void
  onBudgetChange: (id: string, budget: number) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="ml-4 border-l border-dark-600 pl-4 py-2">
      <div className="flex items-start gap-2 flex-wrap">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-gray-300 mt-0.5 shrink-0"
        >
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm text-gray-200 break-words">{adSet.name}</p>
            <StatusBadge status={adSet.status} />
            <button
              onClick={() => onToggle(adSet.id)}
              className="p-1 rounded hover:bg-dark-600 text-gray-500 hover:text-white transition-colors"
              title={adSet.status === 'ACTIVE' ? 'Pausar conjunto' : 'Ativar conjunto'}
            >
              {adSet.status === 'ACTIVE' ? <Pause size={12} /> : <Play size={12} />}
            </button>
          </div>
          {isABO && (
            <div className="mt-1">
              <BudgetEditor
                budget={adSet.budget}
                label="Orçamento"
                onSave={(v) => onBudgetChange(adSet.id, v)}
              />
            </div>
          )}
          {open && <MetricsRow m={adSet.metrics} />}
        </div>
      </div>
      {open &&
        adSet.ads.map((ad) => (
          <AdRow key={ad.id} ad={ad} onToggle={onToggle} />
        ))}
    </div>
  )
}

export function CampaignManager({ campaigns: initial }: { campaigns: Campaign[] }) {
  const [campaigns, setCampaigns] = useState(initial)
  const [openCamps, setOpenCamps] = useState<Set<string>>(new Set())

  const toggleOpen = (id: string) => {
    setOpenCamps((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleStatus = (entityId: string) => {
    setCampaigns((prev) =>
      prev.map((camp) => {
        if (camp.id === entityId) {
          return { ...camp, status: camp.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' }
        }
        return {
          ...camp,
          adSets: camp.adSets.map((as) => {
            if (as.id === entityId) {
              return { ...as, status: as.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' }
            }
            return {
              ...as,
              ads: as.ads.map((ad) =>
                ad.id === entityId ? { ...ad, status: ad.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : ad
              ),
            }
          }),
        }
      })
    )
  }

  const updateBudget = (entityId: string, budget: number) => {
    setCampaigns((prev) =>
      prev.map((camp) => {
        if (camp.id === entityId) return { ...camp, budget }
        return {
          ...camp,
          adSets: camp.adSets.map((as) =>
            as.id === entityId ? { ...as, budget } : as
          ),
        }
      })
    )
  }

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
      <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-4">Gerenciador de Campanhas</h2>

      <div className="space-y-3">
        {campaigns.map((camp) => (
          <div key={camp.id} className="border border-dark-600 rounded-lg overflow-hidden">
            {/* Campaign header */}
            <div className="bg-dark-700 px-4 py-3">
              <div className="flex items-start gap-2 flex-wrap">
                <button
                  onClick={() => toggleOpen(camp.id)}
                  className="text-gray-400 hover:text-gray-200 mt-0.5 shrink-0"
                >
                  {openCamps.has(camp.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-white break-words">{camp.name}</p>
                    <StatusBadge status={camp.status} />
                    <span className="text-[10px] text-gray-500 border border-dark-500 rounded px-1.5 py-0.5">
                      {camp.budgetType}
                    </span>
                    <button
                      onClick={() => toggleStatus(camp.id)}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors
                        border-dark-500 text-gray-400 hover:border-brand-orange hover:text-brand-orange"
                    >
                      {camp.status === 'ACTIVE' ? (
                        <><Pause size={12} /> Pausar</>
                      ) : (
                        <><Play size={12} /> Ativar</>
                      )}
                    </button>
                  </div>
                  {camp.budgetType === 'CBO' && camp.budget !== undefined && (
                    <div className="mt-1">
                      <BudgetEditor
                        budget={camp.budget}
                        label="Orçamento CBO"
                        onSave={(v) => updateBudget(camp.id, v)}
                      />
                    </div>
                  )}
                  {openCamps.has(camp.id) && <MetricsRow m={camp.metrics} />}
                </div>
              </div>
            </div>

            {/* Ad sets */}
            {openCamps.has(camp.id) && (
              <div className="divide-y divide-dark-600">
                {camp.adSets.map((adSet) => (
                  <AdSetRow
                    key={adSet.id}
                    adSet={adSet}
                    isABO={camp.budgetType === 'ABO'}
                    onToggle={toggleStatus}
                    onBudgetChange={updateBudget}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
