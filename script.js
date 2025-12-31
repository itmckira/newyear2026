function formatLocalDate() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('zh-Hant-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
  return formatter.format(now);
}

function buildWish(name) {
  const safeName = (name || '').trim();
  const target = safeName ? `給 ${safeName}：` : '';

  // Keep it simple and copy-friendly.
  const lines = [
    target,
    '新年快樂！',
    '願你在 2026 年：',
    '平安健康、事事順心、好運常在。',
    '',
    'Happy New Year!',
    'Wishing you a bright and golden 2026.',
  ].filter(Boolean);

  return lines.join('\n');
}

function setText(el, text) {
  if (!el) return;
  el.textContent = text;
}

async function copyToClipboard(text) {
  if (!text) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for file:// or older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  }
}

(function init() {
  const todayText = document.getElementById('todayText');
  const wishForm = document.getElementById('wishForm');
  const nameInput = document.getElementById('nameInput');
  const outputText = document.getElementById('outputText');
  const copyBtn = document.getElementById('copyBtn');
  const resetBtn = document.getElementById('resetBtn');

  setText(todayText, `今天是 ${formatLocalDate()}`);

  const initial = buildWish('');
  setText(outputText, initial);

  wishForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const next = buildWish(nameInput?.value || '');
    setText(outputText, next);
  });

  copyBtn?.addEventListener('click', async () => {
    const ok = await copyToClipboard(outputText?.textContent || '');
    copyBtn.textContent = ok ? '已複製' : '複製失敗';
    window.setTimeout(() => {
      copyBtn.textContent = '複製';
    }, 1200);
  });

  resetBtn?.addEventListener('click', () => {
    if (nameInput) nameInput.value = '';
    setText(outputText, buildWish(''));
  });
})();
