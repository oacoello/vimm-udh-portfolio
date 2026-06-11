const form = document.getElementById('postEditorForm');
const generatedPost = document.getElementById('generatedPost');
const postPreview = document.getElementById('postPreview');
const copyPost = document.getElementById('copyPost');
const downloadPost = document.getElementById('downloadPost');
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
    </div>
  `;
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

form.addEventListener('input', updateEditor);
form.addEventListener('reset', () => setTimeout(updateEditor, 0));
copyPost.addEventListener('click', copyGeneratedPost);
downloadPost.addEventListener('click', downloadGeneratedPost);

updateEditor();
