# Dashboard Financeiro — V4

## Lógica de dias

A métrica de dias agora é calculada **no navegador, usando a data atual menos a data de vencimento**:

`dias = hoje - vencimento`

- resultado negativo = **A vencer**
- resultado zero = **vence hoje** e entra em **A vencer**
- resultado positivo = **Vencido**

A coluna original `ATRASO` da planilha não é usada para determinar a faixa.

## Faixa de dias

A mesma métrica, em valor absoluto, é usada para os dois status:

- 0–30 dias
- 31–60 dias
- 61–90 dias
- 91–180 dias
- Mais de 180 dias

O status é separado em um seletor:

**Todos | A vencer | Vencidos**

Assim, por exemplo, `15 dias` significa:
- 15 dias para vencer, quando o status é A vencer;
- 15 dias de atraso, quando o status é Vencidos.

## PDF / Impressão

O botão **Imprimir / Salvar PDF** continua leve no dashboard. A grade detalhada só é construída na janela de impressão, usando os filtros atuais.

A exportação inclui a logo do cabeçalho e a coluna **FAIXA DE DIAS**.

## Busca

A busca de parceiro encontra qualquer trecho do nome, sem diferenciar maiúsculas/minúsculas ou acentos.

## Arquivos

- `index.html`
- `data.json`
- `schema.json`
- `logo.png`
- `README.md`
