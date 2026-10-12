// Livros e métodos de estudo e montagem da tela Biblioteca.

const BOOKS = [
  {
    id: "iniciacao-ao-violao",
    title: "Iniciação ao Violão",
    author: "Henrique Pinto",
    instrument: "Violão",
    style: "Clássico",
    description:
      "Método de introdução ao violão, com exercícios de técnica para a mão direita e as primeiras peças. Cada bloco de exercícios numerados forma uma lição única; as lições seguem a ordem e a página indicadas no livro.",
    cover: {
      label: "HENRIQUE PINTO",
      lines: ["Iniciação", "ao Violão"],
      footer: "MÉTODO",
      glyph: "𝄞",
    },
    lessons: [
      {
        id: "licao-exercicios-01",
        type: "exercicio",
        title: "Exercícios 1 a 3",
        parts: [
          { page: 17, title: "Primeiro exercício", focus: "Uso do indicador, médio e anelar" },
          { page: 19, title: "Segundo exercício", focus: "Uso do polegar" },
          { page: 21, title: "Terceiro exercício", focus: "Combinação do polegar com o indicador, médio e anelar" },
        ],
      },
      {
        id: "licao-exercicios-02",
        type: "exercicio",
        title: "Exercícios sobre a 6ª, 5ª e 4ª cordas",
        parts: [
          { page: 26, title: "Primeiro exercício", focus: "Sobre a 6ª corda" },
          { page: 26, title: "Segundo exercício", focus: "Sobre a 5ª corda" },
          { page: 27, title: "Terceiro exercício", focus: "Sobre a 4ª corda" },
          { page: 27, title: "Quarto exercício", focus: "Sobre a 6ª, 5ª e 4ª cordas" },
          { page: 28, title: "Exercícios combinados", focus: "Polegar com indicador, médio e anelar" },
        ],
      },
      {
        id: "licao-exercicios-03",
        type: "exercicio",
        title: "Exercícios sobre a 3ª, 2ª e 1ª cordas",
        parts: [
          { page: 29, title: "Primeiro exercício", focus: "Sobre a 3ª corda" },
          { page: 30, title: "Segundo exercício", focus: "Sobre a 2ª corda" },
          { page: 30, title: "Terceiro exercício", focus: "Sobre a 1ª corda" },
          { page: 31, title: "Quarto exercício", focus: "Sobre a 3ª, 2ª e 1ª cordas" },
        ],
      },
      { id: "licao-peca-01", type: "peca", title: "Andante", parts: [{ page: 34 }] },
      { id: "licao-peca-02", type: "peca", title: "Poco Andante", parts: [{ page: 34 }] },
      { id: "licao-peca-03", type: "peca", title: "Andantino", parts: [{ page: 35 }] },
      { id: "licao-peca-04", type: "peca", title: "Andantino", parts: [{ page: 36 }] },
      { id: "licao-peca-05", type: "peca", title: "Valsa", parts: [{ page: 37 }] },
      { id: "licao-peca-06", type: "peca", title: "Allegretto", parts: [{ page: 38 }] },
      { id: "licao-peca-07", type: "peca", title: "Quase Andante", parts: [{ page: 38 }] },
      { id: "licao-peca-08", type: "peca", title: "Prelúdio", parts: [{ page: 39 }] },
      { id: "licao-peca-09", type: "peca", title: "Allegretto", parts: [{ page: 40 }] },
      { id: "licao-peca-10", type: "peca", title: "Andante Religioso", parts: [{ page: 41 }] },
    ],
  },
];

function summarizeBook(book) {
  const summary = { lessons: book.lessons.length, exercises: 0, pieces: 0 };
  for (const lesson of book.lessons) {
    if (lesson.type === "peca") {
      summary.pieces += 1;
    } else {
      summary.exercises += lesson.parts.length;
    }
  }
  return summary;
}

function createBookCover(book) {
  const cover = document.createElement("div");
  cover.className = "book-cover";

  const label = document.createElement("span");
  label.textContent = book.cover.label;

  const title = document.createElement("strong");
  book.cover.lines.forEach((line, index) => {
    if (index > 0) {
      title.append(document.createElement("br"));
    }
    title.append(line);
  });

  const footer = document.createElement("small");
  footer.textContent = book.cover.footer;

  const glyph = document.createElement("i");
  glyph.setAttribute("aria-hidden", "true");
  glyph.textContent = book.cover.glyph;

  cover.append(label, title, footer, glyph);
  return cover;
}

function createBookRow(book) {
  const summary = summarizeBook(book);

  const category = document.createElement("span");
  category.className = "book-category";
  category.textContent = `${book.instrument} · ${book.style}`;

  const title = document.createElement("h2");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.textContent = book.author;

  const facts = document.createElement("ul");
  facts.className = "book-facts";
  const factList = [
    [summary.lessons, "lições"],
    [summary.exercises, "exercícios"],
    [summary.pieces, "peças"],
  ];
  for (const [amount, caption] of factList) {
    const item = document.createElement("li");
    const value = document.createElement("strong");
    value.textContent = amount;
    const label = document.createElement("span");
    label.textContent = caption;
    item.append(value, label);
    facts.append(item);
  }

  const note = document.createElement("p");
  note.className = "book-note";
  note.textContent = book.description;

  const info = document.createElement("div");
  info.className = "book-info";
  info.append(category, title, author, facts, note);

  const row = document.createElement("article");
  row.className = "book-row";
  row.append(createBookCover(book), info);
  return row;
}

function renderLibrary() {
  const list = document.querySelector("#library-list");
  if (!list) {
    return;
  }

  list.replaceChildren(...BOOKS.map(createBookRow));

  const tag = document.querySelector("#library-tag");
  if (tag) {
    tag.textContent = BOOKS.length === 1 ? "1 LIVRO" : `${BOOKS.length} LIVROS`;
  }

  const counter = document.querySelector("#library-count");
  if (counter) {
    counter.textContent = BOOKS.length === 1 ? "1 livro" : `${BOOKS.length} livros`;
  }
}
