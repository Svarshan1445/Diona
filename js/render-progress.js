/**
 * WCB Worker Progress Report - Pure Vanilla JavaScript Render Engine
 * Fully Interactive: Clickable Radio/Checkboxes, Clickable 1-10 Pain Scale, In-Place Editing
 */

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderProgressDocument(data, containerId = 'document-render-target') {
  const container = document.getElementById(containerId);
  if (!container) return;
  window.activeData = data;

  const rtw = data.returnToWork || {};
  const rec = data.recovery || {};
  const other = data.otherInformation || {};

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
          <h1 class="doc-main-title">Worker Progress Report</h1>
        </div>

        <!-- Claim Information Strip -->
        <div class="claim-info-strip">
          <div class="claim-info-item">
            <span class="claim-label">Claim No.:</span>
            <span class="claim-value editable-cell" contenteditable="true" onblur="window.updateProgressClaimField('claimNumber', this.innerText)">${escapeHTML(data.claimNumber)}</span>
          </div>
          <div class="claim-info-item">
            <span class="claim-label">Report Code:</span>
            <span class="claim-value">WP</span>
          </div>
          <div class="claim-worker-notice">
            <strong class="editable-cell" contenteditable="true" onblur="window.updateProgressClaimField('workerName', this.innerText)">${escapeHTML(data.workerName)}</strong> provided the following updates in relation to their claim:
          </div>
        </div>

        <!-- Section 1: Return to Work -->
        <div class="section-header">Return to Work</div>
        <div class="progress-section-container">
          <div class="form-group">
            <div class="form-label">Select one:</div>
            <div class="choice-group">
              <div class="choice-item clickable-choice" onclick="window.setRtwStatus('not_missed')">
                <span class="box-indicator radio ${rtw.status === 'not_missed' ? 'selected' : ''}"></span>
                <span>I have not missed time from work</span>
              </div>
              <div class="choice-item clickable-choice" onclick="window.setRtwStatus('not_returned')">
                <span class="box-indicator radio ${rtw.status === 'not_returned' ? 'selected' : ''}"></span>
                <span>I have not returned to work</span>
              </div>
              <div class="choice-item clickable-choice" onclick="window.setRtwStatus('returned')">
                <span class="box-indicator radio ${rtw.status === 'returned' ? 'selected' : ''}"></span>
                <span>I returned to work on: <span class="underlined-value editable-cell" contenteditable="true" onclick="event.stopPropagation()" onblur="window.updateRtwField('returnedDate', this.innerText)">${escapeHTML(rtw.returnedDate || 'March 15, 2024')}</span></span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label">I am working:</div>
            <div class="choice-group">
              <div class="choice-item clickable-choice" onclick="window.setDutyType('full_regular')">
                <span class="box-indicator radio ${rtw.dutyType === 'full_regular' ? 'selected' : ''}"></span>
                <span>Full duties, regular hours</span>
              </div>
              <div class="choice-item clickable-choice" onclick="window.setDutyType('full_reduced')">
                <span class="box-indicator radio ${rtw.dutyType === 'full_reduced' ? 'selected' : ''}"></span>
                <span>Full duties, reduced hours</span>
              </div>
              <div class="choice-item clickable-choice" onclick="window.setDutyType('modified_regular')">
                <span class="box-indicator radio ${rtw.dutyType === 'modified_regular' ? 'selected' : ''}"></span>
                <span>Modified duties, regular hours</span>
              </div>
              <div class="choice-item clickable-choice" onclick="window.setDutyType('modified_reduced')">
                <span class="box-indicator radio ${rtw.dutyType === 'modified_reduced' ? 'selected' : ''}"></span>
                <span>Modified duties, reduced hours</span>
              </div>
              <div class="choice-item clickable-choice" onclick="window.setDutyType('other')">
                <span class="box-indicator radio ${rtw.dutyType === 'other' ? 'selected' : ''}"></span>
                <span>Other: <span class="underlined-value editable-cell" contenteditable="true" onclick="event.stopPropagation()" onblur="window.updateRtwField('dutyOtherText', this.innerText)">${escapeHTML(rtw.dutyOtherText || '—')}</span></span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label">My return to work is going:</div>
            <div class="text-feedback-box editable-cell" contenteditable="true" onblur="window.updateRtwField('progressNotes', this.innerText)">${escapeHTML(rtw.progressNotes || '(Click to enter comments)')}</div>
          </div>

          <div class="form-row">
            <span class="form-label">I expect to return to work on:</span>
            <span class="underlined-value editable-cell" contenteditable="true" onblur="window.updateRtwField('expectedReturnDate', this.innerText)">${escapeHTML(rtw.expectedReturnDate || '—')}</span>
          </div>

          <div class="form-group">
            <div class="form-label">I have the following concerns about returning to work:</div>
            <div class="text-feedback-box editable-cell" contenteditable="true" onblur="window.updateRtwField('concerns', this.innerText)">${escapeHTML(rtw.concerns || '(Click to enter concerns)')}</div>
          </div>

          <div class="form-row">
            <span class="form-label">I was most recently in contact with:</span>
            <span class="underlined-value editable-cell" contenteditable="true" onblur="window.updateRtwField('employerContactName', this.innerText)">${escapeHTML(rtw.employerContactName || '—')}</span>
            <span class="form-label">on</span>
            <span class="underlined-value editable-cell" contenteditable="true" onblur="window.updateRtwField('employerContactDate', this.innerText)">${escapeHTML(rtw.employerContactDate || '—')}</span>
          </div>
        </div>

        <!-- Section 2: Recovery -->
        <div class="section-header">Recovery</div>
        <div class="progress-section-container">
          <div class="form-group">
            <div class="form-label">Select one:</div>
            <div class="choice-group">
              <div class="choice-item clickable-choice" onclick="window.setRecoveryStatus(false)">
                <span class="box-indicator radio ${rec.fullyRecovered === false ? 'selected' : ''}"></span>
                <span>I have not fully recovered from my workplace injury.</span>
              </div>
              <div class="choice-item clickable-choice" onclick="window.setRecoveryStatus(true)">
                <span class="box-indicator radio ${rec.fullyRecovered === true ? 'selected' : ''}"></span>
                <span>I have fully recovered from my workplace injury.</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label">I have provided the following comments about my recovery:</div>
            <div class="text-feedback-box editable-cell" contenteditable="true" onblur="window.updateRecoveryField('recoveryComments', this.innerText)">${escapeHTML(rec.recoveryComments || '(Click to add recovery comments)')}</div>
          </div>

          <!-- Pain Scale 1-10 Grid (Clickable) -->
          <div class="form-group">
            <div class="form-label">I rate my current pain/discomfort on a scale of 1-10, where 1 is no pain and 10 is severe pain:</div>
            <div class="pain-scale-container">
              <div class="pain-scale-grid">
                ${[1,2,3,4,5,6,7,8,9,10].map(val => `
                  <div class="pain-scale-cell clickable-pain-cell ${rec.painScaleRating === val ? 'active' : ''}" onclick="window.setPainRating(${val})" title="Click to rate ${val}/10">
                    ${val} ${rec.painScaleRating === val ? '★' : ''}
                  </div>
                `).join('')}
              </div>
              <div class="pain-scale-labels">
                <span>1 (No Pain)</span>
                <span>5 (Moderate Pain)</span>
                <span>10 (Severe Pain)</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label">Select one:</div>
            <div class="choice-group">
              <div class="choice-item clickable-choice" onclick="window.setTreatmentStatus(false)">
                <span class="box-indicator radio ${rec.continuingTreatment === false ? 'selected' : ''}"></span>
                <span>I am not continuing to receive medical treatment for my workplace injury.</span>
              </div>
              <div class="choice-item clickable-choice" onclick="window.setTreatmentStatus(true)">
                <span class="box-indicator radio ${rec.continuingTreatment === true ? 'selected' : ''}"></span>
                <span>I am continuing to receive medical treatment for my workplace injury from: <span class="underlined-value editable-cell" contenteditable="true" onclick="event.stopPropagation()" onblur="window.updateRecoveryField('treatmentProviderType', this.innerText)">${escapeHTML(rec.treatmentProviderType || 'Physiotherapist')}</span></span>
              </div>
            </div>
          </div>

          <div class="form-row" style="margin-left: 12px;">
            <span>My last medical treatment was on:</span>
            <span class="underlined-value editable-cell" contenteditable="true" onblur="window.updateRecoveryField('lastTreatmentDate', this.innerText)">${escapeHTML(rec.lastTreatmentDate || '—')}</span>
            <span>from:</span>
            <span class="underlined-value editable-cell" contenteditable="true" onblur="window.updateRecoveryField('lastTreatmentProvider', this.innerText)">${escapeHTML(rec.lastTreatmentProvider || 'Dr. Best')}</span>
          </div>

          <div class="form-row" style="margin-left: 12px;">
            <span>My next medical treatment is:</span>
            <span class="underlined-value editable-cell" contenteditable="true" onblur="window.updateRecoveryField('nextTreatmentDate', this.innerText)">${escapeHTML(rec.nextTreatmentDate || '—')}</span>
            <span>from:</span>
            <span class="underlined-value editable-cell" contenteditable="true" onblur="window.updateRecoveryField('nextTreatmentProvider', this.innerText)">${escapeHTML(rec.nextTreatmentProvider || '—')}</span>
          </div>

          <div class="form-row" style="margin-left: 12px;">
            <span>I am attending a Chiropractor or Physiotherapist:</span>
            <span class="underlined-value editable-cell" contenteditable="true" onblur="window.updateRecoveryField('chiroPhysioFrequency', this.innerText)">${escapeHTML(rec.chiroPhysioFrequency || '2 times per week')}</span>
          </div>

          <div class="form-group" style="margin-top: 6px;">
            <div class="form-label">Select one:</div>
            <div class="choice-group">
              <div class="choice-item clickable-choice" onclick="window.setMedicationStatus(false)">
                <span class="box-indicator radio ${rec.takingMedication === false ? 'selected' : ''}"></span>
                <span>I am not taking medication for my workplace injury.</span>
              </div>
              <div class="choice-item clickable-choice" onclick="window.setMedicationStatus(true)">
                <span class="box-indicator radio ${rec.takingMedication === true ? 'selected' : ''}"></span>
                <span>I am taking medication for my workplace injury: <span class="underlined-value editable-cell" contenteditable="true" onclick="event.stopPropagation()" onblur="window.updateRecoveryField('medicationName', this.innerText)">${escapeHTML(rec.medicationName || 'Naproxen 500mg')}</span></span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label">Select one:</div>
            <div class="choice-group">
              <div class="choice-item clickable-choice" onclick="window.setHomeExercisesStatus(false)">
                <span class="box-indicator radio ${rec.doingHomeExercises === false ? 'selected' : ''}"></span>
                <span>I am not doing home exercises for my workplace injury.</span>
              </div>
              <div class="choice-item clickable-choice" onclick="window.setHomeExercisesStatus(true)">
                <span class="box-indicator radio ${rec.doingHomeExercises === true ? 'selected' : ''}"></span>
                <span>I am doing home exercises for my workplace injury.</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="form-label">List the exercises you are doing:</div>
            <div class="text-feedback-box editable-cell" contenteditable="true" onblur="window.updateRecoveryField('homeExercisesList', this.innerText)">${escapeHTML(rec.homeExercisesList || '(Click to list home exercises)')}</div>
          </div>
        </div>

        <!-- Section 3: Other Information -->
        <div class="section-header">Other Information</div>
        <div class="progress-section-container">
          <div class="form-group">
            <div class="form-label">I would like to provide the following additional information about my claim/injury:</div>
            <div class="text-feedback-box editable-cell" contenteditable="true" onblur="window.updateOtherField('additionalNotes', this.innerText)">${escapeHTML(other.additionalNotes || 'No additional information provided.')}</div>
          </div>
        </div>

        <!-- Section 4: Certification & Privacy Notice -->
        <div class="legal-notice-box no-break">
          <p>
            <strong>Declaration:</strong> I certify that the information given on this form is true, correct and complete to the best of my knowledge.
            I agree to notify the Workers Compensation Board of Manitoba (WCB) immediately once I return to any form of work and/or employment.
            I understand that it is an offence to knowingly make a false statement to the WCB. I also understand that it is an offence to withhold information
            from WCB which affects my entitlement to compensation (e.g., full or partial recovery from injury, ability to return to work, sources of additional income, etc.).
            I understand that refusing to co-operate with, or follow my treatment, may result in the WCB reducing or suspending my benefits.
          </p>
          <p>
            <strong>Privacy Notice:</strong> I understand that the Privacy Notice applies to the personal information collected in this document.
          </p>
        </div>
      </div>

      <!-- Footer with Page Count -->
      <footer class="document-footer">
        <div>WCB Manitoba - Claim No. ${escapeHTML(data.claimNumber)} (WP)</div>
        <div class="page-number-indicator">Page 1 of 1</div>
        <div>Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
      </footer>
    </div>
  `;

  container.innerHTML = html;
}

// Global In-Place Interactive Handlers for Worker Progress Report
window.updateProgressClaimField = function(field, val) {
  if (window.activeData) {
    window.activeData[field] = val.trim();
  }
};

window.setRtwStatus = function(statusVal) {
  if (window.activeData) {
    if (!window.activeData.returnToWork) window.activeData.returnToWork = {};
    window.activeData.returnToWork.status = statusVal;
    renderProgressDocument(window.activeData);
  }
};

window.setDutyType = function(dutyVal) {
  if (window.activeData) {
    if (!window.activeData.returnToWork) window.activeData.returnToWork = {};
    window.activeData.returnToWork.dutyType = dutyVal;
    renderProgressDocument(window.activeData);
  }
};

window.updateRtwField = function(field, val) {
  if (window.activeData) {
    if (!window.activeData.returnToWork) window.activeData.returnToWork = {};
    window.activeData.returnToWork[field] = val.trim();
  }
};

window.setRecoveryStatus = function(boolVal) {
  if (window.activeData) {
    if (!window.activeData.recovery) window.activeData.recovery = {};
    window.activeData.recovery.fullyRecovered = boolVal;
    renderProgressDocument(window.activeData);
  }
};

window.setPainRating = function(ratingNum) {
  if (window.activeData) {
    if (!window.activeData.recovery) window.activeData.recovery = {};
    window.activeData.recovery.painScaleRating = ratingNum;
    renderProgressDocument(window.activeData);
  }
};

window.setTreatmentStatus = function(boolVal) {
  if (window.activeData) {
    if (!window.activeData.recovery) window.activeData.recovery = {};
    window.activeData.recovery.continuingTreatment = boolVal;
    renderProgressDocument(window.activeData);
  }
};

window.setMedicationStatus = function(boolVal) {
  if (window.activeData) {
    if (!window.activeData.recovery) window.activeData.recovery = {};
    window.activeData.recovery.takingMedication = boolVal;
    renderProgressDocument(window.activeData);
  }
};

window.setHomeExercisesStatus = function(boolVal) {
  if (window.activeData) {
    if (!window.activeData.recovery) window.activeData.recovery = {};
    window.activeData.recovery.doingHomeExercises = boolVal;
    renderProgressDocument(window.activeData);
  }
};

window.updateRecoveryField = function(field, val) {
  if (window.activeData) {
    if (!window.activeData.recovery) window.activeData.recovery = {};
    window.activeData.recovery[field] = val.trim();
  }
};

window.updateOtherField = function(field, val) {
  if (window.activeData) {
    if (!window.activeData.otherInformation) window.activeData.otherInformation = {};
    window.activeData.otherInformation[field] = val.trim();
  }
};
