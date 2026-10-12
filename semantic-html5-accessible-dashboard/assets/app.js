(() => {
  "use strict";
  const body = document.body;
  const announcer = document.getElementById("live-announcer");
  const themeToggle = document.getElementById("theme-toggle");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const primaryNav = document.getElementById("primary-navigation");
  const projectDialog = document.getElementById("new-project-dialog");
  const form = document.getElementById("new-project-form");
  const titleInput = document.getElementById("project-title");
  const ownerInput = document.getElementById("project-owner");
  const formSummary = document.getElementById("form-summary");
  let lastDialogTrigger = null;

  function announce(message) {
    if (announcer) announcer.textContent = message;
  }
  function setTheme(isDark) {
    body.classList.toggle("dark", isDark);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    }
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = !body.classList.contains("dark");
      setTheme(next);
      try { localStorage.setItem("northstar-theme", next ? "dark" : "light"); } catch (_) {}
    });
    try { setTheme(localStorage.getItem("northstar-theme") === "dark"); } catch (_) {}
  }
  if (mobileToggle && primaryNav) {
    mobileToggle.addEventListener("click", () => {
      const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", String(!expanded));
      primaryNav.classList.toggle("is-open", !expanded);
    });
  }
  function openDialog(dialog, trigger) {
    if (!dialog) return;
    lastDialogTrigger = trigger || document.activeElement;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    const first = dialog.querySelector("input:not([type=hidden]), select, button");
    if (first) first.focus();
  }
  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    if (lastDialogTrigger && typeof lastDialogTrigger.focus === "function") lastDialogTrigger.focus();
  }
  document.querySelectorAll("[data-open-dialog]").forEach(button => {
    button.addEventListener("click", () => {
      const dialog = document.getElementById(button.getAttribute("data-open-dialog"));
      if (dialog === projectDialog && form) resetForm();
      openDialog(dialog, button);
    });
  });
  document.querySelectorAll("[data-close-dialog]").forEach(button => {
    button.addEventListener("click", () => closeDialog(button.closest("dialog")));
  });
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => {
      if (event.target === dialog) closeDialog(dialog);
    });
    dialog.addEventListener("close", () => {
      if (lastDialogTrigger && typeof lastDialogTrigger.focus === "function") lastDialogTrigger.focus();
    });
  });
  function showFieldError(input, errorId, message) {
    const error = document.getElementById(errorId);
    if (!error || !input) return;
    error.textContent = message || "";
    error.hidden = !message;
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }
  function resetForm() {
    if (!form) return;
    form.reset();
    showFieldError(titleInput, "project-title-error", "");
    showFieldError(ownerInput, "project-owner-error", "");
    const priorityError = document.getElementById("priority-error");
    if (priorityError) { priorityError.hidden = true; priorityError.textContent = ""; }
    if (formSummary) { formSummary.hidden = true; formSummary.textContent = ""; }
  }
  if (titleInput) titleInput.addEventListener("input", () => showFieldError(titleInput, "project-title-error", ""));
  if (ownerInput) ownerInput.addEventListener("change", () => showFieldError(ownerInput, "project-owner-error", ""));
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const errors = [];
      const title = titleInput.value.trim();
      if (title.length < 3) {
        const message = "Enter a project name with at least 3 characters.";
        showFieldError(titleInput, "project-title-error", message); errors.push(message);
      } else showFieldError(titleInput, "project-title-error", "");
      if (!ownerInput.value) {
        const message = "Choose a project owner.";
        showFieldError(ownerInput, "project-owner-error", message); errors.push(message);
      } else showFieldError(ownerInput, "project-owner-error", "");
      const priority = form.querySelector('input[name="priority"]:checked');
      const priorityError = document.getElementById("priority-error");
      if (!priority) {
        const message = "Choose a priority.";
        if (priorityError) { priorityError.textContent = message; priorityError.hidden = false; }
        errors.push(message);
      } else if (priorityError) { priorityError.hidden = true; priorityError.textContent = ""; }
      if (errors.length) {
        if (formSummary) {
          formSummary.textContent = "Please correct the following: " + errors.join(" ");
          formSummary.hidden = false;
          formSummary.focus();
        }
        return;
      }
      if (formSummary) formSummary.hidden = true;
      addProjectRow(title, ownerInput.value, priority.value);
      closeDialog(projectDialog);
      resetForm();
      announce("Project " + title + " created in the current page's project list.");
    });
  }
  function addProjectRow(title, owner, priority) {
    const tableBody = document.querySelector("#projects-table tbody") || document.querySelector(".panel table tbody");
    if (!tableBody) {
      announce("Project form validated. This page is a front-end demo; project data is not persisted.");
      return;
    }
    const row = document.createElement("tr");
    row.dataset.status = "Planned";
    const projectCell = document.createElement("th");
    projectCell.scope = "row";
    const projectName = document.createElement("span"); projectName.className = "project-name"; projectName.textContent = title;
    const subtitle = document.createElement("span"); subtitle.className = "cell-subtitle"; subtitle.textContent = "Priority: " + priority;
    projectCell.append(projectName, subtitle);
    const ownerCell = document.createElement("td"); ownerCell.textContent = owner;
    const statusCell = document.createElement("td"); const status = document.createElement("span"); status.className = "status status-planned"; status.textContent = "Planned"; statusCell.append(status);
    const dueCell = document.createElement("td"); dueCell.textContent = "Not scheduled";
    const progressCell = document.createElement("td"); const progressLabel = document.createElement("span"); progressLabel.className = "progress-label"; progressLabel.textContent = "0%"; const progress = document.createElement("progress"); progress.value = 0; progress.max = 100; progress.setAttribute("aria-label", title + " progress"); progressCell.append(progressLabel, progress);
    row.append(projectCell, ownerCell, statusCell, dueCell, progressCell);
    if (tableBody.closest("#projects-table")) {
      const actionCell = document.createElement("td"); actionCell.textContent = "—";
      row.append(actionCell);
    }
    tableBody.prepend(row);
    applyProjectFilters();
    announce("Project " + title + " added to this page. Demo changes are not saved after refresh.");
  }
  const searchInput = document.getElementById("project-search");
  const statusFilter = document.getElementById("status-filter");
  function applyProjectFilters() {
    const table = document.getElementById("projects-table");
    if (!table) return;
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const status = statusFilter ? statusFilter.value : "all";
    let count = 0;
    table.querySelectorAll("tbody tr").forEach(row => {
      const matchesText = row.textContent.toLowerCase().includes(query);
      const matchesStatus = status === "all" || row.dataset.status === status;
      const visible = matchesText && matchesStatus;
      row.hidden = !visible;
      if (visible) count += 1;
    });
    const countText = document.getElementById("project-count");
    const empty = document.getElementById("empty-state");
    if (countText) countText.textContent = "Showing " + count + (count === 1 ? " project" : " projects");
    if (empty) empty.hidden = count !== 0;
  }
  if (searchInput) searchInput.addEventListener("input", applyProjectFilters);
  if (statusFilter) statusFilter.addEventListener("change", applyProjectFilters);
  document.querySelectorAll("[data-project-details]").forEach(button => {
    button.addEventListener("click", () => {
      const detailsDialog = document.getElementById("details-dialog");
      const title = button.getAttribute("data-project-details");
      const titleElement = document.getElementById("details-title");
      const copy = document.getElementById("details-copy");
      if (titleElement) titleElement.textContent = title;
      if (copy) copy.textContent = "This is a sample project record for " + title + ". The table shows its owner, status, due date, and progress. Data in this demonstration is stored only in the current browser page.";
      openDialog(detailsDialog, button);
    });
  });
  const exportButton = document.getElementById("download-report");
  if (exportButton) exportButton.addEventListener("click", () => {
    const rows = [["Month", "Completed items"], ["April", "32"], ["May", "41"], ["June", "38"], ["July", "52"], ["August", "47"], ["September", "61"]];
    const csv = rows.map(row => row.map(value => '"' + value.replace(/"/g, '""') + '"').join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a"); link.href = url; link.download = "northstar-delivery-report.csv"; document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    announce("Report CSV downloaded.");
  });
})();