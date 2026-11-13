/* ===== layout.js: header + navigation on every page, and the login guard =====
   On phones the links sit in a bottom tab bar; on desktop they become a left sidebar (see css section 3). */
const page = document.body.dataset.page;
if (!sessionStorage.getItem("user")) location.href = "index.html";

// Split a text into letters so each one can bounce a little after the one before it
const bounce = t => [...t].map((c,i) => `<span class="bn" style="animation-delay:${(i*0.07).toFixed(2)}s">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");

// Long usernames are shortened with "..." so the header stays tidy (the full name shows when you hover)
const who = me || "";   // empty while the page is sending you back to the login page
const shortName = who.length > 14 ? who.slice(0,13) + "…" : who;

const tab = (h,k,l) => `<a href="${h}" class="${page===k?"on":""}">${l}</a>`;
document.getElementById("nav").innerHTML = `
  <header class="bar"><span class="brand" aria-label="PocketPlan">${bounce("PocketPlan")}</span><span class="hi" title="${esc(who)}" aria-label="Hi, ${esc(who)}">${bounce("Hi, " + shortName)}</span></header>
  <nav class="dock" aria-label="Main">${tab("dashboard.html","dashboard","Home")}${tab("expenses.html","expenses","Expenses")}${tab("budget.html","budget","Budget")}<button id="logout">Log out</button></nav>`;

// ---- Log out: ask "Are you sure?" first ----
document.body.insertAdjacentHTML("beforeend", `
<dialog id="outDlg" class="dlg" aria-labelledby="outTitle">
  <h2 id="outTitle" class="h4">Log out?</h2>
  <p class="mb-3">Are you sure you want to log out?</p>
  <div class="d-flex flex-wrap gap-2">
    <button type="button" id="outYes" class="btn-go">Yes, log out</button>
    <button type="button" id="outNo" class="chip">Stay</button>
  </div>
</dialog>`);
const dlg = document.getElementById("outDlg");
document.getElementById("logout").onclick = () => {
  if (typeof dlg.showModal !== "function") {   // very old phones: use the browser's own question box
    if (confirm("Are you sure you want to log out?")) { sessionStorage.clear(); location.href = "index.html"; }
    return;
  }
  dlg.showModal(); document.getElementById("outNo").focus();
};
document.getElementById("outNo").onclick = () => dlg.close();
document.getElementById("outYes").onclick = () => { sessionStorage.clear(); location.href = "index.html"; };
// Clicking the dark area outside the box also closes it
dlg.addEventListener("click", e => {
  const r = dlg.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
});