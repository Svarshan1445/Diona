# AI Prompt Log

Recording how I used AI for this assignment, since that was asked for.

First thing I did was hand over the 4 files from the assignment folder (the two form docx files + the two assignment_tracker docs) and asked the AI to go through them and pull out the actual structure — what fields exist, what tables, the header/footer text, the logo. Wanted to make sure I wasn't missing any field before I started coding.

Once I had a clear list of what's in each form, I asked for help planning out the files so it doesn't become one massive HTML file. Ended up splitting CSS into a base file + one file per form, and keeping the data (drug names, amounts, dates etc.) in separate JS files from the rendering code, so I could plug in different test datasets without touching the render logic.

Started with Exercise 1 — the six tables (Prescription, OTC, Supplies, Parking, Mileage, Bus/Taxi). Got AI's help writing the render loop and the subtotal/grand total calculation since that's basically the same pattern repeated 6 times. Tbh I messed up the grand total logic at first — it was adding up the raw table rows instead of the subtotals, so editing one row was throwing the total off. Had to go back and fix the calculation to always recompute from the data array instead of reading from the DOM.

Exercise 2 took longer than I expected — the conditional fields (like the treatment provider stuff only showing up when "continuing to receive treatment" is selected) needed some back and forth with AI to get the show/hide logic clean instead of a pile of if-else. The pain scale (1-10) was straightforward once I had the pattern for the radio buttons down.

Print CSS was annoying — first attempt still showed the "Add Row" buttons and toolbar in the print preview. Took a couple of tries with `@media print` before the buttons actually disappeared and only the form content showed up.

Tested both pages with just 1 row of data and then with 10+ rows to make sure tables don't break or overflow — that's what "dynamic" means here I think, so wanted to actually show that working rather than just claim it.

Assumptions I made where the docx wasn't 100% clear:
- No character limits were given for text fields, so just let them wrap naturally
- Assumed both an empty-table state and a heavy multi-row state both need to look fine, since the assignment specifically calls out testing with different dataset sizes
