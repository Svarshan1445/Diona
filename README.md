# Workers Compensation Board of Manitoba (WCB) - Digital Document Forms Suite

**Author:** Svarshan ([@Svarshan1445](https://github.com/Svarshan1445))  
**Repository:** [https://github.com/Svarshan1445/Diona](https://github.com/Svarshan1445/Diona)  
**Tech Stack:** Pure HTML5, CSS3, Vanilla JavaScript (Zero third-party frameworks/dependencies)

---

## 📹 Video Presentation Submissions (Picture-in-Picture)

As per the assignment requirements, each 2-minute narrated video features Picture-in-Picture (Webcam Face + Browser Screen Recording) walking through the requirements, dynamic datasets, code architecture, challenges, and AI prompts:

| Exercise | Description | Video Link |
| :--- | :--- | :--- |
| **Exercise 1** | Medical & Travel Expense Request Form Walkthrough | 🔗 `[Insert Exercise 1 Video Link / Google Drive / YouTube Unlisted Link]` |
| **Exercise 2** | Worker Progress Report Form Walkthrough | 🔗 `[Insert Exercise 2 Video Link / Google Drive / YouTube Unlisted Link]` |

*(Word-for-word presentation scripts for both videos are provided in the [Video Presentation Guides](#-2-minute-narrated-video-presentation-guides) section below.)*

---

## 📋 Assignment Objectives & Submission Checklist

| Evaluation Parameter | Status | Implementation Details |
| :--- | :---: | :--- |
| **1. Open Code Core Architecture** | ✅ Completed | Built strictly with semantic HTML5, decoupled modular CSS3 stylesheets (`base.css`, `document-common.css`, `expense-request.css`, `worker-progress.css`, `interactive.css`), and Vanilla JavaScript object models. Zero external UI frameworks or build steps. |
| **2. Exercise 1 Copy & Scaling** | ✅ Completed | Dynamic array parsing across all 6 tables (Prescription Drugs, OTC Drugs, Supplies, Parking, Mileage, Bus/Taxi Fares) with real-time automatic subtotal summation and Grand Total calculation. Includes in-place table row additions/deletions and in-cell editing. |
| **3. Exercise 2 Copy & Form Logic** | ✅ Completed | Dynamic boolean flags rendering custom checkbox/radio indicators (`✓` / `•`), interactive clickable 1–10 visual pain scale matrix, dynamic recovery inputs, and statutory declaration notice. |
| **4. High-Fidelity Print & PDF Engine** | ✅ Completed | High-resolution WCB vector/raster header logo, official contact bar, standardized claim headers, page count indicator (`Page 1 of 1`), and dedicated `@media print` rules removing UI controls and formatting to exact Letter/A4 boundaries. |
| **5. Multi-Scenario Datasets & Live JSON** | ✅ Completed | Seamless switching between *Default Dataset*, *Minimal Single-Row Dataset*, and *Multi-Month Stress-Test (10+ items)*. Includes integrated **Live JSON Editor** for arbitrary testing. |
| **6. Narrated PiP Presentation Scripts** | ✅ Completed | Complete 2-minute spoken scripts for both exercises provided below. |
| **7. AI Prompt History Logging** | ✅ Completed | Full transcript and audit log of AI prompt engineering documented in [`AI_PROMPT_LOGS.md`](./AI_PROMPT_LOGS.md). |

---

## 📁 Repository Structure

```
Diona/
├── index.html                  # Unified Interactive Studio & Document Switcher
├── expense-request.html        # Standalone Document 1 (Medical & Travel Expense Request)
├── worker-progress.html        # Standalone Document 2 (Worker Progress Report)
├── assets/
│   ├── wcb_logo.png            # High-resolution WCB Manitoba Header Logo
│   └── wcb_logo_small.jpg      # Fallback brand image
├── css/
│   ├── base.css                # Global CSS variables, typography reset, print media rules
│   ├── document-common.css     # Shared WCB headers, claim info strips, legal footer
│   ├── expense-request.css     # Table layout, zebra striping, currency alignment, total card
│   ├── worker-progress.css     # Custom radio/checkbox indicators, 1-10 pain grid
│   ├── interactive.css         # Live cell editing, row add/delete buttons, hover states
│   └── app-toolbar.css         # Sleek top toolbar & JSON live editor modal
├── js/
│   ├── data-expense.js         # Expense request datasets (Default, Minimal, 10+ item Stress-Test)
│   ├── data-progress.js        # Progress report datasets (Default, Early Stage, Recovered)
│   ├── render-expense.js       # Pure Vanilla JS render engine & calculations for Document 1
│   ├── render-progress.js      # Pure Vanilla JS render engine & interactive state for Document 2
│   └── app.js                  # Application coordinator & event dispatcher
├── README.md                   # Comprehensive documentation, video guides & submission format
└── AI_PROMPT_LOGS.md           # Prompt engineering log and development trajectory
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Open (Zero Setup Required)
Double-click `index.html` (or open it in Google Chrome, Microsoft Edge, Firefox, or Safari).

### Option 2: Local HTTP Server (Port 7725 or 8000)
```bash
# Using Python 3
python -m http.server 7725

# Or using Node / npx
npx serve . -l 7725
```
Open your browser at `http://localhost:7725`.

---

## 💡 Key Technical Features & Dynamic Behavior

1. **Dynamic Table Arrays & Row Manipulation:**
   - Evaluators can click `+ Add Drug`, `+ Add OTC Drug`, `+ Add Medical Supply`, `+ Add Parking`, `+ Add Trip`, or `+ Add Fare` to dynamically insert new rows on the fly.
   - Rows can be deleted individually with the `×` delete button.
   - Any cell can be clicked and edited directly; subtotals and the grand total recalculate instantly on blur/keystroke without page reload.
2. **Interactive Form States:**
   - Document 2 allows evaluators to click on radio buttons and checkbox choices to toggle injury and return-to-work progression states.
   - Clicking any rating on the 1–10 Pain Scale instantly updates the active star badge and visual selection.
3. **Print Fidelity:**
   - Pressing `Ctrl + P` (or clicking the "🖨 Print / Export PDF" button) automatically hides the top toolbar, action buttons, and edit outlines, rendering a clean, pixel-perfect statutory PDF document.

---

## 🎥 2-Minute Narrated Video Presentation Guides (PiP Webcam + Screen)

*Use software like OBS Studio, Loom, or Windows Clipchamp with Picture-in-Picture (Face Webcam visible in corner + Browser screen sharing).*

---

### 🎙️ Video Script 1: Exercise 1 — Medical & Travel Expense Request (~2 Minutes)

| Timeline | Spoken Script & Screen Action |
| :--- | :--- |
| **0:00 - 0:25** | *"Hello everyone. Today I'm presenting my solution for Exercise 1: the WCB Manitoba Medical & Travel Expense Request form. The requirement was to replicate the statutory PDF with 100% fidelity using pure HTML, CSS, and Vanilla JavaScript, ensuring dynamic scalability from single items to multi-page lists."* <br>*(Action: Show the default view of Document 1 on localhost:7725)* |
| **0:25 - 0:50** | *"Let's look at the dynamic behavior. I have modeled all six tables—Prescription, Over-the-Counter, Medical Supplies, Parking, Mileage, and Transit Fares—as dynamic arrays. Notice the grand total currently shows \$56.00. If I click '+ Add Drug' or edit this price to \$50.00, you can see all category subtotals and the grand total recalculate automatically in real-time."* <br>*(Action: Click '+ Add Drug', change a value, point out automatic recalculation)* |
| **0:50 - 1:15** | *"Now let's switch from the Default Dataset to the 10+ item Multi-Month Stress Test using the top dropdown. As you can see, the layout seamlessly scales across multiple categories without text clipping or border breakdown. I can also open the Live JSON Editor to inject custom test payloads."* <br>*(Action: Select 'Stress-Test Dataset', scroll down, open & close 'Edit JSON')* |
| **1:15 - 1:40** | *"For the technical architecture, I used decoupled CSS for typography and print boundaries. When I trigger the Print / Export to PDF button, all action buttons and navigation bars disappear, leaving a clean, print-ready document with exact margins and headers."* <br>*(Action: Click 'Print / Export PDF' and display the print preview modal)* |
| **1:40 - 2:00** | *"One key challenge was maintaining table alignment and currency formatting when rows expand dynamically, which I resolved with tabular-nums CSS and pure JS reducers. All AI prompt logs are documented in AI_PROMPT_LOGS.md in the repo. Thank you!"* <br>*(Action: Briefly show repository structure in VS Code and conclude)* |

---

### 🎙️ Video Script 2: Exercise 2 — Worker Progress Report (~2 Minutes)

| Timeline | Spoken Script & Screen Action |
| :--- | :--- |
| **0:00 - 0:25** | *"Hello. In this video, I will demonstrate Exercise 2: the WCB Manitoba Worker Progress Report. This document tracks a worker's return-to-work status, recovery progress, treatment schedules, and subjective pain scores using pure HTML, CSS, and Vanilla JS."* <br>*(Action: Switch to Document 2: Worker Progress Report)* |
| **0:25 - 0:50** | *"Looking at the dynamic inputs: notice the custom radio and checkbox indicators. Clicking between 'Not Missed Time', 'Not Returned', or 'Returned' instantly toggles the custom dot indicators. Similarly, under Recovery, evaluators can click directly on the 1-to-10 pain scale matrix to select a rating, which highlights the active rating with a star badge."* <br>*(Action: Click different radio options, click on pain scale numbers 4, 7, 9)* |
| **0:50 - 1:15** | *"We can also switch datasets to simulate different worker recovery stages: from 'Early Stage / Not Returned' to 'Full Recovery & Normal Duties'. All feedback boxes and underlined fields are fully editable in-place, allowing seamless live adjustments."* <br>*(Action: Change dropdown to 'Early Stage', then 'Full Recovery', type into a comment box)* |
| **1:15 - 1:40** | *"For code implementation, render-progress.js dynamically maps boolean state flags and string values to custom SVG/Unicode box indicators without requiring heavy frameworks. Triggering Print Preview shows that the full declaration, legal notes, and claim footer format perfectly for official submission."* <br>*(Action: Open Print Preview, show clean legal box & footer)* |
| **1:40 - 2:00** | *"A challenge was building accessible, framework-free custom radio buttons that remain interactive on screen while printing cleanly. Full development prompts are in AI_PROMPT_LOGS.md. Thank you!"* <br>*(Action: Conclude video with face and screen visible)* |

---

## 📌 Assumptions Made & Challenges Resolved

1. **Dynamic Row Count Handling:** Assumed tables must gracefully handle both 0-row empty states (displaying a helpful *'No expenses claimed'* notice with a one-click add button) and 10+ items without layout distortion.
2. **Framework-Free State Management:** Instead of importing React or Vue, designed a lightweight reactive render loop in vanilla JS that re-renders DOM fragments and recalculates totals upon data mutations.
3. **Print Layout Suppression:** Ensured interactive web features (`+ Add Row`, `Delete`, `Edit JSON`, hover borders) are completely suppressed via `@media print` CSS.

---

## 📤 Submission Format
- **WhatsApp Post Format:** `<Your Name> - <GitHub Repository Link>`
- **Example:** `Svarshan - https://github.com/Svarshan1445/Diona`
- **Deadline:** September 1, 2026, by 5:00 PM IST
