/**
 * WCB Medical & Travel Expense Request - Pure Vanilla JavaScript Render Engine
 * Fully Interactive: Dynamic Arrays, Live In-Place Editing, Real-Time Calculations
 */

function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0.00';
  return '$' + amount.toFixed(2);
}

function parseCurrency(str) {
  if (typeof str === 'number') return str;
  if (!str) return 0;
  const cleaned = String(str).replace(/[^0-9.-]+/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderExpenseDocument(data, containerId = 'document-render-target') {
  const container = document.getElementById(containerId);
  if (!container) return;
  window.activeData = data;

  // Calculate Subtotals & Grand Total
  let totalPrescription = (data.prescriptionDrugs || []).reduce((sum, item) => sum + (parseFloat(item.paidAmount) || 0), 0);
  let totalOTC = (data.overTheCounterDrugs || []).reduce((sum, item) => sum + (parseFloat(item.paidAmount) || 0), 0);
  let totalSupplies = (data.medicalSupplies || []).reduce((sum, item) => sum + (parseFloat(item.paidAmount) || 0), 0);
  let totalParking = (data.parking || []).reduce((sum, item) => sum + (parseFloat(item.paidAmount) || 0), 0);
  let totalBusTaxi = (data.busTaxiFare || []).reduce((sum, item) => sum + (parseFloat(item.paidAmount) || 0), 0);
  let totalKm = (data.mileage || []).reduce((sum, item) => sum + (parseFloat(item.kmRoundTrip) || 0), 0);
  let grandTotal = totalPrescription + totalOTC + totalSupplies + totalParking + totalBusTaxi;

  let html = `
    <div class="document-page">
      <div class="document-content">
        <!-- Header -->
        <header class="wcb-header">
          <div class="wcb-logo-container">
            <img src="assets/wcb_logo.png" alt="Workers Compensation Board of Manitoba" onerror="this.src='assets/wcb_logo_small.jpg'" />
          </div>
          <div class="wcb-contact-info">
            <div class="wcb-address">${escapeHTML(data.header?.address || '333 Broadway Winnipeg, MB R3C 4W3')}</div>
            <div>Phone: ${escapeHTML(data.header?.phone || '(204) 954-4321')}</div>
            <div>Toll Free: ${escapeHTML(data.header?.tollFree || '1-855-954-4321')}</div>
            <div><a class="wcb-url" href="https://${escapeHTML(data.header?.website || 'wcb.mb.ca')}" target="_blank">${escapeHTML(data.header?.website || 'wcb.mb.ca')}</a></div>
          </div>
        </header>

        <!-- Main Title -->
        <div class="doc-title-bar">
          <h1 class="doc-main-title">Medical &amp; Travel Expense Request</h1>
        </div>

        <!-- Claim Information Strip -->
        <div class="claim-info-strip">
          <div class="claim-info-item">
            <span class="claim-label">Claim No.:</span>
            <span class="claim-value editable-cell" contenteditable="true" onblur="window.updateClaimField('claimNumber', this.innerText)">${escapeHTML(data.claimNumber)}</span>
          </div>
          <div class="claim-worker-notice">
            <strong class="editable-cell" contenteditable="true" onblur="window.updateClaimField('workerName', this.innerText)">${escapeHTML(data.workerName)}</strong> requested reimbursement for the following medical and/or travel expenses:
          </div>
        </div>

        <!-- Table 1: Prescription Drugs -->
        <div class="table-header-with-actions">
          <span class="section-title">Prescription Drugs</span>
          <button class="btn-add-row" onclick="window.addExpenseRow('prescriptionDrugs')">+ Add Drug</button>
        </div>
        <table class="expense-table">
          <thead>
            <tr>
              <th style="width: 25%;">Drug Name</th>
              <th style="width: 20%;" class="col-date">Prescription Date</th>
              <th style="width: 20%;" class="col-date">Date Purchased</th>
              <th style="width: 20%;">Healthcare Provider Name</th>
              <th style="width: 15%;" class="col-amount">Paid Amount</th>
              <th class="no-print" style="width: 30px; text-align: center;"></th>
            </tr>
          </thead>
          <tbody>
            ${(data.prescriptionDrugs && data.prescriptionDrugs.length > 0)
              ? data.prescriptionDrugs.map((item, idx) => `
                <tr>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('prescriptionDrugs', ${idx}, 'drugName', this.innerText)"><strong>${escapeHTML(item.drugName)}</strong></td>
                  <td class="col-date editable-cell" contenteditable="true" onblur="window.updateRowCell('prescriptionDrugs', ${idx}, 'prescriptionDate', this.innerText)">${escapeHTML(item.prescriptionDate)}</td>
                  <td class="col-date editable-cell" contenteditable="true" onblur="window.updateRowCell('prescriptionDrugs', ${idx}, 'datePurchased', this.innerText)">${escapeHTML(item.datePurchased)}</td>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('prescriptionDrugs', ${idx}, 'healthcareProvider', this.innerText)">${escapeHTML(item.healthcareProvider)}</td>
                  <td class="col-amount editable-cell" contenteditable="true" onblur="window.updateRowAmount('prescriptionDrugs', ${idx}, 'paidAmount', this.innerText)">${formatCurrency(item.paidAmount)}</td>
                  <td class="no-print" style="text-align: center;"><button class="btn-del-row" onclick="window.deleteExpenseRow('prescriptionDrugs', ${idx})" title="Delete row">×</button></td>
                </tr>
              `).join('')
              : `<tr class="table-empty-row"><td colspan="6">No prescription drug expenses claimed (<a href="javascript:void(0)" onclick="window.addExpenseRow('prescriptionDrugs')">+ Add first item</a>)</td></tr>`
            }
          </tbody>
        </table>

        <!-- Table 2: Over-the-Counter Drugs -->
        <div class="table-header-with-actions">
          <span class="section-title">Over-the-Counter Drugs</span>
          <button class="btn-add-row" onclick="window.addExpenseRow('overTheCounterDrugs')">+ Add OTC Drug</button>
        </div>
        <table class="expense-table">
          <thead>
            <tr>
              <th style="width: 25%;">Drug Name</th>
              <th style="width: 18%;" class="col-date">Date Purchased</th>
              <th style="width: 14%;" class="col-amount">Paid Amount</th>
              <th style="width: 23%;">Seller's Name</th>
              <th style="width: 20%;">Reason for Purchasing</th>
              <th class="no-print" style="width: 30px; text-align: center;"></th>
            </tr>
          </thead>
          <tbody>
            ${(data.overTheCounterDrugs && data.overTheCounterDrugs.length > 0)
              ? data.overTheCounterDrugs.map((item, idx) => `
                <tr>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('overTheCounterDrugs', ${idx}, 'drugName', this.innerText)"><strong>${escapeHTML(item.drugName)}</strong></td>
                  <td class="col-date editable-cell" contenteditable="true" onblur="window.updateRowCell('overTheCounterDrugs', ${idx}, 'datePurchased', this.innerText)">${escapeHTML(item.datePurchased)}</td>
                  <td class="col-amount editable-cell" contenteditable="true" onblur="window.updateRowAmount('overTheCounterDrugs', ${idx}, 'paidAmount', this.innerText)">${formatCurrency(item.paidAmount)}</td>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('overTheCounterDrugs', ${idx}, 'sellerName', this.innerText)">${escapeHTML(item.sellerName)}</td>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('overTheCounterDrugs', ${idx}, 'reason', this.innerText)">${escapeHTML(item.reason)}</td>
                  <td class="no-print" style="text-align: center;"><button class="btn-del-row" onclick="window.deleteExpenseRow('overTheCounterDrugs', ${idx})" title="Delete row">×</button></td>
                </tr>
              `).join('')
              : `<tr class="table-empty-row"><td colspan="6">No over-the-counter drug expenses claimed (<a href="javascript:void(0)" onclick="window.addExpenseRow('overTheCounterDrugs')">+ Add first item</a>)</td></tr>`
            }
          </tbody>
        </table>

        <!-- Table 3: Bandages, Braces or Other Medical Supplies -->
        <div class="table-header-with-actions">
          <span class="section-title">Bandages, Braces or Other Medical Supplies</span>
          <button class="btn-add-row" onclick="window.addExpenseRow('medicalSupplies')">+ Add Medical Supply</button>
        </div>
        <table class="expense-table">
          <thead>
            <tr>
              <th style="width: 22%;">Item Purchased</th>
              <th style="width: 15%;" class="col-date">Date Purchased</th>
              <th style="width: 14%;" class="col-center">Was this Prescribed?</th>
              <th style="width: 18%;">Healthcare Provider Name</th>
              <th style="width: 12%;" class="col-amount">Paid Amount</th>
              <th style="width: 19%;">Seller's Name</th>
              <th class="no-print" style="width: 30px; text-align: center;"></th>
            </tr>
          </thead>
          <tbody>
            ${(data.medicalSupplies && data.medicalSupplies.length > 0)
              ? data.medicalSupplies.map((item, idx) => `
                <tr>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('medicalSupplies', ${idx}, 'itemPurchased', this.innerText)"><strong>${escapeHTML(item.itemPurchased)}</strong></td>
                  <td class="col-date editable-cell" contenteditable="true" onblur="window.updateRowCell('medicalSupplies', ${idx}, 'datePurchased', this.innerText)">${escapeHTML(item.datePurchased)}</td>
                  <td class="col-center clickable-choice" onclick="window.toggleRowPrescribed(${idx})">${item.wasPrescribed ? 'Yes' : 'No'}</td>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('medicalSupplies', ${idx}, 'healthcareProvider', this.innerText)">${escapeHTML(item.healthcareProvider)}</td>
                  <td class="col-amount editable-cell" contenteditable="true" onblur="window.updateRowAmount('medicalSupplies', ${idx}, 'paidAmount', this.innerText)">${formatCurrency(item.paidAmount)}</td>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('medicalSupplies', ${idx}, 'sellerName', this.innerText)">${escapeHTML(item.sellerName)}</td>
                  <td class="no-print" style="text-align: center;"><button class="btn-del-row" onclick="window.deleteExpenseRow('medicalSupplies', ${idx})" title="Delete row">×</button></td>
                </tr>
              `).join('')
              : `<tr class="table-empty-row"><td colspan="7">No medical supplies claimed (<a href="javascript:void(0)" onclick="window.addExpenseRow('medicalSupplies')">+ Add first item</a>)</td></tr>`
            }
          </tbody>
        </table>

        <!-- Table 4: Parking for Medical Appointments -->
        <div class="table-header-with-actions">
          <span class="section-title">Parking for Medical Appointments</span>
          <button class="btn-add-row" onclick="window.addExpenseRow('parking')">+ Add Parking</button>
        </div>
        <table class="expense-table">
          <thead>
            <tr>
              <th style="width: 38%;">Address of Healthcare Provider/Medical Facility</th>
              <th style="width: 18%;" class="col-date">Date</th>
              <th style="width: 14%;" class="col-amount">Paid Amount</th>
              <th style="width: 13%;" class="col-center">Meter Used?</th>
              <th style="width: 17%;">Meter Number</th>
              <th class="no-print" style="width: 30px; text-align: center;"></th>
            </tr>
          </thead>
          <tbody>
            ${(data.parking && data.parking.length > 0)
              ? data.parking.map((item, idx) => `
                <tr>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('parking', ${idx}, 'facilityAddress', this.innerText)">${escapeHTML(item.facilityAddress)}</td>
                  <td class="col-date editable-cell" contenteditable="true" onblur="window.updateRowCell('parking', ${idx}, 'date', this.innerText)">${escapeHTML(item.date)}</td>
                  <td class="col-amount editable-cell" contenteditable="true" onblur="window.updateRowAmount('parking', ${idx}, 'paidAmount', this.innerText)">${formatCurrency(item.paidAmount)}</td>
                  <td class="col-center clickable-choice" onclick="window.toggleRowMeter(${idx})">${item.meterUsed ? 'Yes' : 'No'}</td>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('parking', ${idx}, 'meterNumber', this.innerText)">${escapeHTML(item.meterNumber || '-')}</td>
                  <td class="no-print" style="text-align: center;"><button class="btn-del-row" onclick="window.deleteExpenseRow('parking', ${idx})" title="Delete row">×</button></td>
                </tr>
              `).join('')
              : `<tr class="table-empty-row"><td colspan="6">No parking expenses claimed (<a href="javascript:void(0)" onclick="window.addExpenseRow('parking')">+ Add first item</a>)</td></tr>`
            }
          </tbody>
        </table>

        <!-- Table 5: Mileage to Medical Appointments -->
        <div class="table-header-with-actions">
          <span class="section-title">Mileage to Medical Appointments</span>
          <button class="btn-add-row" onclick="window.addExpenseRow('mileage')">+ Add Trip</button>
        </div>
        <div class="section-note">
          The WCB will generally reimburse only those transportation costs which are in excess of costs that would be incurred by the worker while travelling to and from work.
        </div>
        <table class="expense-table">
          <thead>
            <tr>
              <th style="width: 18%;" class="col-date">Appointment Date</th>
              <th style="width: 35%;">Address of Healthcare Provider/Medical Facility</th>
              <th style="width: 32%;">Address of Workplace</th>
              <th style="width: 15%;" class="col-amount">Number of km (Round Trip)</th>
              <th class="no-print" style="width: 30px; text-align: center;"></th>
            </tr>
          </thead>
          <tbody>
            ${(data.mileage && data.mileage.length > 0)
              ? data.mileage.map((item, idx) => `
                <tr>
                  <td class="col-date editable-cell" contenteditable="true" onblur="window.updateRowCell('mileage', ${idx}, 'appointmentDate', this.innerText)">${escapeHTML(item.appointmentDate)}</td>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('mileage', ${idx}, 'facilityAddress', this.innerText)">${escapeHTML(item.facilityAddress)}</td>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('mileage', ${idx}, 'workplaceAddress', this.innerText)">${escapeHTML(item.workplaceAddress)}</td>
                  <td class="col-amount editable-cell" contenteditable="true" onblur="window.updateRowKm(${idx}, this.innerText)"><strong>${escapeHTML(item.kmRoundTrip)} km</strong></td>
                  <td class="no-print" style="text-align: center;"><button class="btn-del-row" onclick="window.deleteExpenseRow('mileage', ${idx})" title="Delete row">×</button></td>
                </tr>
              `).join('')
              : `<tr class="table-empty-row"><td colspan="5">No mileage claimed (<a href="javascript:void(0)" onclick="window.addExpenseRow('mileage')">+ Add first item</a>)</td></tr>`
            }
          </tbody>
        </table>

        <!-- Table 6: Bus or Taxi Fare for Medical Appointments -->
        <div class="table-header-with-actions">
          <span class="section-title">Bus or Taxi Fare for Medical Appointments*</span>
          <button class="btn-add-row" onclick="window.addExpenseRow('busTaxiFare')">+ Add Fare</button>
        </div>
        <div class="section-note">
          *Note: Pre-approval is required from your WCB representative to claim taxi fare(s).
        </div>
        <table class="expense-table">
          <thead>
            <tr>
              <th style="width: 18%;" class="col-date">Appointment Date</th>
              <th style="width: 26%;">Address of Starting Point</th>
              <th style="width: 29%;">Address of Healthcare Provider/Medical Facility</th>
              <th style="width: 13%;" class="col-center">Bus or Taxi</th>
              <th style="width: 14%;" class="col-amount">Total Fare Paid</th>
              <th class="no-print" style="width: 30px; text-align: center;"></th>
            </tr>
          </thead>
          <tbody>
            ${(data.busTaxiFare && data.busTaxiFare.length > 0)
              ? data.busTaxiFare.map((item, idx) => `
                <tr>
                  <td class="col-date editable-cell" contenteditable="true" onblur="window.updateRowCell('busTaxiFare', ${idx}, 'appointmentDate', this.innerText)">${escapeHTML(item.appointmentDate)}</td>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('busTaxiFare', ${idx}, 'startingAddress', this.innerText)">${escapeHTML(item.startingAddress || '(Not specified)')}</td>
                  <td class="editable-cell" contenteditable="true" onblur="window.updateRowCell('busTaxiFare', ${idx}, 'facilityAddress', this.innerText)">${escapeHTML(item.facilityAddress)}</td>
                  <td class="col-center clickable-choice" onclick="window.toggleTransportType(${idx})"><strong>${escapeHTML(item.transportType)}</strong></td>
                  <td class="col-amount editable-cell" contenteditable="true" onblur="window.updateRowAmount('busTaxiFare', ${idx}, 'paidAmount', this.innerText)">${formatCurrency(item.paidAmount)}</td>
                  <td class="no-print" style="text-align: center;"><button class="btn-del-row" onclick="window.deleteExpenseRow('busTaxiFare', ${idx})" title="Delete row">×</button></td>
                </tr>
              `).join('')
              : `<tr class="table-empty-row"><td colspan="6">No bus or taxi fares claimed (<a href="javascript:void(0)" onclick="window.addExpenseRow('busTaxiFare')">+ Add first item</a>)</td></tr>`
            }
          </tbody>
        </table>

        <!-- Grand Total Summary Card -->
        <div class="expense-summary-box no-break">
          <div class="expense-summary-card">
            <div class="expense-summary-row">
              <span>Prescription Drugs Total:</span>
              <span id="subtotal-prescription">${formatCurrency(totalPrescription)}</span>
            </div>
            <div class="expense-summary-row">
              <span>Over-the-Counter Total:</span>
              <span id="subtotal-otc">${formatCurrency(totalOTC)}</span>
            </div>
            <div class="expense-summary-row">
              <span>Medical Supplies Total:</span>
              <span id="subtotal-supplies">${formatCurrency(totalSupplies)}</span>
            </div>
            <div class="expense-summary-row">
              <span>Parking Total:</span>
              <span id="subtotal-parking">${formatCurrency(totalParking)}</span>
            </div>
            <div class="expense-summary-row">
              <span>Bus / Taxi Total:</span>
              <span id="subtotal-bustaxi">${formatCurrency(totalBusTaxi)}</span>
            </div>
            <div class="expense-summary-row">
              <span>Total Mileage Claimed:</span>
              <span id="subtotal-km">${totalKm} km</span>
            </div>
            <div class="expense-summary-row grand-total">
              <span>Total Out-of-Pocket Reimbursement:</span>
              <span id="grand-total-amount">${formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        <!-- Privacy & Legal Notice -->
        <div class="legal-notice-box no-break">
          <p><strong>Privacy Notice:</strong> I understand that the Privacy Notice applies to the personal information collected in this document.</p>
        </div>
      </div>

      <!-- Footer with Page Count -->
      <footer class="document-footer">
        <div>WCB Manitoba - Claim No. ${escapeHTML(data.claimNumber)}</div>
        <div class="page-number-indicator">Page 1 of 1</div>
        <div>Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
      </footer>
    </div>
  `;

  container.innerHTML = html;
}

// Global In-Place Interactive Handlers
window.updateClaimField = function(field, val) {
  if (window.activeData) {
    window.activeData[field] = val.trim();
  }
};

window.updateRowCell = function(tableKey, idx, prop, val) {
  if (window.activeData && window.activeData[tableKey] && window.activeData[tableKey][idx]) {
    window.activeData[tableKey][idx][prop] = val.trim();
  }
};

window.updateRowAmount = function(tableKey, idx, prop, val) {
  if (window.activeData && window.activeData[tableKey] && window.activeData[tableKey][idx]) {
    window.activeData[tableKey][idx][prop] = parseCurrency(val);
    renderExpenseDocument(window.activeData);
  }
};

window.updateRowKm = function(idx, val) {
  if (window.activeData && window.activeData.mileage && window.activeData.mileage[idx]) {
    window.activeData.mileage[idx].kmRoundTrip = parseCurrency(val);
    renderExpenseDocument(window.activeData);
  }
};

window.toggleRowPrescribed = function(idx) {
  if (window.activeData && window.activeData.medicalSupplies && window.activeData.medicalSupplies[idx]) {
    window.activeData.medicalSupplies[idx].wasPrescribed = !window.activeData.medicalSupplies[idx].wasPrescribed;
    renderExpenseDocument(window.activeData);
  }
};

window.toggleRowMeter = function(idx) {
  if (window.activeData && window.activeData.parking && window.activeData.parking[idx]) {
    window.activeData.parking[idx].meterUsed = !window.activeData.parking[idx].meterUsed;
    renderExpenseDocument(window.activeData);
  }
};

window.toggleTransportType = function(idx) {
  if (window.activeData && window.activeData.busTaxiFare && window.activeData.busTaxiFare[idx]) {
    const cur = window.activeData.busTaxiFare[idx].transportType;
    window.activeData.busTaxiFare[idx].transportType = (cur === 'Bus') ? 'Taxi' : 'Bus';
    renderExpenseDocument(window.activeData);
  }
};

window.addExpenseRow = function(tableKey) {
  if (!window.activeData) return;
  if (!window.activeData[tableKey]) window.activeData[tableKey] = [];
  
  const todayStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  if (tableKey === 'prescriptionDrugs') {
    window.activeData.prescriptionDrugs.push({ drugName: 'New Prescription Drug', prescriptionDate: todayStr, datePurchased: todayStr, healthcareProvider: 'Dr. Specialist', paidAmount: 25.00 });
  } else if (tableKey === 'overTheCounterDrugs') {
    window.activeData.overTheCounterDrugs.push({ drugName: 'New OTC Drug', datePurchased: todayStr, paidAmount: 12.00, sellerName: 'Local Pharmacy', reason: 'Pain relief' });
  } else if (tableKey === 'medicalSupplies') {
    window.activeData.medicalSupplies.push({ itemPurchased: 'New Medical Supply', datePurchased: todayStr, wasPrescribed: true, healthcareProvider: 'Dr. Specialist', paidAmount: 18.50, sellerName: 'Medical Store' });
  } else if (tableKey === 'parking') {
    window.activeData.parking.push({ facilityAddress: 'Clinic Facility, Winnipeg', date: todayStr, paidAmount: 8.00, meterUsed: true, meterNumber: 'M-5501' });
  } else if (tableKey === 'mileage') {
    window.activeData.mileage.push({ appointmentDate: todayStr, facilityAddress: 'Hospital Wing, Winnipeg', workplaceAddress: 'Workplace Address, Winnipeg', kmRoundTrip: 15 });
  } else if (tableKey === 'busTaxiFare') {
    window.activeData.busTaxiFare.push({ appointmentDate: todayStr, startingAddress: 'Residence', facilityAddress: 'Healthcare Facility', transportType: 'Bus', paidAmount: 3.50 });
  }

  renderExpenseDocument(window.activeData);
};

window.deleteExpenseRow = function(tableKey, idx) {
  if (window.activeData && window.activeData[tableKey]) {
    window.activeData[tableKey].splice(idx, 1);
    renderExpenseDocument(window.activeData);
  }
};
