const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const postsGrid = document.getElementById('postsGrid');
const postDetail = document.getElementById('postDetail');
const emptyState = document.getElementById('emptyState');
const postSearch = document.getElementById('postSearch');
const categoryFilters = document.getElementById('categoryFilters');
const posts = Array.isArray(window.PROJECT_POSTS) ? window.PROJECT_POSTS : [];

function updateNavbarShadow() {
  navbar?.classList.toggle('scrolled', window.scrollY > 8);
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function youtubeEmbedUrl(url = '') {
  const match = String(url).match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
}

function formatDate(date) {
  if (!date) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-HN', { dateStyle: 'medium' }).format(new Date(`${date}T00:00:00`));
}

function getCategories() {
  return ['Todos', ...new Set(posts.map((post) => post.category).filter(Boolean))];
}

function renderCategoryFilters() {
  if (!categoryFilters) return;
  categoryFilters.innerHTML = getCategories()
    .map((category, index) => `
      <button class="filter-btn ${index === 0 ? 'active' : ''}" data-category="${escapeHtml(category)}">
        ${escapeHtml(category)}
      </button>
    `)
    .join('');
}

function renderPosts() {
  if (!postsGrid || !emptyState) return;

  const query = postSearch?.value.trim().toLowerCase() ?? '';
  const activeCategory = categoryFilters?.querySelector('.filter-btn.active')?.dataset.category ?? 'Todos';

  const filteredPosts = posts.filter((post) => {
    const content = [
      post.title,
      post.author,
      post.category,
      post.excerpt,
      ...(post.tags ?? [])
    ].join(' ').toLowerCase();

    const matchesSearch = !query || content.includes(query);
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  postsGrid.innerHTML = filteredPosts.map((post) => `
    <article class="blog-card">
      ${post.coverImage ? `<img src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.title)}" loading="lazy">` : '<div class="blog-card-placeholder">IMM-V</div>'}
      <div class="blog-card-body">
        <span class="proj-tag">${escapeHtml(post.category || 'Proyecto')}</span>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt || 'Publicación de proyecto estudiantil.')}</p>
        <div class="post-meta">
          <span>${escapeHtml(post.author || 'Autor pendiente')}</span>
          <span>${formatDate(post.date)}</span>
        </div>
        <div class="project-tech">
          ${(post.tags ?? []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}
        </div>
      </div>
      <div class="project-footer">
        <a class="proj-link" href="#post/${encodeURIComponent(post.id)}">Leer publicación →</a>
      </div>
    </article>
  `).join('');

  emptyState.hidden = filteredPosts.length > 0;
}

function renderPostDetail(post) {
  if (!postDetail || !postsGrid) return;

  const videos = (post.youtube ?? [])
    .map(youtubeEmbedUrl)
    .filter(Boolean)
    .map((url) => `
      <div class="video-frame">
        <iframe src="${escapeHtml(url)}" title="${escapeHtml(post.title)}" allowfullscreen loading="lazy"></iframe>
      </div>
    `)
    .join('');

  postDetail.innerHTML = `
    <a class="back-link" href="#proyectos">← Volver a publicaciones</a>
    <header class="post-header">
      <span class="section-tag">${escapeHtml(post.category || 'Proyecto')}</span>
      <h2>${escapeHtml(post.title)}</h2>
      <div class="post-meta">
        <span>${escapeHtml(post.author || 'Autor pendiente')}</span>
        <span>${formatDate(post.date)}</span>
      </div>
    </header>
    ${post.coverImage ? `<img class="post-cover" src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.title)}">` : ''}
    <div class="post-content">
      ${(post.content ?? []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
    </div>
    ${videos ? `<div class="post-media"><h3>Videos</h3>${videos}</div>` : ''}
    ${(post.images ?? []).length ? `
      <div class="post-gallery">
        ${(post.images ?? []).map((image) => `<img src="${escapeHtml(image)}" alt="${escapeHtml(post.title)}" loading="lazy">`).join('')}
      </div>
    ` : ''}
    ${(post.links ?? []).length ? `
      <div class="post-links">
        <h3>Recursos</h3>
        ${(post.links ?? []).map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join('')}
      </div>
    ` : ''}
  `;

  postDetail.hidden = false;
  postsGrid.hidden = true;
  emptyState.hidden = true;
}

function route() {
  const [, postId] = window.location.hash.match(/^#post\/(.+)$/) ?? [];
  const post = posts.find((item) => item.id === decodeURIComponent(postId ?? ''));

  if (post) {
    renderPostDetail(post);
    return;
  }

  if (postDetail && postsGrid) {
    postDetail.hidden = true;
    postsGrid.hidden = false;
  }
  renderPosts();
}

window.addEventListener('scroll', updateNavbarShadow, { passive: true });
window.addEventListener('hashchange', route);
postSearch?.addEventListener('input', renderPosts);
categoryFilters?.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLButtonElement)) return;
  categoryFilters.querySelectorAll('.filter-btn').forEach((button) => button.classList.remove('active'));
  event.target.classList.add('active');
  renderPosts();
});

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open') ?? false;
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

updateNavbarShadow();
renderCategoryFilters();
route();
