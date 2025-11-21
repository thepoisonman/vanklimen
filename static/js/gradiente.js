(function () {
  // Tu paleta exacta
  const palette = [
    "#020001", // negro
    "#042bd4", // azul
    "#e93131", // rojo
    "#eb73AF", // rosa
    "#88ff55"  // verde ácido
  ];

  function startSketch(cfg) {
    new p5(function (p) {
      let angle = 0;

      // tamaño fijo para desktop (cuadrado)
      const maxS = cfg.maxCircleSize ? parseInt(cfg.maxCircleSize) : 600;

      // parámetros del shortcode
      const minLayers = cfg.minLayers ? parseInt(cfg.minLayers) : 10;
      const maxLayers = cfg.maxLayers ? parseInt(cfg.maxLayers) : 50;
      const layerSpeed = cfg.layerSpeed ? parseFloat(cfg.layerSpeed) : 0.1;

      p.setup = function () {
        p.createCanvas(maxS, maxS);
        p.noStroke();
      };

      p.draw = function () {
        p.clear();

        // animación estable y continua
        angle += layerSpeed * 0.1;
        const t = (Math.sin(angle) + 1) / 12;
        const layers = p.lerp(minLayers, maxLayers, t);

        const cx = p.width / 2;
        const cy = p.height / 2;

        for (let i = layers; i > 0; i--) {
          const diameter = (i / layers) * maxS;

          // índice interpolado dentro de la paleta
          let cIndex = (i / layers) * (palette.length - 1);
          let c1 = Math.floor(cIndex);
          let c2 = Math.ceil(cIndex);
          let mix = cIndex % 1;

          // colores p5
          let col1 = p.color(palette[c1]);
          let col2 = p.color(palette[c2]);

          // mezcla suave
          let col = p.lerpColor(col1, col2, mix);

          p.fill(col);
          p.ellipse(cx, cy, diameter, diameter);
        }
      };
    }, cfg.containerId);
  }

  // iniciar todas las instancias via shortcode
  window.addEventListener("DOMContentLoaded", () => {
    if (!window.p5Gradients) return;
    Object.values(window.p5Gradients).forEach(startSketch);
  });
})();
