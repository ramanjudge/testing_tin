/**
 * TiNAAK Assessment Results — Completion Trigger & Follow-Up Automation
 * Google Apps Script — paste into the Assessment Results sheet
 *
 * SETUP INSTRUCTIONS:
 * 1. Open the Google Sheet used by the Assessment Centre (same one as tinaak-assess-appscript.js)
 * 2. Extensions → Apps Script
 * 3. Create a NEW file (File → New → Script file) named "automation"
 * 4. Paste this entire file into it
 * 5. In the left panel, click "Triggers" (clock icon)
 * 6. Add trigger:
 *      Function: onSheetEdit
 *      Event source: From spreadsheet
 *      Event type: On edit
 * 7. Save — authorise when prompted
 *
 * HOW IT WORKS:
 * When a new assessment result row is added (by the worker via tinaak-assess-appscript.js),
 * this script checks if the candidate has now completed all their required assessments.
 * If yes → sends a "we've received your assessments" confirmation email to the candidate.
 *
 * SEPARATE SHEET REQUIRED: "Applications"
 * This sheet must exist with columns:
 *   A: Timestamp | B: Name | C: Email | D: Role | E: Required Tests | F: Status | G: Follow-up Sent
 *
 * The /careers worker route writes to this sheet when an application arrives.
 * This script then cross-references assessment completions against it.
 */

/* ── CONFIG ─────────────────────────────────────────────────── */
const RESULTS_SHEET    = "Assessment Results";
const APPS_SHEET       = "Applications";
const SENDER_NAME      = "TiNAAK Careers";
const CAREERS_EMAIL    = "careers@tinaak.com";
const FOLLOWUP_DELAY_DAYS = 2; // days after assessment completion before specialist/partner invite

/* ── Role → required test IDs ───────────────────────────────── */
const ROLE_REQUIRED_TESTS = {
  'fm-manager':           ['FM Competency','Language & Numeracy','Spreadsheet Proficiency','Professional Profile'],
  'fm-specialist':        ['FM Competency','Language & Numeracy','Professional Profile'],
  'fm-associate':         ['FM Competency','Language & Numeracy','Professional Profile'],
  'hr-manager':           ['HR & Payroll Competency','Language & Numeracy','Spreadsheet Proficiency','Professional Profile'],
  'hr-executive':         ['HR & Payroll Competency','Language & Numeracy','Professional Profile'],
  'payroll-executive':    ['HR & Payroll Competency','Language & Numeracy','Spreadsheet Proficiency','Professional Profile'],
  'admin-manager':        ['Administration Competency','Language & Numeracy','Spreadsheet Proficiency','Professional Profile'],
  'front-office':         ['Administration Competency','Language & Numeracy','Professional Profile'],
  'san-partner':          ['Language & Numeracy','Professional Profile'],
  'general':              ['Language & Numeracy','Professional Profile'],
};

/* ── Minimum score thresholds (%) for strong candidate flag ─── */
const STRONG_THRESHOLD = 70;
const REVIEW_THRESHOLD = 50;


/* ══════════════════════════════════════════════════════════════
   MAIN TRIGGER — fires on any sheet edit
══════════════════════════════════════════════════════════════ */
function onSheetEdit(e) {
  const sheet = e.source.getActiveSheet();
  
  // Only act when Assessment Results sheet is edited (new row added)
  if (sheet.getName() !== RESULTS_SHEET) return;
  
  // Get the newly edited row
  const row = e.range.getRow();
  if (row <= 1) return; // header row
  
  const data = sheet.getRange(row, 1, 1, 19).getValues()[0];
  const email = data[2]; // column C
  const name  = data[1]; // column B
  
  if (!email) return;
  
  // Check if this candidate has now completed all required assessments
  checkAndActOnCompletion(email, name);
}


/* ══════════════════════════════════════════════════════════════
   CHECK COMPLETION & TRIGGER EMAILS
══════════════════════════════════════════════════════════════ */
function checkAndActOnCompletion(candidateEmail, candidateName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // ── Get all assessment results for this candidate ──────────
  const resultsSheet = ss.getSheetByName(RESULTS_SHEET);
  if (!resultsSheet) return;
  
  const allResults = resultsSheet.getDataRange().getValues();
  const candidateResults = allResults
    .slice(1) // skip header
    .filter(row => row[2] === candidateEmail) // column C = email
    .map(row => ({
      assessment: row[5],  // column F = Assessment Type
      domain:     row[6],  // column G = Domain
      pct:        row[7],  // column H = Overall Score %
      date:       row[0],  // column A = Timestamp
    }));
  
  if (candidateResults.length === 0) return;
  
  // ── Get application record for this candidate ──────────────
  let appsSheet = ss.getSheetByName(APPS_SHEET);
  if (!appsSheet) {
    appsSheet = createApplicationsSheet(ss);
  }
  
  const appsData = appsSheet.getDataRange().getValues();
  const appRow   = appsData.slice(1).findIndex(row => row[2] === candidateEmail);
  
  if (appRow === -1) return; // no application on record — assessment only, no follow-up
  
  const app           = appsData[appRow + 1]; // +1 for header
  const roleId        = app[3];   // column D = role (URL param value)
  const requiredTests = ROLE_REQUIRED_TESTS[roleId] || ROLE_REQUIRED_TESTS['general'];
  const followupSent  = app[6];   // column G = Follow-up Sent
  
  if (followupSent === 'YES') return; // already processed
  
  // ── Check which required tests are completed ───────────────
  const completedTypes = new Set(candidateResults.map(r => r.assessment));
  const allComplete    = requiredTests.every(t => {
    // Fuzzy match — "FM Competency" matches "FM Competency" in the assessment column
    return [...completedTypes].some(c => c.includes(t) || t.includes(c));
  });
  
  if (!allComplete) return; // not yet complete
  
  // ── Calculate overall performance ──────────────────────────
  const scoredTests  = candidateResults.filter(r => typeof r.pct === 'number' && r.pct > 0);
  const avgScore     = scoredTests.length > 0
    ? Math.round(scoredTests.reduce((a, b) => a + b.pct, 0) / scoredTests.length)
    : null;
  
  // ── Send completion confirmation to candidate ───────────────
  sendCompletionEmail(candidateEmail, candidateName, avgScore, roleId);
  
  // ── Mark as processed in Applications sheet ─────────────────
  const sheetRow = appRow + 2; // +2 for header + 0-indexed
  appsSheet.getRange(sheetRow, 7).setValue('YES');
  appsSheet.getRange(sheetRow, 6).setValue(
    avgScore >= STRONG_THRESHOLD ? 'Strong' :
    avgScore >= REVIEW_THRESHOLD ? 'Review' : 'Received'
  );
  
  // ── Schedule follow-up for strong candidates ────────────────
  if (avgScore !== null && avgScore >= STRONG_THRESHOLD) {
    scheduleFollowUp(candidateEmail, candidateName, roleId, avgScore);
  }
  
  // ── Notify TiNAAK team ──────────────────────────────────────
  notifyTeam(candidateName, candidateEmail, roleId, avgScore, candidateResults);
}


/* ══════════════════════════════════════════════════════════════
   SEND COMPLETION CONFIRMATION TO CANDIDATE
══════════════════════════════════════════════════════════════ */
function sendCompletionEmail(email, name, avgScore, roleId) {
  const firstName = name.split(' ')[0];
  
  const subject = "TiNAAK — your assessments are complete";
  
  const body = `
    <div style="max-width:600px;margin:0 auto;font-family:sans-serif">
      <div style="background:#0F2747;padding:28px 32px">
        <div style="font-size:9px;font-weight:700;letter-spacing:0.3em;color:#0FA3A3;margin-bottom:8px">TINAAK INTEGRATED SERVICES LLP</div>
        <div style="font-size:18px;font-weight:800;color:#fff">Assessments received — thank you</div>
      </div>
      <div style="padding:28px 32px;border:1px solid #D8DDE6;border-top:none">
        <p style="font-size:14px;color:#1A2B40;line-height:1.7;margin:0 0 16px">Dear ${firstName},</p>
        <p style="font-size:14px;color:#1A2B40;line-height:1.7;margin:0 0 16px">
          We have received all your assessments. Our team will review your application 
          and assessment results together and be in touch within <strong>5 working days</strong>.
        </p>
        <div style="background:#F4F6F9;border-left:3px solid #0FA3A3;padding:16px 20px;margin:0 0 20px;border-radius:0 4px 4px 0">
          <p style="font-size:13px;color:#1A2B40;line-height:1.6;margin:0">
            <strong>What happens next:</strong> Our team reviews your profile, domain knowledge 
            and working style. If there is a strong match — for a direct role, an associate 
            engagement or a network position — we will reach out to set up a conversation.
          </p>
        </div>
        <p style="font-size:13px;color:#5A6572;line-height:1.7;margin:0 0 4px">
          Thank you for the time you have invested. We will be in touch.
        </p>
        <p style="font-size:13px;color:#5A6572;margin:16px 0 0">
          <a href="mailto:${CAREERS_EMAIL}" style="color:#0FA3A3">${CAREERS_EMAIL}</a> 
          &nbsp;·&nbsp; +91 99999 98522
        </p>
      </div>
      <div style="padding:14px 32px;background:#F4F6F9;font-size:11px;color:#5A6572;border:1px solid #D8DDE6;border-top:none">
        TiNAAK Integrated Services LLP · Gurugram, Haryana · tinaak.com
      </div>
    </div>`;
  
  GmailApp.sendEmail(email, subject, '', { htmlBody: body, name: SENDER_NAME });
}


/* ══════════════════════════════════════════════════════════════
   SCHEDULE FOLLOW-UP FOR STRONG CANDIDATES
   (sent FOLLOWUP_DELAY_DAYS days later via time-based trigger)
══════════════════════════════════════════════════════════════ */
function scheduleFollowUp(email, name, roleId, avgScore) {
  // Store in Script Properties for the time-based trigger to pick up
  const props = PropertiesService.getScriptProperties();
  const key   = 'followup_' + email.replace(/[^a-z0-9]/gi, '_');
  const data  = JSON.stringify({ email, name, roleId, avgScore, scheduledAt: new Date().toISOString() });
  props.setProperty(key, data);
  
  // Create a one-time trigger for FOLLOWUP_DELAY_DAYS from now
  const triggerTime = new Date();
  triggerTime.setDate(triggerTime.getDate() + FOLLOWUP_DELAY_DAYS);
  ScriptApp.newTrigger('sendFollowUpEmails')
    .timeBased()
    .at(triggerTime)
    .create();
}

/**
 * Called by time-based trigger FOLLOWUP_DELAY_DAYS after completion.
 * Processes all pending follow-ups and sends network/specialist invite.
 */
function sendFollowUpEmails() {
  const props   = PropertiesService.getScriptProperties();
  const allKeys = props.getKeys().filter(k => k.startsWith('followup_'));
  
  allKeys.forEach(key => {
    try {
      const d         = JSON.parse(props.getProperty(key));
      const firstName = d.name.split(' ')[0];
      
      // Determine which tracks to suggest based on role
      const isSpecialist = ['fm-specialist','fm-manager','hr-manager','admin-manager','payroll-executive'].includes(d.roleId);
      const trackText    = isSpecialist
        ? 'Associate Specialist — working on client engagements under TiNAAK\'s brand, with structured agreements and back-office support'
        : 'Strategic Alliance Partner — introducing clients to TiNAAK with a competitive commission structure and no targets';
      
      const subject = `TiNAAK — another opportunity to consider`;
      const body    = `
        <div style="max-width:600px;margin:0 auto;font-family:sans-serif">
          <div style="background:#0F2747;padding:28px 32px">
            <div style="font-size:9px;font-weight:700;letter-spacing:0.3em;color:#0FA3A3;margin-bottom:8px">TINAAK INTEGRATED SERVICES LLP</div>
            <div style="font-size:18px;font-weight:800;color:#fff">Based on your assessment — another track to consider</div>
          </div>
          <div style="padding:28px 32px;border:1px solid #D8DDE6;border-top:none">
            <p style="font-size:14px;color:#1A2B40;line-height:1.7;margin:0 0 16px">Dear ${firstName},</p>
            <p style="font-size:14px;color:#1A2B40;line-height:1.7;margin:0 0 16px">
              Having reviewed your assessment results, we wanted to bring another opportunity to your attention
              that may suit your profile — regardless of how your application for the direct role progresses.
            </p>
            <div style="background:#F4F6F9;border-left:3px solid #0FA3A3;padding:16px 20px;margin:0 0 20px;border-radius:0 4px 4px 0">
              <div style="font-size:11px;font-weight:700;color:#0FA3A3;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px">TiNAAK Network — ${isSpecialist ? 'Associate Specialist' : 'Strategic Alliance Partner'}</div>
              <p style="font-size:13px;color:#1A2B40;line-height:1.6;margin:0 0 10px">${trackText}.</p>
              <p style="font-size:13px;color:#5A6572;line-height:1.6;margin:0">
                This track is governed by a written engagement agreement. Your assessment results would count 
                towards onboarding — no duplication of effort.
              </p>
            </div>
            <p style="font-size:13px;color:#1A2B40;line-height:1.7;margin:0 0 16px">
              If this interests you, simply reply to this email or register via the link below. 
              There is no obligation and no pressure.
            </p>
            <a href="https://tinaak.com/enroll-form.html?track=${isSpecialist ? 'specialist' : 'partner'}" 
               style="display:inline-block;background:#0FA3A3;color:#fff;padding:12px 24px;text-decoration:none;font-weight:700;font-size:13px;border-radius:4px;font-family:sans-serif">
              Register Interest →
            </a>
          </div>
          <div style="padding:14px 32px;background:#F4F6F9;font-size:11px;color:#5A6572;border:1px solid #D8DDE6;border-top:none">
            TiNAAK Integrated Services LLP · Gurugram · 
            <a href="https://tinaak.com/network.html" style="color:#0FA3A3">tinaak.com/network.html</a> · 
            +91 99999 98522
          </div>
        </div>`;
      
      GmailApp.sendEmail(d.email, subject, '', { htmlBody: body, name: SENDER_NAME });
      props.deleteProperty(key);
      
    } catch(err) {
      Logger.log('Follow-up error for ' + key + ': ' + err);
    }
  });
}


/* ══════════════════════════════════════════════════════════════
   NOTIFY TINAAK TEAM WHEN A CANDIDATE COMPLETES ALL ASSESSMENTS
══════════════════════════════════════════════════════════════ */
function notifyTeam(name, email, roleId, avgScore, results) {
  const subject = `Assessment complete — ${name} (${avgScore !== null ? avgScore + '%' : 'profile only'})`;
  
  const resultRows = results.map(r =>
    `<tr><td style="padding:8px 12px;font-size:12px;color:#0F2747;background:#F4F6F9;font-weight:700">${r.assessment}</td>
     <td style="padding:8px 12px;font-size:12px;color:#475569">${r.pct ? r.pct + '%' : 'Profile submitted'}</td>
     <td style="padding:8px 12px;font-size:12px;color:#475569">${r.date ? new Date(r.date).toLocaleDateString('en-IN') : ''}</td></tr>`
  ).join('');
  
  const flag = avgScore >= STRONG_THRESHOLD ? '🟢 Strong' :
               avgScore >= REVIEW_THRESHOLD ? '🟡 Review' : '🔴 Below threshold';
  
  const body = `
    <div style="max-width:640px;margin:0 auto;font-family:sans-serif">
      <div style="background:#0F2747;padding:24px 28px">
        <div style="font-size:9px;font-weight:700;letter-spacing:0.3em;color:#0FA3A3;margin-bottom:6px">TINAAK — CANDIDATE ALERT</div>
        <div style="font-size:17px;font-weight:800;color:#fff">Assessment Set Complete</div>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #D8DDE6">
        <tr><td style="padding:10px 16px;font-size:13px;font-weight:700;color:#0F2747;background:#F4F6F9;width:140px">Name</td>
            <td style="padding:10px 16px;font-size:13px;color:#475569">${name}</td></tr>
        <tr><td style="padding:10px 16px;font-size:13px;font-weight:700;color:#0F2747;background:#F4F6F9">Email</td>
            <td style="padding:10px 16px;font-size:13px;color:#475569"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:10px 16px;font-size:13px;font-weight:700;color:#0F2747;background:#F4F6F9">Role Track</td>
            <td style="padding:10px 16px;font-size:13px;color:#475569">${roleId}</td></tr>
        <tr><td style="padding:10px 16px;font-size:13px;font-weight:700;color:#0F2747;background:#F4F6F9">Avg Score</td>
            <td style="padding:10px 16px;font-size:13px;color:#475569">${avgScore !== null ? avgScore + '%  —  ' + flag : 'N/A (profile only)'}</td></tr>
      </table>
      <div style="margin-top:12px">
        <table style="width:100%;border-collapse:collapse;border:1px solid #D8DDE6">
          <tr style="background:#0F2747">
            <th style="padding:8px 12px;font-size:11px;font-weight:700;color:#0FA3A3;text-align:left">Assessment</th>
            <th style="padding:8px 12px;font-size:11px;font-weight:700;color:#0FA3A3;text-align:left">Score</th>
            <th style="padding:8px 12px;font-size:11px;font-weight:700;color:#0FA3A3;text-align:left">Date</th>
          </tr>
          ${resultRows}
        </table>
      </div>
      <div style="padding:12px 16px;background:#F4F6F9;font-size:11px;color:#5A6572;border:1px solid #D8DDE6;border-top:none;margin-top:-1px">
        Results are logged in the Assessment Results sheet · ${avgScore >= STRONG_THRESHOLD ? 'Follow-up email scheduled for ' + FOLLOWUP_DELAY_DAYS + ' days time.' : 'No follow-up scheduled.'}
      </div>
    </div>`;
  
  GmailApp.sendEmail(CAREERS_EMAIL, subject, '', { htmlBody: body, name: 'TiNAAK Assessment Bot' });
}


/* ══════════════════════════════════════════════════════════════
   CREATE APPLICATIONS SHEET IF IT DOESN'T EXIST
══════════════════════════════════════════════════════════════ */
function createApplicationsSheet(ss) {
  const sheet   = ss.insertSheet(APPS_SHEET);
  const headers = ['Timestamp','Name','Email','Role ID','Required Tests','Status','Follow-up Sent'];
  sheet.appendRow(headers);
  const hr = sheet.getRange(1, 1, 1, headers.length);
  hr.setBackground('#0F2747').setFontColor('#FFFFFF').setFontWeight('bold');
  sheet.setFrozenRows(1);
  [160,160,200,140,280,100,120].forEach((w,i) => sheet.setColumnWidth(i+1, w));
  return sheet;
}


/* ══════════════════════════════════════════════════════════════
   TEST FUNCTION — run manually from Apps Script editor
══════════════════════════════════════════════════════════════ */
function testNotify() {
  notifyTeam(
    'Test Candidate', 'test@tinaak.com', 'fm-manager', 78,
    [
      { assessment:'FM Competency', pct:82, date:new Date() },
      { assessment:'Language & Numeracy', pct:76, date:new Date() },
      { assessment:'Spreadsheet Proficiency', pct:71, date:new Date() },
      { assessment:'Professional Profile', pct:null, date:new Date() },
    ]
  );
  Logger.log('Test notification sent to careers@tinaak.com');
}
