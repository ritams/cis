document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");
  const navPanel = document.querySelector("[data-nav-panel]");
  const NAV_ACTIVE_CLASS = "is-open";

  const closeNavPanel = () => {
    if (!navLinks) return;
    navLinks.setAttribute("data-open", "false");
    navToggle?.setAttribute("aria-expanded", "false");
    navPanel?.classList.remove(NAV_ACTIVE_CLASS);
    document.body.classList.remove("nav-panel-open");
  };

  const openNavPanel = () => {
    if (!navLinks) return;
    navLinks.setAttribute("data-open", "true");
    navToggle?.setAttribute("aria-expanded", "true");
    navPanel?.classList.add(NAV_ACTIVE_CLASS);
    document.body.classList.add("nav-panel-open");
  };

  const toggleNavPanel = () => {
    const isOpen = navLinks?.getAttribute("data-open") === "true";
    if (isOpen) {
      closeNavPanel();
    } else {
      openNavPanel();
    }
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      toggleNavPanel();
    });

    navPanel?.addEventListener("click", (event) => {
      if (event.target === navPanel) {
        closeNavPanel();
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeNavPanel();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNavPanel();
      }
    });

    const handleBreakpointChange = (event) => {
      if (!event.matches) {
        closeNavPanel();
      }
    };

    const mobileQuery = window.matchMedia("(max-width: 49.375rem)");
    mobileQuery.addEventListener("change", handleBreakpointChange);
  }
});

const domainsFilterInput = document.querySelector('[data-domains-filter]');
const domainsCards = document.querySelectorAll('.domains-grid__list .domain-card');
const domainsGrid = document.querySelector('.domains-grid__list');

if (domainsFilterInput && domainsCards.length) {
  const emptyState = document.createElement('p');
  emptyState.className = 'domains-grid__empty';
  emptyState.textContent = 'No domains match the current query. Try different keywords.';

  const normalize = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim();

  const cardTexts = new Map();
  domainsCards.forEach((card) => {
    const text = normalize(card.textContent || '');
    cardTexts.set(card, text);
  });

  const filterCards = (query) => {
    const normalizedQuery = normalize(query);
    let visibleCount = 0;

    domainsCards.forEach((card) => {
      const matches = !normalizedQuery || cardTexts.get(card).includes(normalizedQuery);
      card.style.display = matches ? '' : 'none';
      if (matches) visibleCount += 1;
    });

    if (visibleCount === 0) {
      domainsGrid?.appendChild(emptyState);
    } else {
      emptyState.remove();
    }
  };

  domainsFilterInput.addEventListener('input', (event) => {
    filterCards(event.target.value);
  });
}

const yearEl = document.querySelector('[data-current-year]');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const expertsFilterInput = document.querySelector('[data-experts-filter]');
const expertsCards = document.querySelectorAll('.experts-grid__list .person-card');
const expertsGrid = document.querySelector('.experts-grid__list');

if (expertsFilterInput && expertsCards.length) {
  const emptyState = document.createElement('p');
  emptyState.className = 'experts-grid__empty';
  emptyState.textContent = 'No experts match your search yet. Adjust filters or clear the query.';

  const normalize = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim();

  const getCardText = (card) => normalize(card.textContent || '');

  const cardTexts = new Map();
  expertsCards.forEach((card) => {
    cardTexts.set(card, getCardText(card));
  });

  const filterCards = (query) => {
    const normalizedQuery = normalize(query);
    let visibleCount = 0;

    expertsCards.forEach((card) => {
      const matches = !normalizedQuery || cardTexts.get(card).includes(normalizedQuery);
      card.style.display = matches ? '' : 'none';
      if (matches) visibleCount += 1;
    });

    if (visibleCount === 0) {
      expertsGrid?.appendChild(emptyState);
    } else {
      emptyState.remove();
    }
  };

  expertsFilterInput.addEventListener('input', (event) => {
    filterCards(event.target.value);
  });
}
