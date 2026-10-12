# Semantic HTML5 and Accessible Component Architecture

## Project structure

```text
semantic-html5-accessible-dashboard/
├── index.html
├── projects.html
├── reports.html
├── assets/
│   ├── styles.css
│   └── app.js
├── components/
│   └── README.md
└── docs/
    ├── architecture.md
    └── accessibility-notes.html
```

## Page and DOM hierarchy

Each page follows this high-level structure:

1. `body`
2. Skip link to the page's main content
3. `header.site-header` with brand and primary `nav`
4. `.app-layout`
   - `aside.sidebar` with a separately labelled `nav`
   - `main#main-content` containing the page heading and named `section` regions
5. `footer.site-footer`
6. Native `dialog` elements for modal interactions when required

## Responsibilities

- **HTML pages:** document metadata, landmarks, content structure, forms, tables, and dialog markup.
- **CSS (`assets/styles.css`):** layout, responsive behavior, focus styles, high-contrast status tokens, dark theme, and reduced-motion handling.
- **JavaScript (`assets/app.js`):** theme toggle, responsive navigation, dialog lifecycle, form validation, project filtering, demo row creation, and report CSV export.
- **Components documentation:** explains reusable native markup patterns and accessibility expectations.

## Interaction and data flow

- A user activates a button or link with mouse, touch, or keyboard.
- Native controls expose their state and semantics to assistive technology.
- JavaScript handles the event and updates the current document.
- Validation errors are associated with their controls through `aria-describedby`; invalid fields receive `aria-invalid`.
- A polite live region announces dynamic success messages. Validation summary uses `role="alert"` and receives focus on failed submission.
- The demo stores no server-side data. New rows exist only in the current page and will disappear after refresh. There is no backend or authentication service.

## Semantic and accessibility decisions

- Use `header`, `nav`, `aside`, `main`, `section`, `article`, and `footer` for meaningful page regions.
- Each page has one descriptive `h1`; sections use descending heading levels.
- Data tables use captions and scoped column/row headers.
- Native buttons are used for actions; anchors are used for navigation.
- Dialogs have accessible names and descriptions. Focus is moved into the dialog and returned to its trigger when it closes.
- Statuses include readable text, not color alone.
- Charts provide a text summary and data table equivalent.
- A skip link and visible `:focus-visible` outlines help keyboard users.

## Scope and limitations

This is a front-end demonstration, not a production application. Data is sample data, changes are not persisted, and no backend API exists. Validate the final version with the W3C HTML Validator and test with keyboard and assistive technology before deployment.
