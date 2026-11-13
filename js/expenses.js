/* ===== expenses.js: add form, filter chips, list that becomes cards on phones, remove with confirm ===== */
const pill = c => `<span class="pill" style="background:${CAT_COLOR[c]}">${c}</span>`;
let current = "All";
fCat.innerHTML = CATS.map(c => `<option>${c}</option>`).join("");
chips.innerHTML = ["All",...CATS].map(c => `<button type="button" class="chip ${c==="All"?"on":""}" data-c="${c}">${c}</button>`).join("");
fDate.value = new Date().toISOString().slice(0,10);

// Message under the form (green = good, red = problem)
const flash = (text, ok) => { formMsg.textContent = text; formMsg.className = "small mt-2 fw-bold " + (ok ? "text-success" : "text-danger"); };

const draw = () => {
  const list = expenses.map((e,i) => ({e,i})).filter(x => current === "All" || x.e.cat === current)
    .sort((a,b) => b.e.date.localeCompare(a.e.date));
  if (!list.length) {
    // Empty state: tell a newcomer what to do
    const none = expenses.length === 0;
    rows.innerHTML = `<tr><td colspan="5" class="empty">${none ? "No spends yet. Add your first one above, or try the sample data." : "No spends in " + current + " yet."}
      ${none ? `<br><button type="button" class="btn-go mt-3" id="useSample">Try with sample data</button>` : ""}</td></tr>`;
    return;
  }
  rows.innerHTML = list.map(({e,i}) =>
    `<tr><td data-label="Date">${e.date}</td><td data-label="Item">${esc(e.item)}</td><td data-label="Category">${pill(e.cat)}</td>
     <td data-label="Amount (RM)" class="text-end fw-bold">${e.amt.toFixed(2)}</td>
     <td data-label=""><button class="rmv" data-i="${i}" aria-label="Remove ${esc(e.item)}">Remove</button></td></tr>`).join("");
};

chips.onclick = ev => {
  const b = ev.target.closest("[data-c]"); if (!b) return;
  current = b.dataset.c; chips.querySelectorAll(".chip").forEach(x => x.classList.toggle("on", x === b)); draw();
};
rows.onclick = ev => {
  if (ev.target.closest("#useSample")) { expenses = SAMPLE.map(e => ({...e})); save(); draw(); flash("Sample spends added. You can remove them any time.", true); return; }
  const b = ev.target.closest("[data-i]"); if (!b) return;
  const e = expenses[+b.dataset.i];
  if (confirm(`Remove "${e.item}" (RM ${e.amt.toFixed(2)})?`)) { expenses.splice(+b.dataset.i,1); save(); draw(); flash("Removed.", true); }
};
addForm.addEventListener("submit", ev => {
  ev.preventDefault();
  const item = fItem.value.trim(), amt = parseFloat(fAmt.value);
  if (!fDate.value || !item || !(amt > 0)) return flash("Fill in the date, item and an amount above 0.", false);
  expenses.push({date:fDate.value,item,cat:fCat.value,amt}); save();
  fItem.value = ""; fAmt.value = ""; draw();
  flash(`Added "${item}"! It now counts in your charts and budget.`, true);
});
draw();