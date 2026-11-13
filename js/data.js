/* ===== data.js: login details, per-user data, sample expenses and helper functions ===== */
// ---- 1. Hardcoded demo login (simulated, no database) ----
const USER = "student", PASS = "pocket2026";

// ---- 2. Categories, suggested budgets, sample expenses ----
const DEFAULT_BUDGET = {Food:150, Transport:60, Study:50, Bills:40, Fun:60, Shopping:80};
const CATS = Object.keys(DEFAULT_BUDGET);
const SAMPLE = [
  {date:"2026-11-01",item:"Nasi lemak",cat:"Food",amt:6.5},
  {date:"2026-11-02",item:"Bus to campus",cat:"Transport",amt:4},
  {date:"2026-11-03",item:"Printing notes",cat:"Study",amt:8.2},
  {date:"2026-11-04",item:"Phone bill",cat:"Bills",amt:30},
  {date:"2026-11-06",item:"Cafe with friends",cat:"Fun",amt:24.9},
  {date:"2026-11-08",item:"Lunch",cat:"Food",amt:9},
  {date:"2026-11-09",item:"Grab to the mall",cat:"Transport",amt:12.5},
  {date:"2026-11-10",item:"Highlighters",cat:"Study",amt:11.9},
  {date:"2026-11-12",item:"Tote bag",cat:"Shopping",amt:35},
  {date:"2026-11-14",item:"Dinner",cat:"Food",amt:14},
  {date:"2026-11-18",item:"Movie ticket",cat:"Fun",amt:16},
  {date:"2026-11-22",item:"Groceries",cat:"Food",amt:42.3},
  {date:"2026-11-25",item:"Notebook set",cat:"Study",amt:18}
];

// ---- 3. Every user has their own saved data (in this browser). New accounts start empty. ----
const me = sessionStorage.getItem("user");
const key = k => "pp_" + k + "_" + me;
const load = (k, fallback) => { try { const v = JSON.parse(localStorage.getItem(key(k))); return v === null ? fallback : v; } catch (e) { return fallback; } };
let expenses = load("expenses", me === USER ? SAMPLE.map(e => ({...e})) : []);
const BUDGET = load("budget", {...DEFAULT_BUDGET});
let LIMIT = load("limit", null);   // the user's own monthly limit (null = use the category budgets)
const save = () => { try { localStorage.setItem(key("expenses"), JSON.stringify(expenses)); localStorage.setItem(key("budget"), JSON.stringify(BUDGET)); localStorage.setItem(key("limit"), JSON.stringify(LIMIT)); } catch (e) {} };
// Small yes/no notes, e.g. "the guide was hidden"
const getFlag = k => { try { return localStorage.getItem(key(k)) === "1"; } catch (e) { return false; } };
const setFlag = k => { try { localStorage.setItem(key(k), "1"); } catch (e) {} };

// ---- 4. Helpers ----
const rm = n => "RM " + n.toFixed(2);
const esc = t => t.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const spentBy = c => expenses.filter(e => e.cat === c).reduce((s,e) => s + e.amt, 0);

// One colour per category, used on every page so colours always mean the same thing
const CAT_COLOR = {Food:"#FF7A66", Transport:"#2BC4B4", Study:"#A18BFF", Bills:"#5DB4FF", Fun:"#FF6FB0", Shopping:"#A6D84A"};