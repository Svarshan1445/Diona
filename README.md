# WCB Manitoba PDF Report Recreation – HTML, CSS & JavaScript
### Diona Technologies Internship Assignment

---

## 📌 Overview

This repository contains the complete implementation for the two assigned statutory document exercises for the Workers Compensation Board of Manitoba (WCB). The objective is to recreate the provided reference PDF/Word documents as responsive, pixel-accurate web applications using **Pure HTML, CSS, and JavaScript**, while fully supporting dynamic data scaling, interactive form states, and print-ready PDF export without breaking layouts.

---

## 📑 Exercises

### Exercise 1 – Medical & Travel Expense Request
A dynamic, web-based recreation of the WCB Medical & Travel Expense Request statutory reimbursement form.

* **WCB Logo and Header:** High-resolution official branding, address (333 Broadway Winnipeg, MB R3C 4W3), phone numbers, and website link.
* **Worker & Claim Information:** Claim No. 20042047 and worker notice (*Madeleine Willson*).
* **6 Dynamic Expense Tables:**
  1. Prescription Drugs
  2. Over-the-Counter Drugs
  3. Bandages, Braces or Other Medical Supplies
  4. Parking for Medical Appointments
  5. Mileage to Medical Appointments
  6. Bus or Taxi Fare for Medical Appointments
* **Real-time Financial Calculations:** Automated category subtotals and Grand Total Out-of-Pocket Reimbursement calculation on every keystroke/data mutation.
* **In-Place Row Actions:** Interactive `+ Add Row` and `× Delete Row` buttons for seamless table manipulation.
* **Statutory Privacy Notice & Print Footer:** Standardized legal box, claim reference, and page number indicator (`Page 1 of 1`).

---

### Exercise 2 – Worker Progress Report
A dynamic, web-based recreation of the WCB Worker Progress Report tracking worker recovery and duty accommodations.

* **WCB Logo and Header:** Official header, Claim Number, and Report Code (WP).
* **Return-to-Work Section:** Interactive custom radio indicators for work status (Not Missed Time / Not Returned / Returned with date), work duty accommodations (Full/Modified duties, regular/reduced hours), return-to-work progress notes, expected return date, and employer contact records.
* **Recovery Section:** Clickable recovery status toggle, comments box, and an interactive **1–10 Pain/Discomfort Scale Matrix** with real-time active star badge highlight.
* **Medical Treatment & Home Exercises:** Treatment provider details, appointment dates, frequency, prescribed medications, and structured home exercise programs.
* **Legal Certification & Privacy Notice:** Official WCB legal declaration and privacy policy.
* **Print-Ready Structure:** Clean form boundaries formatted for official submission.

---

## 💻 Tech Stack

* **HTML5:** Semantic document structure, accessible input states, and tabular hierarchies.
* **CSS3:** Custom layout styling, modular stylesheets (`base.css`, `document-common.css`, `expense-request.css`, `worker-progress.css`, `interactive.css`, `app-toolbar.css`), table borders, typography, and robust `@media print` rules.
* **JavaScript (Vanilla JS):** Client-side reactive data-driven rendering engine, live calculation reducers, dataset switcher, and in-place DOM editing. Zero third-party UI frameworks or external dependencies.

---

## ✨ Key Features

* **Data-Driven Architecture:** Pure client-side generation from decoupled JSON data structures.
* **Dynamic Datasets:** Instant switching via the top navigation dropdown:
  * *Default Dataset:* Exact statutory sample matching reference documents.
  * *Minimal Dataset:* 1-row item and empty state fallback testing.
  * *Stress-Test Dataset:* Multi-month record with 10+ items per category demonstrating dynamic scaling without layout breakdown.
* **Live In-Place Editing:** Direct click-and-type editing on table cells, text areas, and underlined fields.
* **Interactive Form Elements:** Clickable radio buttons, checkbox indicators (`✓` / `•`), and clickable 1–10 pain scale cells.
* **⚙️ Live JSON Editor:** Integrated modal allowing evaluators to paste and render custom arbitrary JSON payloads in real time.
* **Print-Ready Letter Layout (8.5" x 11"):** Native browser PDF printing with automatic suppression of UI toolbars, buttons, and edit outlines.

---

## 📊 Dynamic Data Capabilities

The reports are designed to scale and adapt dynamically to varying data payloads:

* Worker Name & Claim Number
* Return-to-Work dates, duty types, and supervisor contacts
* Medical treatment provider types, clinic names, and treatment dates
* 1–10 Pain / discomfort scale ratings
* Dynamic multi-row expense tables (1 to 10+ entries)
* Currency values with automated category subtotals and grand totals
* Mileage distance calculations (round trip km)

---

## 🚀 How to Run Locally

Since this application is completely client-side with zero build steps or package dependencies:

### Method 1: Direct File Launch
Double-click `index.html` (or open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari).

### Method 2: Local HTTP Server (Port 7725 or 8000)
```bash
# Using Python
python -m http.server 7725

# Using Node / npx
npx serve . -l 7725
```
Open your browser at `http://localhost:7725`.

---

## 🖨️ Printing & Saving as PDF

To export a clean, official statutory PDF from the browser:

1. Open the document in **Google Chrome** or **Microsoft Edge**.
2. Press **`Ctrl + P`** (or **`Cmd + P`** on macOS), or click the **"🖨 Print / Export PDF"** button.
3. Destination: Select **Save as PDF**.
4. Paper size: Select **Letter** (8.5" x 11").
5. Options: **Uncheck "Headers and footers"** (the application natively renders standardized headers, page numbers, and footers).
6. Click **Save**.

---

## 📹 Demonstration Videos (Picture-in-Picture)

Each exercise includes a 2-minute narrated demonstration video featuring Picture-in-Picture (Face Webcam + Browser Screen Recording):

| Exercise | Walkthrough Overview | Video Link |
| :--- | :--- | :--- |
| **Exercise 1: Expense Request** | Explains requirements, demonstrates dynamic table scaling (1 vs 10+ rows), live row additions/deletions, real-time total recalculation, print preview, code walkthrough, and AI prompts. | 🎥 [Watch Video 1 on Loom](https://www.loom.com/share/e8627bb8e52b42948e815814af9dd9bb) |
| **Exercise 2: Worker Progress** | Explains return-to-work tracking, demonstrates clickable radio/checkbox states, interactive 1–10 pain matrix, dataset switching, print formatting, code architecture, and AI prompts. | 🔗 `[Insert Exercise 2 Video Link / Drive / YouTube]` |

---

## 🤖 AI Usage & Prompt History

AI assistance was utilized during the development workflow for requirement deconstruction, modular architecture planning, render engine synthesis, print CSS boundary adjustments, and code refinement.

A complete personal audit log of the AI prompt engineering and iterative refinement process is included in this repository:
👉 **[`AI_PROMPT_LOGS.md`](./AI_PROMPT_LOGS.md)**

---

## 👤 Author & Submission Information

* **Author:** Svarshan
* **GitHub Profile:** [@Svarshan1445](https://github.com/Svarshan1445)
* **GitHub Repository:** [https://github.com/Svarshan1445/Diona](https://github.com/Svarshan1445/Diona)
* **Submission Format (WhatsApp Group):**
  ```text
  Svarshan - https://github.com/Svarshan1445/Diona
  ```
* **Submission Deadline:** September 1, 2026, by 5:00 PM IST
