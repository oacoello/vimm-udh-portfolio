const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const postsGrid = document.getElementById('postsGrid');
const featuredGrid = document.getElementById('featuredGrid');
const homeVideoGrid = document.getElementById('homeVideoGrid');
const videoGrid = document.getElementById('videoGrid');
const videoEmptyState = document.getElementById('videoEmptyState');
const emptyState = document.getElementById('emptyState');
const postSearch = document.getElementById('postSearch');
const categoryFilters = document.getElementById('categoryFilters');
const posts = Array.isArray(window.PROJECT_POSTS) ? window.PROJECT_POSTS : [];
const standaloneVideos = Array.isArray(window.STANDALONE_VIDEOS) ? window.STANDALONE_VIDEOS : [];

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

function formatDate(date) {
  if (!date) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-HN', { dateStyle: 'medium' }).format(new Date(`${date}T00:00:00`));
}

function postUrl(post) {
  return `posts/${encodeURIComponent(post.id)}.html`;
}

function youtubeEmbedUrl(url = '') {
  const match = String(url).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
}

function youtubeVideoId(url = '') {
  const match = String(url).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
  return match ? match[1] : '';
}

function youtubeThumbnailUrl(url = '') {
  const id = youtubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
}

function getVideos() {
  const postVideos = posts.flatMap((post) =>
    (post.youtube ?? [])
      .map((url, index) => ({
        id: `${post.id}-${index}`,
        title: post.title,
        category: post.category,
        postUrl: postUrl(post),
        embedUrl: youtubeEmbedUrl(url),
        sourceUrl: url,
        thumbnailUrl: youtubeThumbnailUrl(url),
        description: post.excerpt,
      }))
      .filter((video) => video.embedUrl)
  );

  const independentVideos = standaloneVideos
    .map((video) => ({
      id: video.id,
      title: video.title,
      category: video.category || 'Video',
      postUrl: video.link || '',
      embedUrl: youtubeEmbedUrl(video.youtube || video.url),
      sourceUrl: video.youtube || video.url,
      thumbnailUrl: video.thumbnail || youtubeThumbnailUrl(video.youtube || video.url),
      description: video.description,
    }))
    .filter((video) => video.embedUrl);

  return [...independentVideos, ...postVideos];
}

function postCard(post) {
  return `
    <article class="blog-card">
      ${post.coverImage ? `<img src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.title)}" loading="lazy">` : '<div class="blog-card-placeholder">UDH</div>'}
      <div class="blog-card-body">
        <span class="proj-tag">${escapeHtml(post.category || 'Publicación')}</span>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt || 'Publicación estudiantil.')}</p>
        <div class="post-meta">
          <span>${escapeHtml(post.author || 'Autor pendiente')}</span>
          <span>${formatDate(post.date)}</span>
        </div>
        <div class="project-tech">
          ${(post.tags ?? []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}
        </div>
      </div>
      <div class="project-footer">
        <a class="proj-link" href="${postUrl(post)}">Leer publicación →</a>
      </div>
    </article>
  `;
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

  postsGrid.innerHTML = filteredPosts.map(postCard).join('');
  emptyState.hidden = filteredPosts.length > 0;
}

function renderFeaturedPosts() {
  if (!featuredGrid) return;
  featuredGrid.innerHTML = posts
    .filter((post) => post.category === 'Proyectos')
    .slice(0, 3)
    .map(postCard)
    .join('');
}

function videoCard(video) {
  return `
    <article class="video-card">
      <a class="video-thumbnail" href="${escapeHtml(video.sourceUrl || video.embedUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Ver video: ${escapeHtml(video.title)}">
        ${video.thumbnailUrl ? `<img src="${escapeHtml(video.thumbnailUrl)}" alt="${escapeHtml(video.title)}" loading="lazy">` : '<div class="blog-card-placeholder">VIDEO</div>'}
        <span class="play-badge">▶</span>
      </a>
      <div class="video-card-body">
        <span class="proj-tag">${escapeHtml(video.category || 'Video')}</span>
        <h3>${escapeHtml(video.title)}</h3>
        ${video.description ? `<p>${escapeHtml(video.description)}</p>` : ''}
        ${video.postUrl ? `<a class="proj-link" href="${escapeHtml(video.postUrl)}">Ver más →</a>` : ''}
      </div>
    </article>
  `;
}

function renderHomeVideos() {
  if (!homeVideoGrid) return;
  const videos = getVideos().slice(0, 2);
  homeVideoGrid.innerHTML = videos.length
    ? videos.map(videoCard).join('')
    : '<div class="empty-state"><h3>Videos pendientes</h3><p>Cuando agregues videos de YouTube a posts o a videos.js, aparecerán aquí automáticamente.</p></div>';
}

function renderVideoGallery() {
  if (!videoGrid || !videoEmptyState) return;
  const videos = getVideos();
  videoGrid.innerHTML = videos.map(videoCard).join('');
  videoEmptyState.hidden = videos.length > 0;
}

window.addEventListener('scroll', updateNavbarShadow, { passive: true });
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
renderPosts();
renderFeaturedPosts();
renderHomeVideos();
renderVideoGallery();
