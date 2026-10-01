/**
 * app.js - Main Application Controller for GitHub Mastery Guide
 * Manages search, dictionary rendering, language detection, reading progress, and interactions
 * Author: Dung Automation (https://github.com/Dungauto)
 */

let currentLang = "vi";
let activeCategory = "all";
let searchTerm = "";

const PORTAL_I18N = {
  vi: {
    brandSubtitle: "Cẩm Nang Làm Chủ GitHub",
    navTutorial: "Giáo Trình",
    navDict: "Từ Điển Tra Cứu",
    navSim: "Mô Phỏng Nhánh",
    navLaunch: "Trạm Phóng Nhanh",
    navQuiz: "Thử Thách",
    langButtonText: "🇺🇸 EN",
    searchPlaceholder: "Tìm lệnh hoặc khái niệm (rebase, projects, pr, stash...)",
    allCategories: "Tất cả",
    catBasic: "Lệnh Cơ Bản",
    catBranch: "Nhánh & Merge",
    catUndo: "Hoàn Tác (Undo)",
    catGithub: "Hệ Sinh Thái GitHub",
    catSecurity: "Bảo Mật & Token",
    copiedToast: "Đã sao chép vào bộ nhớ tạm! 📋",
    copyBtn: "Sao chép",
    whenToUse: "Khi nào nên dùng:",
    proTip: "Mẹo nâng cao:"
  },
  en: {
    brandSubtitle: "GitHub Mastery Guide",
    navTutorial: "Handbook",
    navDict: "Dictionary",
    navSim: "Git Visualizer",
    navLaunch: "Quick Launcher",
    navQuiz: "Quiz",
    langButtonText: "🇻🇳 VI",
    searchPlaceholder: "Search commands or concepts (rebase, projects, pr, stash...)",
    allCategories: "All",
    catBasic: "Basic Commands",
    catBranch: "Branch & Merge",
    catUndo: "Undo & Stash",
    catGithub: "GitHub Ecosystem",
    catSecurity: "Security & Tokens",
    copiedToast: "Copied to clipboard! 📋",
    copyBtn: "Copy",
    whenToUse: "When to use:",
    proTip: "Pro tip:"
  }
};

/* --------------------------------------------------------------------------
   Initialization
   -------------------------------------------------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  detectLanguage();
  applyLanguageToUI();
  initGitVisualizer();
  renderDictionary();
  renderQuizQuestion();
  initScrollSpyAndProgress();
  initKeyboardShortcuts();
});

/* --------------------------------------------------------------------------
   Language Detection & Switching
   -------------------------------------------------------------------------- */
function detectLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("lang")) {
    currentLang = urlParams.get("lang").toLowerCase().startsWith("vi") ? "vi" : "en";
    return;
  }

  try {
    const saved = localStorage.getItem("github_guide_lang");
    if (saved && (saved === "vi" || saved === "en")) {
      currentLang = saved;
      return;
    }
  } catch (e) {}

  const navLang = (navigator.language || "").toLowerCase();
  currentLang = navLang.startsWith("vi") ? "vi" : "en";
}

function toggleLanguage() {
  currentLang = currentLang === "vi" ? "en" : "vi";
  try {
    localStorage.setItem("github_guide_lang", currentLang);
  } catch (e) {}

  applyLanguageToUI();
  renderDictionary();
  renderQuizQuestion();
  showToast(currentLang === "vi" ? "Đã chuyển sang Tiếng Việt 🇻🇳" : "Switched to English 🇺🇸");
}

function applyLanguageToUI() {
  const t = PORTAL_I18N[currentLang];
  const langBtn = document.getElementById("btn-lang-toggle");
  if (langBtn) langBtn.textContent = t.langButtonText;

  const searchInput = document.getElementById("dict-search-input");
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  // 1. Text replacement for elements that have both data-lang-vi and data-lang-en with content
  document.querySelectorAll("[data-lang-vi][data-lang-en]").forEach(el => {
    const val = el.getAttribute(`data-lang-${currentLang}`);
    if (val !== null && val !== "") {
      el.innerHTML = val;
    }
  });

  // 2. Block-level container toggle (for elements that only have data-lang-vi or data-lang-en)
  document.querySelectorAll("[data-lang-vi]:not([data-lang-en])").forEach(el => {
    el.style.display = currentLang === "vi" ? "" : "none";
  });
  document.querySelectorAll("[data-lang-en]:not([data-lang-vi])").forEach(el => {
    el.style.display = currentLang === "en" ? "" : "none";
  });
}

/* --------------------------------------------------------------------------
   Dictionary Rendering & Filtering
   -------------------------------------------------------------------------- */
function filterDictionary(cat, buttonEl) {
  activeCategory = cat;
  document.querySelectorAll(".dict-pill").forEach(p => p.classList.remove("active"));
  if (buttonEl) buttonEl.classList.add("active");
  renderDictionary();
}

function handleSearch(term) {
  searchTerm = term.toLowerCase().trim();
  renderDictionary();
}

function renderDictionary() {
  const grid = document.getElementById("dict-grid");
  if (!grid || typeof GIT_DICTIONARY === "undefined") return;

  const t = PORTAL_I18N[currentLang];
  let items = GIT_DICTIONARY;

  // Category filter
  if (activeCategory !== "all") {
    items = items.filter(item => item.category === activeCategory);
  }

  // Search filter
  if (searchTerm) {
    items = items.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm);
      const summaryMatch = item.summary[currentLang].toLowerCase().includes(searchTerm);
      const syntaxMatch = item.syntax.toLowerCase().includes(searchTerm);
      return nameMatch || summaryMatch || syntaxMatch;
    });
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="dict-empty-state">
        <i class="fa-solid fa-magnifying-glass" style="font-size:2.5rem; color:var(--text-muted); margin-bottom:12px;"></i>
        <p>${currentLang === "vi" ? "Không tìm thấy lệnh hoặc thuật ngữ phù hợp với từ khóa này." : "No matching commands or terms found."}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(item => `
    <article class="dict-card" id="card-${item.id}">
      <div class="dict-card-header">
        <h3 class="dict-term-name"><code>${item.name}</code></h3>
        <span class="dict-cat-badge badge-${item.category}">${getCategoryLabel(item.category)}</span>
      </div>
      <p class="dict-summary">${item.summary[currentLang]}</p>
      
      <div class="code-snippet-box">
        <pre><code>${escapeHtml(item.syntax)}</code></pre>
        <button class="btn-copy-code" onclick="copyToClipboard('${escapeJs(item.syntax)}')" title="${t.copyBtn}">
          <i class="fa-regular fa-copy"></i>
        </button>
      </div>

      <div class="dict-details">
        <div class="dict-detail-item">
          <strong><i class="fa-solid fa-lightbulb" style="color:#ffd700;"></i> ${t.whenToUse}</strong>
          <span>${item.usage[currentLang]}</span>
        </div>
        <div class="dict-detail-item tip">
          <strong><i class="fa-solid fa-rocket" style="color:#00e5ff;"></i> ${t.proTip}</strong>
          <span>${item.tip[currentLang]}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function getCategoryLabel(cat) {
  const t = PORTAL_I18N[currentLang];
  switch (cat) {
    case "basic": return t.catBasic;
    case "branch": return t.catBranch;
    case "undo": return t.catUndo;
    case "github": return t.catGithub;
    case "security": return t.catSecurity;
    default: return cat;
  }
}

/* --------------------------------------------------------------------------
   Reading Progress & ScrollSpy
   -------------------------------------------------------------------------- */
function initScrollSpyAndProgress() {
  const progressBar = document.getElementById("reading-progress-bar");

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Highlight active chapter link in sticky TOC
    const chapters = document.querySelectorAll(".tutorial-chapter");
    let currentActiveId = "";

    chapters.forEach(chap => {
      const top = chap.getBoundingClientRect().top;
      if (top <= 140) {
        currentActiveId = chap.id;
      }
    });

    if (currentActiveId) {
      document.querySelectorAll(".toc-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentActiveId}`);
      });
    }
  });
}

function scrollToChapter(id) {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -70;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

/* --------------------------------------------------------------------------
   Helpers & Keyboard Shortcuts
   -------------------------------------------------------------------------- */
function initKeyboardShortcuts() {
  window.addEventListener("keydown", (e) => {
    // Cmd+K or Ctrl+K opens dictionary search
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const input = document.getElementById("dict-search-input");
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(PORTAL_I18N[currentLang].copiedToast);
  }).catch(() => {
    // Fallback
  });
}

function showToast(message) {
  const toast = document.getElementById("global-toast");
  if (!toast) return;
  document.getElementById("toast-text").textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeJs(str) {
  return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");
}
