// Livros e métodos de estudo e montagem da tela Biblioteca.

const BOOKS = [
  {
    id: "iniciacao-ao-violao",
    title: "Iniciação ao Violão",
    author: "Henrique Pinto",
    category: "VIOLÃO · MÉTODO",
    description:
      "Método de introdução ao violão, com exercícios de técnica para a mão direita e as primeiras peças. As lições seguem a ordem e a página indicadas no livro.",
    cover: {
      label: "HENRIQUE PINTO",
      lines: ["Iniciação", "ao Violão"],
      footer: "MÉTODO",
      glyph: "𝄞",
    },
    lessons: [
      { id: "exercicio-01", type: "exercicio", page: 17, title: "Primeiro exercício", focus: "Uso do indicador, médio e anelar" },
      { id: "exercicio-02", type: "exercicio", page: 19, title: "Segundo exercício", focus: "Uso do polegar" },
      { id: "exercicio-03", type: "exercicio", page: 21, title: "Terceiro exercício", focus: "Combinação do polegar com o indicador, médio e anelar" },
      { id: "exercicio-04", type: "exercicio", page: 26, title: "Primeiro exercício", focus: "Sobre a 6ª corda" },
      { id: "exercicio-05", type: "exercicio", page: 26, title: "Segundo exercício", focus: "Sobre a 5ª corda" },
      { id: "exercicio-06", type: "exercicio", page: 27, title: "Terceiro exercício", focus: "Sobre a 4ª corda" },
      { id: "exercicio-07", type: "exercicio", page: 27, title: "Quarto exercício", focus: "Sobre a 6ª, 5ª e 4ª cordas" },
      { id: "exercicio-08", type: "exercicio", page: 28, title: "Exercícios combinados", focus: "Polegar com indicador, médio e anelar" },
      { id: "exercicio-09", type: "exercicio", page: 29, title: "Primeiro exercício", focus: "Sobre a 3ª corda" },
      { id: "exercicio-10", type: "exercicio", page: 30, title: "Segundo exercício", focus: "Sobre a 2ª corda" },
      { id: "exercicio-11", type: "exercicio", page: 30, title: "Terceiro exercício", focus: "Sobre a 1ª corda" },
      { id: "exercicio-12", type: "exercicio", page: 31, title: "Quarto exercício", focus: "Sobre a 3ª, 2ª e 1ª cordas" },
      { id: "peca-01", type: "peca", page: 34, title: "Andante" },
      { id: "peca-02", type: "peca", page: 34, title: "Poco Andante" },
      { id: "peca-03", type: "peca", page: 35, title: "Andantino" },
      { id: "peca-04", type: "peca", page: 36, title: "Andantino" },
      { id: "peca-05", type: "peca", page: 37, title: "Valsa" },
      { id: "peca-06", type: "peca", page: 38, title: "Allegretto" },
      { id: "peca-07", type: "peca", page: 38, title: "Quase Andante" },
      { id: "peca-08", type: "peca", page: 39, title: "Prelúdio" },
      { id: "peca-09", type: "peca", page: 40, title: "Allegretto" },
      { id: "peca-10", type: "peca", page: 41, title: "Andante Religioso" },
    ],
  },
];

function countLessons(book) {
  const totals = {};
  for (const lesson of book.lessons) {
    totals[lesson.type] = (totals[lesson.type] || 0) + 1;
  }
  return totals;
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
  const totals = countLessons(book);

  const category = document.createElement("span");
  category.className = "book-category";
  category.textContent = book.category;

  const title = document.createElement("h2");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.textContent = book.author;

  const facts = document.createElement("ul");
  facts.className = "book-facts";
  const factList = [
    [book.lessons.length, "lições"],
    [totals.exercicio || 0, "exercícios"],
    [totals.peca || 0, "peças"],
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
