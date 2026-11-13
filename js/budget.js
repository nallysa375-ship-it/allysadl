/* ===== budget.js: one colour card per category showing spent vs budget ===== */
cards.innerHTML = CATS.map(c => {
  const s = spentBy(c), b = BUDGET[c], pct = Math.round(s / b * 100), w = Math.min(pct,100);
  const msg = pct > 100 ? "Over budget by " + rm(s - b) : pct >= 80 ? "Almost at the limit" : rm(b - s) + " left";
  return `<div class="col-12 col-md-6 col-lg-4"><div class="pc bcard" style="--c:${CAT_COLOR[c]}">
    <span class="pill" style="background:${CAT_COLOR[c]}">${c}</span>
    <p class="big amt">${rm(s)}</p><p class="mb-2 text-muted">of ${rm(b)} budget</p>
    <div class="meter" role="progressbar" aria-label="${c} budget used" aria-valuenow="${w}" aria-valuemin="0" aria-valuemax="100"><span style="width:${w}%"></span></div>
    <p class="mt-2 mb-0 fw-bold">${pct}% used. ${msg}</p></div></div>`;
}).join("");