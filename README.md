# Meta Dashboard

Dashboard de campanhas Meta Ads cruzado com dados de vendas do Supabase.

## Setup local

```bash
npm install
cp .env.example .env.local
# edite .env.local com suas credenciais
npm run dev
```

Acesse http://localhost:3000

## Deploy na Vercel

1. Push para GitHub
2. Importe o repositório na Vercel
3. Configure as variáveis de ambiente (ver `.env.example`)
4. Deploy automático

## Webhook de Vendas

**Endpoint:** `POST /api/webhook`

**Payload:**
```json
{
  "id": "venda_abc123",
  "valor": 297.00,
  "campanha_id": "camp_001",
  "conjunto_id": "adset_001",
  "anuncio_id": "ad_001"
}
```

**Teste via curl:**
```bash
curl -X POST https://seu-app.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"id":"teste_001","valor":297,"campanha_id":"camp_001","conjunto_id":"adset_001","anuncio_id":"ad_001"}'
```

**Verificar schema do payload:**
```bash
curl https://seu-app.vercel.app/api/webhook
```

## Supabase — SQL para criar a tabela

```sql
CREATE TABLE vendas (
  id TEXT PRIMARY KEY,
  valor NUMERIC NOT NULL,
  campanha_id TEXT NOT NULL,
  conjunto_id TEXT NOT NULL,
  anuncio_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Modo Mock vs Produção

- `NEXT_PUBLIC_USE_MOCK_DATA=true` → dados mockados (padrão)
- `NEXT_PUBLIC_USE_MOCK_DATA=false` → dados reais do Meta e Supabase
