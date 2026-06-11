const ACCESS_USER = 'root';
const ACCESS_PASSWORD = 'ares8814';

function setAdminAccess(enabled) {
  document.querySelectorAll('.admin-only').forEach((item) => { item.hidden = !enabled; });
  localStorage.setItem('immvAdminAccess', enabled ? 'true' : 'false');
}

document.querySelectorAll('[data-access-form]').forEach((form) => {
  const status = form.querySelector('[data-access-status]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const isValid = data.get('username') === ACCESS_USER && data.get('password') === ACCESS_PASSWORD;
    setAdminAccess(isValid);
    status.textContent = isValid ? 'Acceso concedido.' : 'Credenciales incorrectas.';
    if (isValid) form.reset();
  });
});

setAdminAccess(localStorage.getItem('immvAdminAccess') === 'true');
