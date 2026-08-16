# GOTEK Dashboard V8 — D1 configurado

## Banco configurado

- Nome: `gotek-financeiro`
- Database ID: `5d7a5082-9072-4f1f-b78c-0c5fbec6fca5`
- Binding: `DB`

O ID já está preenchido em `wrangler.jsonc`.

## 1. Instalar e autenticar

```bash
npm install -g wrangler
wrangler login
```

## 2. Criar a estrutura do banco

Na raiz do projeto:

```bash
npx wrangler d1 execute gotek-financeiro --remote --file=./schema.sql
```

## 3. Importar os dados atuais

Use o `seed.sql` do pacote **SETUP** original. Ele não deve ser commitado no GitHub.

```bash
npx wrangler d1 execute gotek-financeiro --remote --file=./seed.sql
```

## 4. Conferir

```bash
npx wrangler d1 execute gotek-financeiro --remote --command="SELECT COUNT(*) AS total FROM titles"
```

Esperado: `13485`.

## 5. Vincular o D1 ao Pages

Se o projeto Pages for criado via GitHub, confira em:

Workers & Pages → seu projeto → Settings → Bindings → D1 database

Binding:
`DB`

Database:
`gotek-financeiro`

Se o `wrangler.jsonc` for usado como fonte de configuração, faça o deploy a partir dele.

## 6. Testar localmente

```bash
npx wrangler pages dev . --d1 DB=5d7a5082-9072-4f1f-b78c-0c5fbec6fca5
```

## 7. Publicar

Depois de conectar o repositório GitHub ao Pages, faça um push.

Alternativamente:

```bash
npx wrangler pages deploy .
```

## Segurança

Não envie `data.json` nem `seed.sql` para o GitHub.

O dashboard consulta `/api/data`, e os dados ficam no D1.

A proteção de autenticação deve ser feita no Cloudflare Access/Zero Trust. `REQUIRE_ACCESS=true` permanece ativo.

