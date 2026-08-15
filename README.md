# Painel Financeiro — Cruzamentos + Cabeçalho

Esta versão mantém o dashboard do ficheiro enviado e consolida duas melhorias:

## Cruzamentos

A aba **Cruzamentos** permite cruzar duas dimensões usando os filtros ativos:

- Vendedor responsável
- Parceiro
- Tipo de movimento
- Tipo de título
- Faixa de dias
- Renegociado

É possível medir por **Valor (R$)** ou **Quantidade de títulos**. A matriz usa escala de intensidade para destacar os maiores cruzamentos, permite inverter linhas/colunas e clicar numa célula para aplicar o cruzamento aos filtros.

## Cabeçalho

A marca `logo.png` foi aplicada no cabeçalho com dimensão controlada, mantendo a proporção e evitando que a logo domine a tela. Em telas menores ela reduz automaticamente.

## Publicação no GitHub Pages

Mantenha estes quatro arquivos na mesma pasta:

- `index.html`
- `data.json`
- `schema.json`
- `logo.png`

O `index.html` referencia `data.json` e `logo.png` por caminho relativo.
