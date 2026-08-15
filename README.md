# Dashboard Financeiro — V2

Versão aprimorada para GitHub Pages, construída diretamente a partir da aba `DADOS` de `Financeiro(1).ods`.

## Cabeçalhos conferidos

A aplicação usa os nomes reais dos cabeçalhos e não depende da posição das colunas:

- PARCEIRO
- DATA
- VENCIMENTO
- ATRASO
- DOCUMENTO
- VENDEDOR
- VALOR
- MOVIMENTO
- Renegociados ?
- Banco
- TITULO
- Histórico

## Busca de parceiro

A busca é por **qualquer trecho do nome**, sem diferenciar maiúsculas/minúsculas ou acentos. Exemplos:

- `silva` encontra `JOAO DA SILVA`
- `fernando` encontra qualquer parceiro com Fernando
- `monteiro da` encontra nomes que contenham esse trecho

Há também sugestões automáticas enquanto o usuário digita.

## Faixa de atraso

A coluna `ATRASO` é usada como fonte oficial:

- negativo = dias para vencer
- zero = vence hoje
- positivo = dias vencido

Faixas: A vencer, hoje, 1–7, 8–30, 31–90, 91–180, 181–365 e +365.

## Publicação

Envie `index.html`, `data.json`, `schema.json` e `README.md` para o repositório e ative GitHub Pages em:

Settings → Pages → Deploy from a branch → main → / (root)

## Privacidade

`data.json` contém os dados financeiros. Não publique o repositório como público se a base não puder ser exposta.


## V3 — Grade analítica e PDF

A V3 adiciona uma grade analítica abaixo do dashboard. Ela respeita todos os filtros atuais e mostra os registros correspondentes.

O botão **Imprimir / Salvar PDF** abre a impressão do navegador em formato A4 paisagem, ocultando o restante do dashboard e imprimindo somente a grade analítica. No diálogo do navegador, escolha **Salvar como PDF** para gerar o arquivo.
