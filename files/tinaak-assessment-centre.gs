/**
 * TiNAAK Assessment Centre — Google Sheets Logger
 * Google Apps Script — deploy as Web App
 *
 * SETUP INSTRUCTIONS:
 * 1. Open the Google Sheet you want to log to
 * 2. Extensions → Apps Script
 * 3. Replace everything in the editor with this code
 * 4. Click Save (Ctrl+S)
 * 5. Click Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy → copy the Web App URL
 * 7. In Cloudflare Worker dashboard → Settings → Variables
 *    Add: ASSESS_SHEET_URL = [paste the Web App URL]
 * 8. Re-deploy the worker
 *
 * The sheet will be auto-created with headers on first run.
 * Subsequent submissions append one row per assessment.
 *
 * SHEET COLUMNS (auto-created):
 * Timestamp | Name | Email | Phone | Role/Track | Assessment | Domain |
 * Score% | Correct | Total | Time(min) | S1% | S2% | S3% | S4% | S5% |
 * Strength Areas | Development Areas | Notes
 */

const SHEET_NAME = "Assessment Results";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Format A: { sheet: 'Assessment Results', row: [...] }
    // Used by the Cloudflare Worker for all routes
    if (data.sheet && data.row) {
      const ss    = SpreadsheetApp.getActiveSpreadsheet();
      let   sheet = ss.getSheetByName(data.sheet);

      if (!sheet) {
        sheet = ss.insertSheet(data.sheet);
        // Set headers based on which tab is being created
        const hdrs = data.sheet === 'Applications'
          ? ['Timestamp','Name','Email','Phone','Role Applied For','Location',
             'Current CTC','Expected CTC','Notice Period','LinkedIn','Cover Note']
          : ['Timestamp (IST)','Name','Email','Phone','Assessment','Applying For',
             'Overall Score %','Correct','Total','Time (min)',
             'S1 %','S2 %','S3 %','S4 %','S5 %',
             'Strong Sections','Weak Sections','Domain','Notes'];
        sheet.appendRow(hdrs);
        sheet.getRange(1, 1, 1, hdrs.length)
          .setBackground('#0F2747').setFontColor('#FFFFFF').setFontWeight('bold');
        sheet.setFrozenRows(1);
      }

      sheet.appendRow(data.row);
      return ok('saved');
    }

    // Format B: legacy assessment object format (kept for backwards compatibility)
    if (data.assessmentType === 'Application') {
      const appSheet = getOrCreateApplicationsSheet();
      appendApplicationRow(appSheet, data);
    } else {
      const sheet = getOrCreateSheet();
      appendRow(sheet, data);
    }

    return ok('saved');

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function ok(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, msg }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = [
      "Timestamp (IST)",
      "Name",
      "Email",
      "Phone",
      "Role / Track",
      "Assessment",
      "Domain",
      "Overall Score %",
      "Correct",
      "Total Questions",
      "Time (min)",
      "S1 %",
      "S2 %",
      "S3 %",
      "S4 %",
      "S5 %",
      "Strong Sections",
      "Weak Sections",
      "Notes / Self-Report",
    ];
    sheet.appendRow(headers);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0F2747");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Arial");
    headerRange.setFontSize(10);

    // Freeze header row
    sheet.setFrozenRows(1);

    // Set column widths
    const widths = [160, 160, 200, 130, 180, 180, 130, 110, 90, 110, 90, 70, 70, 70, 70, 70, 180, 180, 300];
    widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  }

  return sheet;
}

function appendRow(sheet, data) {
  const now = new Date();
  const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  const timestamp = Utilities.formatDate(ist, "GMT+5:30", "dd/MM/yyyy HH:mm:ss");

  // Parse section scores
  const sections = data.sections || {};
  const s1 = sections["1"] ? sections["1"].pct : (sections["s1"] ? sections["s1"] : "");
  const s2 = sections["2"] ? sections["2"].pct : (sections["s2"] ? sections["s2"] : "");
  const s3 = sections["3"] ? sections["3"].pct : (sections["s3"] ? sections["s3"] : "");
  const s4 = sections["4"] ? sections["4"].pct : (sections["s4"] ? sections["s4"] : "");
  const s5 = sections["5"] ? sections["5"].pct : (sections["s5"] ? sections["s5"] : "");

  // Identify strong (≥70%) and weak (<50%) sections
  const sectionLabels = data.sectionLabels || [];
  const strong = [], weak = [];
  [s1, s2, s3, s4, s5].forEach((pct, i) => {
    if (pct === "" || pct === undefined) return;
    const label = sectionLabels[i] || ("S" + (i + 1));
    if (pct >= 70) strong.push(label + " (" + pct + "%)");
    else if (pct < 50) weak.push(label + " (" + pct + "%)");
  });

  const row = [
    timestamp,
    data.name        || "",
    data.email       || "",
    data.phone       || "",
    data.applyingFor || data.role || "",
    data.assessmentType || data.assessment || "",
    data.domain      || "",
    data.pct         !== undefined ? data.pct : "",
    data.correct     !== undefined ? data.correct : "",
    data.total       !== undefined ? data.total : "",
    data.timeTaken   !== undefined ? data.timeTaken : "",
    s1, s2, s3, s4, s5,
    strong.join(" · ") || "",
    weak.join(" · ")   || "",
    data.notes       || data.selfSummary || data.example || "",
  ];

  sheet.appendRow(row);

  // Colour the score cell based on performance
  const lastRow = sheet.getLastRow();
  const scoreCell = sheet.getRange(lastRow, 8); // Overall Score % column
  if (data.pct !== undefined) {
    if (data.pct >= 70)      scoreCell.setBackground("#EAF7F7").setFontColor("#0A7A7A");
    else if (data.pct >= 50) scoreCell.setBackground("#FFF8E7").setFontColor("#8A5A00");
    else if (data.pct > 0)   scoreCell.setBackground("#FFF0F0").setFontColor("#A02020");
  }

  // Alternate row shading for readability
  if (lastRow % 2 === 0) {
    sheet.getRange(lastRow, 1, 1, row.length).setBackground("#F8F9FC");
  }
}


/* ══════════════════════════════════════════════════════════════
   APPLICATIONS SHEET
   One row per career application — cross-referenced by
   tinaak-assessment-automation.gs to track completion
══════════════════════════════════════════════════════════════ */
const APPS_SHEET_NAME = "Applications";

function getOrCreateApplicationsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(APPS_SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(APPS_SHEET_NAME);
    const headers = [
      "Timestamp (IST)", "Name", "Email", "Phone",
      "Role Applied For", "Role ID", "Required Tests",
      "Status", "Follow-up Sent", "Notes"
    ];
    sheet.appendRow(headers);
    const hr = sheet.getRange(1, 1, 1, headers.length);
    hr.setBackground("#0F2747").setFontColor("#FFFFFF").setFontWeight("bold");
    sheet.setFrozenRows(1);
    [160,160,200,130,200,140,280,100,120,300].forEach((w,i) => sheet.setColumnWidth(i+1, w));
  }

  return sheet;
}

function appendApplicationRow(sheet, data) {
  const now = new Date();
  const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  const timestamp = Utilities.formatDate(ist, "GMT+5:30", "dd/MM/yyyy HH:mm:ss");

  // Map role ID to required tests for display
  const ROLE_TESTS = {
    'fm-manager':       'FM Competency · Language · Spreadsheet · Profile',
    'fm-specialist':    'FM Competency · Language · Profile',
    'fm-associate':     'FM Competency · Language · Profile',
    'hr-manager':       'HR Competency · Language · Spreadsheet · Profile',
    'hr-executive':     'HR Competency · Language · Profile',
    'payroll-executive':'HR Competency · Language · Spreadsheet · Profile',
    'admin-manager':    'Admin Competency · Language · Spreadsheet · Profile',
    'front-office':     'Admin Competency · Language · Profile',
    'san-partner':      'Language · Profile',
    'general':          'Language · Profile',
  };

  const roleId       = data.domain || 'general';
  const requiredTests = ROLE_TESTS[roleId] || 'Language · Profile';

  const row = [
    timestamp,
    data.name        || "",
    data.email       || "",
    data.phone       || "",
    data.applyingFor || "",
    roleId,
    requiredTests,
    "Applied",          // Status — updated by automation script
    "No",               // Follow-up Sent — updated by automation script
    data.notes       || "",
  ];

  sheet.appendRow(row);

  // Colour status cell
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 8).setBackground("#FFF8E7").setFontColor("#B87800");
}

/**
 * Test function — run this manually from Apps Script editor to verify setup
 */
function testAppend() {
  const testData = {
    name: "Test Candidate",
    email: "test@tinaak.com",
    phone: "+91 99999 00000",
    applyingFor: "FM Associate Specialist",
    assessmentType: "FM Competency",
    domain: "Facility Management",
    pct: 78,
    correct: 47,
    total: 60,
    timeTaken: 42,
    sections: { "1": { pct: 83 }, "2": { pct: 75 }, "3": { pct: 80 }, "4": { pct: 67 }, "5": { pct: 72 } },
    sectionLabels: ["Operations", "Compliance", "Vendor Mgmt", "FM Numeracy", "Governance"],
    notes: "Test submission from Apps Script editor",
  };
  const sheet = getOrCreateSheet();
  appendRow(sheet, testData);
  Logger.log("Test row appended successfully");
}
