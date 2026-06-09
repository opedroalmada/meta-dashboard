'use client'

import { FunnelStep } from '@/types'

export function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  const max = steps[0]?.value || 1

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
      <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-4">
        Funil Completo · Cliques → Vendas → Bumps → Upsells
      </h2>

      {/* Sankey-style visual */}
      <div className="relative mb-6 h-28 flex items-center overflow-hidden rounded-lg bg-dark-900">
        {steps.map((step, i) => {
          const width = (step.value / max) * 100
          const prevWidth = i === 0 ? 100 : (steps[i - 1].value / max) * 100
          const isLast = i === steps.length - 1
          return (
            <div
              key={step.label}
              className="absolute top-0 bottom-0 flex items-center justify-center"
              style={{
                left: `${(i / steps.length) * 100}%`,
                width: `${100 / steps.length}%`,
              }}
            >
              {/* Trapezoid bar */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <polygon
                  points={`0,${(100 - prevWidth) / 2} 100,${(100 - width) / 2} 100,${100 - (100 - width) / 2} 0,${100 - (100 - prevWidth) / 2}`}
                  fill={i === 0 ? '#FF6B00' : `rgba(255,107,0,${1 - i * 0.12})`}
                />
              </svg>
            </div>
          )
        })}
      </div>

      {/* Step labels */}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {steps.map((step) => (
          <div key={step.label} className="flex flex-col gap-0.5">
            <p className="text-[10px] text-gray-400 leading-tight">{step.label}</p>
            <p className="text-base font-bold text-white">{step.value.toLocaleString('pt-BR')}</p>
            {step.money && <p className="text-xs text-brand-orange">{step.money}</p>}
            {step.delta !== undefined && (
              <p className={`text-[10px] ${step.delta < 0 ? 'text-red-400' : 'text-green-400'}`}>
                {step.delta > 0 ? '↑' : '↓'} {Math.abs(step.delta).toFixed(1)}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
