# PocketPlan

**IMS566 Advanced Web Design Development and Content Management - Individual Project**

A simple student expense tracker. Log your spending, see where the money goes, and stay on budget.

## Features
- Login with error feedback (hardcoded credentials)
- Bottom tab bar on phones that turns into a left sidebar on desktop; footer on every page
- Dashboard with summary cards and 2 ApexCharts (spending by category, spending per week)
- Expenses page: add an expense, filter by category, remove an entry
- Budget page: one colour card per category with progress meters
- Works on desktop and mobile

## How to test login
- Username: `student`
- Password: `pocket2026`

## Project structure
- `index.html`, `dashboard.html`, `expenses.html`, `budget.html`: the four pages
- `css/style.css`: all styling, in labelled sections (yellow and black theme)
- `js/data.js`: login details, budgets, sample expenses, helpers
- `js/layout.js`: navigation and login guard
- `js/login.js`, `js/dashboard.js`, `js/expenses.js`, `js/budget.js`: one script per page

## Data notes
Sample data is used for demonstration. Added expenses are saved in the browser (localStorage).

## Frameworks / libraries
- Bootstrap 5.3 (grid and form styles)
- ApexCharts
- Bank-inspired yellow and black theme, with one colour per spending category, and no icons
- Google Fonts (Bricolage Grotesque, DM Sans)

## Live site
Add your GitHub Pages link here.