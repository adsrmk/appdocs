(() => {
  "use strict";

  const data = window.HeursSupportData;
  const ui = data.ui;
  const faqSlug = data.faqSlug;
  const pageContent = document.getElementById("page-content");
  const sidebarNavigation = document.getElementById("sidebar-navigation");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebarClose = document.getElementById("sidebar-close");
  const sidebarBackdrop = document.getElementById("sidebar-backdrop");
  const searchTrigger = document.getElementById("search-trigger");
  const searchDialog = document.getElementById("search-dialog");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const articleBySlug = new Map(data.articles.map((article) => [article.slug, article]));
  const categoryById = new Map(data.categories.map((category) => [category.id, category]));
  let searchSelection = -1;
  let lastFocusedElement = null;

  const icons = {
    rocket: '<path d="M4 13a8 8 0 0 1 7-7 8 8 0 0 1 7-3 8 8 0 0 1-3 7 8 8 0 0 1-7 7l-4-4zM8 17l-2 4-3-3 4-2M13 9h.01"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    plane: '<path d="M4 11h6l4-7h2l-2 7h5l2-2h1l-1 3 1 3h-1l-2-2h-5l2 7h-2l-4-7H4z"/>',
    users: '<path d="M8 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 11a3 3 0 1 0 0-6M2 21a6 6 0 0 1 12 0M15 15a5 5 0 0 1 7 4"/>',
    check: '<path d="M5 12l4 4L19 6"/><path d="M12 22a10 10 0 1 0 0-20"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.16.38.37.72.6 1 .3.32.7.48 1.1.5h.09v4h-.09a1.7 1.7 0 0 0-1.7.5z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    document: '<path d="M6 3h8l4 4v14H6zM14 3v5h5M9 13h6M9 17h5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'
  };

  const icon = (name, className = "") => `<svg class="icon ${className}" aria-hidden="true" viewBox="0 0 24 24">${icons[name] || icons.document}</svg>`;

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);

  const stripHtml = (value) => {
    const element = document.createElement("div");
    element.innerHTML = value;
    return element.textContent || "";
  };

  const normalize = (value) => String(value).toLocaleLowerCase(data.locale).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function renderSidebar() {
    sidebarNavigation.innerHTML = `<div class="docs-nav-group-title">${escapeHtml(ui.sidebarGroup)}</div>` + data.categories.map((category) => {
      const articles = data.articles.filter((article) => article.category === category.id && article.slug !== faqSlug);
      return `
        <section class="docs-nav-section" data-nav-category="${category.id}">
          <button class="docs-nav-heading" type="button" aria-expanded="true">
            <span>${escapeHtml(category.title)}</span>
            <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <ul class="docs-nav-list">
            ${articles.map((article) => `<li><a href="#/article/${article.slug}" data-article-link="${article.slug}">${escapeHtml(article.title)}</a></li>`).join("")}
          </ul>
        </section>`;
    }).join("");

    sidebarNavigation.querySelectorAll(".docs-nav-heading").forEach((button) => {
      button.addEventListener("click", () => {
        const section = button.closest(".docs-nav-section");
        const collapsed = section.classList.toggle("collapsed");
        button.setAttribute("aria-expanded", String(!collapsed));
      });
    });
  }

  function articleLinks(articles) {
    return `<div class="docs-article-list">${articles.map((article) => `
      <a class="docs-article-link" href="#/article/${article.slug}">
        ${icon("document")}
        <div><strong>${escapeHtml(article.title)}</strong><span>${escapeHtml(article.description)}</span></div>
        ${icon("arrow")}
      </a>`).join("")}</div>`;
  }

  function renderHome() {
    const featured = data.featuredSlugs.map((slug) => articleBySlug.get(slug)).filter(Boolean);

    pageContent.innerHTML = `
      <section class="docs-hero">
        <div class="docs-eyebrow">Heurs Support</div>
        <h1>${escapeHtml(ui.homeTitle)}</h1>
        <p>${escapeHtml(ui.homeDescription)}</p>
        <button class="docs-hero-search" type="button" data-open-search>
          ${icon("search")}
          <span>${escapeHtml(ui.searchExample)}</span>
          <kbd>Ctrl K</kbd>
        </button>
      </section>
      <section aria-labelledby="categories-title">
        <h2 class="docs-section-title" id="categories-title">${escapeHtml(ui.browseByTopic)}</h2>
        <div class="docs-category-grid">
          ${data.categories.map((category) => `
            <a class="docs-category-card" href="#/category/${category.id}">
              <span class="docs-category-icon bg-${category.color}-lt text-${category.color}">${icon(category.icon)}</span>
              <div><h3>${escapeHtml(category.title)}</h3><p>${escapeHtml(category.description)}</p></div>
            </a>`).join("")}
        </div>
      </section>
      <section aria-labelledby="popular-title">
        <h2 class="docs-section-title" id="popular-title">${escapeHtml(ui.popular)}</h2>
        ${articleLinks(featured)}
      </section>`;

    document.querySelector("[data-open-search]").addEventListener("click", openSearch);
    setPageMeta(ui.metaTitle, ui.metaDescription);
  }

  function renderCategory(category) {
    const articles = data.articles.filter((article) => article.category === category.id && article.slug !== faqSlug);
    pageContent.innerHTML = `
      <header class="docs-content-header">
        <div class="docs-eyebrow">${escapeHtml(ui.category)}</div>
        <h1>${escapeHtml(category.title)}</h1>
        <p class="lead">${escapeHtml(category.description)}</p>
      </header>
      ${articleLinks(articles)}
      <div class="callout callout-info"><strong>${escapeHtml(ui.contactTitle)}</strong><p>${escapeHtml(ui.contactText)} <a href="mailto:support@heurs.nl">support@heurs.nl</a>.</p></div>`;
    setPageMeta(`${category.title} – Heurs Support`, category.description);
  }

  function renderArticle(article) {
    const category = categoryById.get(article.category);
    const siblings = data.articles.filter((item) => item.category === article.category && item.slug !== faqSlug);
    const currentIndex = siblings.findIndex((item) => item.slug === article.slug);
    const next = currentIndex >= 0 ? siblings[currentIndex + 1] : null;

    pageContent.innerHTML = `
      <article>
        <header class="docs-content-header">
          <div class="docs-eyebrow">${escapeHtml(category?.title || ui.defaultCategory)}</div>
          <h1>${escapeHtml(article.title)}</h1>
        </header>
        <div class="docs-article-body">${article.body}</div>
        ${next ? `<h2 class="docs-section-title mt-5">${escapeHtml(ui.nextGuide)}</h2>${articleLinks([next])}` : ""}
        <section class="docs-feedback" aria-label="${escapeHtml(ui.feedbackQuestion)}">
          <strong>${escapeHtml(ui.feedbackQuestion)}</strong>
          <div class="docs-feedback-actions">
            <button class="btn btn-sm btn-outline-secondary" type="button" data-feedback="yes">${escapeHtml(ui.yes)}</button>
            <button class="btn btn-sm btn-outline-secondary" type="button" data-feedback="no">${escapeHtml(ui.no)}</button>
          </div>
        </section>
      </article>`;

    document.querySelectorAll("[data-feedback]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelector(".docs-feedback").innerHTML = `<span class="docs-feedback-result">${escapeHtml(ui.feedbackThanks)}</span>`;
      });
    });
    setPageMeta(`${article.title} – Heurs Support`, article.description);
  }

  function renderNotFound() {
    pageContent.innerHTML = `
      <div class="empty py-6">
        <div class="empty-img">${icon("search")}</div>
        <p class="empty-title">${escapeHtml(ui.notFoundTitle)}</p>
        <p class="empty-subtitle text-secondary">${escapeHtml(ui.notFoundText)}</p>
        <div class="empty-action"><a href="#/" class="btn btn-primary">${escapeHtml(ui.backToSupport)}</a></div>
      </div>`;
    setPageMeta(`${ui.notFoundTitle} – Heurs Support`, ui.notFoundText);
  }

  function setPageMeta(title, description) {
    document.title = title;
    document.querySelector('meta[name="description"]').setAttribute("content", description);
  }

  function route() {
    const path = location.hash.replace(/^#\/?/, "");
    const parts = path.split("/").filter(Boolean);

    if (!parts.length) {
      renderHome();
    } else if (parts[0] === "article" && articleBySlug.has(parts[1])) {
      renderArticle(articleBySlug.get(parts[1]));
    } else if (parts[0] === "category" && categoryById.has(parts[1])) {
      renderCategory(categoryById.get(parts[1]));
    } else {
      renderNotFound();
    }

    updateNavigation(parts);
    closeSidebar();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function updateNavigation(parts) {
    sidebarNavigation.querySelectorAll("[data-article-link]").forEach((link) => link.classList.remove("active"));
    sidebarNavigation.querySelectorAll(".docs-nav-section").forEach((section) => {
      section.classList.remove("collapsed");
      section.classList.remove("is-active");
      section.querySelector(".docs-nav-heading").setAttribute("aria-expanded", "true");
    });

    if (parts[0] === "article") {
      const activeLink = sidebarNavigation.querySelector(`[data-article-link="${CSS.escape(parts[1])}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
        const section = activeLink.closest(".docs-nav-section");
        section.classList.remove("collapsed");
        section.classList.add("is-active");
        section.querySelector(".docs-nav-heading").setAttribute("aria-expanded", "true");
      }
    } else if (parts[0] === "category") {
      const section = sidebarNavigation.querySelector(`[data-nav-category="${CSS.escape(parts[1])}"]`);
      if (section) {
        section.classList.remove("collapsed");
        section.classList.add("is-active");
        section.querySelector(".docs-nav-heading").setAttribute("aria-expanded", "true");
      }
    }
  }

  function openSidebar() {
    document.body.classList.add("sidebar-open");
    document.getElementById("docs-sidebar").removeAttribute("inert");
    sidebarBackdrop.hidden = false;
    sidebarToggle.setAttribute("aria-expanded", "true");
    sidebarToggle.setAttribute("aria-label", ui.navigationClose);
  }

  function closeSidebar() {
    document.body.classList.remove("sidebar-open");
    if (window.matchMedia("(max-width: 991.98px)").matches) {
      document.getElementById("docs-sidebar").setAttribute("inert", "");
    }
    sidebarBackdrop.hidden = true;
    sidebarToggle.setAttribute("aria-expanded", "false");
    sidebarToggle.setAttribute("aria-label", ui.navigationOpen);
  }

  function toggleSidebar() {
    document.body.classList.contains("sidebar-open") ? closeSidebar() : openSidebar();
  }

  function openSearch() {
    lastFocusedElement = document.activeElement;
    searchDialog.hidden = false;
    document.body.classList.add("search-open");
    searchInput.value = "";
    searchSelection = -1;
    renderSearchResults("");
    requestAnimationFrame(() => searchInput.focus());
  }

  function closeSearch() {
    if (searchDialog.hidden) return;
    searchDialog.hidden = true;
    document.body.classList.remove("search-open");
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  }

  function scoreArticle(article, query, terms) {
    const title = normalize(article.title);
    const description = normalize(article.description);
    const keywords = normalize(article.keywords.join(" "));
    const body = normalize(stripHtml(article.body));
    let score = 0;
    if (title.includes(query)) score += 18;
    if (keywords.includes(query)) score += 12;
    if (description.includes(query)) score += 8;
    for (const term of terms) {
      if (title.includes(term)) score += 7;
      if (keywords.includes(term)) score += 5;
      if (description.includes(term)) score += 3;
      if (body.includes(term)) score += 1;
    }
    return score;
  }

  function highlight(value, terms) {
    let safe = escapeHtml(value);
    for (const term of terms.filter((item) => item.length > 1)) {
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      safe = safe.replace(new RegExp(`(${escapedTerm})`, "ig"), "<mark>$1</mark>");
    }
    return safe;
  }

  function getSearchMatches(value) {
    const query = normalize(value.trim());
    if (!query) {
      return data.featuredSlugs.map((slug) => ({ article: articleBySlug.get(slug), score: 1 })).filter((item) => item.article);
    }
    const terms = query.split(/\s+/).filter(Boolean);
    const minimumScore = terms.length === 1 ? 2 : terms.length * 2;
    return data.articles
      .map((article) => ({ article, score: scoreArticle(article, query, terms) }))
      .filter((result) => result.score >= minimumScore)
      .sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title, data.locale))
      .slice(0, 8);
  }

  function renderSearchResults(value) {
    const matches = getSearchMatches(value);
    const terms = normalize(value.trim()).split(/\s+/).filter(Boolean);
    searchSelection = matches.length ? 0 : -1;

    if (!matches.length) {
      searchResults.innerHTML = `<div class="search-state">${escapeHtml(ui.noResults)} <strong>“${escapeHtml(value)}”</strong>.<br><span class="small">${escapeHtml(ui.tryAnother)}</span></div>`;
      return;
    }

    searchResults.innerHTML = `
      <div class="px-2 pt-1 pb-2 small text-secondary">${value.trim() ? `${matches.length} ${escapeHtml(ui.results)}` : escapeHtml(ui.popularGuides)}</div>
      ${matches.map(({ article }, index) => `
        <a class="search-result${index === 0 ? " active" : ""}" href="#/article/${article.slug}" role="option" aria-selected="${index === 0}" data-search-result>
          <span class="search-result-icon">${icon("document")}</span>
          <span class="search-result-copy">
            <span class="search-result-title">${highlight(article.title, terms)}</span>
            <span class="search-result-description">${highlight(article.description, terms)}</span>
          </span>
          ${icon("arrow")}
        </a>`).join("")}`;
  }

  function moveSearchSelection(direction) {
    const results = Array.from(searchResults.querySelectorAll("[data-search-result]"));
    if (!results.length) return;
    searchSelection = (searchSelection + direction + results.length) % results.length;
    results.forEach((result, index) => {
      const active = index === searchSelection;
      result.classList.toggle("active", active);
      result.setAttribute("aria-selected", String(active));
      if (active) result.scrollIntoView({ block: "nearest" });
    });
  }

  renderSidebar();
  route();
  if (window.matchMedia("(max-width: 991.98px)").matches) {
    document.getElementById("docs-sidebar").setAttribute("inert", "");
  }
  document.getElementById("current-year").textContent = new Date().getFullYear();

  window.addEventListener("hashchange", route);
  sidebarToggle.addEventListener("click", toggleSidebar);
  sidebarClose.addEventListener("click", closeSidebar);
  sidebarBackdrop.addEventListener("click", closeSidebar);
  searchTrigger.addEventListener("click", openSearch);
  searchInput.addEventListener("input", (event) => renderSearchResults(event.target.value));
  searchDialog.querySelectorAll("[data-search-close]").forEach((element) => element.addEventListener("click", closeSearch));
  searchResults.addEventListener("click", (event) => {
    if (event.target.closest("[data-search-result]")) closeSearch();
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      searchDialog.hidden ? openSearch() : closeSearch();
      return;
    }
    if (!searchDialog.hidden) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearch();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        moveSearchSelection(1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        moveSearchSelection(-1);
      } else if (event.key === "Enter" && searchSelection >= 0) {
        const selected = searchResults.querySelectorAll("[data-search-result]")[searchSelection];
        if (selected) {
          event.preventDefault();
          selected.click();
        }
      }
    }
  });

  window.matchMedia("(min-width: 992px)").addEventListener("change", (event) => {
    if (event.matches) {
      closeSidebar();
      document.getElementById("docs-sidebar").removeAttribute("inert");
    } else {
      closeSidebar();
    }
  });
})();
