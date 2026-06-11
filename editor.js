if (localStorage.getItem('immvAdminAccess') !== 'true') {
  window.location.href = 'index.html';
}

const form = document.getElementById('postEditorForm');
const generatedPost = document.getElementById('generatedPost');
const postPreview = document.getElementById('postPreview');
const copyPost = document.getElementById('copyPost');
const downloadPost = document.getElementById('downloadPost');
const downloadHtml = document.getElementById('downloadHtml');
const importPostTxt = document.getElementById('importPostTxt');
const videoUrlInput = document.getElementById('videoUrlInput');
const addVideo = document.getElementById('addVideo');
const editorStatus = document.getElementById('editorStatus');

function slugify(value) {
  return String(value || 'proyecto')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'proyecto';
}

function lines(value) {
  return String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function paragraphs(value) {
  return String(value || '')
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseLinks(value) {
  return lines(value).map((line) => {
    const [label, ...urlParts] = line.split('|').map((item) => item.trim());
    return { label: label || 'Enlace', url: urlParts.join('|') || '#' };
  });
}

function stringifyLinks(links = []) {
  return links
    .map((link) => `${link.label || 'Enlace'} | ${link.url || ''}`)
    .join('\n');
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getPostFromForm() {
  const data = new FormData(form);
  const title = data.get('title') || '';

  return {
    id: slugify(title),
    title: String(title).trim(),
    author: String(data.get('author') || '').trim(),
    date: String(data.get('date') || '').trim(),
    category: String(data.get('category') || '').trim(),
    tags: String(data.get('tags') || '').split(',').map((tag) => tag.trim()).filter(Boolean),
    excerpt: String(data.get('excerpt') || '').trim(),
    coverImage: String(data.get('coverImage') || '').trim(),
    youtube: lines(data.get('youtube')),
    images: lines(data.get('images')),
    content: paragraphs(data.get('content')),
    links: parseLinks(data.get('links'))
  };
}

function cleanPost(post) {
  return Object.fromEntries(
    Object.entries(post).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== '';
    })
  );
}

function updateEditor() {
  const post = getPostFromForm();
  const clean = cleanPost(post);
  const videoCount = post.youtube.length;
  const code = `${JSON.stringify(clean, null, 2)},`;

  generatedPost.textContent = code;
  postPreview.innerHTML = `
    ${post.coverImage ? `<img src="${escapeHtml(post.coverImage)}" alt="${escapeHtml(post.title)}">` : '<div class="blog-card-placeholder">IMM-V</div>'}
    <div class="blog-card-body">
      <span class="proj-tag">${escapeHtml(post.category || 'Proyecto')}</span>
      <h3>${escapeHtml(post.title || 'Título del proyecto')}</h3>
      <p>${escapeHtml(post.excerpt || 'Resumen breve del proyecto.')}</p>
      <div class="post-meta">
        <span>${escapeHtml(post.author || 'Autor pendiente')}</span>
        <span>${escapeHtml(post.date || 'Sin fecha')}</span>
      </div>
      <div class="project-tech">
        ${post.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}
      </div>
      ${videoCount ? `<p class="preview-note">${videoCount} video${videoCount === 1 ? '' : 's'} de YouTube agregado${videoCount === 1 ? '' : 's'}.</p>` : ''}
    </div>
  `;
}

function setField(name, value) {
  const field = form.elements[name];
  if (field) field.value = Array.isArray(value) ? value.join('\n') : (value ?? '');
}

function fillFormFromPost(post) {
  setField('title', post.title);
  setField('author', post.author);
  setField('date', post.date);
  setField('category', post.category);
  setField('tags', Array.isArray(post.tags) ? post.tags.join(', ') : post.tags);
  setField('excerpt', post.excerpt);
  setField('coverImage', post.coverImage);
  setField('youtube', post.youtube);
  setField('images', post.images);
  setField('content', post.content);
  setField('links', Array.isArray(post.links) ? stringifyLinks(post.links) : post.links);
  updateEditor();
}

function parseGeneratedPostText(text) {
  const cleanText = text.trim().replace(/,\s*$/, '');
  return JSON.parse(cleanText);
}

async function importGeneratedPost(event) {
  const [file] = event.target.files;
  if (!file) return;

  try {
    const text = await file.text();
    const post = parseGeneratedPostText(text);
    fillFormFromPost(post);
    editorStatus.textContent = `Post importado desde ${file.name}. Revisá la previsualización antes de copiar.`;
  } catch (error) {
    editorStatus.textContent = 'No pude importar ese archivo. Tiene que ser el .txt generado por este editor.';
  } finally {
    event.target.value = '';
  }
}

function addVideoUrl() {
  const url = videoUrlInput.value.trim();
  if (!url) return;

  const youtubeField = form.elements.youtube;
  const currentVideos = lines(youtubeField.value);

  if (!currentVideos.includes(url)) {
    currentVideos.push(url);
  }

  youtubeField.value = currentVideos.join('\n');
  videoUrlInput.value = '';
  updateEditor();
  editorStatus.textContent = 'Video agregado al post.';
}

async function copyGeneratedPost() {
  try {
    await navigator.clipboard.writeText(generatedPost.textContent);
    editorStatus.textContent = 'Bloque copiado. Pegalo dentro del arreglo PROJECT_POSTS en posts.js.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(generatedPost);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    editorStatus.textContent = 'No se pudo copiar automático. El bloque quedó seleccionado: presioná Ctrl+C.';
  }
}

function downloadGeneratedPost() {
  const blob = new Blob([generatedPost.textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${slugify(getPostFromForm().title)}-post.txt`;
  link.click();
  URL.revokeObjectURL(url);
  editorStatus.textContent = 'Archivo descargado.';
}

function postHtmlTemplate(post) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title id="postTitle">${post.title || 'Nueva publicación'} — Ingeniería Militar en Mecatrónica</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css" />
</head>
<body data-asset-base="../">
  <nav id="navbar">
    <div class="nav-inner">
      <a href="../index.html" class="nav-logo">
        <img class="nav-logo-img" src="../assets/images/udhlogo0.png" alt="Logo UDH">
      </a>
      <ul class="nav-links">
        <li><a href="../index.html">Inicio</a></li>
        <li><a href="../projects.html">Proyectos</a></li>
      </ul>
    </div>
  </nav>
  <main class="section page-top">
    <div id="postRoot" class="container"></div>
  </main>
  <script>window.POST_ID = ${JSON.stringify(post.id)};</script>
  <script src="../posts.js"></script>
  <script src="../post-page.js"></script>
</body>
</html>
`;
}

function downloadGeneratedHtml() {
  const post = getPostFromForm();
  const blob = new Blob([postHtmlTemplate(post)], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${post.id}.html`;
  link.click();
  URL.revokeObjectURL(url);
  editorStatus.textContent = `Página descargada. Guardala en la carpeta posts/ como ${post.id}.html.`;
}

form.addEventListener('input', updateEditor);
form.addEventListener('reset', () => setTimeout(updateEditor, 0));
copyPost.addEventListener('click', copyGeneratedPost);
downloadPost.addEventListener('click', downloadGeneratedPost);
downloadHtml.addEventListener('click', downloadGeneratedHtml);
importPostTxt.addEventListener('change', importGeneratedPost);
addVideo.addEventListener('click', addVideoUrl);
videoUrlInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addVideoUrl();
  }
});

updateEditor();
