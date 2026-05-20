# API Produtos

API CRUD de produtos usando Express, Sequelize e PostgreSQL.

## Configuracao

As configuracoes do banco ficam em variaveis de ambiente.
Copie o arquivo `.env.example` para `.env` e preencha os valores somente na sua maquina.

O arquivo `.env` esta protegido pelo `.gitignore` e nao deve ser enviado para o GitHub.

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
