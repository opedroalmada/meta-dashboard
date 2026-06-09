import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { id, valor, campanha_id, conjunto_id, anuncio_id } = body

    if (!id || !valor || !campanha_id || !conjunto_id || !anuncio_id) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: id, valor, campanha_id, conjunto_id, anuncio_id' },
        { status: 400 }
      )
    }

    if (typeof valor !== 'number' || valor <= 0) {
      return NextResponse.json(
        { error: 'valor deve ser um número positivo' },
        { status: 400 }
      )
    }

    const useMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'

    if (!useMock) {
      const client = getServiceClient()
      const { error } = await client.from('vendas').upsert({
        id: String(id),
        valor: Number(valor),
        campanha_id: String(campanha_id),
        conjunto_id: String(conjunto_id),
        anuncio_id: String(anuncio_id),
      })

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json({ error: 'Erro ao salvar venda' }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Venda registrada com sucesso',
      data: { id, valor, campanha_id, conjunto_id, anuncio_id },
    })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'POST /api/webhook',
    payload: {
      id: 'string — ID único da venda',
      valor: 'number — valor em reais (ex: 297.00)',
      campanha_id: 'string — ID da campanha no Meta',
      conjunto_id: 'string — ID do conjunto de anúncios no Meta',
      anuncio_id: 'string — ID do anúncio no Meta',
    },
    example: {
      id: 'venda_abc123',
      valor: 297.00,
      campanha_id: 'camp_001',
      conjunto_id: 'adset_001',
      anuncio_id: 'ad_001',
    },
  })
}
