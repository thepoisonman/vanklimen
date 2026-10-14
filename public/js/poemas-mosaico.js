document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('poema-dialog');
  const templates = document.querySelectorAll('#poemas-fuente template');
  if (!dialog || !templates.length) return;

  const titleEl = document.getElementById('poema-dialog-title');
  const textEl = document.getElementById('poema-dialog-text');
  const tiles = document.querySelectorAll('.poema-tile');
  const prevBtn = dialog.querySelector('.poema-dialog-prev');
  const nextBtn = dialog.querySelector('.poema-dialog-next');
  const closeBtn = dialog.querySelector('.poema-dialog-close');

  let current = 0;

  function render(index) {
    current = ((index % templates.length) + templates.length) % templates.length;
    const tpl = templates[current];
    titleEl.textContent = tpl.dataset.titulo;
    textEl.innerHTML = tpl.innerHTML;
    textEl.scrollTop = 0;
  }

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      render(Number(tile.dataset.index));
      dialog.showModal();
    });
  });

  prevBtn.addEventListener('click', () => render(current - 1));
  nextBtn.addEventListener('click', () => render(current + 1));
  closeBtn.addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') render(current + 1);
    if (event.key === 'ArrowLeft') render(current - 1);
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});
