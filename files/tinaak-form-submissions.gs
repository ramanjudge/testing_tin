/* ═══════════════════════════════════════════════════════════════
   TiNAAK Form Submissions — Google Apps Script
   Handles: Contact · Careers · Network · Products

   DEPLOY AS:
     Extensions → Apps Script → paste this → Save
     Deploy → New Deployment → Web App
     Execute as: Me  |  Access: Anyone
     Copy the Web App URL → paste into Cloudflare as SHEET_URL
═══════════════════════════════════════════════════════════════ */

const HEADERS = {
  Contact:  ['Timestamp','Name','Email','Phone','Organisation','City','Team Size','Primary Need','Message','Source'],
  Careers:  ['Timestamp','Name','Email','Phone','Role Applied For','Experience','LinkedIn','Cover Note'],
  Network:  ['Timestamp','Name','Email','Phone','Track','City','Domain / Category','Sectors','LinkedIn','Message'],
  Products: ['Timestamp','Email','Product'],
};

function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const ALLOWED_SHEETS = ['Contact', 'Careers', 'Network', 'Products'];
    if (!ALLOWED_SHEETS.includes(data.sheet)) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Wrong sheet — use ASSESS_SHEET_URL for ' + data.sheet }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(data.sheet);

    // Create tab with headers if it doesn't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(data.sheet);
      const hdrs = HEADERS[data.sheet] || ['Timestamp','Data'];
      sheet.appendRow(hdrs);
      sheet.getRange(1, 1, 1, hdrs.length)
        .setBackground('#0F2747')
        .setFontColor('#ffffff')
        .setFontWeight('bold');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160); // Timestamp
    }

    sheet.appendRow(data.row);
    return ok('saved');

  } catch(err) {
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
