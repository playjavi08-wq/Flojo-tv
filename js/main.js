document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');

  // Lista de secciones (en el orden que querés)
  const secciones = [
    'deportes',
    'nacionales',
    'argentina',
    'peliculas',
    'hbo-universal',
    'infantiles',
    'culturales'
  ];

  // Detecta si estamos en GitHub Pages o AppCreator
  const basePath = window.location.origin + window.location.pathname.replace(/index\.html$/, '');

  // Cargar las secciones dinámicamente
  async function cargarSecciones() {
    for (const sec of secciones) {
      try {
        const response = await fetch(${basePath}secciones/${sec}.html);
        if (!response.ok) throw new Error('No se pudo cargar ' + sec);
        const html = await response.text();
        content.insertAdjacentHTML('beforeend', html);
      } catch (error) {
        console.warn('⚠️ Error al cargar sección:', sec, error);
      }
    }
  }

  cargarSecciones();
});
