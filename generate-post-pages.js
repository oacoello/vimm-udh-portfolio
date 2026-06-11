const fs = require('fs');
const path = require('path');

const root = __dirname;
const postsFile = path.join(root, 'posts.js');
const postsDir = path.join(root, 'posts');

global.window = {};
const source = fs.readFileSync(postsFile, 'utf8');
new Function('window', source)(global.window);

const posts = Array.isArray(global.window.PROJECT_POSTS)
  ? global.window.PROJECT_POSTS
  : [];

fs.mkdirSync(postsDir, { recursive: true });

function pageTemplate(post) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title id="postTitle">${post.title} — Ingeniería Militar en Mecatrónica</title>
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

for (const post of posts) {
  if (!post.id) continue;
  fs.writeFileSync(
    path.join(postsDir, `${post.id}.html`),
    pageTemplate(post),
    'utf8'
  );
}

console.log(`Generated ${posts.length} post page(s) in ${postsDir}`);
