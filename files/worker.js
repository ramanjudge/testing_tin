/* ═══════════════════════════════════════════════════════════════════
   tinaak-forms-worker — Cloudflare Worker
   tinaak.com forms + assessment handler

   ROUTES:
     POST /contact            → hello@tinaak.com   + logs to Sheet 1
     POST /network            → network@tinaak.com + logs to Sheet 1
     POST /careers            → careers@tinaak.com + logs to Sheet 2
                                + sends candidate assessment link email
     POST /assess/competency  → network@tinaak.com + logs to Sheet 2
     POST /assess/profile     → network@tinaak.com + logs to Sheet 2
     POST /assess/language    → network@tinaak.com + logs to Sheet 2
     POST /assess/spreadsheet → network@tinaak.com + logs to Sheet 2

   REQUIRED ENV VARIABLES (Cloudflare Worker → Settings → Variables):
     RESEND_API_KEY   — your Resend API key
     SHEET_URL        — TiNAAK Form Submissions Web App URL (Sheet 1)
     ASSESS_SHEET_URL — TiNAAK Assessment Centre Web App URL (Sheet 2)

   REQUIRED D1 BINDING (Cloudflare Worker → Settings → D1 Database Bindings):
     Variable name:  DB
     D1 database:    tinaak-data

   CORS: tinaak.com only
═══════════════════════════════════════════════════════════════════ */

const ALLOWED_ORIGINS = ['https://tinaak.com', 'https://www.tinaak.com'];
const FROM_ADDRESS    = 'TiNAAK Forms <noreply@tinaak.com>';

const ROUTE_TO = {
  '/contact':            'hello@tinaak.com',
  '/network':            'network@tinaak.com',
  '/careers':            'careers@tinaak.com',
  '/products':           'hello@tinaak.com',
  '/assess/competency':  'network@tinaak.com',
  '/assess/profile':     'network@tinaak.com',
  '/assess/language':    'network@tinaak.com',
  '/assess/spreadsheet': 'network@tinaak.com',
};

/* ── Role → assessment URL mapping ─────────────────────────────────
   Keys match the role strings sent from careers.html setRole()
   Used to build the personalised assessment link in candidate email
─────────────────────────────────────────────────────────────────── */
const ROLE_ASSESS_MAP = {
  'Facility Operations Manager':         { role:'fm-manager',        tests:'competency-fm,language,spreadsheet,profile' },
  'FM Consultant / Associate Specialist':{ role:'fm-specialist',     tests:'competency-fm,language,profile' },
  'Housekeeping Supervisor':             { role:'fm-associate',      tests:'competency-fm,language,profile' },
  'Maintenance & Technical Supervisor':  { role:'fm-associate',      tests:'competency-fm,language,profile' },
  'Security Supervisor':                 { role:'fm-associate',      tests:'language,profile' },
  'Recruitment Specialist':              { role:'hr-manager',        tests:'competency-hr,language,spreadsheet,profile' },
  'HR & Payroll Executive':              { role:'hr-executive',      tests:'competency-hr,language,profile' },
  'Payroll & Compliance Associate':      { role:'payroll-executive', tests:'competency-hr,language,spreadsheet,profile' },
  'Interim Staffing Coordinator':        { role:'admin-manager',     tests:'competency-admin,language,spreadsheet,profile' },
  'Front Office Executive':              { role:'front-office',      tests:'competency-admin,language,profile' },
  'Client Solutions Manager':            { role:'san-partner',       tests:'language,profile' },
  'General Application':                 { role:'general',           tests:'language,profile' },
};

/* ── CORS ─────────────────────────────────────────────────────────── */
function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin':  allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data, status = 200, origin = '') {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

/* ── EMAIL via Resend ─────────────────────────────────────────────── */
async function sendEmail(apiKey, { to, subject, html }) {
  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body:    JSON.stringify({ from: FROM_ADDRESS, to, subject, html }),
  });
  if (!res.ok) { console.error('Resend error:', res.status, await res.text()); return false; }
  return true;
}

/* ── HTML EMAIL BUILDER ───────────────────────────────────────────── */
function buildHtml(title, fields) {
  const rows = fields
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `
      <tr>
        <td style="padding:10px 16px;font-family:sans-serif;font-size:13px;font-weight:700;color:#0F2747;background:#F4F6F9;width:180px;vertical-align:top">${k}</td>
        <td style="padding:10px 16px;font-family:sans-serif;font-size:13px;color:#475569;vertical-align:top">${String(v).replace(/\n/g, '<br>')}</td>
      </tr>`).join('');
  return `
    <div style="max-width:640px;margin:0 auto;font-family:sans-serif">
      <div style="background:#0F2747;padding:28px 32px">
        <div style="font-size:9px;font-weight:700;letter-spacing:0.3em;color:#0FA3A3;margin-bottom:8px">TINAAK INTEGRATED SERVICES LLP</div>
        <div style="font-size:20px;font-weight:800;color:#fff">${title}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #D8DDE6">${rows}</table>
      <div style="padding:14px 32px;background:#F4F6F9;font-size:11px;color:#5A6572">
        Submitted via tinaak.com · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
      </div>
    </div>`;
}

/* ── CANDIDATE ASSESSMENT EMAIL ───────────────────────────────────── */
function buildAssessUrl(name, email, roleKey) {
  const map    = ROLE_ASSESS_MAP[roleKey] || ROLE_ASSESS_MAP['General Application'];
  const params = new URLSearchParams({ name, email, role: map.role, tests: map.tests });
  return 'https://tinaak.com/assess/?' + params.toString();
}

function buildCandidateEmail(name, role, assessUrl) {
  const firstName = name.split(' ')[0];
  return `
    <div style="max-width:600px;margin:0 auto;font-family:sans-serif">
      <div style="background:#0F2747;padding:28px 32px">
        <div style="font-size:9px;font-weight:700;letter-spacing:0.3em;color:#0FA3A3;margin-bottom:8px">TINAAK INTEGRATED SERVICES LLP</div>
        <div style="font-size:18px;font-weight:800;color:#fff">Thank you for your application</div>
      </div>
      <div style="padding:28px 32px;border:1px solid #D8DDE6;border-top:none">
        <p style="font-size:14px;color:#1A2B40;line-height:1.7;margin:0 0 16px">Dear ${firstName},</p>
        <p style="font-size:14px;color:#1A2B40;line-height:1.7;margin:0 0 16px">
          Thank you for applying for the <strong>${role}</strong> position at TiNAAK.
          We have received your application and our team will review it personally.
        </p>
        <p style="font-size:14px;color:#1A2B40;line-height:1.7;margin:0 0 20px">
          As the next step, we invite you to complete a short domain assessment.
          This helps us understand your knowledge and working style, and ensures we match
          you to the right opportunity. There are no trick questions — it is designed for
          professionals who work in this field.
        </p>
        <div style="background:#F4F6F9;border-left:3px solid #0FA3A3;padding:16px 20px;margin:0 0 20px;border-radius:0 4px 4px 0">
          <div style="font-size:12px;font-weight:700;color:#0FA3A3;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px">Your Assessment Link</div>
          <p style="font-size:13px;color:#1A2B40;line-height:1.6;margin:0 0 12px">
            The link below is pre-configured for your role. Your name and email are already filled in.
            You can complete the assessments in any order and return to the link if you need a break —
            progress is saved on your device.
          </p>
          <a href="${assessUrl}" style="display:inline-block;background:#0FA3A3;color:#fff;padding:12px 24px;text-decoration:none;font-weight:700;font-size:13px;border-radius:4px;font-family:sans-serif">
            Begin Assessment →
          </a>
        </div>
        <p style="font-size:13px;color:#5A6572;line-height:1.7;margin:0 0 4px">
          Please complete it within <strong>5 working days</strong>.
          If you have any questions, reply to this email or contact
          <a href="mailto:careers@tinaak.com" style="color:#0FA3A3">careers@tinaak.com</a>.
        </p>
      </div>
      <div style="padding:14px 32px;background:#F4F6F9;font-size:11px;color:#5A6572;border:1px solid #D8DDE6;border-top:none">
        TiNAAK Integrated Services LLP · Gurugram · tinaak.com · +91 99999 98522
      </div>
    </div>`;
}

/* ── GOOGLE SHEETS LOGGER ─────────────────────────────────────────── */
async function logToSheet(url, payload) {
  if (!url) return; // env var not set — skip silently
  try {
    await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Sheet log error:', err);
  }
}

function ts() {
  return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

/* ── D1 DATABASE HELPERS ──────────────────────────────────────────── */

// Upsert candidate — creates or updates the candidates table row
async function upsertCandidate(db, { email, name, phone, source, role }) {
  if (!db || !email) return;
  try {
    const now = ts();
    await db.prepare(`
      INSERT INTO candidates (email, name, phone, created_at, last_seen_at, source, role_applied)
      VALUES (?1, ?2, ?3, ?4, ?4, ?5, ?6)
      ON CONFLICT(email) DO UPDATE SET
        name         = COALESCE(?2, name),
        phone        = COALESCE(?3, phone),
        last_seen_at = ?4,
        role_applied = COALESCE(?6, role_applied)
    `).bind(email, name||null, phone||null, now, source||null, role||null).run();
  } catch (err) {
    console.error('D1 upsertCandidate error:', err);
  }
}

// Log a form submission (contact / network / careers)
async function d1LogSubmission(db, data) {
  if (!db) return;
  try {
    await db.prepare(`
      INSERT INTO submissions
        (submitted_at, form_type, email, name, phone, organisation, city,
         role, track, message, linkedin, cover_note, data_json)
      VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13)
    `).bind(
      ts(),
      data.form_type   || null,
      data.email       || null,
      data.name        || null,
      data.phone       || null,
      data.org         || null,
      data.city        || null,
      data.role        || null,
      data.track       || null,
      data.message     || null,
      data.linkedin    || null,
      data.cover       || null,
      JSON.stringify(data)
    ).run();
  } catch (err) {
    console.error('D1 d1LogSubmission error:', err);
  }
}

// Log an assessment result
async function d1LogAssessment(db, data) {
  if (!db) return;
  try {
    await db.prepare(`
      INSERT INTO assessments
        (submitted_at, email, name, assessment, domain, score_pct, score_correct,
         score_total, applying_for, time_taken_min,
         s1_pct, s2_pct, s3_pct, s4_pct, s5_pct, data_json)
      VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14,?15,?16)
    `).bind(
      ts(),
      data.email         || null,
      data.name          || null,
      data.assessment    || null,
      data.domain        || null,
      data.score_pct     ?? null,
      data.score_correct ?? null,
      data.score_total   ?? null,
      data.applyingFor   || null,
      data.timeTaken     ?? null,
      data.s1_pct        ?? null,
      data.s2_pct        ?? null,
      data.s3_pct        ?? null,
      data.s4_pct        ?? null,
      data.s5_pct        ?? null,
      JSON.stringify(data)
    ).run();
  } catch (err) {
    console.error('D1 d1LogAssessment error:', err);
  }
}


/* ── SCORE CALCULATION ────────────────────────────────────────────── */
function scoreAnswers(answers, key) {
  let correct = 0, total = 0;
  const breakdown = [];
  for (const [qid, correctAns] of Object.entries(key)) {
    total++;
    const given = answers[qid];
    const ok    = given === correctAns;
    if (ok) correct++;
    breakdown.push(`Q${qid}: ${given || '—'} → ${ok ? '✓' : '✗ (correct: ' + correctAns + ')'}`);
  }
  return { correct, total, pct: Math.round((correct / total) * 100), breakdown };
}

/* ── DOMAIN ANSWER KEYS ───────────────────────────────────────────── */
const DOMAIN_KEYS = {
  fm:      {1:'c',2:'c',3:'a',4:'a',5:'b',6:'b',7:'b',8:'c',9:'c',10:'a',11:'b',12:'a',13:'c',14:'c',15:'b',16:'a',17:'b',18:'a',19:'c',20:'b',21:'a',22:'c',23:'b',24:'b',25:'a',26:'c',27:'c',28:'b',29:'b',30:'a',31:'a',32:'c',33:'b',34:'c',35:'a',36:'a',37:'b',38:'b',39:'c',40:'a',41:'a',42:'a',43:'c',44:'c',45:'b',46:'b',47:'a',48:'a',49:'c',50:'b',51:'b',52:'a',53:'a',54:'a',55:'b',56:'c',57:'c',58:'c',59:'b',60:'c'},
  hr:      {1:'b',2:'c',3:'a',4:'c',5:'a',6:'b',7:'c',8:'b',9:'c',10:'a',11:'b',12:'c',13:'c',14:'b',15:'a',16:'a',17:'c',18:'a',19:'b',20:'c',21:'a',22:'b',23:'a',24:'c',25:'b',26:'c',27:'a',28:'b',29:'c',30:'b',31:'c',32:'a',33:'a',34:'c',35:'b',36:'b',37:'a',38:'c',39:'a',40:'b',41:'c',42:'c',43:'a',44:'b',45:'b',46:'a',47:'a',48:'c',49:'b',50:'c',51:'a',52:'c',53:'b',54:'b',55:'a',56:'a',57:'b',58:'c',59:'b',60:'a'},
  admin:      {1:'a',2:'b',3:'a',4:'c',5:'c',6:'a',7:'b',8:'c',9:'a',10:'b',11:'b',12:'a',13:'a',14:'c',15:'b',16:'a',17:'b',18:'a',19:'c',20:'b',21:'c',22:'a',23:'c',24:'b',25:'a',26:'b',27:'a',28:'c',29:'c',30:'b',31:'a',32:'b',33:'b',34:'a',35:'c',36:'a',37:'b',38:'b',39:'c',40:'c',41:'a',42:'b',43:'c',44:'a',45:'a',46:'b',47:'c',48:'c',49:'a',50:'c',51:'b',52:'c',53:'b',54:'a',55:'c',56:'b',57:'b',58:'c',59:'a',60:'c'},
  fitouts:      {1:'a',2:'b',3:'c',4:'a',5:'c',6:'a',7:'b',8:'b',9:'c',10:'a',11:'a',12:'b',13:'a',14:'b',15:'c',16:'a',17:'a',18:'b',19:'b',20:'c',21:'c',22:'b',23:'a',24:'c',25:'c',26:'c',27:'a',28:'b',29:'c',30:'c',31:'a',32:'b',33:'a',34:'b',35:'c',36:'a',37:'c',38:'b',39:'a',40:'b',41:'b',42:'c',43:'a',44:'a',45:'c',46:'b',47:'b',48:'c',49:'a',50:'a',51:'a',52:'b',53:'b',54:'c',55:'c',56:'b',57:'a',58:'b',59:'c',60:'c'},
  spreadsheet:      {1:'a',2:'c',3:'c',4:'a',5:'b',6:'a',7:'c',8:'b',9:'b',10:'b',11:'c',12:'a',13:'c',14:'a',15:'c',16:'a',17:'b',18:'b',19:'c',20:'c',21:'a',22:'b',23:'b',24:'c',25:'a',26:'a',27:'c',28:'b',29:'a',30:'a',31:'b',32:'c',33:'a',34:'b',35:'c',36:'b',37:'a',38:'a',39:'c',40:'c',41:'b',42:'b',43:'a',44:'a',45:'b',46:'c',47:'c',48:'b',49:'b',50:'c',51:'a',52:'b',53:'c',54:'a',55:'b',56:'b',57:'c',58:'a',59:'a',60:'c'},
};
const LANG_KEY = { 1:'b',2:'c',3:'a',4:'b',5:'c',6:'a',7:'b',8:'c' };
const NUM_KEY  = { 1:'c',2:'a',3:'b',4:'c',5:'a',6:'b',7:'c' };

/* ══════════════════════════════════════════════════════════════════
   MAIN HANDLER
══════════════════════════════════════════════════════════════════ */
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS')
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    if (request.method !== 'POST')
      return json({ error: 'Method not allowed' }, 405, origin);

    const path = new URL(request.url).pathname;
    if (!ROUTE_TO[path])
      return json({ error: 'Not found' }, 404, origin);

    let data;
    const contentType = request.headers.get('content-type') || '';
    try {
      if (contentType.includes('application/json')) {
        data = await request.json();
      } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
        // careers.html sends FormData (for CV file support)
        const fd = await request.formData();
        data = Object.fromEntries(fd.entries());
        // Note: CV file (binary) is ignored — email-based CV handling only
      } else {
        // Try JSON as fallback
        data = await request.json();
      }
    } catch {
      return json({ success: false, error: 'Invalid request body' }, 400, origin);
    }

    const to = ROUTE_TO[path];

    try {

      /* ── /contact ──────────────────────────────────────────────── */
      if (path === '/contact') {
        if (!data.name || !data.email)
          return json({ success: false, error: 'Missing fields' }, 400, origin);

        // Field name normalisation (form sends different names than worker originally expected)
        const org    = data.org    || data.organisation || '';
        const size   = data.size   || data.company_size || '';
        const need   = data.need   || data.services_of_interest || '';
        const source = data.source || data.how_found || '';

        const sent = await sendEmail(env.RESEND_API_KEY, {
          to, subject: `New Client Enquiry — ${org || data.name}`,
          html: buildHtml('New Client Enquiry', [
            ['Name', data.name], ['Email', data.email], ['Phone', data.phone],
            ['Primary Need', need], ['Organisation', org],
            ['City', data.city], ['Size', size],
            ['Source', source], ['Message', data.message],
          ]),
        });

        // Log to Sheet 1 — Contact tab
        await logToSheet(env.SHEET_URL, {
          sheet: 'Contact',
          row: [ts(), data.name, data.email, data.phone||'', org,
                data.city||'', size, need, data.message||'', source],
        });

        // D1 — primary store
        await upsertCandidate(env.DB, { email: data.email, name: data.name, phone: data.phone, source: 'contact' });
        await d1LogSubmission(env.DB, { ...data, form_type: 'contact' });

        return json({ success: sent }, sent ? 200 : 500, origin);
      }

      /* ── /network ──────────────────────────────────────────────── */
      if (path === '/network') {
        if (!data.name || !data.email)
          return json({ success: false, error: 'Missing fields' }, 400, origin);

        // Normalise fields — enroll-form sends different keys
        const netCity   = data.city   || data.base_city   || '';
        const netDomain = data.domain || data.domain_expertise || data.supply_categories || '';
        const netMsg    = data.message || '';
        const netSource = data.source || data.how_found || '';

        const sent = await sendEmail(env.RESEND_API_KEY, {
          to, subject: `New Network Enquiry — ${data.track || 'Network'} — ${data.name}`,
          html: buildHtml('New Network Enquiry', [
            ['Name',              data.name],
            ['Email',             data.email],
            ['Phone',             data.phone],
            ['Track',             data.track],
            ['City',              netCity],
            ['Domain / Category', netDomain],
            ['Sectors',           data.sectors],
            ['Geography',         data.geography],
            ['LinkedIn',          data.linkedin],
            ['Reference 1',       data.reference_1],
            ['Reference 2',       data.reference_2],
            ['How Found Us',      netSource],
            ['Message',           netMsg],
          ]),
        });

        // Log to Sheet 1 — Network tab
        await logToSheet(env.SHEET_URL, {
          sheet: 'Network',
          row: [ts(), data.name, data.email, data.phone||'', data.track||'',
                netCity, netDomain, data.sectors||'', data.linkedin||'', netMsg],
        });

        // D1 — primary store
        await upsertCandidate(env.DB, { email: data.email, name: data.name, phone: data.phone, source: 'network', role: data.track });
        await d1LogSubmission(env.DB, { ...data, form_type: 'network' });

        return json({ success: sent }, sent ? 200 : 500, origin);
      }

      /* ── /careers ──────────────────────────────────────────────── */
      if (path === '/careers') {
        // Normalise field names (FormData uses different keys than JSON)
        let cdata = data;
        const role     = cdata.role     || cdata.role_applied_for  || 'General Application';
        const linkedin = cdata.linkedin || '';
        const cover    = cdata.cover    || cdata.message            || '';
        const exp      = cdata.years_of_experience || cdata.experience || '';

        if (!cdata.name || !cdata.email)
          return json({ success: false, error: 'Missing fields' }, 400, origin);

        // Email TiNAAK team
        const sent = await sendEmail(env.RESEND_API_KEY, {
          to, subject: `Career Application — ${role} — ${cdata.name}`,
          html: buildHtml('Career Application', [
            ['Name', cdata.name], ['Email', cdata.email], ['Phone', cdata.phone],
            ['Role Applied For', role], ['Experience', exp],
            ['LinkedIn', linkedin], ['Cover Note', cover],
          ]),
        });

        // Email candidate with personalised assessment link
        const assessUrl = buildAssessUrl(cdata.name, cdata.email, role);
        await sendEmail(env.RESEND_API_KEY, {
          to: data.email,
          subject: 'Your TiNAAK application — next step',
          html: buildCandidateEmail(cdata.name, role, assessUrl),
        });

        // Log to Sheet 2 — Applications tab
        await logToSheet(env.SHEET_URL, {
          sheet: 'Careers',
          row: [ts(), cdata.name, cdata.email, cdata.phone||'', role,
                exp, linkedin, cover],
        });

        // D1 — primary store
        await upsertCandidate(env.DB, { email: cdata.email, name: cdata.name, phone: cdata.phone, source: 'careers', role });
        await d1LogSubmission(env.DB, { ...cdata, form_type: 'careers', role });

        return json({ success: sent }, sent ? 200 : 500, origin);
      }

      /* ── /products ─────────────────────────────────────────────── */
      if (path === '/products') {
        if (!data.email)
          return json({ success: false, error: 'Missing email' }, 400, origin);

        const sent = await sendEmail(env.RESEND_API_KEY, {
          to, subject: 'Product Notification Register — ' + data.email,
          html: buildHtml('Product Notification Registration', [
            ['Email',   data.email],
            ['Product', data.product || 'TiNAAK FM Hub'],
          ]),
        });

        await logToSheet(env.SHEET_URL, {
          sheet: 'Products',
          row: [ts(), data.email, data.product || 'TiNAAK FM Hub'],
        });

        await upsertCandidate(env.DB, { email: data.email, name: data.email, source: 'products' });
        await d1LogSubmission(env.DB, { ...data, form_type: 'products' });

        return json({ success: sent }, sent ? 200 : 500, origin);
      }

      /* ── /assess/competency ────────────────────────────────────── */
      if (path === '/assess/competency') {
        if (!data.name || !data.email || !data.domain)
          return json({ success: false, error: 'Missing fields' }, 400, origin);

        const key = DOMAIN_KEYS[data.domain.toLowerCase()];
        let scoreText = 'Domain not recognised'; let result = null;
        if (key && data.answers) {
          result    = scoreAnswers(data.answers, key);
          scoreText = `${result.correct} / ${result.total}  (${result.pct}%)`;
        }

        const sent = await sendEmail(env.RESEND_API_KEY, {
          to, subject: `Competency Assessment — ${data.domain.toUpperCase()} — ${data.name}`,
          html: buildHtml('Domain Competency Assessment', [
            ['Name', data.name], ['Email', data.email], ['Phone', data.phone],
            ['Domain', data.domain], ['Applying For', data.applyingFor],
            ['Score', scoreText],
            ['Time Taken', data.timeTaken ? data.timeTaken + ' min' : ''],
            ['Breakdown', result ? result.breakdown.join('\n') : ''],
          ]),
        });

        // Log to Sheet 2 — Assessment Results tab
        await logToSheet(env.ASSESS_SHEET_URL, {
          sheet: 'Assessment Results',
          row: [ts(), data.name, data.email, data.phone||'', data.domain||'',
                data.applyingFor||'', scoreText, result?.correct||'', result?.total||'',
                data.timeTaken||'', '', '', '', '', '', '', '', '', ''],
        });

        // D1 — primary store
        await upsertCandidate(env.DB, { email: data.email, name: data.name, phone: data.phone, source: 'assess' });
        await d1LogAssessment(env.DB, {
          ...data,
          assessment:    'competency',
          score_pct:     result?.pct     ?? null,
          score_correct: result?.correct ?? null,
          score_total:   result?.total   ?? null,
        });

        return json({ success: sent, result }, sent ? 200 : 500, origin);
      }

      /* ── /assess/profile ───────────────────────────────────────── */
      if (path === '/assess/profile') {
        if (!data.name || !data.email)
          return json({ success: false, error: 'Missing fields' }, 400, origin);

        const responseRows = data.responses
          ? Object.entries(data.responses).map(([q, a]) => [`Q${q}`, a])
          : [];

        const sent = await sendEmail(env.RESEND_API_KEY, {
          to, subject: `Professional Profile — ${data.name}`,
          html: buildHtml('Professional Profile Questionnaire', [
            ['Name', data.name], ['Email', data.email], ['Phone', data.phone],
            ['Domain', data.domain], ['Applying For', data.applyingFor],
            ['Availability', data.availability],
            ...responseRows,
          ]),
        });

        await logToSheet(env.ASSESS_SHEET_URL, {
          sheet: 'Assessment Results',
          row: [ts(), data.name, data.email, data.phone||'', 'Profile',
                data.applyingFor||'', 'Submitted', '', '', '', '', '', '', '', '', '', '', '', ''],
        });

        // D1 — primary store
        await upsertCandidate(env.DB, { email: data.email, name: data.name, phone: data.phone, source: 'assess' });
        await d1LogAssessment(env.DB, { ...data, assessment: 'profile', domain: 'profile' });

        return json({ success: sent }, sent ? 200 : 500, origin);
      }

      /* ── /assess/language ──────────────────────────────────────── */
      if (path === '/assess/language') {
        if (!data.name || !data.email)
          return json({ success: false, error: 'Missing fields' }, 400, origin);

        const lang = data.langAnswers ? scoreAnswers(data.langAnswers, LANG_KEY) : { correct:0, total:8, pct:0 };
        const num  = data.numAnswers  ? scoreAnswers(data.numAnswers,  NUM_KEY)  : { correct:0, total:7, pct:0 };
        const combined = {
          correct: lang.correct + num.correct,
          total:   lang.total   + num.total,
          pct:     Math.round(((lang.correct + num.correct) / (lang.total + num.total)) * 100),
        };

        const sent = await sendEmail(env.RESEND_API_KEY, {
          to, subject: `Language & Numeracy — ${data.name}`,
          html: buildHtml('Language & Numeracy Assessment', [
            ['Name', data.name], ['Email', data.email], ['Phone', data.phone],
            ['Applying For', data.applyingFor],
            ['Language Score', `${lang.correct} / ${lang.total}  (${lang.pct}%)`],
            ['Numeracy Score',  `${num.correct}  / ${num.total}   (${num.pct}%)`],
            ['Combined',        `${combined.correct} / ${combined.total}  (${combined.pct}%)`],
            ['Time Taken', data.timeTaken ? data.timeTaken + ' min' : ''],
          ]),
        });

        await logToSheet(env.ASSESS_SHEET_URL, {
          sheet: 'Assessment Results',
          row: [ts(), data.name, data.email, data.phone||'', 'Language & Numeracy',
                data.applyingFor||'', `${combined.pct}%`, combined.correct, combined.total,
                data.timeTaken||'', '', '', '', '', '', '', '', '', ''],
        });

        // D1 — primary store
        await upsertCandidate(env.DB, { email: data.email, name: data.name, phone: data.phone, source: 'assess' });
        await d1LogAssessment(env.DB, {
          ...data,
          assessment:    'language',
          domain:        'language',
          score_pct:     combined.pct,
          score_correct: combined.correct,
          score_total:   combined.total,
        });

        return json({ success: sent, result: { lang, num, combined } }, sent ? 200 : 500, origin);
      }

      /* ── /assess/spreadsheet ───────────────────────────────────── */
      if (path === '/assess/spreadsheet') {
        if (!data.name || !data.email)
          return json({ success: false, error: 'Missing fields' }, 400, origin);

        const sent = await sendEmail(env.RESEND_API_KEY, {
          to, subject: `Spreadsheet Assessment — ${data.name}`,
          html: buildHtml('Spreadsheet Proficiency Assessment', [
            ['Name', data.name], ['Email', data.email], ['Phone', data.phone],
            ['Role', data.role], ['Applying For', data.applyingFor],
            ['Tools Used', data.tools],
            ['Knowledge Score', data.kScore],
            ['Self-Assessed Avg', data.selfAvg],
            ['Time Taken', data.timeTaken ? data.timeTaken + ' min' : ''],
            ['Breakdown', data.breakdown],
            ['Self-Report', data.selfSummary],
            ['Practical Example', data.example],
          ]),
        });

        await logToSheet(env.ASSESS_SHEET_URL, {
          sheet: 'Assessment Results',
          row: [ts(), data.name, data.email, data.phone||'', 'Spreadsheet',
                data.applyingFor||'', data.kScore||'', '', '', data.timeTaken||'',
                '', '', '', '', '', '', '', '', ''],
        });

        // D1 — primary store
        await upsertCandidate(env.DB, { email: data.email, name: data.name, phone: data.phone, source: 'assess' });
        await d1LogAssessment(env.DB, { ...data, assessment: 'spreadsheet', domain: 'spreadsheet' });

        return json({ success: sent }, sent ? 200 : 500, origin);
      }

    } catch (err) {
      console.error('Worker error on', path, err);
      return json({ success: false, error: 'Server error' }, 500, origin);
    }
  },
};
