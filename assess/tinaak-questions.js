/* ═══════════════════════════════════════════════════════════════
   TiNAAK Assessment Centre — Question Banks
   tinaak-questions.js  (loaded by assess/competency.html)

   Structure per domain: 5 sections × 12 questions = 60 total
   Each question: { q, opts:{a,b,c}, correct, section, difficulty }
   difficulty: 1=basic  2=intermediate  3=applied
═══════════════════════════════════════════════════════════════ */

const DOMAIN_META = {
  fm: {
    label: "Facility Management",
    sections: [
      "Operations & Service Delivery",
      "Statutory Compliance & Labour Law",
      "Vendor & Contract Management",
      "FM Numeracy & Cost Control",
      "Governance, Reporting & Audit",
    ],
  },
  hr: {
    label: "Human Resources & Payroll",
    sections: [
      "India Labour Codes & Statutory Framework",
      "Payroll Processing & Deductions",
      "HRBP Practice & Employee Relations",
      "HR Compliance, POSH & Documentation",
      "HR Numeracy & Workforce Analytics",
    ],
  },
  admin: {
    label: "Administration & Office Management",
    sections: [
      "Office Management & Operations",
      "Procurement & Vendor Management",
      "Compliance, Documentation & Legal Basics",
      "Administration Numeracy & Cost Control",
      "Communication, Reporting & Professional Practice",
    ],
  },
  fitouts: {
    label: "Corporate Fit-Outs & Projects",
    sections: [
      "BOQ, Specification & Tendering",
      "Project Management & Programme",
      "Site Supervision & Quality Control",
      "Contracts, Payments & Change Control",
      "Regulatory, Compliance & Handover",
    ],
  },
};

/* ══════════════════════════════════════════════════════════════
   FACILITY MANAGEMENT — 60 questions
   S1: Operations & Service Delivery (12)
   S2: Statutory Compliance & Labour Law (12)
   S3: Vendor & Contract Management (12)
   S4: FM Numeracy & Cost Control (12)
   S5: Governance, Reporting & Audit (12)
══════════════════════════════════════════════════════════════ */
const Q_FM = [
  { s:1, d:1, q:"In FM operations, what does 'PPM' stand for?",
    opts:{a:"Periodic Performance Monitoring",b:"Paid Preventive Maintenance",c:"Planned Preventive Maintenance"}, correct:"c" },

  { s:1, d:1, q:"A housekeeping supervisor's primary purpose of a daily signed inspection checklist is to:",
    opts:{a:"Record staff attendance and overtime",b:"Calculate monthly cleaning costs",c:"Provide documented evidence of task completion and quality against standards"}, correct:"c" },

  { s:1, d:2, q:"Your site has 4 HVAC units. PPM frequency is quarterly. Units 1 and 2 were serviced in January. In what month should Units 3 and 4 be scheduled for their next quarterly service if they were last serviced in October?",
    opts:{a:"January",b:"March",c:"April — one quarter after October is January, but if slipped to Feb the next due date is April"}, correct:"a" },

  { s:1, d:2, q:"A cleaning staff member reports that the male washroom hand dryer has been broken for three days. The correct FM response is:",
    opts:{a:"Log the complaint, issue a work order with priority classification, assign to technical maintenance team with a response-time deadline, and follow up to closure",b:"Ask the complainant to email the vendor directly",c:"Wait until the next scheduled maintenance visit"}, correct:"a" },

  { s:1, d:1, q:"What is the standard definition of 'reactive maintenance' in FM?",
    opts:{a:"Maintenance carried out according to a fixed schedule",b:"Maintenance carried out in response to a fault or breakdown that has already occurred",c:"Maintenance done at the request of senior management"}, correct:"b" },

  { s:1, d:2, q:"A high-traffic corporate lobby requires mopping. The cleaning team is trained to use the two-bucket mopping method. What is the primary purpose of using two buckets?",
    opts:{a:"To carry more water and complete the job faster",b:"To separate clean rinse water from dirty wash water, preventing recontamination of cleaned surfaces",c:"To allow two cleaners to work simultaneously"}, correct:"b" },

  { s:1, d:3, q:"A facility manager discovers that the site's DG set has not been load-tested in 11 months. The standard PPM requirement is monthly load testing. What is the most appropriate immediate action?",
    opts:{a:"Conduct the load test and document it without raising any report since no incident has occurred",b:"Schedule a load test immediately, raise a non-compliance report with root cause, review the PPM schedule to identify how this was missed, and implement a check to prevent recurrence",c:"Inform the client that load testing is the generator vendor's responsibility"}, correct:"b" },

  { s:1, d:2, q:"In a managed FM contract, who bears the primary accountability for service quality delivered by a sub-vendor?",
    opts:{a:"The sub-vendor exclusively",b:"The client's internal FM team",c:"The primary FM service provider who engaged the sub-vendor"}, correct:"c" },

  { s:1, d:1, q:"What does a 'par level' refer to in FM consumables management?",
    opts:{a:"The monthly purchase budget for consumables",b:"The maximum stock quantity permitted on site",c:"The minimum stock quantity below which a reorder must be triggered"}, correct:"c" },

  { s:1, d:3, q:"A facility manager is preparing the annual preventive maintenance schedule. Which asset should receive the highest PPM frequency?",
    opts:{a:"Firefighting and suppression systems — these are life-safety assets",b:"Signage and wayfinding boards",c:"Office furniture"}, correct:"a" },

  { s:1, d:2, q:"A pest control contractor completes a treatment and provides a service report. The FM manager should:",
    opts:{a:"File the report and take no further action if no pests are visible",b:"Review the report, verify treatment scope matches contracted schedule, sign off with date, file for audit, and schedule the next treatment in the tracker",c:"Forward the report to the client CEO"}, correct:"b" },

  { s:1, d:3, q:"During a fire drill, it is discovered that two emergency exits are obstructed by stored equipment. The FM manager's first action after the drill should be:",
    opts:{a:"Clear the obstructions immediately, raise an incident report, identify the root cause and establish a daily exit inspection protocol",b:"Inform HR to communicate the finding to staff",c:"Schedule a meeting to discuss the obstruction next week"}, correct:"a" },

  { s:2, d:1, q:"Under the Contract Labour (Regulation and Abolition) Act, 1970, which party is jointly liable if the contractor fails to pay minimum wages to deployed workers?",
    opts:{a:"The state labour department",b:"The contractor exclusively",c:"The principal employer and the contractor jointly"}, correct:"c" },

  { s:2, d:1, q:"ESIC (Employees' State Insurance) is currently applicable to establishments employing how many employees?",
    opts:{a:"50 or more employees in any sector",b:"20 or more",c:"10 or more employees drawing wages up to ₹21,000 per month"}, correct:"c" },

  { s:2, d:2, q:"A security agency deploys guards at your facility. Three guards do not have police verification certificates. Under the Contract Labour Act, the correct action as principal employer is:",
    opts:{a:"Continue deployment and request certificates within 30 days",b:"Remove unverified guards from site immediately and formally notify the agency in writing with a rectification deadline",c:"Report the matter to the police station and wait for instructions"}, correct:"b" },

  { s:2, d:1, q:"Under the Minimum Wages Act, minimum wages in India are set by:",
    opts:{a:"Both Central Government (for scheduled employments under central sphere) and State Governments (for their respective state schedules)",b:"EPFO in consultation with industry bodies",c:"The Central Government alone for all categories of workers"}, correct:"a" },

  { s:2, d:2, q:"The Code on Social Security, 2020, when fully implemented, will make gratuity payable to Fixed-Term Employees after:",
    opts:{a:"Three years of continuous service",b:"On a pro-rata basis after one year of service — the five-year minimum is removed for FTE",c:"Five years of continuous service"}, correct:"b" },

  { s:2, d:1, q:"What is the employer's PF contribution rate under the EPF & MP Act for establishments with 20 or more employees?",
    opts:{a:"12% of basic wages",b:"15% of gross salary",c:"10% of basic wages"}, correct:"a" },

  { s:2, d:3, q:"A housekeeping vendor's monthly compliance certificate shows PF challan paid for 18 of 24 deployed workers. The correct response from the FM manager (as principal employer's representative) is:",
    opts:{a:"Deduct the shortfall from the vendor's invoice without notifying them",b:"Accept the certificate since the majority are covered",c:"Formally notify the vendor in writing of the discrepancy, demand a corrected challan for all 24 workers within a defined deadline, and escalate to the client if not resolved"}, correct:"c" },

  { s:2, d:2, q:"Under the Occupational Safety, Health and Working Conditions Code, 2020, an employer must provide a safe working environment that covers which of the following for contract workers on site?",
    opts:{a:"Only the canteen and restroom facilities",b:"Health and safety provisions equivalent to direct employees including proper lighting, ventilation, protective equipment and welfare facilities",c:"Access to salary slips only"}, correct:"b" },

  { s:2, d:3, q:"Your FM vendor uses a third-party payroll processor for the cleaning staff. The payroll processor defaults and salaries for March are not paid. Under the contract labour framework, who is responsible to ensure the workers are paid?",
    opts:{a:"The cleaning vendor — and if they fail, the principal employer must step in and recover costs from the vendor",b:"The state labour department's welfare fund",c:"The payroll processor exclusively"}, correct:"a" },

  { s:2, d:1, q:"POSH (Prevention of Sexual Harassment at the Workplace Act, 2013) requires organisations with 10 or more employees to constitute:",
    opts:{a:"A Safety Committee approved by the labour commissioner",b:"A Grievance Committee chaired by HR",c:"An Internal Complaints Committee with an external independent member as Presiding Officer if the presiding officer is not from management"}, correct:"c" },

  { s:2, d:2, q:"A facility has 8 security guards working in 12-hour shifts. Under the Factories Act applicability (if applicable to the premises type), the maximum permissible hours of work per week without special permission are:",
    opts:{a:"60 hours",b:"48 hours",c:"54 hours"}, correct:"b" },

  { s:2, d:3, q:"An FM vendor has been operating at your site without a valid labour licence under the Contract Labour Act (establishment has 50+ contract workers). You discover this during an internal audit. The most appropriate action is:",
    opts:{a:"Continue operations until the next labour department inspection",b:"Immediately instruct the vendor to obtain the licence urgently, document the compliance gap, notify your legal/compliance team, and ensure operations are not interrupted during regularisation",c:"Terminate the vendor contract immediately with no notice"}, correct:"b" },

  { s:3, d:1, q:"In a managed FM contract, an SLA (Service Level Agreement) should define:",
    opts:{a:"Performance standards, measurement methods, reporting cadence, and consequences of breach",b:"The FM manager's personal KPIs",c:"The vendor's internal HR and payroll policies"}, correct:"a" },

  { s:3, d:2, q:"A vendor submits an invoice with a 12% service charge that was not in the agreed commercial terms. The correct FM manager response is:",
    opts:{a:"Pay 50% as a goodwill gesture",b:"Pay the invoice to maintain the vendor relationship and flag it later",c:"Reject the invoice formally in writing citing the agreed commercial terms, request a corrected invoice, and document the communication"}, correct:"c" },

  { s:3, d:1, q:"What is the primary purpose of a vendor performance scorecard in FM?",
    opts:{a:"To satisfy the client's annual statutory audit requirements",b:"To calculate the vendor's annual bonus",c:"To provide an objective, documented basis for performance review, tier management and contract renewal decisions"}, correct:"c" },

  { s:3, d:2, q:"During a vendor performance review, the housekeeping vendor's monthly inspection score has fallen from 91% in Q1 to 76% in Q3. The FM manager should:",
    opts:{a:"Reduce the vendor's monthly payment by 24% to reflect the score drop",b:"Issue a formal performance notice, request a root-cause analysis and corrective action plan with milestones, and schedule a follow-up review in 30 days",c:"Immediately terminate the vendor contract"}, correct:"b" },

  { s:3, d:3, q:"A security vendor proposes to replace three experienced guards with new recruits mid-contract without informing the client. The FM manager notices this on inspection. The correct response is:",
    opts:{a:"Accept the change as staff deployment is the vendor's prerogative",b:"Formally notify the vendor that staff changes at a managed site require prior written notification and approval, reference the contract clause, and request reinstatement of the original guards or agreed replacements",c:"Report the matter to the police"}, correct:"b" },

  { s:3, d:1, q:"What does 'scope creep' mean in the context of FM vendor contracts?",
    opts:{a:"Tasks or services being performed by the vendor that fall outside the agreed scope, often without formal variation or additional payment",b:"A vendor failing to meet SLA thresholds consistently",c:"A vendor gradually increasing their staff headcount without approval"}, correct:"a" },

  { s:3, d:2, q:"An FM manager receives a request to approve a new pest control vendor proposed by the site's admin team. The correct pre-approval process includes:",
    opts:{a:"Verifying the vendor's GST registration, PF/ESIC registration, previous client references, treatment certifications, and insurance coverage before approving",b:"Approving on the basis of the admin team's recommendation alone",c:"Checking that the vendor's quote is the lowest received"}, correct:"a" },

  { s:3, d:3, q:"A maintenance contractor has consistently completed PPM tasks on time for 18 months with zero breach notes. They request a 15% rate increase at contract renewal. The FM manager's appropriate response is:",
    opts:{a:"Agree immediately to avoid losing a performing vendor",b:"Reject any increase as the contract is performing well",c:"Acknowledge the performance record, benchmark the proposed rate against the market, counter-propose a rate aligned with CPI inflation or a documented market rate, and formalise the agreed revision in writing"}, correct:"c" },

  { s:3, d:1, q:"In vendor contract management, what is a 'retention clause'?",
    opts:{a:"A clause requiring the vendor to retain all service records for a specified period",b:"A provision allowing the client to withhold a percentage of payment until contract completion, final delivery or defect rectification",c:"A clause preventing the vendor from working with competitors"}, correct:"b" },

  { s:3, d:2, q:"Your housekeeping vendor's key supervisor resigns and the replacement has significantly less experience. This affects service quality. The contract clause most relevant to this situation is:",
    opts:{a:"The force majeure clause",b:"The non-solicitation clause",c:"The key personnel or approved resources clause — which typically requires prior written consent for replacing key approved staff"}, correct:"c" },

  { s:3, d:3, q:"A vendor raises a claim for extra payment for work they say was outside the contract scope. They did not raise a change request before performing the work. The correct position of the FM manager is:",
    opts:{a:"Review the contract scope to determine if the work was genuinely outside it. If outside, note that no prior written variation was raised as required by the contract; assess whether to recognise the claim on goodwill or reject it based on procedure, and document the decision",b:"Escalate to the client CEO without forming a position",c:"Pay the claim in full to maintain the relationship"}, correct:"a" },

  { s:3, d:2, q:"Which document, if properly structured, gives the FM manager the most contractual protection when a vendor fails to perform?",
    opts:{a:"A signed SLA with documented breach definitions, measurement methods, escalation triggers and remediation obligations",b:"The vendor's ISO certification",c:"The vendor's company registration certificate"}, correct:"a" },

  { s:4, d:1, q:"A facility has 12 housekeeping staff working 6 days a week. How many person-days of cleaning does the team deliver in a standard 4-week month?",
    opts:{a:"312",b:"288",c:"240"}, correct:"b" },

  { s:4, d:2, q:"Your monthly consumables budget is ₹52,000. In Month 1 you spent ₹44,800; in Month 2 you spent ₹57,200. What is your cumulative spend against cumulative budget at end of Month 2?",
    opts:{a:"₹2,000 over budget",b:"₹2,000 under budget (spent ₹1,02,000 vs budget ₹1,04,000)",c:"₹5,200 over budget"}, correct:"b" },

  { s:4, d:1, q:"A housekeeping team of 6 cleans a floor of 4,200 sq ft in 3 hours. What is the cleaning rate per person per hour?",
    opts:{a:"1,400 sq ft/person/hour",b:"700 sq ft/person/hour",c:"233 sq ft/person/hour"}, correct:"c" },

  { s:4, d:2, q:"A security vendor costs ₹26,000 per guard per month. The agency charges 18% GST. You deploy 4 guards. What is the total monthly cost including GST?",
    opts:{a:"₹1,46,880 (4 × ₹26,000 × 1.18)",b:"₹1,04,000",c:"₹1,22,720"}, correct:"a" },

  { s:4, d:3, q:"Your site has an electricity bill of ₹1,84,000 for the month. The FM manager identifies that HVAC accounts for 62% of consumption and lighting for 18%. If a switch to LED lighting saves 40% of lighting costs, what is the monthly saving in rupees?",
    opts:{a:"₹13,248 (₹1,84,000 × 18% × 40%)",b:"₹13,248",c:"₹33,120"}, correct:"a" },

  { s:4, d:2, q:"A consumable item has a monthly usage of 180 units. Lead time from the supplier is 7 days. The site operates 26 days per month. What is the minimum reorder point (units) to avoid a stock-out?",
    opts:{a:"49 units (daily usage 6.92 × 7 days)",b:"70 units",c:"42 units"}, correct:"a" },

  { s:4, d:3, q:"The annual maintenance contract for HVAC is ₹2,40,000 per year. An emergency repair call-out (outside contract) costs ₹18,000 per event. In the previous year without an AMC, there were 9 emergency call-outs totalling ₹1,62,000. What is the financial case for or against the AMC?",
    opts:{a:"Against — reactive maintenance is always cheaper",b:"Against — AMC costs ₹78,000 more than reactive costs",c:"For — AMC costs ₹78,000 more but typically reduces call-out frequency significantly; full analysis requires call-out frequency projection under AMC"}, correct:"c" },

  { s:4, d:1, q:"A cleaning vendor quotes ₹85 per sq ft per month for a 12,000 sq ft office. What is the annual contract value?",
    opts:{a:"₹10,20,000",b:"₹1,02,00,000",c:"₹1,22,40,000 (₹85 × 12,000 × 12)"}, correct:"c" },

  { s:4, d:2, q:"The FM budget has a 5% contingency allocation on the base annual budget of ₹18,00,000. How much is the contingency in rupees?",
    opts:{a:"₹9,000",b:"₹90,000",c:"₹1,80,000"}, correct:"b" },

  { s:4, d:3, q:"Energy consumption last month: 8,400 units (kWh). This month: 9,240 units. The unit rate is ₹9.50. What is the increase in the electricity bill this month vs last month?",
    opts:{a:"₹8,400",b:"₹7,980 (840 units × ₹9.50)",c:"₹7,980"}, correct:"b" },

  { s:4, d:2, q:"A pest control contract covers quarterly treatments at ₹8,500 per treatment for the main building and ₹2,200 per treatment for the parking area. What is the total annual contract cost?",
    opts:{a:"₹42,800 (4 × ₹8,500 + 4 × ₹2,200)",b:"₹34,000",c:"₹43,200"}, correct:"a" },

  { s:4, d:3, q:"A facility has 300 employees. The canteen vendor charges ₹85 per meal per day. Assuming 80% meal uptake and 22 working days per month, what is the monthly canteen cost?",
    opts:{a:"₹5,61,600 (300 × 0.80 × ₹85 × 22)",b:"₹4,48,800",c:"₹4,97,700"}, correct:"a" },

  { s:5, d:1, q:"In FM governance, what is the primary purpose of a monthly management review meeting?",
    opts:{a:"To calculate the vendor's monthly invoice",b:"To update the vendor on client gossip and personnel changes",c:"To formally review SLA performance, discuss open issues, agree corrective actions with owners and deadlines, and document decisions"}, correct:"c" },

  { s:5, d:2, q:"An FM KPI report shows the monthly inspection score is 88% against an SLA threshold of 90%. What should the FM manager include in the management report?",
    opts:{a:"The score only — no context needed",b:"The score, the SLA threshold, the 2% breach, root cause identified, corrective action plan with responsible party and deadline, and trend data from the previous three months",c:"A request to reduce the SLA threshold to 85%"}, correct:"b" },

  { s:5, d:1, q:"What is the main difference between a 'leading indicator' and a 'lagging indicator' in FM performance management?",
    opts:{a:"Leading indicators measure past events; lagging indicators predict future performance",b:"Leading indicators measure conditions that predict future outcomes (e.g. PPM completion rate); lagging indicators measure outcomes that have already occurred (e.g. number of breakdowns)",c:"There is no meaningful difference in FM context"}, correct:"b" },

  { s:5, d:3, q:"A client's internal audit team visits the facility and raises a finding that no signed maintenance records exist for the previous quarter. The FM manager's correct response is:",
    opts:{a:"Accept the finding, provide a formal written response within the audit's required timeframe, identify the root cause of the documentation gap, implement an immediate corrective action, and ensure future records are maintained per the agreed standard",b:"Dispute the finding and state that maintenance was done verbally",c:"Accept the finding without escalation"}, correct:"a" },

  { s:5, d:2, q:"In FM reporting, a 'trend analysis' over 6 months is more useful than a single month's data because:",
    opts:{a:"It allows management to distinguish between a one-off anomaly and a structural performance problem, and to assess whether corrective actions are working",b:"It satisfies the annual audit requirement",c:"It produces a larger report document"}, correct:"a" },

  { s:5, d:3, q:"The FM team is preparing for an ISO 9001:2015 external surveillance audit. Which set of documents is most critical for the auditor to review?",
    opts:{a:"Documented quality management procedures, records of their implementation, evidence of internal audits, management review minutes, corrective action logs and KPI performance data",b:"Staff personal files and attendance records only",c:"Vendor company registration and GST certificates"}, correct:"a" },

  { s:5, d:2, q:"An escalation matrix in an FM contract defines three tiers. Tier 3 escalation (Managing Partner level) should be triggered when:",
    opts:{a:"Any service complaint is received from a staff member",b:"A critical issue has not been resolved within the defined Tier 1 and Tier 2 response windows, or when an incident poses a risk to life, safety or major business continuity",c:"The vendor requests a rate increase"}, correct:"b" },

  { s:5, d:1, q:"What is a 'snag list' in the context of FM project handover?",
    opts:{a:"A list of pending vendor invoices",b:"A list of staff who have behavioural issues",c:"A documented list of defects, incomplete works or non-conformities identified during a final inspection, which must be rectified before final sign-off and payment"}, correct:"c" },

  { s:5, d:3, q:"A facility manager receives a complaint from a vendor's worker about non-payment of wages for the past two months. Under the framework of the principal employer's responsibility, the FM manager should:",
    opts:{a:"Ask the worker to file a complaint with the labour department",b:"Refer the worker to the vendor and take no further action",c:"Take the complaint seriously, formally notify the vendor in writing demanding immediate payment, document the complaint and the vendor's response, and if the vendor fails to pay, exercise the principal employer's right to make good the wages and recover from the vendor"}, correct:"c" },

  { s:5, d:2, q:"Which of the following best describes a 'balanced scorecard' approach to FM performance measurement?",
    opts:{a:"A scorecard that scores vendors on a 1–10 scale",b:"Measuring only financial performance — cost per sq ft, budget adherence",c:"Measuring performance across multiple dimensions — financial, customer satisfaction, internal process quality and compliance — to give a complete view of operational health"}, correct:"c" },

  { s:5, d:3, q:"An FM manager is preparing the annual budget. Which approach best produces a defensible, accurate budget?",
    opts:{a:"Add 10% to last year's actual spend across all lines",b:"Start from zero: review each service contract, identify known changes in scope or headcount, benchmark key rates against the market, model energy costs against consumption data, and build up line by line with documented assumptions",c:"Use the client's previous year budget without modification"}, correct:"b" },

  { s:5, d:2, q:"A CCTV system at a corporate facility stores footage. The facility manager is asked how long footage is retained. The correct answer depends on:",
    opts:{a:"The CCTV manufacturer's recommendation",b:"The FM vendor's standard practice",c:"The organisation's information security and data retention policy, applicable data protection law, and any specific regulatory requirements for the sector"}, correct:"c" },
];

/* ══════════════════════════════════════════════════════════════
   HUMAN RESOURCES & PAYROLL — 60 questions
   S1: India Labour Codes & Statutory Framework (12)
   S2: Payroll Processing & Deductions (12)
   S3: HRBP Practice & Employee Relations (12)
   S4: HR Compliance, POSH & Documentation (12)
   S5: HR Numeracy & Workforce Analytics (12)
══════════════════════════════════════════════════════════════ */
const Q_HR = [
  { s:1, d:1, q:"The four Labour Codes enacted in India consolidate how many existing central labour laws?",
    opts:{a:"29 laws",b:"Over 40 laws into four codes",c:"12 laws"}, correct:"b" },

  { s:1, d:1, q:"Which Labour Code covers provident fund, gratuity, ESIC and maternity benefits?",
    opts:{a:"Code on Wages, 2019",b:"Code on Industrial Relations, 2020",c:"Code on Social Security, 2020"}, correct:"c" },

  { s:1, d:2, q:"Under the Maternity Benefit Act (as incorporated into the Code on Social Security), what is the paid maternity leave entitlement for a woman with fewer than two surviving children?",
    opts:{a:"26 weeks",b:"18 weeks",c:"12 weeks"}, correct:"a" },

  { s:1, d:2, q:"The Code on Wages, 2019 introduces the concept of a 'Floor Wage' which:",
    opts:{a:"Applies only to central government employees",b:"Replaces all state minimum wages",c:"Sets a national minimum below which no state minimum wage can be fixed"}, correct:"c" },

  { s:1, d:1, q:"Fixed-Term Employment (FTE) under the Code on Industrial Relations, 2020 entitles FTE workers to:",
    opts:{a:"Benefits equivalent to permanent employees on a pro-rata basis, including gratuity after one year",b:"Only PF and ESIC — no other benefits",c:"No benefits — FTE is a contract arrangement with no statutory protections"}, correct:"a" },

  { s:1, d:3, q:"Under the Code on Industrial Relations, 2020, establishments with how many workers require government permission before retrenchment or closure?",
    opts:{a:"100 or more workers",b:"300 or more workers",c:"50 or more workers"}, correct:"b" },

  { s:1, d:2, q:"The ESIC wage ceiling (above which workers are not covered under ESIC) is currently:",
    opts:{a:"₹25,000 per month",b:"₹15,000 per month",c:"₹21,000 per month"}, correct:"c" },

  { s:1, d:3, q:"A company employs 22 workers on a fixed-term basis for a project lasting 8 months. Under the FTE provisions, at the end of the project these workers are entitled to:",
    opts:{a:"Nothing — fixed-term workers have no end-of-service rights",b:"Full and final settlement including pro-rata gratuity (8/12ths of 15 days' wages per year of service) and any outstanding leave encashment",c:"Only their final month's salary"}, correct:"b" },

  { s:1, d:1, q:"Professional Tax in India is:",
    opts:{a:"A tax administered by EPFO",b:"A central government tax on professional income",c:"A state-level tax levied by state governments — the rate and applicability vary by state"}, correct:"c" },

  { s:1, d:2, q:"Under the Payment of Bonus Act (as subsumed under the Code on Wages), the minimum bonus payable is:",
    opts:{a:"8.33% of annual wages or ₹7,000/month × 12 (or applicable minimum wage if higher), whichever is higher",b:"8.33% of annual wages or ₹100 per employee, whichever is higher",c:"20% of annual wages"}, correct:"a" },

  { s:1, d:3, q:"An inter-state migrant worker is employed through a contractor at a Gurugram office. Under the Code on Social Security, the employer's obligations include:",
    opts:{a:"Providing only PF and ESIC contributions",b:"Providing appointment letters, health checkups, annual travel allowance to the worker's native state, and portability of PDS benefits",c:"No additional obligations beyond the standard for local employees"}, correct:"b" },

  { s:1, d:2, q:"Under the Occupational Safety, Health and Working Conditions Code, 2020, the threshold for applicability of the standing orders requirement is:",
    opts:{a:"Factories with 50 or more workers",b:"Any establishment with 10 or more workers",c:"Establishments with 300 or more workers"}, correct:"c" },

  { s:2, d:1, q:"TDS on salary is governed by which section of the Income Tax Act?",
    opts:{a:"Section 80C",b:"Section 194",c:"Section 192"}, correct:"c" },

  { s:2, d:2, q:"An employee's monthly gross salary is ₹85,000. Basic salary is 40% of gross. The employee PF contribution is 12% of basic. What is the employee's monthly PF deduction?",
    opts:{a:"₹4,080",b:"₹4,080 (12% × 40% × ₹85,000)",c:"₹10,200"}, correct:"b" },

  { s:2, d:1, q:"What is the EPF employer contribution rate?",
    opts:{a:"12% of basic wages — of which 8.33% goes to EPS and 3.67% to EPF",b:"10% of gross salary",c:"15% of CTC"}, correct:"a" },

  { s:2, d:3, q:"An employee's basic salary is ₹25,000/month. They have a loan from the company with an EMI of ₹5,000. They are also subject to an attachment order for ₹3,000/month. Net of PF and ESIC deductions, what must the payroll team ensure before processing further deductions?",
    opts:{a:"That the total deductions do not exceed 50% of net wages under the Wages Code provisions protecting minimum take-home pay",b:"That the loan EMI takes priority over the attachment order",c:"That the attachment order is paid first before the loan EMI"}, correct:"a" },

  { s:2, d:2, q:"Form 16 is issued by the employer to the employee for which purpose?",
    opts:{a:"ESIC claim submission",b:"PF withdrawal",c:"As a TDS certificate confirming tax deducted from salary during the financial year"}, correct:"c" },

  { s:2, d:1, q:"ESIC contributions are deducted from the employee at what rate?",
    opts:{a:"0.75% of gross wages",b:"1.75% of gross wages",c:"3.25% of gross wages"}, correct:"a" },

  { s:2, d:3, q:"An employee joins on 15 March. Salary is ₹72,000/month (30 days). What is the salary payable for March assuming the company pays for actual days worked?",
    opts:{a:"₹36,000",b:"₹38,400 (₹72,000 / 30 × 16 days)",c:"₹72,000 — a joiner in March gets full month"}, correct:"b" },

  { s:2, d:2, q:"In Indian payroll, what does 'CTC' (Cost to Company) include that gross salary does not?",
    opts:{a:"Only the performance bonus component",b:"Nothing — CTC and gross salary are the same",c:"Employer contributions to PF, ESIC, and any other employer-borne statutory or contractual costs"}, correct:"c" },

  { s:2, d:2, q:"A payroll executive receives a salary advance request from an employee for ₹25,000 to be recovered over 5 months. The correct process is:",
    opts:{a:"Obtain written approval from the authorised signatory, document the advance in the employee's record, set up a formal recovery schedule in the payroll system, and ensure written acknowledgement from the employee",b:"Refer to HR and take no further action",c:"Pay immediately and recover informally"}, correct:"a" },

  { s:2, d:3, q:"Your company switched payroll software in April. The first pay run on the new system shows 3 employees with incorrect PF calculations. The correct immediate action is:",
    opts:{a:"Process payroll as generated and correct next month",b:"Hold the pay run, identify the configuration error, correct it in the system, re-run the calculation, obtain approval, and only then process — documenting the correction clearly",c:"Process manually for the 3 employees and generate the shortfall next month"}, correct:"b" },

  { s:2, d:1, q:"Form 26Q is a quarterly TDS return filed for:",
    opts:{a:"TDS deducted from payments other than salary (professional fees, rent, contractor payments)",b:"ESIC monthly challan",c:"TDS deducted from salaries (covered under 24Q instead)"}, correct:"a" },

  { s:2, d:2, q:"An employee's salary is credited 4 days late due to a bank processing error. Under the Code on Wages, 2019, wages must be paid:",
    opts:{a:"There is no specific deadline under the Code on Wages",b:"By the 10th of the following month for all establishments",c:"By the 7th of the following month for establishments with fewer than 1,000 employees, and within the defined wage period — delayed payment is a violation"}, correct:"c" },

  { s:3, d:1, q:"The primary role of an HRBP (HR Business Partner) is:",
    opts:{a:"Processing payroll and maintaining leave records",b:"Acting as a strategic partner to business units — aligning HR initiatives with business objectives and advising line managers on people-related decisions",c:"Managing vendor contracts for recruitment agencies"}, correct:"b" },

  { s:3, d:2, q:"An employee approaches their HRBP and discloses that their manager has been making hostile comments. The HRBP's first action should be:",
    opts:{a:"Ask the employee to submit a written complaint first before taking any action",b:"Immediately inform the manager's manager",c:"Listen carefully, document the disclosure accurately with date and details, inform the employee about the formal grievance process, and maintain confidentiality while assessing the appropriate course of action"}, correct:"c" },

  { s:3, d:2, q:"A manager asks their HRBP to help build a performance improvement plan (PIP) for an underperforming employee. A well-structured PIP should include:",
    opts:{a:"Specific performance gaps with measurable targets, a defined improvement timeline, regular check-in dates, support provided (training/coaching), and consequences of continued underperformance",b:"Only the employee's past appraisal scores",c:"A statement that the employee will be terminated at the end of the PIP period"}, correct:"a" },

  { s:3, d:1, q:"In talent acquisition, 'time to fill' measures:",
    opts:{a:"The time from job posting to candidate start date",b:"The number of days from an approved job requisition to the accepted offer",c:"The cost per hire across all open positions"}, correct:"b" },

  { s:3, d:3, q:"An HRBP notices that a high-performing team has seen 4 resignations in 6 months, all citing the same manager. The most appropriate HRBP intervention is:",
    opts:{a:"Brief the manager informally and hope the trend reverses",b:"Recruit replacements quickly and monitor for 3 more months before acting",c:"Conduct structured exit interviews with the resigned employees, present the pattern to senior leadership with data, recommend a formal management assessment for the manager concerned, and propose a development or structural intervention"}, correct:"c" },

  { s:3, d:2, q:"What is the difference between 'job evaluation' and 'performance appraisal'?",
    opts:{a:"They are the same process",b:"Job evaluation assesses the relative worth of a role to establish pay grades; performance appraisal assesses how well an individual has performed in their role over a period",c:"Job evaluation is done annually; performance appraisal is done quarterly"}, correct:"b" },

  { s:3, d:3, q:"An employee is on a 90-day probation period. On Day 85 the manager tells the HRBP they want to extend probation but has not given the employee any formal feedback during the period. The HRBP should:",
    opts:{a:"Terminate the employee instead since probation cannot be extended",b:"Process the extension without question",c:"Advise the manager that extension requires documented feedback and a specific reason, help prepare a formal mid-probation notice immediately, and ensure the extension is communicated in writing to the employee before Day 90 with clear targets for the extended period"}, correct:"c" },

  { s:3, d:1, q:"'Employer branding' refers to:",
    opts:{a:"The organisation's reputation and value proposition as a place to work, which influences candidate attraction, employee engagement and retention",b:"Advertising open positions on LinkedIn",c:"The company's registered trademark for HR-related materials"}, correct:"a" },

  { s:3, d:2, q:"A line manager wants to terminate an employee who has been with the company for 3 years for 'not being a cultural fit'. The HRBP's appropriate guidance is:",
    opts:{a:"Advise that 'cultural fit' is not a sufficient legal ground for termination of a confirmed employee; the reason must be documented, the employee must have been given opportunity to improve, and the process must follow the company's disciplinary procedure and applicable industrial relations law",b:"Offer the employee a transfer instead without further process",c:"Process the termination — culture fit is a valid reason"}, correct:"a" },

  { s:3, d:3, q:"An HRBP is asked to present a 'workforce plan' for the next financial year to the leadership team. Which data inputs are most critical?",
    opts:{a:"Last year's recruitment spend and the number of open positions",b:"The HR budget allocated by finance",c:"Current headcount, projected business growth or contraction, historical attrition rates by function, skills gap assessment, talent pipeline status, and cost implications of different scenarios"}, correct:"c" },

  { s:3, d:2, q:"An employee who was dismissed files a complaint with the labour commissioner alleging wrongful termination. The HRBP's most important preparatory step before the conciliation hearing is:",
    opts:{a:"Prepare a response denying all allegations without documentation",b:"Compile the complete documentation trail — appointment letter, performance records, disciplinary notices, show-cause letters, the employee's responses, and the termination order — and ensure it demonstrates proper process was followed",c:"Contact the employee informally to reach a private settlement"}, correct:"b" },

  { s:3, d:1, q:"The 360-degree feedback process in performance management involves:",
    opts:{a:"Self-assessment against 360 competency criteria",b:"Collecting structured feedback on an employee from multiple sources — manager, peers, direct reports, and sometimes clients — to give a rounded view of performance and behaviour",c:"Three rounds of appraisal meetings in a year"}, correct:"b" },

  { s:4, d:1, q:"POSH (Prevention of Sexual Harassment at the Workplace Act, 2013) applies to:",
    opts:{a:"All workplaces with 10 or more employees — and the definition of workplace includes client sites, transit and work-related travel",b:"Only manufacturing establishments",c:"Only organisations with more than 100 employees"}, correct:"a" },

  { s:4, d:2, q:"A male employee files a sexual harassment complaint against a female colleague. Under POSH:",
    opts:{a:"The Internal Complaints Committee must receive and acknowledge the complaint but POSH's ICC mechanism specifically addresses complaints from women aggrieved at the workplace; a male complainant's matter may be referred to the general disciplinary process",b:"The complaint must be referred to the police immediately",c:"The complaint is not covered as POSH is only for female complainants"}, correct:"c" },

  { s:4, d:2, q:"The Internal Complaints Committee (ICC) under POSH must include as Presiding Officer:",
    opts:{a:"A woman employed at a senior level — and if no senior woman is available, one must be nominated from another office or from an NGO",b:"The head of the HR department",c:"The CEO or Managing Director"}, correct:"a" },

  { s:4, d:3, q:"During a POSH complaint inquiry, the respondent employee requests access to the complainant's written complaint. The ICC should:",
    opts:{a:"Provide a full copy immediately",b:"Provide sufficient details of the allegation for the respondent to prepare their response, while taking care to protect details that could lead to reprisal, and proceed as per the defined inquiry procedure",c:"Refuse to share any information with the respondent"}, correct:"b" },

  { s:4, d:1, q:"An employment contract must legally specify, at minimum:",
    opts:{a:"The employee's personal bank account details",b:"Only the start date and salary",c:"Designation, compensation, working hours, leave entitlement, notice period and the applicable conduct and disciplinary code"}, correct:"c" },

  { s:4, d:2, q:"Gratuity under the Payment of Gratuity Act becomes payable when an employee completes:",
    opts:{a:"7 years of continuous service",b:"3 years of continuous service",c:"5 years of continuous service (standard provision — reduced for FTE under Code on Social Security)"}, correct:"c" },

  { s:4, d:3, q:"An HR manager discovers that the company has not been filing annual returns under the Shops and Establishments Act for the past 2 years. The correct course of action is:",
    opts:{a:"Immediately consult the company's legal/compliance advisor, file the outstanding returns with applicable late fees, document the gap and its resolution, and establish a compliance calendar to prevent recurrence",b:"Backdate the filings without late fee payment",c:"Continue as is and hope no inspection occurs"}, correct:"a" },

  { s:4, d:1, q:"A disciplinary show-cause notice should:",
    opts:{a:"State that the employee is dismissed and ask them to explain themselves",b:"Clearly describe the alleged misconduct, cite the relevant conduct rule or policy, give the employee a reasonable time to respond in writing, and not presuppose guilt",c:"Be issued verbally in the presence of two witnesses"}, correct:"b" },

  { s:4, d:2, q:"Which of the following is NOT a valid ground for summary dismissal (without notice) under Indian labour law?",
    opts:{a:"Wilful insubordination",b:"Disagreeing with company strategy in an internal meeting",c:"Theft of company property"}, correct:"b" },

  { s:4, d:3, q:"An employee on maternity leave is issued a termination notice during her leave period. Under the Maternity Benefit Act:",
    opts:{a:"Termination or dismissal during maternity leave is prohibited and void — any termination during this period exposes the employer to penalties under the Act",b:"The termination is valid if the employment contract permits it",c:"Termination during maternity leave is valid if notice was given before leave commenced"}, correct:"a" },

  { s:4, d:2, q:"Which HR document serves as the primary reference for an employee's terms and conditions of employment after joining?",
    opts:{a:"The appointment letter — which supersedes the offer letter and constitutes the formal contract of employment",b:"The job description posted during recruitment",c:"The offer letter only"}, correct:"a" },

  { s:4, d:3, q:"A whistleblower complaint is received by HR alleging that a senior manager is manipulating attendance data. The HR manager's obligation is to:",
    opts:{a:"Ask the complainant to provide documentary evidence before any action is taken",b:"Refer the matter to the accused manager's supervisor",c:"Treat the complaint seriously, ensure the complainant's identity is protected, conduct an objective preliminary inquiry, and escalate to the audit committee or senior leadership outside the accused manager's reporting line"}, correct:"c" },

  { s:5, d:1, q:"Your organisation has 240 employees. 18 resigned in the last 12 months. What is the annual attrition rate?",
    opts:{a:"18%",b:"7.5% (18/240 × 100)",c:"7.5%"}, correct:"b" },

  { s:5, d:2, q:"Monthly gross salary: ₹60,000. Basic = 40% of gross. HRA = 50% of Basic. What is the monthly HRA amount?",
    opts:{a:"₹12,000",b:"₹30,000",c:"₹12,000 (50% × 40% × ₹60,000)"}, correct:"c" },

  { s:5, d:2, q:"Recruitment cost-per-hire is calculated as:",
    opts:{a:"Total recruitment spend ÷ total number of hires in the period",b:"Salary offered to new joiners ÷ number of vacancies",c:"Total number of hires ÷ total recruitment spend"}, correct:"a" },

  { s:5, d:3, q:"A department has 35 employees. The average salary is ₹55,000 CTC per month. HR needs to model a 12% salary increment from April. What is the incremental annual payroll cost for this department?",
    opts:{a:"₹2,31,000",b:"₹23,10,000",c:"₹27,72,000 (35 × ₹55,000 × 12% × 12)"}, correct:"c" },

  { s:5, d:1, q:"Leave encashment for an employee with 18 days of outstanding earned leave and a basic salary of ₹30,000/month is calculated as:",
    opts:{a:"₹18,000",b:"₹18,000 (₹30,000 ÷ 30 days × 18 days)",c:"₹18,000 (18 days × ₹1,000/day — basic per day)"}, correct:"b" },

  { s:5, d:2, q:"The HR department has filled 36 vacancies in the year. The average time-to-fill across all roles was 28 days. Total recruitment spend was ₹7,20,000. What is the cost per hire?",
    opts:{a:"₹20,000",b:"₹20,000 (₹7,20,000 ÷ 36)",c:"₹25,714"}, correct:"b" },

  { s:5, d:3, q:"A company with 500 employees has an attrition rate of 22% per year. Replacement cost (recruitment + training + lost productivity) is estimated at 75% of annual salary, average salary ₹6,00,000. What is the annual cost of attrition?",
    opts:{a:"₹4,95,00,000 (500 × 22% × ₹6,00,000 × 75%)",b:"₹3,30,00,000",c:"₹2,20,00,000"}, correct:"a" },

  { s:5, d:2, q:"An employee has worked for 7 years and 8 months. Their last drawn basic + DA is ₹28,000/month. Gratuity under the Payment of Gratuity Act is calculated as:",
    opts:{a:"15/26 × ₹28,000 × 8 = ₹1,29,231 (5+ months rounds up to the next year)",b:"15/30 × ₹28,000 × 8 = ₹1,12,000",c:"15/26 × ₹28,000 × 7 = ₹1,13,077"}, correct:"a" },

  { s:5, d:1, q:"If the training budget is ₹3,00,000 for 60 employees, and 85% of the budget is used by year-end, what is the average spend per trained employee (assuming all are trained)?",
    opts:{a:"₹5,000",b:"₹4,250 (₹3,00,000 × 85% ÷ 60)",c:"₹5,000 per employee"}, correct:"b" },

  { s:5, d:3, q:"HR is asked to report the 'offer-to-join ratio' for Q1. 45 offers were made; 31 candidates joined; 7 offers were declined; 7 did not join despite accepting. What is the offer-to-join ratio?",
    opts:{a:"68.9% (31/45)",b:"86.7% (31/38 accepted offers)",c:"68.9% (31 joined ÷ 45 offers made)"}, correct:"c" },

  { s:5, d:2, q:"A company pays Variable Dearness Allowance (VDA) linked to the CPI. CPI was 312 in January; it is 328 in March. If VDA is ₹10 per CPI point per month and the employee's entitlement is based on 10 CPI points per VDA unit, what is the VDA increase per month?",
    opts:{a:"₹160",b:"₹160 (16 CPI points × ₹10)",c:"₹32"}, correct:"b" },

  { s:5, d:3, q:"Management wants to know the 'span of control' in the operations department which has 1 VP, 4 Managers, 16 Team Leads and 64 Executives. The average span of control across all managerial levels is:",
    opts:{a:"4 (4 managers per VP, 4 TLs per manager, 4 executives per TL)",b:"21.3",c:"16"}, correct:"a" },
];

/* ══════════════════════════════════════════════════════════════
   ADMINISTRATION & OFFICE MANAGEMENT — 60 questions
   S1: Office Management & Operations (12)
   S2: Procurement & Vendor Management (12)
   S3: Compliance, Documentation & Legal Basics (12)
   S4: Administration Numeracy & Cost Control (12)
   S5: Communication, Reporting & Professional Practice (12)
══════════════════════════════════════════════════════════════ */
const Q_ADMIN = [
  { s:1, d:1, q:"An office manager is informed that three meeting rooms are double-booked for the same time slot tomorrow. The correct immediate action is:",
    opts:{a:"Verify the room management system, contact the booking parties to resolve the conflict based on priority, and implement a fix to the booking process to prevent recurrence",b:"Allow the first booker to use the room and ignore the others",c:"Cancel all three bookings and start fresh"}, correct:"a" },

  { s:1, d:2, q:"A visitor arrives for a meeting but the host employee is not in the building. The front office executive should:",
    opts:{a:"Ask the visitor to leave and reschedule",b:"Seat the visitor comfortably, immediately contact the host for instructions, maintain visitor log with time of arrival, and keep the visitor informed of updates",c:"Allow the visitor to wait unsupervised in the host's workstation area"}, correct:"b" },

  { s:1, d:1, q:"The primary purpose of maintaining an asset register in an office is:",
    opts:{a:"To track all fixed assets — their location, condition, acquisition cost and depreciation — providing management and audit visibility of company property",b:"To satisfy the landlord's requirements",c:"To impress the annual auditor"}, correct:"a" },

  { s:1, d:2, q:"What is the correct procedure when a confidential courier marked 'Addressee Only' arrives at the mailroom?",
    opts:{a:"Leave at the addressee's workstation",b:"Open it and distribute contents to the relevant department",c:"Hold for collection by or delivery to the named addressee with confirmation of receipt — do not open or share contents"}, correct:"c" },

  { s:1, d:1, q:"In office space planning, 'workstation density' typically refers to:",
    opts:{a:"The spacing between workstation partitions",b:"The number of monitors per desk",c:"The ratio of available workstations to the number of employees or the usable area per person"}, correct:"c" },

  { s:1, d:3, q:"An office manager discovers that the emergency evacuation plan is 3 years old and does not reflect recent office layout changes. The correct action is:",
    opts:{a:"Immediately update the plan to reflect current layout, conduct a walkthrough with the floor warden team, reprint and post updated plans at all exit points, and schedule a practice drill",b:"Inform FM and take no further action",c:"Continue using the existing plan until the next scheduled review"}, correct:"a" },

  { s:1, d:2, q:"A company relocating offices asks the admin manager to project-manage the move. The most critical first step is:",
    opts:{a:"Booking moving vehicles",b:"Creating a detailed move plan covering asset inventory, IT cutover timeline, department relocation sequence, staff communication, day-one readiness checklist and vendor coordination",c:"Informing all vendors of the new address"}, correct:"b" },

  { s:1, d:1, q:"A visitor management system should capture, at minimum:",
    opts:{a:"Visitor name and phone number",b:"Visitor name only",c:"Visitor name, company, purpose, person being visited, ID verification, time in and time out"}, correct:"c" },

  { s:1, d:3, q:"The office stationery budget is consistently overspent. As admin manager, the most effective long-term control is:",
    opts:{a:"Implement a centralised stationery request and approval system with monthly consumption tracking by department, set departmental limits and identify the highest-consuming items for review",b:"Ask each department to buy their own stationery",c:"Stop buying stationery for 3 months"}, correct:"a" },

  { s:1, d:2, q:"In a corporate office, access control systems log entry and exit. If an employee's access card shows entry at 9:15 AM but they are marked absent by their manager, the admin manager should:",
    opts:{a:"Mark the employee as present based on the access log",b:"Flag the discrepancy to HR for investigation — the access log is one data point; the manager's record and any clarification from the employee should be considered before correcting the attendance record",c:"Overwrite the manager's record with the access log data"}, correct:"b" },

  { s:1, d:1, q:"Corporate gifting to clients during a festival requires the admin executive to:",
    opts:{a:"Purchase the most expensive option available",b:"Verify the gift value and nature comply with the company's anti-bribery and gifts policy, check that GST-compliant invoices are obtained, maintain a gifting register, and ensure deliveries are tracked",c:"Choose gifts based on personal preference"}, correct:"b" },

  { s:1, d:3, q:"An office manager is setting up a new 200-person office. Which utilities and vendor setup should be prioritised for Day 1 readiness?",
    opts:{a:"Internet and telephony, security and access control, power backup, housekeeping, safety equipment and emergency exits, and basic furniture — in that priority order",b:"Reception branding and signage only",c:"Cafeteria setup and artwork installation"}, correct:"a" },

  { s:2, d:1, q:"A 'Request for Proposal' (RFP) differs from a 'Request for Quotation' (RFQ) primarily because:",
    opts:{a:"An RFP invites vendors to propose their solution and methodology as well as pricing; an RFQ asks only for a price against a defined specification",b:"An RFQ is used for goods only; an RFP is for services only",c:"They are the same document with different names"}, correct:"a" },

  { s:2, d:2, q:"When comparing vendor quotations for an office pantry supply contract, the most thorough evaluation considers:",
    opts:{a:"Which vendor's salesperson is most responsive",b:"The headline monthly price only",c:"Price, product quality and specification match, delivery reliability, payment terms, vendor's service record, GST compliance, and total cost of ownership including hidden charges"}, correct:"c" },

  { s:2, d:1, q:"A purchase order (PO) serves as:",
    opts:{a:"A receipt confirming delivery of goods",b:"A formal legal document from the buyer to the supplier confirming the agreed goods, quantity, price, delivery terms and payment terms",c:"An invoice from the supplier"}, correct:"b" },

  { s:2, d:3, q:"An admin executive approves a vendor payment without a matching purchase order or delivery challan. This represents:",
    opts:{a:"A procurement control failure — three-way matching (PO, delivery challan, invoice) is required before payment authorisation to prevent fraud and errors",b:"A petty cash transaction that needs no documentation",c:"An acceptable shortcut when the vendor is well-known"}, correct:"a" },

  { s:2, d:2, q:"A vendor delivers office chairs but 4 of 20 have visible defects. The admin executive should:",
    opts:{a:"Accept all 20 and raise the defect informally later",b:"Accept 16 chairs, formally reject the 4 defective items with a written rejection note at time of delivery, request replacements, and document the rejection in the vendor's performance record",c:"Refuse the entire delivery and cancel the order"}, correct:"b" },

  { s:2, d:1, q:"In procurement, 'lead time' refers to:",
    opts:{a:"The time between placing a purchase order and receiving the goods or service",b:"The first item on a vendor's quotation list",c:"The time the senior manager spends approving purchases"}, correct:"a" },

  { s:2, d:3, q:"A vendor whose contract is expiring proposes a 20% price increase for renewal. Market benchmarking shows comparable vendors charge 8–12% more than the current rate. The correct procurement response is:",
    opts:{a:"Terminate and find a new vendor immediately",b:"Accept the 20% increase to retain the vendor",c:"Counter-propose a rate aligned with market benchmarking data (8–12%), document the negotiation position with evidence, and explore whether a multi-year commitment could reduce the increase in exchange for volume certainty"}, correct:"c" },

  { s:2, d:2, q:"GST input tax credit (ITC) can be claimed on office supply purchases when:",
    opts:{a:"Any receipt is obtained regardless of GST registration",b:"A valid GST invoice is received from a GST-registered supplier, the goods are used for business purposes, and the claim is filed within the prescribed timeline",c:"The purchase is above ₹10,000"}, correct:"b" },

  { s:2, d:2, q:"An admin manager receives two quotations for printing: Vendor A quotes ₹28,000 with 60-day credit; Vendor B quotes ₹26,500 for immediate payment. The company's cost of capital is 12% per year. Which vendor offers the better total value?",
    opts:{a:"They are equivalent",b:"Vendor B is always better since the price is lower",c:"Vendor A: the 60-day credit is worth approximately ₹28,000 × 12% × 60/365 ≈ ₹553, making effective cost ≈ ₹27,447, which is still more than ₹26,500 — Vendor B is marginally better if cash is available"}, correct:"c" },

  { s:2, d:1, q:"A petty cash fund is maintained at ₹5,000. At month end, the cashier has ₹1,840 in cash and ₹3,210 in receipts. The fund is:",
    opts:{a:"₹50 over (₹5,050 in cash + receipts vs ₹5,000 fund)",b:"₹50 short — cash + receipts = ₹5,050",c:"₹50 short (₹1,840 + ₹3,210 = ₹5,050; fund should be ₹5,000 — there is a ₹50 surplus, not a shortage)"}, correct:"a" },

  { s:2, d:3, q:"The admin team needs to procure AV equipment worth ₹4,50,000. The company's procurement policy requires three competitive quotes above ₹1,00,000 and committee approval above ₹3,00,000. The correct process is:",
    opts:{a:"Split the purchase into smaller amounts to avoid committee approval",b:"Get one quote from the preferred vendor and proceed",c:"Obtain three competitive quotes, prepare a comparison matrix, submit for committee approval with recommendation, issue PO only after approval"}, correct:"c" },

  { s:2, d:2, q:"Vendor evaluation for empanelment should include which of the following checks?",
    opts:{a:"Vendor's social media following",b:"GST registration, PAN, financial stability, client references, quality certifications, delivery capability, and compliance with applicable labour and statutory requirements",c:"Lowest quoted price only"}, correct:"b" },

  { s:3, d:1, q:"The Shops and Establishments Act in India requires employers to:",
    opts:{a:"Register the establishment with the municipal authority and maintain statutory registers including attendance, leave and wages",b:"Obtain a factory licence",c:"File annual returns with the Central government"}, correct:"a" },

  { s:3, d:2, q:"An employment contract for a 6-month fixed-term role must include:",
    opts:{a:"Only start date and monthly salary",b:"Start and end dates, designation, compensation, working hours, applicable policies, notice period during the term, and end-of-contract entitlements",c:"Only the employee's PAN and Aadhaar details"}, correct:"b" },

  { s:3, d:1, q:"A non-disclosure agreement (NDA) signed by an employee primarily protects:",
    opts:{a:"The company's confidential information, trade secrets and proprietary data from disclosure to third parties",b:"The company's right to terminate the employee",c:"The employee's right to work for competitors"}, correct:"a" },

  { s:3, d:3, q:"An admin manager receives a legal notice addressed to the company. The correct immediate action is:",
    opts:{a:"Return the notice marked 'refused'",b:"Read it, respond directly and file it",c:"Acknowledge receipt, immediately forward to the company's legal counsel or authorised signatory, do not respond independently, and confirm receipt to the sender"}, correct:"c" },

  { s:3, d:2, q:"Under GDPR or India's DPDP Act principles, personal data collected from employees should be:",
    opts:{a:"Shared freely with all departments",b:"Retained indefinitely for HR purposes",c:"Collected for a specific, lawful purpose, stored securely, not shared without consent or legal basis, and retained only for as long as necessary"}, correct:"c" },

  { s:3, d:1, q:"A company is required to renew its trade licence annually. The admin manager discovers the licence expired 2 months ago. The correct action is:",
    opts:{a:"Continue operations and renew at next convenient time",b:"Initiate renewal immediately, check if penalty for late renewal applies and budget accordingly, inform the compliance officer, and document the lapse and its resolution",c:"Backdate the renewal application"}, correct:"b" },

  { s:3, d:2, q:"When notarising a document, the notary public certifies that:",
    opts:{a:"The signature on the document was made in their presence by the person named, confirming the signatory's identity",b:"The document has been registered with the government",c:"The content of the document is factually accurate"}, correct:"a" },

  { s:3, d:3, q:"An admin executive is asked to sign a lease agreement on behalf of the company. They should:",
    opts:{a:"Sign if instructed by their manager — a manager's verbal approval is sufficient",b:"Only sign if they hold a valid Power of Attorney or board authorisation to execute contracts on the company's behalf — otherwise refer to the authorised signatory",c:"Sign in pencil so it can be changed later"}, correct:"b" },

  { s:3, d:1, q:"What is the correct format for addressing a formal business letter to a company (not a specific individual)?",
    opts:{a:"'Dear Sir/Madam' or 'To the Manager — [Department]'",b:"Both a and b are acceptable in formal correspondence",c:"'To Whomsoever It May Concern'"}, correct:"b" },

  { s:3, d:2, q:"A document retention policy specifies that financial records be kept for 8 years. An admin team member proposes destroying 5-year-old vendor invoices. The correct response is:",
    opts:{a:"Refuse — the records must be retained until they meet the full 8-year retention requirement per policy",b:"Destroy the originals but retain scanned copies",c:"Approve the disposal since 5 years is sufficient"}, correct:"a" },

  { s:3, d:3, q:"An employee's laptop is stolen from the office. The admin manager's compliance obligations include:",
    opts:{a:"Ordering a replacement and noting the incident in the asset register",b:"Filing an internal report only",c:"Filing a police complaint (FIR) with the serial number and details, notifying the IT/data security team immediately to assess data breach risk, informing the insurance company if covered, and documenting all steps taken"}, correct:"c" },

  { s:3, d:2, q:"Which of the following is the correct classification of a ₹45,000 laptop purchase in company accounts?",
    opts:{a:"Capital expenditure — fixed asset (to be depreciated over its useful life)",b:"Operating expense — IT budget",c:"Revenue expenditure — office expenses"}, correct:"a" },

  { s:4, d:1, q:"The monthly admin budget is ₹1,20,000. Actual spend in Month 1 was ₹1,08,400; Month 2 was ₹1,31,700. What is the cumulative variance at end of Month 2?",
    opts:{a:"₹100 under budget",b:"₹100 over budget (spent ₹2,40,100 vs budget ₹2,40,000)",c:"₹11,700 over budget"}, correct:"b" },

  { s:4, d:2, q:"A printing vendor quotes ₹3.50 per page for B&W and ₹12 per page for colour. Last month: 4,200 B&W pages + 380 colour pages. What was the total printing cost?",
    opts:{a:"₹14,700 + ₹4,560 = ₹19,260",b:"₹19,260 (4,200 × ₹3.50 + 380 × ₹12)",c:"₹19,260"}, correct:"b" },

  { s:4, d:2, q:"The office electricity bill is ₹68,400 including 18% GST. What is the pre-GST amount?",
    opts:{a:"₹58,000",b:"₹57,966",c:"₹57,966 (₹68,400 ÷ 1.18)"}, correct:"c" },

  { s:4, d:3, q:"An office manager needs to procure 500 units of a stationery item. Supplier A: ₹42/unit for orders above 200. Supplier B: ₹39/unit with minimum order 600 units. Supplier C: ₹44/unit any quantity. Which supplier gives the lowest total cost for exactly 500 units?",
    opts:{a:"Supplier B: ₹23,400 (600 × ₹39 — must buy minimum 600)",b:"Supplier C: ₹22,000",c:"Supplier A: ₹21,000"}, correct:"c" },

  { s:4, d:1, q:"A corporate travel booking costs ₹28,500 for flight and ₹12,200 for hotel — 3 nights at ₹4,066/night. If the hotel offers a 10% corporate discount not applied at booking, the refund due is:",
    opts:{a:"₹1,220 (10% × ₹12,200)",b:"₹2,850",c:"₹1,220"}, correct:"a" },

  { s:4, d:2, q:"Petty cash float: ₹8,000. Receipts this week: ₹2,340 (courier) + ₹880 (tea supplies) + ₹1,450 (office sundries). Cash on hand: ₹3,380. Is the petty cash in balance?",
    opts:{a:"Yes — ₹3,380 + ₹4,670 receipts = ₹8,050 — ₹50 surplus",b:"No — ₹3,380 + ₹4,670 = ₹8,050 — ₹50 over (possible receipt error or counting error)",c:"Yes — balanced exactly"}, correct:"b" },

  { s:4, d:3, q:"The office pantry is stocked monthly. Usage rate: 45 tea bags/day (25 working days). The supplier's minimum order is 500 units. Lead time: 5 days. Current stock: 180 bags. Today is Day 1 of the month. When should the reorder be placed?",
    opts:{a:"On Day 5",b:"On Day 10",c:"Immediately — 180 bags ÷ 45/day = 4 days stock; with 5-day lead time, order yesterday"}, correct:"c" },

  { s:4, d:2, q:"An admin manager needs to compare two photocopier lease options: Option A: ₹8,500/month for 36 months; Option B: ₹11,200/month for 24 months. What is the total cost of each option?",
    opts:{a:"Option A: ₹3,06,000; Option B: ₹2,68,800",b:"Both a and b are the same correct calculation",c:"Option A: ₹3,06,000; Option B: ₹2,68,800 — Option B is cheaper total"}, correct:"a" },

  { s:4, d:1, q:"An office of 180 employees uses an average of 3 reams of paper per working day. One ream costs ₹320. How much does paper cost per month (22 working days)?",
    opts:{a:"₹21,120 (3 × 22 × ₹320)",b:"₹17,280",c:"₹28,800"}, correct:"a" },

  { s:4, d:3, q:"The admin team processes 240 expense claims per month. The processing cost (admin time, system, approval) is estimated at ₹185 per claim. If a new expense app reduces processing cost to ₹60/claim with a monthly licence fee of ₹8,400, what is the monthly saving?",
    opts:{a:"₹21,600",b:"₹21,600 (240 × ₹125 saving − ₹8,400 = ₹21,600)",c:"₹30,000"}, correct:"b" },

  { s:4, d:2, q:"A 5-year office lease at ₹1,20,000/month has a 10% escalation clause every 2 years. What is the total lease cost over 5 years?",
    opts:{a:"₹75,60,000",b:"₹72,00,000",c:"₹78,24,000 (Y1-2: ₹1,20,000×24; Y3-4: ₹1,32,000×24; Y5: ₹1,45,200×12)"}, correct:"c" },

  { s:4, d:3, q:"The admin budget shows spend of ₹9,84,000 against a full-year budget of ₹14,40,000 at the end of Month 8. Is the department tracking on budget?",
    opts:{a:"Yes — under budget",b:"Yes — ₹9,84,000 ÷ 8 × 12 = ₹14,76,000 projected annual — slightly over budget",c:"No — ₹9,84,000 ÷ 8 × 12 = ₹14,76,000 projected vs ₹14,40,000 budget — tracking ₹36,000 over"}, correct:"c" },

  { s:5, d:1, q:"An email marked 'For Your Information' (FYI) typically requires the recipient to:",
    opts:{a:"Read and be aware of the content — no action or reply is required unless they have something to add",b:"Forward to all team members",c:"Reply immediately with their comments"}, correct:"a" },

  { s:5, d:2, q:"When preparing an executive summary of a vendor evaluation, the document should lead with:",
    opts:{a:"The lowest quoted price",b:"A full list of all vendors approached",c:"The recommendation, the basis for it, and the key differentiating factors — followed by supporting detail in appendices"}, correct:"c" },

  { s:5, d:1, q:"In professional business writing, the most effective structure for a problem-resolution email is:",
    opts:{a:"Greeting → detailed background → problem → resolution → greeting again",b:"State the situation briefly → describe the problem → present the recommended resolution → request approval or action → offer to discuss",c:"Problem → greeting → background → resolution"}, correct:"b" },

  { s:5, d:3, q:"An admin manager is preparing the monthly management report. The report shows a 15% overspend in stationery. The most useful way to present this to management is:",
    opts:{a:"Bury the figure in an appendix",b:"State the figure only and leave interpretation to management",c:"State the figure, the budget, the variance in both absolute (₹) and percentage terms, identify the root cause (e.g. one-off bulk order for new department), note whether it is expected to recur, and confirm action taken"}, correct:"c" },

  { s:5, d:2, q:"The admin team uses a shared document library. A colleague saves a final signed contract in a folder marked 'Drafts'. The correct action is:",
    opts:{a:"Leave it where the colleague saved it",b:"Move the document to the correct 'Executed Contracts' folder, notify the colleague of the move, and update any document register or index",c:"Create a duplicate in the correct folder and leave the original in Drafts"}, correct:"b" },

  { s:5, d:1, q:"'Minutes of meeting' should be circulated to all attendees within what general best-practice timeframe?",
    opts:{a:"Within 24–48 hours of the meeting while the discussions are still fresh and before actions are due",b:"At the next meeting",c:"Within 30 days"}, correct:"a" },

  { s:5, d:3, q:"A senior executive asks the admin manager to prepare a business case for upgrading the office's paper shredding equipment. A proper business case includes:",
    opts:{a:"Only the cost of the new equipment",b:"A photo of the current shredder and a quote for the new one",c:"Description of the problem, current cost and risk, proposed solution with cost, ROI or payback period, non-financial benefits (security, compliance), implementation timeline, and recommendation"}, correct:"c" },

  { s:5, d:2, q:"An admin manager handles a call from a person claiming to be from the IT helpdesk and asking for the office WiFi password. The correct response is:",
    opts:{a:"Provide the password — it's just the helpdesk",b:"Decline to provide credentials over an inbound phone call, offer to call back the IT helpdesk on the official number to verify the request",c:"Provide the password but tell them to change it after"}, correct:"b" },

  { s:5, d:2, q:"When circulating a meeting agenda in advance, best practice requires:",
    opts:{a:"Sending it 5 minutes before the meeting",b:"Sending it at least 24 hours in advance with supporting materials, clear objectives for each agenda item, and time allocations",c:"Distributing it only at the start of the meeting"}, correct:"b" },

  { s:5, d:3, q:"An admin manager is asked to draft a policy on personal use of company vehicles. A well-structured policy should cover:",
    opts:{a:"Only who is allowed to drive company cars",b:"The company's insurance policy number",c:"Who is authorised to use vehicles, permitted purposes, mileage or fuel reimbursement rules, accident reporting obligations, maintenance responsibility, and consequences of misuse"}, correct:"c" },

  { s:5, d:1, q:"'Carbon copy' (CC) in a formal email means:",
    opts:{a:"The named recipients in the CC field receive a copy of the email for their information — they are not the primary action recipients but are kept informed",b:"The email has an attachment",c:"The email is encrypted"}, correct:"a" },

  { s:5, d:2, q:"A professional reference check call for a candidate should cover:",
    opts:{a:"Salary history only",b:"The candidate's personal life and family background",c:"Role, responsibilities, performance level, strengths, areas for development, reliability, reason for leaving and whether the referee would re-employ — all relating to the specific role being filled"}, correct:"c" },
];

/* ══════════════════════════════════════════════════════════════
   CORPORATE FIT-OUTS & PROJECTS — 60 questions
   S1: BOQ, Specification & Tendering (12)
   S2: Project Management & Programme (12)
   S3: Site Supervision & Quality Control (12)
   S4: Contracts, Payments & Change Control (12)
   S5: Regulatory, Compliance & Handover (12)
══════════════════════════════════════════════════════════════ */
const Q_FITOUTS = [
  { s:1, d:1, q:"A BOQ that specifies 'Armstrong Optima Grid 600×600 mineral fibre tiles at ₹185/sq ft including all metal framing, hanger rods and fixings' is superior to 'false ceiling as per design' because:",
    opts:{a:"It defines exactly what is to be supplied and at what rate, enabling accurate comparison of tenders and contractual accountability if quality or price deviates",b:"It reduces the contractor's profit margin",c:"It mentions a brand name which simplifies procurement"}, correct:"a" },

  { s:1, d:2, q:"Three contractors submit tenders for a fit-out. Contractor A: ₹38L. Contractor B: ₹42L. Contractor C: ₹31L. Contractor C's submission includes a note: 'Flooring specification TBC.' What should the project manager do?",
    opts:{a:"Award to Contractor C — the lowest price",b:"Seek clarification from Contractor C on the flooring specification before evaluating their bid — an incomplete BOQ response is not comparable with the others",c:"Average the three bids and use that as the benchmark"}, correct:"b" },

  { s:1, d:1, q:"What does 'CAT A' fit-out mean?",
    opts:{a:"A fit-out approved by Category A architects",b:"A Category A (premium grade) interior finish",c:"A base building fit-out by the landlord covering raised floor, ceiling grid, MEP services to floor plate level, but not occupier-specific finishes or partitions"}, correct:"c" },

  { s:1, d:2, q:"A provisional sum (PS) in a BOQ is used for:",
    opts:{a:"Allowances for items whose full scope or cost cannot be determined at tender stage — to be spent or adjusted as the work is defined",b:"The contractor's profit margin",c:"Items where a definite specification and quantity are agreed upfront"}, correct:"a" },

  { s:1, d:3, q:"During tender analysis for a 10,000 sq ft office fit-out, one contractor's rate for partition walls is 40% below the other two tenders. The most appropriate response is:",
    opts:{a:"Accept the rate at face value — competition produces genuine savings",b:"Award the wall work to this contractor and the rest to the others",c:"Request a detailed breakdown of the partition wall rate from this contractor — a significantly below-market rate may indicate specification non-compliance, an error, or unsustainable margin that will lead to disputes or quality shortfalls during execution"}, correct:"c" },

  { s:1, d:1, q:"In a fit-out tendering process, a 'bill of quantities' differs from a 'schedule of rates' in that:",
    opts:{a:"A BOQ itemises quantities and rates for every scope element to give a priced total; a schedule of rates lists unit rates only without quantities",b:"They are identical documents",c:"A schedule of rates is used for renovations; a BOQ is used for new fit-outs"}, correct:"a" },

  { s:1, d:3, q:"A client is considering three flooring options: Option A: vinyl at ₹95/sq ft; Option B: carpet tile at ₹125/sq ft; Option C: polished concrete at ₹180/sq ft. The office is 8,000 sq ft. Lifecycle cost analysis should also consider:",
    opts:{a:"The colour preferences of the senior management team",b:"Installation cost, maintenance cost (cleaning, replacement frequency), durability in the specific use zone, acoustic properties and any downtime for future replacement",c:"The cost difference alone — cheapest upfront is cheapest overall"}, correct:"b" },

  { s:1, d:2, q:"A client wants to include a 10% contingency in the project budget. On a base project cost of ₹65,00,000, what is the total budget including contingency?",
    opts:{a:"₹6,50,000",b:"₹71,50,000 (₹65L × 1.10)",c:"₹75,00,000"}, correct:"b" },

  { s:1, d:2, q:"The tender evaluation matrix for a fit-out contractor typically weights which factors?",
    opts:{a:"Price and the contractor's brand reputation",b:"Price only — the lowest compliant bid wins",c:"Price, technical capability and methodology, past project references, financial stability, compliance track record and proposed team — weighted by predetermined criteria"}, correct:"c" },

  { s:1, d:3, q:"A contractor submits a tender that is 28% above the client's budget. Rather than simply rejecting it, the project manager should:",
    opts:{a:"Conduct a value engineering session with the contractor to identify where specification can be revised without compromising function, quantify the savings from each change, and assess whether the revised scope meets the client's operational requirements",b:"Abandon the project and retest the market in 6 months",c:"Ask the contractor to reduce their price by 28% without scope discussion"}, correct:"a" },

  { s:1, d:1, q:"Pre-bid clarification meetings (or 'site visits' for tendering contractors) are held to:",
    opts:{a:"Give all tendering contractors equal access to the site conditions, enable them to ask questions about the specification, and ensure all receive the same information through formal addenda",b:"Select the preferred contractor informally before the tender is issued",c:"Allow contractors to meet the client's CEO"}, correct:"a" },

  { s:1, d:2, q:"A fit-out project has a base contract value of ₹48,00,000. The contractor has completed 65% of work based on the project manager's assessment. How much should the client have paid if payment terms are monthly based on certified completion?",
    opts:{a:"₹48,00,000",b:"₹31,20,000 (65% × ₹48L) less any retention held",c:"Whatever the contractor has invoiced"}, correct:"b" },

  { s:2, d:1, q:"The 'critical path' in a fit-out programme is:",
    opts:{a:"The longest sequence of dependent tasks that determines the minimum project duration — any delay on this path delays the entire project",b:"The path the site manager walks during inspection",c:"The most expensive sequence of tasks"}, correct:"a" },

  { s:2, d:2, q:"A fit-out programme shows MEP rough-in must complete before false ceiling can start. MEP rough-in is running 5 days late. What is the impact on the project?",
    opts:{a:"None — the ceiling team can start in parallel",b:"The false ceiling start date moves back by at least 5 days, and if false ceiling is on the critical path, the project completion date moves by the same amount",c:"The MEP contractor pays a penalty and the programme recovers automatically"}, correct:"b" },

  { s:2, d:1, q:"A Gantt chart in project management is used to:",
    opts:{a:"Manage the contractor's invoice submissions",b:"Track material costs against budget",c:"Visually represent the project schedule — showing tasks, their durations, dependencies and the planned vs actual timeline"}, correct:"c" },

  { s:2, d:3, q:"The project is 3 weeks from handover. The contractor informs the PM that the glass partitions will arrive 10 days late due to the supplier. The PM's options include:",
    opts:{a:"Immediately assess the criticality of the delay: explore alternative suppliers, whether temporary solutions enable other work to continue, negotiate recovery programme with the contractor, quantify the impact, inform the client with options and their cost/time implications, and obtain a client decision",b:"Terminate the contractor and find a new partition supplier",c:"Accept the delay and inform the client only at handover"}, correct:"a" },

  { s:2, d:2, q:"'Float' or 'slack' in a project programme refers to:",
    opts:{a:"The amount of time a non-critical task can be delayed without affecting the overall project completion date",b:"The time allocated for snagging",c:"The contractor's profit margin"}, correct:"a" },

  { s:2, d:3, q:"A fit-out PM is managing three concurrent projects. Project A is on critical path with handover in 10 days; Project B has a 3-week float; Project C has a minor electrical snag outstanding. Where should the PM focus primary attention this week?",
    opts:{a:"Project C — snagging must be resolved first",b:"Project A — it is on critical path with the imminent handover; delegating or scheduling Project C's snag resolution and deferring non-critical Project B attention until A is delivered",c:"Split equally across all three"}, correct:"b" },

  { s:2, d:1, q:"A 'resource histogram' in project planning shows:",
    opts:{a:"The financial cost of materials over time",b:"The number of workers or units of resource required each day or week across the project duration",c:"The height of ceilings in each zone"}, correct:"b" },

  { s:2, d:2, q:"The project manager wants to compress the programme by 2 weeks. The most common techniques for programme compression are:",
    opts:{a:"Working on weekends only",b:"Reducing the scope of work and materials specification",c:"Crashing (adding resources to critical path activities to reduce their duration) and fast-tracking (overlapping phases that would normally be sequential) — both have cost or risk implications"}, correct:"c" },

  { s:2, d:3, q:"A fit-out project for a 15,000 sq ft office is 6 weeks into a 16-week programme. 35% of the work is complete against a planned 40%. What is the schedule performance, and what should the PM do?",
    opts:{a:"Issue a penalty notice to the contractor immediately",b:"Project is on track — 35% vs 40% is a minor variance",c:"Project is 5 percentage points behind schedule — PM should identify the activities causing the lag, assess whether they are on the critical path, prepare a recovery plan with specific actions and dates, and update the client"}, correct:"c" },

  { s:2, d:2, q:"Which meeting is most critical in the week before a fit-out handover?",
    opts:{a:"A team social event to celebrate completion",b:"A formal pre-handover walkthrough with the client, contractor and PM to inspect all spaces against the specification, identify outstanding snags, agree the snag list, and confirm the handover date and process",c:"A commercial meeting to finalise the final account"}, correct:"b" },

  { s:2, d:1, q:"'Day-one readiness' for a fit-out handover means:",
    opts:{a:"All systems are operational (power, data, HVAC, access control, fire safety), all snags are resolved, clean and handed over with full documentation — the occupier can start operations without further work",b:"At least 80% of the scope is complete",c:"The space looks aesthetically complete for photography"}, correct:"a" },

  { s:2, d:3, q:"A client requests a change that would add ₹4,80,000 to the project cost and push the programme by 8 days. The correct PM response is:",
    opts:{a:"Absorb the cost in the contingency without informing the client",b:"Instruct the contractor to proceed immediately to maintain client relationship",c:"Issue a formal change order documenting the scope addition, cost impact, programme impact and client approval — only instruct the contractor to proceed after the client has signed the change order"}, correct:"c" },

  { s:3, d:1, q:"A site supervisor's daily log (site diary) should record:",
    opts:{a:"Only the contractor's daily progress claim",b:"Only incidents and accidents",c:"Weather conditions, workers on site, work completed, materials delivered, instructions given, visitors, issues raised and any deviations from the programme"}, correct:"c" },

  { s:3, d:2, q:"The supervisory ratio on a fit-out site — the number of qualified supervisors per labourer — is significant because:",
    opts:{a:"It is a labour department regulatory requirement",b:"A higher supervisor ratio increases the contractor's labour costs",c:"It is the single strongest predictor of quality — inadequate supervision leads to rework, specification non-compliance and safety incidents"}, correct:"c" },

  { s:3, d:1, q:"A 'material approval' process in fit-out requires the contractor to submit:",
    opts:{a:"A sample or data sheet of the proposed material for the PM/client to verify it meets the agreed specification before procurement and installation",b:"The manufacturer's ISO certificate",c:"The delivery challan from the supplier"}, correct:"a" },

  { s:3, d:3, q:"During a site inspection, the PM notices that the electrical conduits are running through a wall cavity that also carries the HVAC duct — creating a potential future maintenance access problem. What action should the PM take?",
    opts:{a:"Note it and raise it at the next weekly meeting",b:"Raise a non-conformance notice immediately, instruct the contractor to pause the affected work, discuss the issue with the MEP consultant and agree a revised routing, and document the resolution",c:"Accept it since both systems are functional"}, correct:"b" },

  { s:3, d:2, q:"Concrete/screed is poured on a floor. The contractor proposes to start tiling the next day. The PM should:",
    opts:{a:"Leave the decision to the tiling contractor",b:"Approve — the floor looks dry",c:"Check the concrete/screed manufacturer's specification for minimum curing time before traffic and tiling — typically 24–72 hours or longer depending on the product — and only approve tiling when the specified period has elapsed and moisture readings are acceptable"}, correct:"c" },

  { s:3, d:1, q:"A RACI matrix in a fit-out project defines for each task who is:",
    opts:{a:"Ranked, Assigned, Completed and Inspected",b:"Registered, Accounted, Contracted and Insured",c:"Responsible (does the work), Accountable (owns the outcome), Consulted (provides input) and Informed (receives updates)"}, correct:"c" },

  { s:3, d:3, q:"A client's IT team is installing server racks in the new office while the fit-out is still under construction. The PM's obligation is to:",
    opts:{a:"Ensure the IT team adheres to the site's safety protocols (PPE, induction, hot work permits if applicable), coordinate the timing to avoid interference with construction activities, and document any damage they cause",b:"Stop the IT team entirely until handover",c:"Allow IT to proceed — it's their space"}, correct:"a" },

  { s:3, d:2, q:"A 'mock-up' or 'sample bay' on a fit-out project is constructed to:",
    opts:{a:"Show the client a decorative feature",b:"Allow the client to review and approve the quality and appearance of key elements (partition system, ceiling, flooring, lighting) before they are installed throughout the entire space",c:"Test the structural integrity of the building"}, correct:"b" },

  { s:3, d:2, q:"Hot work (welding, cutting, grinding) on a fit-out site requires:",
    opts:{a:"A hot work permit specifying the location, duration, responsible person, fire precautions in place (fire extinguisher, fire watch, clearance of combustibles) and time-limited validity",b:"Approval from the client CEO",c:"Only verbal instruction from the site manager"}, correct:"a" },

  { s:3, d:3, q:"A PM conducting a quality inspection discovers that plasterboard partition walls have been installed without the specified acoustic insulation between the studs. The partitions are already primed and ready for painting. The correct action is:",
    opts:{a:"Accept as is — the visual finish is correct",b:"Raise a non-conformance notice, require the contractor to open the partition in representative sections to confirm the deficiency, and require full remediation at the contractor's cost — even if this delays the programme",c:"Ask the contractor to provide a letter confirming the insulation was fitted"}, correct:"b" },

  { s:3, d:1, q:"'Practical completion' in a fit-out contract means:",
    opts:{a:"The contractor has submitted their final invoice",b:"The project is 100% complete with no outstanding items",c:"The works are substantially complete — the space can be occupied — with only minor snagging items outstanding that do not prevent occupation, to be resolved within an agreed period"}, correct:"c" },

  { s:3, d:2, q:"An independent project manager's primary value to a client in a fit-out is:",
    opts:{a:"To protect the client's interests by providing objective oversight of the contractor's scope compliance, cost control, programme management and quality, acting independently of the contractor",b:"To reduce the number of consultants on the project",c:"To replace the architect and engineer"}, correct:"a" },

  { s:4, d:1, q:"A lump-sum (fixed price) fit-out contract means:",
    opts:{a:"Payment is made in a lump sum at completion",b:"The client pays whatever the work costs",c:"The contractor agrees to deliver the defined scope for a fixed total price — cost overruns within the agreed scope are the contractor's risk"}, correct:"c" },

  { s:4, d:2, q:"Retention money in a construction/fit-out contract is:",
    opts:{a:"The contractor's profit margin withheld by the PM",b:"A percentage (typically 5–10%) of each payment withheld by the client until practical completion, and a further portion until the end of the defect liability period, incentivising the contractor to resolve snagging",c:"A deposit paid by the client before work begins"}, correct:"b" },

  { s:4, d:1, q:"A variation order (VO) or change order must be raised when:",
    opts:{a:"Any change to the original approved scope, specification or programme is requested — regardless of size",b:"Only when the change costs more than ₹1,00,000",c:"Only when the client requests a change, not when the contractor identifies a design issue"}, correct:"a" },

  { s:4, d:3, q:"A contractor performs additional work claiming it was necessary but has no signed change order. At final account stage, they submit a claim for ₹3,20,000 for this work. The PM's position is:",
    opts:{a:"Pay in full — the work was done",b:"Review whether the work was genuinely within or outside the agreed scope. If outside, assess whether a verbal instruction was given and by whom. If no authorised instruction existed, the claim may be rejected or negotiated on goodwill — document the position clearly and refer to the contract's variation clause",c:"Refuse entirely and offer no comment"}, correct:"b" },

  { s:4, d:2, q:"A 'back-to-back' contractual arrangement between a main contractor and subcontractor means:",
    opts:{a:"The subcontractor works on the back of the building",b:"The subcontractor's contractual terms mirror those of the main contractor with the client — so the subcontractor bears the same obligations, standards and risks proportionate to their scope",c:"Both parties sign simultaneously"}, correct:"b" },

  { s:4, d:1, q:"Milestone-based payment terms benefit the client because:",
    opts:{a:"They simplify the contractor's cash flow",b:"They pay less in total",c:"Payments are linked to verified completion of defined project stages, preserving the client's financial leverage and incentivising the contractor to maintain programme"}, correct:"c" },

  { s:4, d:3, q:"The project is 4 weeks from completion. The contractor requests ₹12,00,000 as an advance against the final milestone to pay for materials. The correct PM response is:",
    opts:{a:"Assess the request against the contract terms — most fixed-price contracts do not permit advance payments against future milestones. If the contract allows it, require documentation of the specific materials needed, consider a direct-to-supplier payment, and ensure the advance is deducted from the subsequent milestone payment",b:"Refuse and cite that it is not the client's problem",c:"Pay immediately to ensure materials arrive on time"}, correct:"a" },

  { s:4, d:2, q:"A defect liability period (DLP) in a fit-out contract typically runs for:",
    opts:{a:"6 to 12 months from practical completion — during which the contractor must return to repair any defects that emerge from their workmanship at no additional cost",b:"The full lifetime of the fit-out",c:"30 days from practical completion"}, correct:"a" },

  { s:4, d:2, q:"The final account in a fit-out project represents:",
    opts:{a:"The client's record of total project spend",b:"The last invoice submitted by the contractor",c:"The agreed final contract sum after all variations, adjustments, abatements for defects and other contractual adjustments have been reconciled and agreed by both parties"}, correct:"c" },

  { s:4, d:3, q:"A contractor threatens to stop work unless they receive immediate payment of an invoice that is disputed by the PM. The PM's correct response is:",
    opts:{a:"Pay immediately to keep work moving",b:"Refer to the contract's dispute resolution clause, continue to withhold the disputed amount with a written explanation of the grounds for dispute, and seek legal advice if the contractor stops work — document everything",c:"Call the contractor's bluff and ignore the threat"}, correct:"b" },

  { s:4, d:1, q:"An 'as-built drawing' is produced at project completion to:",
    opts:{a:"Show the design intent as originally drawn",b:"Record the actual installed positions of all elements (MEP routes, structural modifications, partitions) as constructed — a critical document for future maintenance and renovation",c:"Fulfil a regulatory requirement for building permit closure"}, correct:"b" },

  { s:4, d:2, q:"Liquidated damages (LD) in a fit-out contract are:",
    opts:{a:"General damages available in court",b:"A penalty imposed by the contractor on the client for late decisions",c:"A pre-agreed sum per day of delay, payable by the contractor if they fail to complete by the contracted date — the amount is agreed at contract signing, not assessed after the fact"}, correct:"c" },

  { s:5, d:2, q:"A heritage-designated building in Delhi requires fit-out modifications. The PM must obtain approval from:",
    opts:{a:"The Archaeological Survey of India (ASI), INTACH, or the relevant heritage authority — depending on the designation level — and potentially NDMC/MCD for structural changes",b:"The local municipal ward office only",c:"Only the landlord"}, correct:"a" },

  { s:5, d:1, q:"A 'completion certificate' for a fit-out is issued by:",
    opts:{a:"The relevant authority (municipal, fire, electrical inspection) certifying that the works comply with applicable regulations — different from the PM's practical completion sign-off",b:"The architect at design stage",c:"The contractor upon completing the work"}, correct:"a" },

  { s:5, d:2, q:"The National Building Code of India (NBC) is relevant to fit-out projects primarily because:",
    opts:{a:"It sets minimum standards for fire safety, structural integrity, accessibility, electrical installations and occupant safety that all fit-out works must comply with",b:"It is only relevant to new building construction, not interior fit-outs",c:"It specifies the approved colours for office interiors"}, correct:"a" },

  { s:5, d:3, q:"A fit-out PM discovers mid-project that the office building does not have a valid occupancy certificate (OC) from the municipal authority. The implication is:",
    opts:{a:"No implication — OC only matters when a new building is first occupied",b:"Significant — an invalid OC means the building may not legally be occupied for commercial purposes; the PM should immediately raise this with the client and their legal counsel, as it affects insurance, regulatory risk and the legality of the fit-out itself",c:"The fit-out cannot proceed until the OC is obtained — work must stop"}, correct:"b" },

  { s:5, d:2, q:"Fire NOC (No Objection Certificate) for an office fit-out is issued by:",
    opts:{a:"The building architect",b:"The local fire department following inspection of the fire safety systems, fire exits, suppression systems and compliance with fire code requirements",c:"The Ministry of Home Affairs"}, correct:"b" },

  { s:5, d:1, q:"The 'snagging list' is issued:",
    opts:{a:"Six months after handover",b:"At project inception to define scope",c:"At or near practical completion — following a joint inspection — listing all defects, incomplete items and non-conformities that must be rectified before or shortly after handover"}, correct:"c" },

  { s:5, d:3, q:"An office fit-out includes a large diesel generator (DG) set. The regulatory requirements for DG installation in a commercial building include:",
    opts:{a:"Only the landlord's written permission",b:"Only earthing and electrical connection approval",c:"Pollution Control Board consent (NOC for DG above certain capacity), noise compliance, proper exhaust routing, fuel storage in approved containers, and fire safety clearance from the local fire authority"}, correct:"c" },

  { s:5, d:2, q:"A 'handover pack' from the contractor at project completion should include:",
    opts:{a:"The contractor's final invoice and company profile",b:"As-built drawings, equipment warranties and manuals, test and commissioning certificates, completed snag list, spare parts (where applicable), health and safety file, and any statutory completion certificates obtained",c:"The PM's project report only"}, correct:"b" },

  { s:5, d:2, q:"During a post-handover defect liability period, the client reports that the false ceiling in one zone is sagging. The contractor's obligation is:",
    opts:{a:"Inspect urgently, determine if the sag poses a safety risk (and act immediately if it does), and rectify the defect at the contractor's cost within the agreed DLP response time",b:"Ask the client to obtain a separate maintenance quote",c:"Inspect at their next convenient site visit"}, correct:"a" },

  { s:5, d:3, q:"A multinational company is fitting out a new GCC office in Gurugram. The fit-out must comply with the global company's 'workplace standards'. The PM's obligation is to:",
    opts:{a:"Follow only Indian building code and ignore global standards",b:"Identify any conflicts between the global workplace standards and Indian building code requirements, resolve them with the client and their global workplace team, and ensure the fit-out satisfies the more stringent of the two applicable standards in each case",c:"Follow global standards only — they override local law"}, correct:"b" },

  { s:5, d:2, q:"CPCB (Central Pollution Control Board) guidelines are relevant to a fit-out project if:",
    opts:{a:"Only if the project is in Delhi",b:"The building is in a declared eco-sensitive zone",c:"The fit-out involves activities such as large DG sets (above the prescribed KVA threshold), paint spray operations with VOC emissions, or waste generation above regulated thresholds"}, correct:"c" },

  { s:5, d:3, q:"Following handover of a 20,000 sq ft fit-out, the client discovers that the data cabling does not meet the Cat 6 specification agreed in the contract — Cat 5e was installed throughout. The client's recourse is:",
    opts:{a:"Negotiate a partial discount and accept",b:"Accept the installation since both standards support network connectivity",c:"Issue a formal defect notice requiring full rectification to the specified Cat 6 standard at the contractor's cost, and seek legal advice if the contractor resists — this is a clear specification breach regardless of functional similarity"}, correct:"c" },
];

/* ══════════════════════════════════════════════════════════════
   SPREADSHEET PROFICIENCY — 60 questions
   S1: Formula Knowledge (12)
   S2: Data Management & Features (12)
   S3: Lookup & Reference (12)
   S4: Scenario Application — FM/HR/Admin Context (12)
   S5: Errors, Audit & Best Practice (12)
══════════════════════════════════════════════════════════════ */
const Q_SPREADSHEET = [
  { s:1, d:1, q:"Which formula returns the total of cells A1 through A10?",
    opts:{a:"=SUM(A1:A10)",b:"=TOTAL(A1:A10)",c:"=SUM(A1,A10)"}, correct:"a" },

  { s:1, d:1, q:"The formula =AVERAGE(B2:B20) will:",
    opts:{a:"Count the number of cells in B2:B20",b:"Add all values in B2:B20",c:"Return the arithmetic mean of all values in B2:B20"}, correct:"c" },

  { s:1, d:1, q:"=COUNTA(A1:A50) counts:",
    opts:{a:"Only cells containing text",b:"Only numeric values in the range",c:"All non-empty cells in the range regardless of content type"}, correct:"c" },

  { s:1, d:2, q:"A formula reads: =IF(C5>100,'Over','OK'). What does it return when C5 is 85?",
    opts:{a:"'OK' — the condition C5>100 is false so the else value is returned",b:"An error",c:"'Over' because 85 is close to 100"}, correct:"a" },

  { s:1, d:2, q:"=COUNTIF(B2:B50,'Absent') will:",
    opts:{a:"Sum all cells where the value is Absent",b:"Count how many cells in B2:B50 contain exactly 'Absent'",c:"Replace all Absent values with a count"}, correct:"b" },

  { s:1, d:2, q:"=SUMIF(C2:C100,'Housekeeping',D2:D100) does which of the following?",
    opts:{a:"Totals the values in D2:D100 where the corresponding cell in C2:C100 equals 'Housekeeping'",b:"Finds the average of D2:D100 for Housekeeping rows",c:"Counts rows where C equals Housekeeping"}, correct:"a" },

  { s:1, d:2, q:"Which formula correctly returns 'High' if A1 exceeds 80, 'Medium' if A1 exceeds 50, otherwise 'Low'?",
    opts:{a:"=IF(A1>80,'High',A1>50,'Medium','Low')",b:"=IFELSE(A1>80,'High',A1>50,'Medium','Low')",c:"=IF(A1>80,'High',IF(A1>50,'Medium','Low'))"}, correct:"c" },

  { s:1, d:2, q:"=IFERROR(VLOOKUP(A2,D:E,2,FALSE),'Not Found') will:",
    opts:{a:"Always return 'Not Found'",b:"Return the VLOOKUP result if it succeeds, or 'Not Found' if the lookup produces any error",c:"Return an error if the VLOOKUP fails"}, correct:"b" },

  { s:1, d:2, q:"What does =LEN(A1) return?",
    opts:{a:"The numeric value in A1",b:"The number of characters in the text string in A1",c:"The column width of column A"}, correct:"b" },

  { s:1, d:3, q:"=SUMPRODUCT((A2:A50='FM')*(B2:B50)) does what?",
    opts:{a:"Multiplies all values in A2:A50 by B2:B50",b:"Sums the values in B2:B50 only where the corresponding A cell equals 'FM' — a SUMIF alternative using array logic",c:"Returns an error — SUMPRODUCT cannot use text comparisons"}, correct:"b" },

  { s:1, d:3, q:"The formula =TEXT(TODAY(),'DD-MMM-YYYY') returns:",
    opts:{a:"The number of days since 1 January 1900",b:"The word TODAY",c:"Today's date formatted as day-month abbreviation-year (e.g. 21-Mar-2026)"}, correct:"c" },

  { s:1, d:3, q:"=UNIQUE(A2:A100) is available in which spreadsheet versions?",
    opts:{a:"Excel 365 / Excel 2021 and Google Sheets — it returns a list with duplicates removed from the range",b:"Google Sheets only",c:"All versions of Excel since 2007"}, correct:"a" },

  { s:2, d:1, q:"To see only rows where a column value equals 'Pending' without deleting other data, you use:",
    opts:{a:"Sort the column alphabetically",b:"Find and Replace",c:"AutoFilter — set a filter on the column for the value 'Pending'"}, correct:"c" },

  { s:2, d:1, q:"'Freeze Panes' in Excel/Sheets is used to:",
    opts:{a:"Keep selected rows or columns visible on screen while you scroll through the rest of the data",b:"Prevent the workbook from being saved",c:"Lock specific cells so they cannot be edited"}, correct:"a" },

  { s:2, d:1, q:"A pivot table is used to:",
    opts:{a:"Create a chart from raw data",b:"Insert a table of mathematical constants",c:"Summarise and analyse large datasets by grouping, counting, summing or averaging data by categories without writing formulas"}, correct:"c" },

  { s:2, d:2, q:"Data Validation in Excel/Sheets allows you to:",
    opts:{a:"Restrict what values can be entered in a cell — e.g. a dropdown list, a number range or a date range",b:"Validate that all cells in a column have the same formula",c:"Check whether the workbook contains any formula errors"}, correct:"a" },

  { s:2, d:2, q:"Conditional Formatting is used to:",
    opts:{a:"Format cells only if they contain formulas",b:"Automatically apply colours, icons or data bars to cells based on their value or a formula — without any manual formatting",c:"Copy formatting from one range to another"}, correct:"b" },

  { s:2, d:2, q:"You have 500 rows of employee data and need to find all duplicate email addresses. The quickest built-in approach in Excel is:",
    opts:{a:"Manually scan each row",b:"Home → Conditional Formatting → Highlight Cell Rules → Duplicate Values on the email column",c:"Sort the column and look for matches visually"}, correct:"b" },

  { s:2, d:2, q:"'Named Ranges' in a spreadsheet allow you to:",
    opts:{a:"Name a column header automatically",b:"Rename the spreadsheet tab",c:"Assign a descriptive name to a cell or range (e.g. MonthlyBudget) and use it in formulas — making formulas more readable and portable"}, correct:"c" },

  { s:2, d:2, q:"What does 'Text to Columns' (Data menu) do?",
    opts:{a:"Concatenates multiple columns into one",b:"Converts numbers to text format",c:"Splits text in a single column into multiple columns based on a delimiter such as a comma, tab or space"}, correct:"c" },

  { s:2, d:3, q:"You need to sort a list of 300 vendor invoices by date (oldest first) then by amount (largest first) within the same date. The correct approach is:",
    opts:{a:"Data → Sort → Add Level: first sort by Date (Ascending), second level sort by Amount (Descending) — Excel/Sheets applies levels in order",b:"Sort by date only then manually reorder amounts within each date",c:"Sort twice — once by amount then once by date"}, correct:"a" },

  { s:2, d:3, q:"A pivot table shows 'Sum of Amount' but you want it to show the average instead. You:",
    opts:{a:"Create a new column in the source data with the average formula",b:"In the pivot table, click the field → Value Field Settings → change Sum to Average",c:"Divide the sum column by the count column manually outside the pivot"}, correct:"b" },

  { s:2, d:3, q:"You want a dropdown list in D2 where options come from a range A1:A10 on a sheet called 'Lists'. The Data Validation source is:",
    opts:{a:"=A1:A10",b:"=Lists!A1:A10",c:"INDIRECT('Lists!A1:A10')"}, correct:"b" },

  { s:2, d:3, q:"You need to extract only unique values from a column of 200 entries in older Excel (pre-365) without a formula. The correct approach is:",
    opts:{a:"Use VLOOKUP to identify duplicates",b:"Manually delete duplicates one by one",c:"Data → Remove Duplicates — select the column and Excel removes duplicate rows keeping the first occurrence"}, correct:"c" },

  { s:3, d:1, q:"=VLOOKUP(A2,D:F,2,FALSE) looks up the value in A2 in which column?",
    opts:{a:"The first column of the range D:F, which is column D",b:"Column E",c:"Column F"}, correct:"a" },

  { s:3, d:1, q:"In a VLOOKUP, the third argument (col_index_num) specifies:",
    opts:{a:"Which column number within the lookup range to return the result from — counted from the leftmost column of the range",b:"Whether the lookup is approximate or exact",c:"How many rows to search"}, correct:"a" },

  { s:3, d:1, q:"The fourth argument of VLOOKUP should be FALSE (or 0) when you need:",
    opts:{a:"The lookup to ignore blank cells",b:"An approximate match — suitable for numeric ranges like tax brackets",c:"An exact match — the most common requirement for looking up IDs, names or codes"}, correct:"c" },

  { s:3, d:2, q:"VLOOKUP can only look up values where the lookup column is:",
    opts:{a:"In any position within the table",b:"The leftmost column of the lookup range — this is its key limitation compared to INDEX/MATCH",c:"In the rightmost column of the table"}, correct:"b" },

  { s:3, d:2, q:"=HLOOKUP(A1,B1:F3,2,FALSE) differs from VLOOKUP in that:",
    opts:{a:"It searches horizontally across rows instead of vertically down columns",b:"It only works with text values",c:"It returns the first matching value regardless of position"}, correct:"a" },

  { s:3, d:2, q:"=INDEX(B2:B100,MATCH('Amit',A2:A100,0)) does what?",
    opts:{a:"Finds Amit in column A and returns the value from the corresponding row in column B — equivalent to a VLOOKUP that can look left",b:"Returns the row number where Amit appears",c:"Counts how many times Amit appears in A2:A100"}, correct:"a" },

  { s:3, d:2, q:"The MATCH function returns:",
    opts:{a:"The value at the matched position",b:"The relative position (row or column number) of a value within a range",c:"TRUE or FALSE depending on whether the value is found"}, correct:"b" },

  { s:3, d:3, q:"Employee ID is in A2. Employee data is on sheet 'HR' with IDs in column C and names in column A. VLOOKUP cannot solve this (data is to the left). The correct formula is:",
    opts:{a:"=HLOOKUP(A2,HR!A:C,1,FALSE)",b:"=VLOOKUP(A2,HR!A:C,3,FALSE)",c:"=INDEX(HR!A:A,MATCH(A2,HR!C:C,0))"}, correct:"c" },

  { s:3, d:3, q:"In =XLOOKUP(A2,D2:D100,E2:E100,'Not Found'), the fourth argument 'Not Found' specifies:",
    opts:{a:"The value to return if no match is found — XLOOKUP's built-in alternative to wrapping in IFERROR",b:"The match mode",c:"The column to search in"}, correct:"a" },

  { s:3, d:2, q:"An INDIRECT formula like =INDIRECT('Sheet'&B1&'!A1') is useful for:",
    opts:{a:"Protecting a sheet from editing",b:"Dynamically building a cell reference using text — so changing B1 changes which sheet is referenced",c:"Looking up a value across multiple tables"}, correct:"b" },

  { s:3, d:3, q:"A VLOOKUP returns #N/A for a name that clearly exists in the lookup table. The most likely cause is:",
    opts:{a:"The name is too long for VLOOKUP to handle",b:"VLOOKUP does not work with names",c:"A leading/trailing space, inconsistent capitalisation or a non-printing character in either the lookup value or the table — use TRIM() and check exact formatting"}, correct:"c" },

  { s:3, d:3, q:"=COUNTIFS(A2:A100,'FM',B2:B100,'>50') counts rows where:",
    opts:{a:"A equals FM OR B is greater than 50",b:"A equals FM AND B is greater than 50 — COUNTIFS applies all conditions simultaneously",c:"Either condition is true"}, correct:"b" },

  { s:4, d:1, q:"Attendance sheet: col A names, col B days present, col C total working days. Formula for attendance % in D2:",
    opts:{a:"=B2/C2*100",b:"=AVERAGE(B2,C2)",c:"=B2-C2"}, correct:"a" },

  { s:4, d:2, q:"Vendor invoice tracker: 300 rows, col E shows Payment Status (Paid/Unpaid), col D has amounts. Total of Unpaid invoices:",
    opts:{a:"=SUMIF(E2:E301,'Unpaid',D2:D301)",b:"=COUNTIF(E2:E301,'Unpaid')",c:"=SUM(D2:D301)"}, correct:"a" },

  { s:4, d:2, q:"FM consumables tracker: Opening Stock B2, Received C2, Used D2. Closing Stock E2. Formula in F2 to show 'Reorder' if Closing Stock is below 20:",
    opts:{a:"=IF(E2=20,'Reorder','')",b:"=IF(E2>20,'Reorder','')",c:"=IF(E2<20,'Reorder','')"}, correct:"c" },

  { s:4, d:2, q:"Payroll sheet: Basic salary in col B. PF is 12% of basic. Formula in D2 for PF deduction:",
    opts:{a:"=B2/12",b:"=B2*12",c:"=B2*12%"}, correct:"c" },

  { s:4, d:3, q:"PPM schedule: last service date in C2, frequency in months in D2. Formula in E2 for next due date:",
    opts:{a:"=C2+D2",b:"=EDATE(C2,D2)",c:"=C2*D2"}, correct:"b" },

  { s:4, d:2, q:"HR leave tracker: full dates in col A. Formula to show the month name (e.g. March) in col B:",
    opts:{a:"=MONTH(A2)",b:"=TEXT(A2,'MMMM')",c:"=LEFT(A2,3)"}, correct:"b" },

  { s:4, d:3, q:"SLA dashboard: response times in col B (minutes). SLA threshold: 60 minutes. Data in B2:B101. Formula for % resolved within SLA:",
    opts:{a:"=COUNTIF(B2:B101,'<=60')/COUNT(B2:B101)*100",b:"=SUM(B2:B101)/60",c:"=COUNTIF(B2:B101,'<60')/100*100"}, correct:"a" },

  { s:4, d:2, q:"Security guard sheet: shift start in col B, shift end in col C (time values). Formula for hours worked in D2:",
    opts:{a:"=(C2-B2)*24",b:"=HOUR(C2)-HOUR(B2)",c:"=C2-B2"}, correct:"a" },

  { s:4, d:3, q:"Monthly sheets named Jan, Feb...Dec with totals in B52. Summary sheet pulls each month dynamically where A2 contains 'Jan'. Formula in B2:",
    opts:{a:"=Jan!B52",b:"=INDIRECT(A2&'!B52')",c:"=VLOOKUP(A2,Jan:Dec,52,FALSE)"}, correct:"b" },

  { s:4, d:2, q:"Housekeeping inspection scores: areas in col A, scores in col B. Auto-highlight areas below 75% in red. You use:",
    opts:{a:"Sort by score and manually colour the bottom rows",b:"Find and Replace to colour matching cells",c:"Conditional Formatting: cell value less than 75 → fill red"}, correct:"c" },

  { s:4, d:3, q:"FM cost report: 8 cost categories in rows, 12 months in columns B:M, data in B2:M9. To find which month had the highest total, the best approach is:",
    opts:{a:"=VLOOKUP(MAX(B2:M9),B1:M9,1,FALSE)",b:"=MAX(B2:M9)",c:"Add a totals row summing each column (=SUM(B2:B9) etc), then use INDEX/MATCH or look up the maximum in that totals row to find the month header"}, correct:"c" },

  { s:4, d:2, q:"Vendor list received as CSV with all data in col A, comma-separated. To split into separate columns:",
    opts:{a:"Find and Replace commas with spaces",b:"Data → Text to Columns → Delimited → Comma",c:"SPLIT function on every row manually"}, correct:"b" },

  { s:5, d:1, q:"A cell shows #DIV/0!. This error means:",
    opts:{a:"The formula references a deleted cell",b:"The formula is attempting to divide by zero or by an empty cell",c:"The value in the cell is too large to display"}, correct:"b" },

  { s:5, d:1, q:"A cell shows #REF!. This most commonly occurs when:",
    opts:{a:"The formula uses the wrong function name",b:"The cell contains a circular reference",c:"A formula references a cell that has been deleted or moved outside a valid range"}, correct:"c" },

  { s:5, d:1, q:"A cell shows #N/A in a VLOOKUP. This typically means:",
    opts:{a:"The lookup value was not found in the lookup range",b:"The column index number is out of range",c:"The formula syntax is incorrect"}, correct:"a" },

  { s:5, d:2, q:"A cell shows #VALUE!. This error indicates:",
    opts:{a:"The formula is referencing a locked cell",b:"The formula is using the wrong data type — for example, trying to do arithmetic on a cell containing text",c:"The cell value exceeds the maximum number Excel can display"}, correct:"b" },

  { s:5, d:2, q:"Excel shows a green triangle in the top-left corner of a cell. This means:",
    opts:{a:"The cell contains a comment",b:"The cell is protected and cannot be edited",c:"Excel has flagged a potential issue — such as a number stored as text or an inconsistent formula in a range — and is flagging it for review"}, correct:"c" },

  { s:5, d:2, q:"'Trace Precedents' (Formulas menu) is used to:",
    opts:{a:"Display arrows showing which cells a formula depends on — useful for auditing complex formula chains",b:"Check whether a formula references cells on other sheets",c:"Find all cells that have errors in the workbook"}, correct:"a" },

  { s:5, d:2, q:"A circular reference occurs when:",
    opts:{a:"A formula references the same row more than once",b:"A formula — directly or through a chain — references its own cell, creating an infinite calculation loop",c:"Two columns reference each other in VLOOKUP"}, correct:"b" },

  { s:5, d:3, q:"You inherit a complex workbook with multiple formula errors. The quickest way to find all error cells across all sheets is:",
    opts:{a:"Scroll through every sheet manually",b:"Formulas → Error Checking steps through all errors in sequence; or use Go To Special → Formulas → Errors to select all error cells at once",c:"Use Find and Replace searching for #"}, correct:"b" },

  { s:5, d:2, q:"To prevent accidental editing of formula cells while allowing data entry in input cells, you should:",
    opts:{a:"Use a password on the entire workbook",b:"Hide the formula rows",c:"Unlock only the data-entry cells (Format Cells → Protection → uncheck Locked), then protect the sheet — by default all cells are locked when sheet protection is applied"}, correct:"c" },

  { s:5, d:3, q:"A SUMIF returns 0 when referencing a cell but works when you type the value directly. The most likely cause is:",
    opts:{a:"The value in the referenced cell is stored as a different data type — e.g. text vs number. Use VALUE() or TRIM() to align the data type",b:"The SUMIF range is too large",c:"SUMIF does not work with cell references"}, correct:"a" },

  { s:5, d:3, q:"Best practice for a shared workbook that multiple people update is:",
    opts:{a:"Store the file in a cloud location (SharePoint/Google Drive) with version history, use structured tables, protect formula cells while leaving input cells editable, and use track changes if available",b:"Lock the file with a password and share the password with everyone",c:"Everyone works on their own local copy and manually merges changes monthly"}, correct:"a" },

  { s:5, d:3, q:"A formula in B2 is =A2*$C$1. When copied to B3, the result is:",
    opts:{a:"=A3*$C$2 — both references adjust down by one row",b:"=A2*$C$1 — both references are fixed",c:"=A3*$C$1 — A2 adjusts to A3 (relative reference) while $C$1 stays fixed (absolute reference)"}, correct:"c" },
];

/* Exported for use by competency.html and spreadsheet.html */
const QUESTION_BANKS = { fm: Q_FM, hr: Q_HR, admin: Q_ADMIN, fitouts: Q_FITOUTS, spreadsheet: Q_SPREADSHEET };
