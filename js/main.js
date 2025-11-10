document.addEventListener('DOMContentLoaded',()=>{
  const content=document.getElementById('content');
  const secciones=[
    'deportes',
    'nacionales',
    'argentina',
    'peliculas',
    'hbo-universal',
    'infantiles',
    'culturales'
  ];
  let html='';
  secciones.forEach(sec=>{
    fetch(secciones/${sec}.html).then(r=>r.text()).then(data=>{
      html+=data;
      content.innerHTML=html;
    });
  });
});
