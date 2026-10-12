const navigationLinks = document.querySelectorAll("[data-screen]");
const screens = document.querySelectorAll(".screen");
const currentPage = document.querySelector("#current-page");

function showScreen(route, moveToTop = false) {
  const screen = Array.from(screens).find((item) => item.id === `screen-${route}`);
  const activeLink = Array.from(navigationLinks).find((link) => link.dataset.screen === route);

  if (!screen || !activeLink) {
    return;
  }

  for (const item of screens) {
    item.hidden = item !== screen;
  }

  for (const link of navigationLinks) {
    if (link === activeLink) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  }

  currentPage.textContent = screen.dataset.title;
  document.title = `Music Study — ${screen.dataset.title}`;

  if (moveToTop) {
    window.scrollTo(0, 0);
  }
}

for (const link of navigationLinks) {
  link.addEventListener("click", (event) => {
    const route = link.dataset.screen;

    if (window.location.hash === `#${route}`) {
      event.preventDefault();
      showScreen(route, true);
    }
  });
}

window.addEventListener("hashchange", () => {
  showScreen(window.location.hash.slice(1), true);
});

showScreen(window.location.hash.slice(1) || "inicio");
