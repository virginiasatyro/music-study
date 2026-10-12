# music-study

Interface responsiva para apoiar a organização dos estudos de música, feita em HTML, CSS e JavaScript puros.

## Como executar

Abra `index.html` diretamente no navegador ou publique os arquivos no GitHub Pages. Não é necessário instalar ferramentas, iniciar servidor ou compilar o projeto.

## Telas

- **Início / Minha sessão**: resumo e roteiro ilustrativo de uma sessão.
- **Biblioteca**: o livro cadastrado, com a contagem de lições, exercícios e peças.
- **Conteúdos**: as lições do livro, agrupadas em exercícios e peças e ordenadas por página.
- **Histórico**: exemplo de sessões anteriores.
- **Configurações**: prévia das preferências do perfil e dos estudos.

Valores de Início, Histórico e Configurações ainda são fictícios. Nesta etapa não há cadastro, salvamento, banco de dados, backup ou algoritmo de revisão.

## Livro cadastrado

`Iniciação ao Violão` — Henrique Pinto: 22 lições indicadas por página, sendo 12 exercícios de técnica e 10 peças. Os dados ficam em `js/books.js` no formato abaixo, e cada lição aceita `focus` (opcional) com a orientação do exercício:

```js
{ id: "exercicio-01", type: "exercicio", page: 17, title: "Primeiro exercício", focus: "Uso do indicador, médio e anelar" }
```

## Estrutura

- `index.html`: página principal e telas da interface.
- `css/style.css`: estilos e layout responsivo.
- `js/books.js`: livro cadastrado e montagem da tela Biblioteca.
- `js/content.js`: lições do livro e montagem da tela Conteúdos.
- `js/app.js`: navegação entre telas.
- `js/database.js`: espaço reservado para persistência futura.
- `js/study-session.js`: espaço reservado para sessões de estudo futuras.
- `js/review-scheduler.js`: espaço reservado para revisão espaçada futura.
- `js/backup.js`: espaço reservado para backup e restauração futuros.
