/* Estrelinhas atmosféricas com três planos de profundidade.
   Espalhadas por toda a capa, discretas sobre as regiões de leitura.
   Os desenhos/brasões originais não são alterados. */
(function () {
  const covers = document.querySelectorAll(
    '.profile-cover, .language-cover, .lunareth-cover, .houses-cover, .house-detail-cover'
  );

  const seededRandom = seed => () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const layers = [
    { name:'far',  count:64, dotRatio:.84, size:[.7,1.7], alpha:[.13,.31], drift:9,  duration:[20,33] },
    { name:'mid',  count:48, dotRatio:.64, size:[1.2,2.45], alpha:[.18,.41], drift:18, duration:[15,26] },
    { name:'near', count:24, dotRatio:.54, size:[1.8,3.1], alpha:[.21,.46], drift:26, duration:[12,21] }
  ];

  covers.forEach((cover, index) => {
    if (cover.querySelector('.banner-sparkles')) return;
    const rand = seededRandom(42813 + index * 19337);
    const sky = document.createElement('div');
    sky.className = 'banner-sparkles';
    sky.setAttribute('aria-hidden', 'true');

    layers.forEach(({ name, count, dotRatio, size, alpha, drift, duration }) => {
      const plane = document.createElement('div');
      plane.className = `sky-depth sky-depth-${name}`;
      for (let i = 0; i < count; i++) {
        const star = document.createElement('span');
        const roll = rand();
        const isDot = roll < dotRatio;
        const glimmer = !isDot && rand() > .83;
        star.className = 'flying-star ' + (isDot ? 'star-dot' : (glimmer ? 'star-glimmer' : 'star-cross'));
        if (rand() < .15) star.classList.add('rare-glint');
        if (!isDot) star.textContent = glimmer ? '✧' : '✦';

        // Cobertura completa, sem concentração apenas no meio.
        // Sobre títulos, o brilho é mais discreto para preservar a leitura.
        const x = 4 + rand() * 92;
        const y = 5 + rand() * 87;
        const readingZone = x < 43 && y > 22 && y < 83;
        const scale = isDot ? 1 : glimmer ? 3.35 : 2.6;
        const px = (size[0] + rand() * (size[1] - size[0])) * scale;
        let opacity = alpha[0] + rand() * (alpha[1] - alpha[0]);
        if (readingZone) opacity *= .64;
        if (x > 80) opacity *= .92;

        star.style.setProperty('--x', x.toFixed(2) + '%');
        star.style.setProperty('--y', y.toFixed(2) + '%');
        star.style.setProperty('--size', px.toFixed(2) + 'px');
        star.style.setProperty('--opacity', opacity.toFixed(3));
        star.style.setProperty('--dx', ((rand() - .5) * drift * 2).toFixed(1) + 'px');
        star.style.setProperty('--dy', ((rand() - .5) * drift * 1.8).toFixed(1) + 'px');
        star.style.setProperty('--duration', (duration[0] + rand() * (duration[1] - duration[0])).toFixed(2) + 's');
        star.style.setProperty('--twinkle-duration', (4.1 + rand() * 5.5).toFixed(2) + 's');
        star.style.setProperty('--delay', (-rand() * 29).toFixed(2) + 's');
        star.style.setProperty('--glint-duration', (9 + rand() * 17).toFixed(2) + 's');
        plane.appendChild(star);
      }
      sky.appendChild(plane);
    });
    cover.appendChild(sky);
  });

  // Parallax pequeno, proporcional à distância das estrelas.
  // A atualização acontece no quadro de animação, não em cada evento do mouse.
  const root = document.documentElement;
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0, frame = 0;
  const reduced = () => document.body.classList.contains('reduce-motion') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function moveFrame() {
    frame = 0;
    if (reduced()) {
      root.style.setProperty('--sky-far-x','0px'); root.style.setProperty('--sky-far-y','0px');
      root.style.setProperty('--sky-mid-x','0px'); root.style.setProperty('--sky-mid-y','0px');
      root.style.setProperty('--sky-near-x','0px'); root.style.setProperty('--sky-near-y','0px');
      currentX = currentY = 0;
      return;
    }
    currentX += (targetX - currentX) * .065;
    currentY += (targetY - currentY) * .065;
    for(const [name, strength] of [['far',1],['mid',3.5],['near',7]]) {
      root.style.setProperty(`--sky-${name}-x`, (currentX * strength).toFixed(2) + 'px');
      root.style.setProperty(`--sky-${name}-y`, (currentY * strength).toFixed(2) + 'px');
    }
    if (Math.abs(targetX-currentX) > .001 || Math.abs(targetY-currentY) > .001) frame=requestAnimationFrame(moveFrame);
  }
  function queueMove() { if (!frame) frame=requestAnimationFrame(moveFrame); }
  document.addEventListener('pointermove', event => {
    if(reduced() || event.pointerType === 'touch') return;
    targetX = event.clientX / Math.max(window.innerWidth, 1) - .5;
    targetY = event.clientY / Math.max(window.innerHeight, 1) - .5;
    queueMove();
  }, { passive:true });
  document.addEventListener('pointerleave', () => { targetX=0; targetY=0; queueMove(); }, { passive:true });
  document.querySelector('#motionToggle')?.addEventListener('click', () => {
    targetX=0;targetY=0;queueMove();
  });
})();
