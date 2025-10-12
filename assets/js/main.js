const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.getAttribute('data-open') === 'true';
    navLinks.setAttribute('data-open', String(!isOpen));
    navToggle.setAttribute('aria-expanded', String(!isOpen));
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
