// Simple renderer: loads docs/data/scholarships.json and shows searchable cards.
const listEl = document.getElementById('list');
const searchEl = document.getElementById('search');
const levelEl = document.getElementById('levelFilter');
const countryEl = document.getElementById('countryFilter');

let scholarships = [];

function render(filtered){
  listEl.innerHTML = '';
  if(!filtered.length){
    listEl.innerHTML = '<p>No scholarships found. Try clearing filters or add entries to <code>docs/data/scholarships.json</code>.</p>';
    return;
  }
  filtered.forEach(s => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${escapeHtml(s.name)}</h3>
      <div class="meta">${escapeHtml(s.provider)} • ${escapeHtml(s.level)} • ${escapeHtml(s.country || '—')}</div>
      <div class="description">${escapeHtml(s.description || '')}</div>
      <div class="meta">Eligibility: ${escapeHtml(s.eligible || 'Check provider')}</div>
      <div class="meta">Deadline: ${escapeHtml(s.deadline || 'Open / rolling / see provider')}</div>
      <div class="actions">
        <a class="btn" href="${escapeAttr(s.link || '#')}" target="_blank" rel="noopener">More info</a>
        <a class="btn secondary" href="mailto:${escapeAttr(s.contact || '')}">Contact</a>
      </div>
    `;
    listEl.appendChild(card);
  });
}

function escapeHtml(str){
  if(!str && str !== 0) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/\"/g,'&quot;')
    .replace(/'/'g,'&#39;');
}

function escapeAttr(s){
  return encodeURI(String(s || ''));
}

function applyFilters(){
  const q = (searchEl.value || '').trim().toLowerCase();
  const level = levelEl.value;
  const country = countryEl.value;
  let filtered = scholarships.filter(s => {
    if(level && s.level !== level) return false;
    if(country && (s.country || '') !== country) return false;
    if(!q) return true;
    const hay = `${s.name} ${s.provider} ${s.description} ${s.eligible}`.toLowerCase();
    return hay.includes(q);
  });
  render(filtered);
}

searchEl.addEventListener('input', applyFilters);
levelEl.addEventListener('change', applyFilters);
countryEl.addEventListener('change', applyFilters);

fetch('data/scholarships.json')
  .then(r => r.json())
  .then(data => {
    scholarships = Array.isArray(data) ? data : [];
    applyFilters();
  })
  .catch(err => {
    listEl.innerHTML = '<p>Could not load scholarships data. Make sure <code>docs/data/scholarships.json</code> exists and is valid JSON.</p>';
    console.error(err);
  });