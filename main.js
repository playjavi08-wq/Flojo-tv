// Esperar que cargue todo antes de quitar el loader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').style.display = 'none', 2200);
  loadSections();
  startSlider();
});

// --- Cargar secciones dinámicamente ---
const sections = [
  "secciones/deportes.html",
  "secciones/nacionales.html",
  "secciones/argentina.html",
  "secciones/peliculas.html",
  "secciones/hbo-universal.html",
  "secciones/infantiles.html",
  "secciones/culturales.html"
];
async function loadSections(){
  const content = document.getElementById('content');
  for (const src of sections){
    const res = await fetch(src);
    const html = await res.text();
    content.insertAdjacentHTML('beforeend', html);
  }
  document.querySelector('.card')?.focus();
}

// --- Slider automático ---
let index = 0;
function startSlider(){
  const slides = document.getElementById('slides');
  const total = slides.children.length;
  function show(i){
    index = (i + total) % total;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }
  document.getElementById("next").onclick = () => show(index + 1);
  document.getElementById("prev").onclick = () => show(index - 1);
  setInterval(() => show(index + 1), 5000);
}

// --- Control remoto / navegación teclado ---
document.addEventListener('keydown', e => {
  const f = document.activeElement;
  if (f.classList.contains('card')){
    const car = f.parentElement;
    if (e.key === 'ArrowRight'){ f.nextElementSibling?.focus(); car.scrollBy({left:160,behavior:'smooth'}); }
    if (e.key === 'ArrowLeft'){ f.previousElementSibling?.focus(); car.scrollBy({left:-160,behavior:'smooth'}); }
    if (e.key === 'ArrowDown'){ f.closest('.section').nextElementSibling?.querySelector('.card')?.focus(); }
    if (e.key === 'ArrowUp'){ document.getElementById('sliderFocus').focus(); } // salir de un toque ↑
    if (e.key === 'Enter' || e.key === 'OK'){ f.click(); }
  }
  if (f.id === 'sliderFocus'){
    if (e.key === 'ArrowRight') startSlider(index + 1);
    if (e.key === 'ArrowLeft') startSlider(index - 1);
    if (e.key === 'ArrowDown') document.querySelector('.card')?.focus();
  }
});