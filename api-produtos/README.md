# API Produtos

API CRUD de produtos usando Express, Sequelize e PostgreSQL.

## Configuracao

As configuracoes padrao estao em `src/config/database.js`:

- usuario: `postgres`
- senha: `senai`
- banco: `lojaprodutos`
- host: `127.0.0.1`
- porta: `5433`

Se o seu PostgreSQL usar dados diferentes, configure as variaveis do `.env.example` no terminal antes de rodar os comandos.

## Comandos

```bash
npm install
npm run migrate
npm run dev
```

## Rotas

- `POST /produtos`
- `GET /produtos`
- `PUT /produtos/:id`
- `DELETE /produtos/:id`

Exemplo de JSON:

```json
{
  "nome": "Mouse",
  "preco": 59.9,
  "quantidade": 10
}
```
