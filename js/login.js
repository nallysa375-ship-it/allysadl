/* ===== login.js: log in, sign up, forgot password (all simulated) and error messages ===== */
const err = document.getElementById("loginError");
const showMsg = (text, ok) => { err.textContent = text; err.className = "alert " + (ok ? "alert-success" : "alert-danger"); };

// Accounts are kept in this browser only (demo, not a real database): { username: { p: password, hint: recovery word } }
const getUsers = () => { try { return JSON.parse(localStorage.getItem("pp_users")) || {}; } catch (e) { return {}; } };
const saveUsers = u => { try { localStorage.setItem("pp_users", JSON.stringify(u)); return true; } catch (e) { return false; } };
const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const pwOf = acc => typeof acc === "string" ? acc : acc.p;      // older accounts stored just the password

// Three views share one card: log in, sign up, forgot password
const views = {login: loginForm, signup: signupForm, forgot: forgotForm};
const texts = {
  login:  ["Welcome back", "Log in to open your pocket."],
  signup: ["Welcome", "Create an account to start tracking your spending."],
  forgot: ["Reset your password", "Enter your username and recovery word, then choose a new password."]
};
const show = v => {
  Object.keys(views).forEach(k => views[k].classList.toggle("d-none", k !== v));
  tabLogin.classList.toggle("on", v === "login");
  tabSignup.classList.toggle("on", v === "signup");
  formTitle.textContent = texts[v][0];
  formDesc.textContent = texts[v][1];
  err.className = "alert d-none";
};
tabLogin.onclick = () => show("login");
tabSignup.onclick = () => show("signup");
goForgot.onclick = () => show("forgot");
backLogin.onclick = () => show("login");

// Log in: the built-in student account or any account created with Sign up
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const u = user.value.trim(), p = pass.value, users = getUsers();
  if (!u || !p) return showMsg("Enter your username and password.");
  if ((u === USER && p === PASS) || (own(users, u) && pwOf(users[u]) === p)) {
    sessionStorage.setItem("user", u);
    location.href = "dashboard.html";
  } else showMsg("Invalid username or password. Try again.");
});

// Sign up: check the details, save the account with its recovery word, then go back to Log in
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  const u = newUser.value.trim(), p = newPass.value, p2 = newPass2.value, w = newWord.value.trim().toLowerCase(), users = getUsers();
  if (u.length < 3) return showMsg("Username must be at least 3 characters.");
  if (u === USER || own(users, u)) return showMsg("That username is already taken.");
  if (p.length < 6) return showMsg("Password must be at least 6 characters.");
  if (p !== p2) return showMsg("The two passwords do not match.");
  if (w.length < 3) return showMsg("Recovery word must be at least 3 characters.");
  if (u.length > 20) return showMsg("Username must be 20 characters or fewer.");
  users[u] = {p, hint: w};
  if (!saveUsers(users)) return showMsg("Could not save the account in this browser.");
  show("login");
  user.value = u; pass.value = "";
  showMsg("Account created! Log in with your new username.", true);
});

// Forgot password: the username and recovery word must match, then a new password is saved
forgotForm.addEventListener("submit", e => {
  e.preventDefault();
  const u = fUser.value.trim(), w = fWord.value.trim().toLowerCase(), p = fPass.value, p2 = fPass2.value, users = getUsers();
  const acc = own(users, u) ? users[u] : null;
  if (!acc || typeof acc === "string" || acc.hint !== w) return showMsg("Username or recovery word is not correct.");
  if (p.length < 6) return showMsg("New password must be at least 6 characters.");
  if (p !== p2) return showMsg("The two passwords do not match.");
  acc.p = p;
  if (!saveUsers(users)) return showMsg("Could not save the new password in this browser.");
  show("login");
  user.value = u; pass.value = "";
  showMsg("Password changed! Log in with your new password.", true);
  forgotForm.reset();
});