// Lições dos livros (exercícios e peças) e montagem da tela Conteúdos.

const LESSON_TYPES = {
  exercicio: {
    group: "Exercícios",
    badge: "EXERCÍCIOS",
    symbol: "⌁",
    symbolClass: "warm-symbol",
    typeClass: "type-warm",
    dotClass: "dot-warm",
  },
  peca: {
    group: "Peças",
    badge: "PEÇA",
    symbol: "♫",
    symbolClass: "green-symbol",
    typeClass: "type-green",
    dotClass: "dot-green",
  },
};

function getAllLessons() {
  const entries = [];
  for (const book of BOOKS) {
    for (const lesson of book.lessons) {
      entries.push({ book, lesson });
    }
  }
  return entries;
}

function getLessonsByType(type) {
  return getAllLessons().filter((entry) => entry.lesson.type === type);
}

function formatPages(parts) {
  const pages = [...new Set(parts.map((part) => part.page))].sort((a, b) => a - b);
  if (pages.length === 1) {
    return `p. ${pages[0]}`;
  }

  const sequential = pages.every((page, index) => index === 0 || page === pages[index - 1] + 1);
  return sequential ? `pp. ${pages[0]}–${pages[pages.length - 1]}` : `p. ${pages.join(", ")}`;
}

function createPartsList(parts) {
  const list = document.createElement("ul");
  list.className = "content-parts";

  for (const part of parts) {
    const item = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = part.title;
    const page = document.createElement("b");
    page.textContent = `p. ${part.page}`;
    item.append(name, page);

    if (part.focus) {
      const detail = document.createElement("small");
      detail.textContent = part.focus;
      item.append(detail);
    }

    list.append(item);
  }

  return list;
}

function createLessonRow({ book, lesson }) {
  const type = LESSON_TYPES[lesson.type];

  const symbol = document.createElement("span");
  symbol.className = `content-symbol ${type.symbolClass}`;
  symbol.setAttribute("aria-hidden", "true");
  symbol.textContent = type.symbol;

  const badge = document.createElement("span");
  badge.className = `content-type ${type.typeClass}`;
  badge.textContent = type.badge;

  const title = document.createElement("h2");
  title.textContent = lesson.title;

  const description = document.createElement("div");
  description.className = "content-description";
  description.append(badge, title);

  if (lesson.parts.length > 1) {
    description.append(createPartsList(lesson.parts));
  } else {
    const detail = document.createElement("p");
    detail.textContent = book.title;
    description.append(detail);
  }

  const page = document.createElement("span");
  page.className = "content-page";
  page.textContent = formatPages(lesson.parts);

  const row = document.createElement("article");
  row.className = "content-row";
  row.append(symbol, description, page);
  return row;
}

function createLessonGroup(type) {
  const entries = getLessonsByType(type);

  const title = document.createElement("h2");
  title.textContent = LESSON_TYPES[type].group;

  const count = document.createElement("span");
  count.textContent = entries.length === 1 ? "1 lição" : `${entries.length} lições`;

  const heading = document.createElement("div");
  heading.className = "content-group-heading";
  heading.append(title, count);

  const list = document.createElement("div");
  list.className = "content-list";
  list.append(...entries.map(createLessonRow));

  const group = document.createElement("section");
  group.className = "content-group";
  group.append(heading, list);
  return group;
}

function renderContents() {
  const container = document.querySelector("#content-groups");
  if (!container) {
    return;
  }

  const types = Object.keys(LESSON_TYPES);
  container.replaceChildren(...types.map(createLessonGroup));

  const total = getAllLessons().length;

  const totalLabel = document.querySelector("#content-total");
  if (totalLabel) {
    totalLabel.textContent = `${total} lições`;
  }

  const source = document.querySelector("#content-source");
  if (source) {
    source.textContent = BOOKS.map((book) => `${book.title} · ${book.author}`).join(" · ");
  }

  const summaryTypes = document.querySelector("#content-types");
  if (summaryTypes) {
    const items = types.map((type) => {
      const item = document.createElement("span");
      const dot = document.createElement("i");
      dot.className = `type-dot ${LESSON_TYPES[type].dotClass}`;
      const count = document.createElement("b");
      count.textContent = getLessonsByType(type).length;
      item.append(dot, `${LESSON_TYPES[type].group} `, count);
      return item;
    });
    summaryTypes.replaceChildren(...items);
  }

  const tag = document.querySelector("#content-tag");
  if (tag) {
    tag.textContent = `${total} LIÇÕES`;
  }
}
