# Semantic HTML5 & Accessible Component Architecture

A responsive, multi-page enterprise-style workspace dashboard built with semantic HTML5, CSS, and vanilla JavaScript. Created as a front-end implementation exercise focused on clear DOM hierarchy and WCAG-minded accessibility patterns.

## Features

- Overview, Projects, and Reports pages with shared navigation and layout.
- Semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer`.
- Accessible data tables with captions and scoped headers.
- Accessible create-project dialog with labels, fieldset/legend, validation messages, and focus handling.
- Search and status filters on the Projects page.
- Report chart with a text summary and equivalent data table.
- CSV export for report data.
- Keyboard-visible focus, skip link, responsive layout, reduced-motion support, and dark theme toggle.

## Run locally

No package manager, server, or build step is required.

1. Download and extract the repository.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or install the VS Code **Live Server** extension and choose **Open with Live Server**.
4. Use the header links to navigate between Overview, Projects, and Reports.

## Project layout

```text
index.html
projects.html
reports.html
assets/styles.css
assets/app.js
components/README.md
docs/architecture.md
docs/accessibility-notes.html
```

## Test checklist

- [ ] All three pages load and navigation points to the correct page.
- [ ] Skip link moves focus to main content.
- [ ] Tab and Shift+Tab reach every interactive control in a logical order.
- [ ] Create-project dialog opens, validates missing/short fields, and returns focus when closed.
- [ ] Project search and status filter update the table and result count.
- [ ] Report CSV downloads.
- [ ] Theme toggle updates its accessible label and pressed state.
- [ ] Layout remains usable at mobile widths and 200% zoom.
- [ ] Each HTML file is checked with the W3C Nu HTML Checker.
- [ ] Contrast and screen-reader behavior are manually reviewed.

## Important limitations

This is a front-end demonstration using sample data. Project changes are not saved to a server and disappear on refresh. There is no backend, login, or database. No claim of WCAG conformance or zero validator errors should be made until the final files have been independently tested.

## Deploy to GitHub

Create a repository, then run these commands in the VS Code terminal from the project root:

```bash
git init
git add .
git commit -m "Build semantic accessible dashboard"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the example remote URL with your own GitHub repository URL. If the repository already has a remote, check `git remote -v` before adding one.
