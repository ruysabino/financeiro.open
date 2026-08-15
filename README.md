# Dashboard Financeiro

Dashboard web estático para GitHub Pages.

## Estrutura

- `index.html` — aplicação
- `data.json` — dados tratados a partir do Financeiro.ods
- `metadata.json` — metadados da importação

## Publicação no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie estes arquivos para a raiz do repositório.
3. Vá em **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Selecione `main` e a pasta `/ (root)`.
6. Salve e aguarde a publicação.

## Segurança

O `data.json` contém os dados da planilha. Não publique este repositório como público se os dados financeiros não puderem ser expostos. Para uso interno, prefira repositório privado ou hospedagem com autenticação.

## Atualização

Para atualizar os dados nesta primeira versão, substitua `data.json` por uma nova exportação tratada. A interface foi feita para inferir os principais campos da base.
