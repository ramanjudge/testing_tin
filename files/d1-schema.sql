-- ═══════════════════════════════════════════════════════════════
-- TiNAAK D1 Database Schema
-- Database name: tinaak-data
-- Run this in: Cloudflare → D1 → tinaak-data → Console
-- ═══════════════════════════════════════════════════════════════

-- ── CANDIDATES ───────────────────────────────────────────────────
-- One row per unique person (keyed by email)
-- Updated automatically each time they submit anything
CREATE TABLE IF NOT EXISTS candidates (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  email          TEXT    NOT NULL UNIQUE,
  name           TEXT,
  phone          TEXT,
  created_at     TEXT    NOT NULL,  -- ISO timestamp IST
  last_seen_at   TEXT    NOT NULL,  -- updated on every submission
  source         TEXT,              -- 'contact' | 'careers' | 'network' | 'assess'
  role_applied   TEXT,              -- most recent role applied for
  status         TEXT DEFAULT 'new' -- new | applied | assessing | reviewing | hired | rejected
);

-- ── SUBMISSIONS ───────────────────────────────────────────────────
-- Every contact / network / careers form submission
CREATE TABLE IF NOT EXISTS submissions (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  submitted_at   TEXT    NOT NULL,
  form_type      TEXT    NOT NULL,  -- 'contact' | 'network' | 'careers'
  email          TEXT    NOT NULL,
  name           TEXT,
  phone          TEXT,
  organisation   TEXT,
  city           TEXT,
  role           TEXT,
  track          TEXT,              -- network track (supplier/specialist/partner)
  message        TEXT,
  linkedin       TEXT,
  cover_note     TEXT,
  data_json      TEXT               -- full payload as JSON (nothing lost)
);

-- ── ASSESSMENTS ───────────────────────────────────────────────────
-- Every assessment submission (competency, language, spreadsheet, profile)
CREATE TABLE IF NOT EXISTS assessments (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  submitted_at   TEXT    NOT NULL,
  email          TEXT    NOT NULL,
  name           TEXT,
  assessment     TEXT    NOT NULL,  -- 'competency' | 'language' | 'spreadsheet' | 'profile'
  domain         TEXT,              -- 'fm' | 'hr' | 'admin' | 'fitouts' | 'spreadsheet'
  score_pct      INTEGER,           -- 0-100, null for profile
  score_correct  INTEGER,
  score_total    INTEGER,
  applying_for   TEXT,
  time_taken_min INTEGER,
  s1_pct         INTEGER,           -- section scores where available
  s2_pct         INTEGER,
  s3_pct         INTEGER,
  s4_pct         INTEGER,
  s5_pct         INTEGER,
  data_json      TEXT               -- full payload as JSON
);

-- ── INDEXES ───────────────────────────────────────────────────────
-- Fast lookups by email (the main join key)
CREATE INDEX IF NOT EXISTS idx_submissions_email  ON submissions(email);
CREATE INDEX IF NOT EXISTS idx_assessments_email  ON assessments(email);
CREATE INDEX IF NOT EXISTS idx_assessments_domain ON assessments(domain);
CREATE INDEX IF NOT EXISTS idx_submissions_type   ON submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_assessments_type   ON assessments(assessment);
