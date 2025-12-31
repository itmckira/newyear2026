function initSparkles() {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  if (reduce) return;

  const host = document.getElementById('sparkles');
  if (!host) return;

  const count = 44;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const s = document.createElement('span');
    s.className = 'sparkle';

    const size = 6 + Math.floor(Math.random() * 10);
    const dur = 2.9 + Math.random() * 3.4;
    const delay = Math.random() * 4.8;

    s.style.setProperty('--size', `${size}px`);
    s.style.setProperty('--dur', `${dur}s`);
    s.style.setProperty('--delay', `${delay}s`);

    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;

    frag.appendChild(s);
  }

  host.appendChild(frag);
}

(function init() {
  initSparkles();
})();
