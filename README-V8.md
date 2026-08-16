# GOTEK — Painel Financeiro V8

## Arquitetura

A V8 remove o `data.json` do site público.

```text
Usuário
  ↓
Cloudflare Access
  ↓
Cloudflare Pages
  ↓
Pages Function /api/data
  ↓
Cloudflare D1
  ↓
títulos
```

O frontend não possui mais a base de clientes. Os dados ficam no D1 e são entregues pela Function somente após a camada de autenticação do Cloudflare Access.

## Stack sem custo adicional

- GitHub: código/versionamento
- Cloudflare Pages: frontend
- Cloudflare Pages Functions / Workers: API
- Cloudflare D1: banco SQLite serverless
- Cloudflare Access: autenticação na frente do site

Os limites atuais do plano Free do Cloudflare incluem 100.000 requests/dia para Workers e 5 milhões de linhas lidas/dia no D1. D1 Free inclui 500 MB por banco. Consulte a documentação antes de colocar o sistema em produção, pois limites e políticas podem mudar.

## 1. Criar o D1

Cloudflare → Workers & Pages → D1 → Create database.

Nome:

`gotek-financeiro`

Copie o Database ID.

## 2. Importar a estrutura

Instale/tenha o Wrangler e faça login:

```bash
npx wrangler login
```

Depois:

```bash
npx wrangler d1 execute gotek-financeiro --remote --file=./schema.sql
```

## 3. Importar os dados

O arquivo `seed.sql` contém a base usada pela V8. Faça a importação UMA VEZ:

```bash
npx wrangler d1 execute gotek-financeiro --remote --file=./seed.sql
```

Depois da importação, remova `seed.sql` do repositório Git. Ele está no pacote apenas para a carga inicial.

## 4. Configurar wrangler.toml

Substitua:

`COLE_AQUI_O_DATABASE_ID`

pelo Database ID real.

Não coloque tokens ou senhas no arquivo.

## 5. Criar o Pages Project

Cloudflare → Workers & Pages → Create application → Pages → Connect to Git.

Conecte o GitHub e selecione o repositório da V8.

Build command:

`(vazio)`

Build output directory:

`.`

A pasta `functions/` será publicada como Pages Functions.

## 6. Configurar Cloudflare Access

No Cloudflare Zero Trust:

Access → Applications → Add application → Self-hosted.

Escolha o domínio do dashboard.

Crie uma política:

Allow

e restrinja aos e-mails/domínio corporativo que devem acessar o painel.

Para uma primeira implantação, prefira autenticação por e-mail/IdP em vez de senha compartilhada.

## 7. Teste obrigatório

Sem login:
- dashboard deve ser bloqueado.

Com login:
- dashboard abre;
- `/api/data` funciona;
- filtros funcionam;
- cruzamentos funcionam;
- Cobrança funciona;
- Títulos funciona;
- impressão/PDF funciona.

Tente abrir:

`/data.json`

Esse arquivo NÃO deve existir na V8.

## Segurança

A V8 melhora muito a exposição em relação ao V7:

- não há `data.json` público;
- não há base de clientes no frontend;
- D1 fica atrás da Function;
- Access controla a entrada;
- API não aceita chamada sem o cabeçalho de autenticação do Access quando `REQUIRE_ACCESS=true`.

Limitação atual: o endpoint `/api/data` ainda entrega os registros ao navegador depois que o usuário é autorizado. Portanto, um usuário autorizado consegue tecnicamente inspecionar os dados que recebeu.

A próxima evolução recomendada é a V8.1:
- filtros server-side;
- paginação de Títulos;
- agregações server-side;
- cruzamentos calculados no D1;
- autorização por vendedor/perfil.

Isso reduzirá ainda mais a quantidade de dados enviada ao navegador.

## Não fazer

Não publique:
- `seed.sql`
- `data.json`
- tokens
- chaves de API
- senhas

em repositórios públicos.
