# music-study

Interface responsiva para apoiar a organização dos estudos de música, feita em HTML, CSS e JavaScript puros.

## Como executar

Abra `index.html` diretamente no navegador ou publique os arquivos no GitHub Pages. Não é necessário instalar ferramentas, iniciar servidor ou compilar o projeto.

## Telas

- **Início / Minha sessão**: resumo e roteiro ilustrativo de uma sessão.
- **Biblioteca**: o livro cadastrado, com a contagem de lições, exercícios e peças.
- **Conteúdos**: as lições do livro, agrupadas em exercícios e peças; cada lição de exercícios lista os seus exercícios e páginas.
- **Histórico**: exemplo de sessões anteriores.
- **Configurações**: prévia das preferências do perfil e dos estudos.

Valores de Início, Histórico e Configurações ainda são fictícios. Nesta etapa não há cadastro, salvamento, banco de dados, backup ou algoritmo de revisão.

## Livro cadastrado

`Iniciação ao Violão` — Henrique Pinto: 13 lições, sendo 3 lições de exercícios (12 exercícios no total) e 10 peças. Cada bloco de exercícios numerados é uma lição única, e os exercícios ficam em `parts` com a página e a orientação de cada um:

```js
{
  id: "licao-exercicios-01",
  type: "exercicio",
  title: "Exercícios 1 a 3",
  parts: [
    { page: 17, title: "Primeiro exercício", focus: "Uso do indicador, médio e anelar" },
  ],
}
```

As peças têm uma única parte, por exemplo `{ id: "licao-peca-01", type: "peca", title: "Andante", parts: [{ page: 34 }] }`.

Cada livro também guarda `instrument` e `style` (aqui, `"Violão"` e `"Clássico"`), usados no cabeçalho do cartão na Biblioteca.

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
