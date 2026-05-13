// Sample documents for Daisy Duck
const documents = [
  {
    name: "W01-2024-W2_WaltDisney_DaisyDuck.pdf",
    form: "W-2",
    issuer: "Walt Disney Studios Inc.",
  },
  {
    name: "W02-2024-W2_PixarAnimation_DaisyDuck.pdf",
    form: "W-2",
    issuer: "Pixar Animation Studios",
  },
  {
    name: "C01-2024-ScheduleC_FloralBoutique_Daisy.pdf",
    form: "Schedule C Source",
    issuer: "Daisy's Floral Boutique LLC",
  },
  {
    name: "C02-2024-ScheduleC_QuackBakery_Daisy.pdf",
    form: "Schedule C Source",
    issuer: "Quack Quack Bakery",
  },
  {
    name: "N01-20241099-NEC_MickeysMarketing.pdf",
    form: "1099-NEC",
    issuer: "Mickey's Marketing Agency - 4521",
    mappedTo: "Other Income",
  },
  {
    name: "N02-20241099-NEC_DonaldsDesign.pdf",
    form: "1099-NEC",
    issuer: "Donald's Design Co. - 9087",
    mappedTo: "Other Income",
  },
  {
    name: "I01-20241099-INT_DuckburgFCU.pdf",
    form: "1099-INT",
    issuer: "Duckburg Federal Credit Union",
  },
  {
    name: "D01-20241099-DIV_ScroogeInvest.pdf",
    form: "1099-DIV",
    issuer: "Scrooge McDuck Investments",
  },
  {
    name: "B01-20241099-B_CharlesSchwab.pdf",
    form: "1099-B",
    issuer: "Charles Schwab & Co.",
  },
  {
    name: "M01-2024-1098_WellsFargoMortgage.pdf",
    form: "1098",
    issuer: "Wells Fargo Home Mortgage",
  },
  {
    name: "SSA01-2024-1099-SSA_DaisyDuck.pdf",
    form: "SSA 1099",
    issuer: "N/A",
    defaultAction: "Add new form",
  },
  {
    name: "K01-2024K-1_DuckFamilyHoldings.pdf",
    form: "K-1 1120S",
    issuer: "Duck Family Holdings LLC",
  },
];

// Mapping options keyed by form type — these show how each document maps onto a tax return
const mapOptionsByForm = {
  "W-2": [
    { label: "Wages – Taxpayer", desc: "Form 1040, Line 1a" },
    { label: "Wages – Spouse", desc: "Form 1040, Line 1a (joint)" },
    { label: "Statutory Employee Wages", desc: "Schedule C, Line 1" },
  ],
  "Schedule C Source": [
    { label: "Schedule C – Business 1", desc: "Sole proprietorship #1" },
    { label: "Schedule C – Business 2", desc: "Sole proprietorship #2" },
    { label: "Schedule C – New Business", desc: "Create new Schedule C" },
  ],
  "1099-NEC": [
    { label: "Other Income", desc: "Schedule 1, Line 8" },
    { label: "Schedule C – Business 1", desc: "Self-employment income" },
    { label: "Schedule C – Business 2", desc: "Self-employment income" },
    { label: "Schedule C – New Business", desc: "Create new Schedule C" },
  ],
  "1099-INT": [
    { label: "Interest Income", desc: "Schedule B, Part I" },
    { label: "Tax-Exempt Interest", desc: "Form 1040, Line 2a" },
    { label: "Seller-Financed Mortgage Interest", desc: "Schedule B, Line 1" },
  ],
  "1099-DIV": [
    { label: "Ordinary Dividends", desc: "Schedule B, Part II" },
    { label: "Qualified Dividends", desc: "Form 1040, Line 3a" },
    { label: "Capital Gain Distributions", desc: "Schedule D, Line 13" },
  ],
  "1099-B": [
    { label: "Short-Term Capital Gains", desc: "Schedule D, Part I" },
    { label: "Long-Term Capital Gains", desc: "Schedule D, Part II" },
    { label: "Form 8949 – Box A", desc: "Reported basis to IRS" },
    { label: "Form 8949 – Box D", desc: "Long-term, basis reported" },
  ],
  "1098": [
    { label: "Home Mortgage Interest", desc: "Schedule A, Line 8a" },
    { label: "Investment Interest", desc: "Form 4952" },
    { label: "Rental Mortgage Interest", desc: "Schedule E, Line 12" },
  ],
  "SSA 1099": [
    { label: "Social Security Benefits", desc: "Form 1040, Line 6a" },
    { label: "SS Benefits – Taxpayer", desc: "Form 1040, Line 6a" },
    { label: "SS Benefits – Spouse", desc: "Form 1040, Line 6a (joint)" },
  ],
  "K-1 1120S": [
    { label: "S-Corp K-1 #1", desc: "Schedule E, Part II" },
    { label: "S-Corp K-1 #2", desc: "Schedule E, Part II" },
    { label: "New S-Corp K-1", desc: "Create new K-1 entry" },
  ],
};

// Action options
const actionOptions = [
  { label: "Map to existing form", desc: "Use selected mapping" },
  { label: "Add new form", desc: "Create a new entry on the return" },
  { label: "Skip document", desc: "Exclude from this export" },
  { label: "Mark as reviewed", desc: "No mapping needed" },
];

// Video sources for export modals
const videoSources = {
  proconnect: {
    title: "Export to ProConnect",
    src: "https://www.loom.com/embed/e411e678032d4d3fa53f24e82e937a37?hide_owner=true&hide_share=true",
  },
  cch: {
    title: "Export to CCH Axcess",
    src: "https://www.loom.com/embed/20cd6712246d446eb8c6ca14943c05eb?hide_owner=true&hide_share=true",
  },
};

// ---- Rendering ----

function docIconSVG() {
  return `
    <svg class="doc-icon" viewBox="0 0 24 24" width="20" height="20" fill="none"
         stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>`;
}

function eyeSVG() {
  return `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>`;
}

function caretSVG() {
  return `
    <svg class="caret" viewBox="0 0 24 24" width="14" height="14" fill="none"
         stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>`;
}

function renderDropdown({ id, options, selected, placeholder }) {
  const selectedOpt = options.find(o => o.label === selected);
  const toggleLabel = selectedOpt ? selectedOpt.label : placeholder;
  const placeholderClass = selectedOpt ? "" : "placeholder";

  const items = options
    .map(
      opt => `
      <div class="dropdown-item${opt.label === selected ? " selected" : ""}" data-value="${escapeAttr(opt.label)}">
        <div class="dropdown-item-wrap">
          <div>${escapeHTML(opt.label)}</div>
          ${opt.desc ? `<span class="desc">${escapeHTML(opt.desc)}</span>` : ""}
        </div>
        ${opt.label === selected ? '<span class="check">✓</span>' : ""}
      </div>`
    )
    .join("");

  return `
    <div class="dropdown" data-dropdown-id="${id}">
      <button type="button" class="dropdown-toggle ${placeholderClass}">
        <span class="dropdown-label">${escapeHTML(toggleLabel)}</span>
        ${caretSVG()}
      </button>
      <div class="dropdown-menu" role="listbox">${items}</div>
    </div>`;
}

function renderRow(doc, index) {
  const mapOptions = mapOptionsByForm[doc.form] || [];
  const mapDropdown = renderDropdown({
    id: `map-${index}`,
    options: mapOptions,
    selected: doc.mappedTo || null,
    placeholder: "Select mapping",
  });
  const actionDropdown = renderDropdown({
    id: `action-${index}`,
    options: actionOptions,
    selected: doc.defaultAction || null,
    placeholder: "Select",
  });

  return `
    <div class="table-row" data-row="${index}">
      <div class="doc-name">
        ${docIconSVG()}
        <span class="doc-name-text" title="${escapeAttr(doc.name)}">${escapeHTML(doc.name)}</span>
      </div>
      <div class="form-cell">${escapeHTML(doc.form)}</div>
      <div class="issuer-cell">${doc.issuer === "N/A" ? '<span class="dash">N/A</span>' : escapeHTML(doc.issuer)}</div>
      <div class="dash">—</div>
      <div class="dash">—</div>
      <div>
        <a href="#" class="preview-link" data-preview="${index}">
          ${eyeSVG()}
          <span>View</span>
        </a>
      </div>
      <div>${mapDropdown}</div>
      <div>${actionDropdown}</div>
      <div class="row-status" title="Ready to export"></div>
    </div>`;
}

function renderTable() {
  const body = document.getElementById("tableBody");
  if (!body) return;
  body.innerHTML = documents.map(renderRow).join("");
}

// ---- Dropdown interactions ----

function closeAllDropdowns(exceptEl) {
  document.querySelectorAll(".dropdown.open").forEach(d => {
    if (d !== exceptEl) d.classList.remove("open");
  });
}

function bindDropdowns() {
  document.addEventListener("click", e => {
    const toggle = e.target.closest(".dropdown-toggle");
    const item = e.target.closest(".dropdown-item");
    const dropdown = e.target.closest(".dropdown");

    if (toggle) {
      const parent = toggle.parentElement;
      const wasOpen = parent.classList.contains("open");
      closeAllDropdowns(wasOpen ? null : parent);
      parent.classList.toggle("open");
      return;
    }

    if (item && dropdown) {
      const value = item.dataset.value;
      const label = dropdown.querySelector(".dropdown-label");
      const toggleBtn = dropdown.querySelector(".dropdown-toggle");
      label.textContent = value;
      toggleBtn.classList.remove("placeholder");
      // Update selected state in menu
      dropdown.querySelectorAll(".dropdown-item").forEach(i => {
        i.classList.toggle("selected", i === item);
        const existingCheck = i.querySelector(".check");
        if (existingCheck) existingCheck.remove();
        if (i === item) {
          const check = document.createElement("span");
          check.className = "check";
          check.textContent = "✓";
          i.appendChild(check);
        }
      });
      dropdown.classList.remove("open");
      return;
    }

    if (!dropdown) {
      closeAllDropdowns();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAllDropdowns();
  });
}

// ---- Modal ----

function openModal(targetKey) {
  const data = videoSources[targetKey];
  if (!data) return;
  const modal = document.getElementById("videoModal");
  const title = document.getElementById("modalTitle");
  const frame = document.getElementById("videoFrame");
  title.textContent = data.title;
  frame.src = data.src;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  if (!modal || !frame) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  frame.src = "";
  document.body.style.overflow = "";
}

function bindModal() {
  document.querySelectorAll(".export-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      if (target) openModal(target);
    });
  });

  document.querySelectorAll("[data-close]").forEach(el => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
}

// ---- List-page interactions ----

function bindListPage() {
  const searchInput = document.querySelector(".search-input input");
  const showAllToggle = document.getElementById("showAllToggle");
  const rows = Array.from(document.querySelectorAll(".list-row"));
  const resyncButton = document.querySelector(".resync-btn");
  const filterButton = document.querySelector(".filter-btn");

  if (searchInput && rows.length) {
    const applyFilters = () => {
      const query = searchInput.value.trim().toLowerCase();
      const showAll = showAllToggle ? showAllToggle.checked : true;

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const isComplete = text.includes("export complete");
        const matchesSearch = !query || query === "all" || text.includes(query);
        row.hidden = !matchesSearch || (!showAll && isComplete);
      });
    };

    searchInput.addEventListener("input", applyFilters);
    if (showAllToggle) showAllToggle.addEventListener("change", applyFilters);
    applyFilters();
  }

  if (resyncButton) {
    resyncButton.addEventListener("click", () => {
      flashToast("Clients synced. Demo data is up to date.");
    });
  }

  if (filterButton) {
    filterButton.addEventListener("click", () => {
      flashToast("Filters are demo-only for this static site.");
    });
  }
}

function bindUtilityButtons() {
  document.querySelectorAll(".help-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      flashToast("Export tips: map each source document, then choose an export destination.");
    });
  });

  const checklistButton = document.querySelector(".checklist-btn");
  if (checklistButton) {
    checklistButton.addEventListener("click", () => {
      flashToast("Preparation checklist opened in the full Juno app.");
    });
  }
}

// ---- Preview link (demo only) ----

function bindPreviews() {
  document.addEventListener("click", e => {
    const link = e.target.closest(".preview-link");
    if (!link) return;
    e.preventDefault();
    const idx = link.dataset.preview;
    const doc = documents[idx];
    // Lightweight feedback — keep demo non-disruptive
    flashToast(`Preview: ${doc.name}`);
  });
}

let toastTimer;
function flashToast(message) {
  let toast = document.getElementById("__toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "__toast";
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#0E3D2E",
      color: "white",
      padding: "10px 18px",
      borderRadius: "999px",
      fontSize: "13.5px",
      fontWeight: "500",
      boxShadow: "0 8px 24px rgba(15,30,22,0.25)",
      zIndex: "2000",
      opacity: "0",
      transition: "opacity 0.2s",
      pointerEvents: "none",
    });
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.style.opacity = "0"), 1800);
}

// ---- Helpers ----

function escapeHTML(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(str) {
  return escapeHTML(str);
}

// ---- Init ----

document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  bindDropdowns();
  bindModal();
  bindListPage();
  bindUtilityButtons();
  bindPreviews();
});
