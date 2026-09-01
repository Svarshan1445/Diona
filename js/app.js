/**
 * WCB Document Suite - Main Dashboard & Dynamic Interactive Engine
 */

window.currentDoc = 'expense';
window.currentDatasetKey = 'default';
window.activeData = null;

document.addEventListener('DOMContentLoaded', () => {
  window.initDocument();
  window.setupEventListeners();
});

window.initDocument = function() {
  if (window.currentDoc === 'expense') {
    const raw = ExpenseDatasets[window.currentDatasetKey] || ExpenseDatasets.default;
    window.activeData = JSON.parse(JSON.stringify(raw));
    renderExpenseDocument(window.activeData);
    document.title = 'Medical & Travel Expense Request - WCB Manitoba';
  } else {
    const raw = ProgressDatasets[window.currentDatasetKey] || ProgressDatasets.default;
    window.activeData = JSON.parse(JSON.stringify(raw));
    renderProgressDocument(window.activeData);
    document.title = 'Worker Progress Report - WCB Manitoba';
  }
};

window.switchDocument = function(docType) {
  window.currentDoc = docType;
  window.currentDatasetKey = 'default';
  
  document.querySelectorAll('.doc-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.doc === docType);
  });

  const select = document.getElementById('dataset-select');
  if (select) {
    select.innerHTML = docType === 'expense' 
      ? `
        <option value="default">Default Dataset (Sample Doc)</option>
        <option value="minimal">Minimal Single-Row Dataset</option>
        <option value="stressTest">Stress-Test Dataset (Multi-Month 10+)</option>
      `
      : `
        <option value="default">Default Progress Report</option>
        <option value="minimal">Early Stage / Not Returned</option>
        <option value="recovered">Full Recovery & Regular Duties</option>
      `;
    select.value = 'default';
  }

  window.initDocument();
};

window.changeDataset = function(key) {
  window.currentDatasetKey = key;
  window.initDocument();
};

window.openJsonModal = function() {
  const modal = document.getElementById('json-modal');
  const textarea = document.getElementById('json-editor-textarea');
  if (modal && textarea) {
    textarea.value = JSON.stringify(window.activeData, null, 2);
    modal.classList.add('open');
  }
};

window.closeJsonModal = function() {
  const modal = document.getElementById('json-modal');
  if (modal) modal.classList.remove('open');
};

window.applyCustomJson = function() {
  const textarea = document.getElementById('json-editor-textarea');
  if (!textarea) return;
  try {
    const parsed = JSON.parse(textarea.value);
    window.activeData = parsed;
    if (window.currentDoc === 'expense') {
      renderExpenseDocument(window.activeData);
    } else {
      renderProgressDocument(window.activeData);
    }
    window.closeJsonModal();
  } catch (err) {
    alert('Invalid JSON Syntax: ' + err.message);
  }
};

window.printDocument = function() {
  window.print();
};

window.setupEventListeners = function() {
  document.querySelectorAll('.doc-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.switchDocument(btn.dataset.doc);
    });
  });

  const select = document.getElementById('dataset-select');
  if (select) {
    select.addEventListener('change', (e) => window.changeDataset(e.target.value));
  }

  const editBtn = document.getElementById('btn-edit-json');
  if (editBtn) editBtn.addEventListener('click', window.openJsonModal);

  const closeBtn = document.getElementById('btn-close-modal');
  if (closeBtn) closeBtn.addEventListener('click', window.closeJsonModal);

  const applyBtn = document.getElementById('btn-apply-json');
  if (applyBtn) applyBtn.addEventListener('click', window.applyCustomJson);

  const printBtn = document.getElementById('btn-print');
  if (printBtn) printBtn.addEventListener('click', window.printDocument);
};
