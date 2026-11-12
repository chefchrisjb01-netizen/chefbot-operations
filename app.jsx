import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  CalendarRange,
  CheckSquare,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Circle,
  ShieldCheck,
  Flame,
  Waves,
  Wine,
  Search,
  Plus,
  Trash2,
  Copy,
  Check,
  ChefHat,
  Award,
  Sparkles,
  Sliders,
  Menu,
  X,
  Info,
  Building2,
  Scale,
  Printer,
  MessageSquareQuote,
  HelpCircle,
  Layers,
  UtensilsCrossed,
  Save
} from 'lucide-react';

// ============================================================================
// INITIAL DEFAULT DATA (STRUCTURED COMPLETELY FROM BOTH MASTER PLAN DOCUMENTS)
// ============================================================================

const INITIAL_DATA = {
  meta: {
    property: 'Centara Reserve Krabi',
    owner: 'Chef Chris Jirawat Boonsit',
    position: 'Chef De Cuisine (CDC)',
    startDate: '1 December 2026',
    version: 'Master Plan V3.0 & Onboarding V1.0',
    lastSaved: new Date().toISOString(),
  },
  leadershipStatement:
    '“My first priority is to understand the people, the operation and the expectations of our guests and management. I will build on what already works, address risks with urgency, and establish clear standards, accountability and development opportunities across all three outlets. My goal is to create a culinary team that delivers consistent quality, safe operations, memorable experiences and sustainable business results.”',
  firstMeetingQuestions: [
    {
      topic: 'Success Definition',
      question: 'What does excellent performance look like at 30, 60 and 90 days? Which outcomes matter most?',
    },
    {
      topic: 'Authority Matrix',
      question: 'Which decisions can CDC approve independently? What requires Executive Chef/GM/Finance/HR approval?',
    },
    {
      topic: 'People & Stewarding',
      question: 'Who are the Outlet leaders? What are strengths, vacancies, retention or performance concerns?',
    },
    {
      topic: 'Commercial Targets',
      question: 'What are revenue, food cost, labour, budget and guest satisfaction targets by Outlet?',
    },
    {
      topic: 'Operations & Peaks',
      question: 'What are the biggest recurring issues, service peaks, events and maintenance constraints?',
    },
    {
      topic: 'Guest Segments',
      question: 'What are the key guest segments, VIP expectations and known pain points?',
    },
    {
      topic: 'Culinary Recognition',
      question: 'Which awards/guide are strategic priorities and what is the approved timeline/resource?',
    },
    {
      topic: 'Reporting Rhythm',
      question: 'What report format, meeting cadence and escalation channel does management expect?',
    },
  ],
  outlets: [
    {
      id: 'salt',
      name: 'Salt Society',
      concept: 'Contemporary Coastal / Mediterranean Beach Dining',
      seats: '~112 seats',
      hours: 'Mon–Sat 12:00–22:30 | Sun 12:30–15:30 & 18:00–22:30',
      lastOrder: '22:30',
      productionNote: 'Dedicated Outlet Line (Pizza / Oven / Grill / Seafood / Cold)',
      status: 'CONFIRMED',
    },
    {
      id: 'ember',
      name: 'Ember',
      concept: 'Premium Fire-led Dining / Wood Fire Grill',
      seats: '141 seats (109 Outdoor + 32 Indoor)',
      hours: 'Daily 18:00–22:30',
      lastOrder: '22:30',
      productionNote: 'Primary Culinary Recognition Candidate (Michelin / Awards Track)',
      status: 'CONFIRMED',
    },
    {
      id: 'monsoon',
      name: 'Monsoon',
      concept: 'Asian-inspired Cocktail Bar & Small Bites',
      seats: 'รอยืนยันจำนวนที่นั่ง (TO VERIFY)',
      hours: 'Daily 13:00–24:00',
      lastOrder: 'Food Last Order 22:30 (Bar until 24:00)',
      productionNote: 'Food produced by Ember team (Requires dedicated owner & transfer SOP)',
      status: 'PROVISIONAL',
    },
  ],
  kpis: [
    { id: 'kpi-1', pillar: 'Financial', name: 'Food Cost %', target: 'Approved Budget', actual: '28.5%', status: 'Baseline Pending', rule: 'Confirm accounting definition & transfer rules with Finance' },
    { id: 'kpi-2', pillar: 'Financial', name: 'Inventory Variance', target: 'Approved Tolerance', actual: '0.4%', status: 'Baseline Pending', rule: 'Actual stock vs system/book stock each count' },
    { id: 'kpi-3', pillar: 'Food Safety', name: 'Critical Unresolved Findings', target: '0', actual: '0', status: 'Mandatory', rule: 'Zero unresolved; immediate containment & escalation' },
    { id: 'kpi-4', pillar: 'Food Safety', name: 'Required Records Compliance', target: '100%', actual: '94%', status: 'Mandatory', rule: 'Temp, receiving, cooling, cleaning & calibration logs' },
    { id: 'kpi-5', pillar: 'Quality', name: 'Recipe & Portion Compliance', target: '≥95%', actual: '88%', status: 'Proposed', rule: 'Baseline first; validate yield & metric recipe cards' },
    { id: 'kpi-6', pillar: 'Quality', name: 'Internal Plating & Tasting Score', target: '≥90%', actual: '91%', status: 'Proposed', rule: '6-criteria weighted internal scorecard pass mark' },
    { id: 'kpi-7', pillar: 'Guest', name: 'Positive Food Feedback', target: '≥90%', actual: '89%', status: 'Proposed', rule: 'Define measurement & track ticket times by course' },
    { id: 'kpi-8', pillar: 'People', name: 'Training Completion', target: '≥95%', actual: '78%', status: 'Proposed', rule: 'Role-based Skills & Training Matrix completion' },
    { id: 'kpi-9', pillar: 'CAPA', name: 'On-time CAPA Closure', target: '≥95%', actual: '85%', status: 'Proposed', rule: 'Closed & verified within SLA (Critical = Immediate)' },
  ],
  factBase: [
    { id: 'fb-1', topic: 'CDC Scope', position: 'ดูแล Culinary Operations ทั้ง Salt Society, Ember และ Monsoon', status: 'CONFIRMED', action: 'Confirm authority matrix on Day 1' },
    { id: 'fb-2', topic: 'Total Team', position: '13 คน รวม CDC; Production team 12 คน', status: 'CONFIRMED', action: 'Request Employee Master List & skill grades' },
    { id: 'fb-3', topic: 'Days Off & Man-days', position: 'ทำงาน 5 วัน / หยุด 2 วันต่อสัปดาห์ (60 prod man-days/wk = 8.57 avg/day; 65 total)', status: 'CONFIRMED', action: 'Verify OT, break & public holiday rules with HR' },
    { id: 'fb-4', topic: 'Team Split (Ember 6 / Salt 6)', position: 'เคยใช้แนวคิด Ember 6 / Salt 6 โดย Monsoon ผลิตจาก Ember', status: 'PROVISIONAL', action: 'Must verify positions, covers & skill matrix before Final Roster' },
    { id: 'fb-5', topic: 'Stewarding Headcount', position: 'ยังไม่ยืนยันว่ารวมอยู่ใน 13 คนหรือแยกกำลังคน', status: 'TO VERIFY', action: 'Confirm immediately with HR & Stewarding' },
    { id: 'fb-6', topic: 'Outlet Capacities', position: 'Ember 141 (109 outdoor + 32 indoor); Salt Society ~112; Monsoon seats TBD', status: 'CONFIRMED', action: 'Confirm Monsoon seating & bar covers forecast' },
    { id: 'fb-7', topic: 'Operating Hours', position: 'Salt 12:00–22:30 (Sun split); Ember 18:00–22:30; Monsoon 13:00–24:00', status: 'CONFIRMED', action: 'Confirm kitchen closing & cleaning buffer with FOH' },
    { id: 'fb-8', topic: 'Food Last Order', position: '22:30 ทุก Outlet; Monsoon bar operation ต่อถึง 24:00', status: 'CONFIRMED', action: 'Align late-night bar snack cut-off & handover' },
    { id: 'fb-9', topic: 'Kitchen Layout', position: 'มี Kitchen Equipment Layout สำหรับ Salt Society + Specialty Kitchen', status: 'SOURCE PROVIDED', action: 'Perform site verification & define shared areas' },
    { id: 'fb-10', topic: 'Menu & Plating', position: 'มีเอกสารอ้างอิงเมนู/Plating สำหรับทั้ง 3 Outlets', status: 'SOURCE PROVIDED', action: 'Audit revision, recipe yields, photo & Finance approval' },
  ],
  approvalChecklist: [
    { id: 'app-1', item: 'รายชื่อพนักงาน 12 คน พร้อมตำแหน่ง ทักษะ และสถานะ Stewarding', priority: 'Critical', verified: false },
    { id: 'app-2', item: 'Menu & Plating Guide ของ Salt Society, Ember และ Monsoon', priority: 'Critical', verified: false },
    { id: 'app-3', item: 'Forecast Covers / Sales แยก Outlet และ Daypart', priority: 'High', verified: false },
    { id: 'app-4', item: 'Food Cost Target, Approved Budget และ P&L 3–6 เดือน', priority: 'High', verified: false },
    { id: 'app-5', item: 'HACCP Plan, Audit, SOP และ Food Safety Records', priority: 'High', verified: false },
    { id: 'app-6', item: 'Weekly Operating Roster และ Shift/OT Rules จาก HR', priority: 'High', verified: false },
    { id: 'app-7', item: 'Equipment List และ Maintenance Backlog จาก Engineering', priority: 'Medium', verified: false },
    { id: 'app-8', item: 'Supplier List, Price List และ Purchasing Rules', priority: 'High', verified: false },
  ],
  phaseChecklists: {
    phase1: [
      { id: 'p1-1', text: 'Management Alignment Meeting (Scope, Authority, Expectations)', done: false },
      { id: 'p1-2', text: 'Meet all 12 team members and understand individual capabilities', done: false },
      { id: 'p1-3', text: 'Walkthrough all three outlets (Salt, Ember, Monsoon) and kitchen areas', done: false },
      { id: 'p1-4', text: 'Review operating hours, covers forecast and service flow', done: false },
      { id: 'p1-5', text: 'Review hygiene, HACCP and food safety status', done: false },
      { id: 'p1-6', text: 'Review menu, recipe and plating references across all outlets', done: false },
      { id: 'p1-7', text: 'Review P&L, food cost, inventory and purchasing data', done: false },
      { id: 'p1-8', text: 'Review equipment condition and maintenance backlog', done: false },
      { id: 'p1-9', text: 'Identify top operational & food safety risks (Risk Register)', done: false },
      { id: 'p1-10', text: 'Submit 7-Day Assessment Report & 30-Day Action Plan (7 Dec 2026)', done: false },
    ],
    phase2: [
      { id: 'p2-1', text: 'Implement daily pre-service briefing and post-service debrief', done: false },
      { id: 'p2-2', text: 'Assign clear station ownership, Acting Leaders and shift responsibilities', done: false },
      { id: 'p2-3', text: 'Introduce standardized opening and closing checklists', done: false },
      { id: 'p2-4', text: 'Start daily pre-service quality tasting & pass inspection', done: false },
      { id: 'p2-5', text: 'Deploy Master Action Tracker and CAPA follow-up cadence', done: false },
      { id: 'p2-6', text: 'Close or contain all Critical Food Safety gaps immediately', done: false },
      { id: 'p2-7', text: 'Confirm production handover & transport SOP between Ember and Monsoon', done: false },
      { id: 'p2-8', text: 'Start weekly food cost, stock variance and waste review', done: false },
    ],
    phase34: [
      { id: 'p3-1', text: 'Complete Master Recipe and Plating Standards for all 3 outlets', done: false },
      { id: 'p3-2', text: 'Validate portion weights, usable yield and recipe repeatability', done: false },
      { id: 'p3-3', text: 'Complete individual Skills Matrix and Training Matrix', done: false },
      { id: 'p3-4', text: 'Review Menu Engineering (Popularity vs Contribution Margin)', done: false },
      { id: 'p3-5', text: 'Measure guest feedback, ticket times and service recovery performance', done: false },
      { id: 'p3-6', text: 'Conduct 60-Day (29 Jan) and 90-Day (28 Feb) Management Reviews', done: false },
      { id: 'p3-7', text: 'Prepare next 12-Month Culinary, Financial & Ember Recognition Strategy', done: false },
    ],
  },
  sevenDayPlan: [
    {
      day: 'Day 1 — 1 Dec 2026',
      focus: 'Alignment & Introduction',
      activities: 'พบ GM / Executive Chef / F&B / HR / Finance / Food Safety; ยืนยัน scope, authority, reporting line; แนะนำตัวทีม; Walkthrough ทั้ง 3 Outlets',
      deliverable: 'Stakeholder Map + Priority Notes',
      notes: '',
      completed: false,
    },
    {
      day: 'Day 2 — 2 Dec 2026',
      focus: 'People & Organization',
      activities: 'พบหัวหน้าทีมและพนักงานครบ 12 คน; ตรวจ Roster, attendance, job roles, skills, vacancies, morale; ระบุ Acting Leads',
      deliverable: 'People & Manpower Assessment',
      notes: '',
      completed: false,
    },
    {
      day: 'Day 3 — 3 Dec 2026',
      focus: 'Food Safety & Hygiene',
      activities: 'ตรวจ Receiving, storage, chillers, date labels, raw/cooked separation, allergen process, temp logs, sanitation, pest & waste',
      deliverable: 'Critical Risk Register + Immediate Controls',
      notes: '',
      completed: false,
    },
    {
      day: 'Day 4 — 4 Dec 2026',
      focus: 'Menu & Culinary Quality',
      activities: 'ชิมเมนูหลักทั้ง 3 Outlets; เทียบ recipe, portion, plating, dispatch, availability (86 list) และสังเกตช่วง Service จริง',
      deliverable: 'Menu & Quality Gap List',
      notes: '',
      completed: false,
    },
    {
      day: 'Day 5 — 5 Dec 2026',
      focus: 'Financial & Productivity',
      activities: 'ตรวจ Sales/Covers, Food Cost, Labour, Inventory variance, Waste, Purchasing, OT, Supplier specs และ Menu Mix',
      deliverable: 'Baseline Data Request + Financial Observations',
      notes: '',
      completed: false,
    },
    {
      day: 'Day 6 — 6 Dec 2026',
      focus: 'Service & Guest Journey',
      activities: 'สังเกต Lunch/Dinner/Bar flow; Kitchen–FOH communication; VIP/Allergy handling; Ticket times; Complaints & Handover',
      deliverable: 'Guest Journey & Service Bottleneck Map',
      notes: '',
      completed: false,
    },
    {
      day: 'Day 7 — 7 Dec 2026',
      focus: 'Synthesis & Executive Alignment',
      activities: 'จัดลำดับความเสี่ยง; Validate findings กับหัวหน้าทีม; นำเสนอผู้บริหาร; กำหนด 30-Day Action Owners & Deadlines',
      deliverable: '7-Day Assessment Report & 30-Day Action Plan',
      notes: '',
      completed: false,
    },
  ],
  preJoiningDocs: [
    { id: 'doc-1', doc: 'Organization chart, job descriptions, employee list', purpose: 'เข้าใจโครงสร้าง อำนาจหน้าที่ และช่องว่างกำลังคน', coordinator: 'HR / Executive Chef', status: 'Requested' },
    { id: 'doc-2', doc: 'Roster 4 สัปดาห์ล่าสุด, OT, leave, attendance', purpose: 'ตรวจสอบความครอบคลุมและภาระงาน', coordinator: 'HR / Outlet leaders', status: 'Requested' },
    { id: 'doc-3', doc: 'Menu master, recipe, plating guide, selling prices', purpose: 'ตรวจสอบมาตรฐานและความครบถ้วนของข้อมูล', coordinator: 'Outlet leaders', status: 'Received' },
    { id: 'doc-4', doc: 'Sales, covers, average check by outlet/daypart', purpose: 'วิเคราะห์ demand และ productivity', coordinator: 'Finance / F&B', status: 'Requested' },
    { id: 'doc-5', doc: 'P&L, food cost, labour cost, budget 3–6 months', purpose: 'กำหนด baseline ทางการเงิน', coordinator: 'Finance', status: 'Requested' },
    { id: 'doc-6', doc: 'Inventory, stock variance, waste, purchasing, supplier list', purpose: 'ตรวจสอบต้นทุนและ supply risk', coordinator: 'Cost control / Purchasing', status: 'Requested' },
    { id: 'doc-7', doc: 'HACCP plan, audit results, temperature logs, CAPA', purpose: 'ประเมิน Food Safety risk', coordinator: 'Food Safety / Stewarding', status: 'Requested' },
    { id: 'doc-8', doc: 'Guest feedback, complaints, recovery, VIP patterns', purpose: 'เข้าใจ guest expectations', coordinator: 'F&B / Guest Relations', status: 'Requested' },
    { id: 'doc-9', doc: 'Equipment list, maintenance, breakdown history, layout', purpose: 'ประเมิน readiness และ downtime risk', coordinator: 'Engineering', status: 'Received' },
    { id: 'doc-10', doc: 'Training records, performance reviews, vacancies', purpose: 'วางแผนพัฒนาทีม', coordinator: 'HR / Outlet leaders', status: 'Requested' },
  ],
  workstreams: [
    {
      id: 'ws-01',
      code: '01',
      title: 'Management & Onboarding',
      tasks: [
        { id: 't-101', text: 'Management Alignment Meeting (Role, Reporting Line, Authority)', completed: false },
        { id: 't-102', text: 'Job Description & Delegated Authority Matrix', completed: false },
        { id: 't-103', text: 'Organization Chart & Stakeholder Map', completed: false },
        { id: 't-104', text: 'Management Historical Data Collection', completed: false },
        { id: 't-105', text: '7-Day Assessment Report (Due 7 Dec 2026)', completed: false },
        { id: 't-106', text: '30-Day Action Plan Approval', completed: false },
      ],
    },
    {
      id: 'ws-02',
      code: '02',
      title: 'Manpower & Kitchen Organization',
      tasks: [
        { id: 't-201', text: 'Employee Master List & Stewarding Scope Verification', completed: false },
        { id: 't-202', text: 'Outlet Team Allocation (Salt vs Ember/Monsoon)', completed: false },
        { id: 't-203', text: 'Station Responsibility Matrix (Opening / Service / Closing)', completed: false },
        { id: 't-204', text: 'Weekly Roster & Shift Schedule (5-day work / 2-day off HR compliant)', completed: false },
        { id: 't-205', text: 'Acting Leader & Station Backup Assignment', completed: false },
        { id: 't-206', text: 'Manpower Productivity & Monsoon Ownership Validation', completed: false },
      ],
    },
    {
      id: 'ws-03',
      code: '03',
      title: 'Kitchen Layout & Operations',
      tasks: [
        { id: 't-301', text: 'Site Verification & Kitchen Zoning Plan (Shared Areas)', completed: false },
        { id: 't-302', text: 'Equipment Ownership & Preventive Maintenance Log', completed: false },
        { id: 't-303', text: 'Receiving → Storage → Prep → Cooking → Pass Production Flow', completed: false },
        { id: 't-304', text: 'Raw / Ready-to-Eat & Allergen Segregation Check', completed: false },
        { id: 't-305', text: 'Cleaning Responsibility Matrix (BOH vs Stewarding)', completed: false },
        { id: 't-306', text: 'Ember → Monsoon Production Handover, Transport & Temp SOP', completed: false },
      ],
    },
    {
      id: 'ws-04',
      code: '04',
      title: 'Menu & Plating – All Outlets',
      tasks: [
        { id: 't-401', text: 'Salt Society Menu Master & POS Price Alignment', completed: false },
        { id: 't-402', text: 'Ember Menu Master & Wood-Fire Spec Alignment', completed: false },
        { id: 't-403', text: 'Monsoon Menu Master & Bar Small Bites Spec', completed: false },
        { id: 't-404', text: 'Master Recipe Database (Metric, Batch Yield, Shelf Life)', completed: false },
        { id: 't-405', text: 'Standardized Plating Guide & Reference Photography', completed: false },
        { id: 't-406', text: 'Portion Control & Raw-to-Cooked Yield Standards', completed: false },
        { id: 't-407', text: 'Allergen Matrix & Supplier Label Verification', completed: false },
        { id: 't-408', text: 'Food Cost Verification & Staff Practical Assessment', completed: false },
      ],
    },
    {
      id: 'ws-05',
      code: '05',
      title: 'Hygiene & HACCP',
      tasks: [
        { id: 't-501', text: 'HACCP Plan & Critical Control Points (CCPs) Review', completed: false },
        { id: 't-502', text: 'Calibrated Thermometer & Temperature Monitoring Logs', completed: false },
        { id: 't-503', text: 'Receiving, Storage & Date Coding (FIFO/FEFO) Audit', completed: false },
        { id: 't-504', text: 'Allergen & Cross-Contamination Controls (Raw Seafood/Oysters)', completed: false },
        { id: 't-505', text: 'Cleaning Schedule, Chemical Dilution, Pest & Ice Hygiene', completed: false },
        { id: 't-506', text: 'Internal Audit & CAPA Verification Register', completed: false },
      ],
    },
    {
      id: 'ws-06',
      code: '06',
      title: 'Financial Management',
      tasks: [
        { id: 't-601', text: 'Historical P&L Collection (3–6 Months) & Budget Baseline', completed: false },
        { id: 't-602', text: 'Food Cost Baseline & Accounting Rules (Transfers/Staff Meal)', completed: false },
        { id: 't-603', text: 'Inventory Valuation & Stock Variance Control', completed: false },
        { id: 't-604', text: 'Daily Waste & Spoilage Recording Analysis', completed: false },
        { id: 't-605', text: 'Labour Cost % & Covers per Labour Hour Productivity', completed: false },
        { id: 't-606', text: 'Menu Engineering (Popularity vs Contribution Margin)', completed: false },
      ],
    },
    {
      id: 'ws-07',
      code: '07',
      title: 'Guest Experience & Quality',
      tasks: [
        { id: 't-701', text: 'Guest Journey & Service Bottleneck Audit', completed: false },
        { id: 't-702', text: 'VIP, Celebration & Dietary/Allergy FOH–BOH Process', completed: false },
        { id: 't-703', text: 'Daily Pre-Service Food Tasting & Pass Standards', completed: false },
        { id: 't-704', text: 'Quality Scorecard & Ticket Time Tracking by Course', completed: false },
        { id: 't-705', text: 'Guest Feedback Tracker & Complaint Recovery SOP', completed: false },
      ],
    },
    {
      id: 'ws-08',
      code: '08',
      title: 'Leadership & Development',
      tasks: [
        { id: 't-801', text: 'Team Skills Matrix (Observe / Assisted / Competent / Trainer)', completed: false },
        { id: 't-802', text: 'Individual Training Matrix & Practical Assessment Schedule', completed: false },
        { id: 't-803', text: 'Weekly One-to-One Coaching & Performance Reviews', completed: false },
        { id: 't-804', text: 'Leadership Index Calibration (8 Dimensions, 1–5 Scale)', completed: false },
        { id: 't-805', text: 'Succession Planning & Backup Station Coverage', completed: false },
      ],
    },
    {
      id: 'ws-09',
      code: '09',
      title: 'Culinary Recognition (Ember)',
      tasks: [
        { id: 't-901', text: 'Ember Culinary Identity & Andaman Provenance Narrative', completed: false },
        { id: 't-902', text: 'Signature Dish Development & Operational Feasibility', completed: false },
        { id: 't-903', text: 'Blind Tasting & Cross-Shift Consistency Validation', completed: false },
        { id: 't-904', text: 'External Benchmarking & Official Guide Criteria Research', completed: false },
        { id: 't-905', text: '12-Month Restaurant Awards & Evidence Dossier Roadmap', completed: false },
      ],
    },
  ],
  dailyStages: [
    { id: 'ds-1', stage: '1. Opening', activity: 'Physical walkthrough, hygiene, equipment, temperature check', evidence: 'Opening Checklist', note: '', done: false },
    { id: 'ds-2', stage: '2. Preparation', activity: 'Covers forecast, prep list, par, stock and shortages', evidence: 'Production Readiness', note: '', done: false },
    { id: 'ds-3', stage: '3. Pre-service (Briefing)', activity: 'Briefing, VIP, allergy, menu changes, station assignment', evidence: 'Briefing Record', note: '', done: false },
    { id: 'ds-4', stage: '4. Pre-service (Tasting)', activity: 'Taste key dishes and approve mise en place', evidence: 'Tasting / Quality Log', note: '', done: false },
    { id: 'ds-5', stage: '5. Service', activity: 'Pass inspection, ticket time, order accuracy, outlet visits', evidence: 'Service Observation', note: '', done: false },
    { id: 'ds-6', stage: '6. Post-service', activity: 'Debrief, complaint, waste, stock and staffing issues', evidence: 'Daily Debrief', note: '', done: false },
    { id: 'ds-7', stage: '7. Closing', activity: 'Cooling/storage, labelling, cleaning, equipment shutdown', evidence: 'Closing Checklist', note: '', done: false },
    { id: 'ds-8', stage: '8. Handover', activity: 'Open actions, shortage, maintenance, next-shift priorities', evidence: 'Handover Log', note: '', done: false },
  ],
  dailyBriefingItems: [
    { id: 'db-1', label: 'Covers Forecast และ Peak Hours', checked: false },
    { id: 'db-2', label: 'VIP / Special Occasion', checked: false },
    { id: 'db-3', label: 'Allergy และ Dietary Requirements', checked: false },
    { id: 'db-4', label: 'Out-of-Stock / 86 Items', checked: false },
    { id: 'db-5', label: 'Daily Specials และ Menu Changes', checked: false },
    { id: 'db-6', label: 'Station Assignments และ Staff Availability', checked: false },
    { id: 'db-7', label: 'Production Priorities (รวม Ember → Monsoon)', checked: false },
    { id: 'db-8', label: 'Food Safety Reminder', checked: false },
    { id: 'db-9', label: 'Service Recovery / Guest Feedback', checked: false },
  ],
  dailyQualityItems: [
    { id: 'dq-1', label: 'Taste & Seasoning', checked: false },
    { id: 'dq-2', label: 'Plating Reference', checked: false },
    { id: 'dq-3', label: 'Portion Weight', checked: false },
    { id: 'dq-4', label: 'Protein Doneness', checked: false },
    { id: 'dq-5', label: 'Sauce Consistency', checked: false },
    { id: 'dq-6', label: 'Food Temperature', checked: false },
    { id: 'dq-7', label: 'Garnish Freshness', checked: false },
    { id: 'dq-8', label: 'Plate Cleanliness', checked: false },
    { id: 'dq-9', label: 'Ticket Time', checked: false },
    { id: 'dq-10', label: 'Order Accuracy', checked: false },
  ],
  tastingLogs: [
    {
      id: 'tl-1',
      date: '2026-12-01',
      outlet: 'Ember',
      dish: 'Wood-Fired Andaman Sea Bass / Smoked Shellfish Emulsion',
      score: 92.5,
      pass: true,
    },
    {
      id: 'tl-2',
      date: '2026-12-01',
      outlet: 'Salt Society',
      dish: 'Chargrilled Octopus / Coastal Herb Salsa Verde',
      score: 88.0,
      pass: false,
    },
  ],
  weeklyCalendar: [
    { day: 'Monday', focus: 'Weekly Planning', output: 'Targets, manpower, events and action owners', notes: '' },
    { day: 'Tuesday', focus: 'Financial Review', output: 'Food cost, inventory, waste and purchasing', notes: '' },
    { day: 'Wednesday', focus: 'Hygiene Audit', output: 'Inspection findings and CAPA', notes: '' },
    { day: 'Thursday', focus: 'Culinary Quality', output: 'Recipe, plating and tasting', notes: '' },
    { day: 'Friday', focus: 'Guest Experience', output: 'Feedback, complaints, VIP and service recovery', notes: '' },
    { day: 'Saturday', focus: 'Peak Operation', output: 'Service observation and productivity', notes: '' },
    { day: 'Sunday / Close', focus: 'Performance Review', output: 'KPI summary and next-week priorities', notes: '' },
  ],
  capas: [
    {
      id: 'CRK-2026-001',
      date: '2026-12-01',
      outlet: 'Shared',
      category: 'People',
      finding: 'Stewarding headcount inclusion within the 13-person culinary team is unverified.',
      containment: 'Confirm daily dishwash shift coverage directly with Stewarding supervisor on Day 1.',
      rootCause: 'Pre-joining HR summary combined total headcount without separating stewarding vs kitchen production.',
      action: 'Obtain verified Employee Master List from HR and lock station coverage matrix.',
      owner: 'Chef Chris (CDC)',
      deadline: '2026-12-02',
      priority: 'High',
      status: 'Open',
      verifiedBy: '',
    },
    {
      id: 'CRK-2026-002',
      date: '2026-12-01',
      outlet: 'Monsoon',
      category: 'Quality',
      finding: 'Monsoon seating capacity unconfirmed and Ember → Monsoon transport & holding SOP not standardized.',
      containment: 'Assign dedicated Ember pass runner and insulated hot/cold carriers for Monsoon small bites.',
      rootCause: 'Monsoon operates 13:00–24:00 (Food Last Order 22:30) without a separate kitchen brigade.',
      action: 'Establish Monsoon batch prep schedule, transfer container temp log, and 22:30 cut-off handover.',
      owner: 'Ember Lead / CDC',
      deadline: '2026-12-05',
      priority: 'High',
      status: 'In Progress',
      verifiedBy: '',
    },
    {
      id: 'CRK-2026-003',
      date: '2026-12-03',
      outlet: 'Salt Society',
      category: 'Food Safety',
      finding: 'Chiller temperature logs & raw seafood/allergen separation require physical verification against CAD layout.',
      containment: 'Enforce twice-daily calibrated probe checks and color-coded allergen prep boards immediately.',
      rootCause: 'Shared prep counter usage between lunch and dinner transitions.',
      action: 'Complete HACCP walkthrough, label chiller zones (Raw vs RTE), and verify 100% log compliance.',
      owner: 'Salt Lead / CDC',
      deadline: '2026-12-04',
      priority: 'Critical',
      status: 'Open',
      verifiedBy: '',
    },
    {
      id: 'CRK-2026-004',
      date: '2026-12-04',
      outlet: 'Ember',
      category: 'Quality',
      finding: 'Master Recipe versions and metric batch yields require alignment with Finance costing.',
      containment: 'Use approved plating reference photos during pre-service briefing.',
      rootCause: 'Legacy recipe cards lack standardized trim/cooking yield loss percentages.',
      action: 'Audit top 20 selling items, record actual usable yield %, and lock Version 1.0 approved cards.',
      owner: 'Chef Chris (CDC)',
      deadline: '2026-12-15',
      priority: 'Medium',
      status: 'Pending Evidence',
      verifiedBy: '',
    },
  ],
};

const KITCHEN_ZONES = [
  { zone: 'Main Kitchen', owner: 'Hot Production Lead', standard: 'Hot production, cooking line, station ownership & ticket pacing' },
  { zone: 'Show Kitchen', owner: 'Ember / Salt Lead', standard: 'Guest-facing production, spotless cleanliness, visual presentation' },
  { zone: 'Cold Kitchen / Dessert', owner: 'Garde Manger / Pastry', standard: 'Cold prep, dessert mise en place, strict allergen separation' },
  { zone: 'Pantry / Service Area', owner: 'Pass Controller / CDC', standard: 'Mise en place, pass inspection, garnish, dispatch & order control' },
  { zone: 'Dishwashing / Pot Wash', owner: 'Stewarding Supervisor', standard: 'Dirty-to-clean flow, chemical dilution control, sanitation' },
  { zone: 'Walk-in Chiller / Freezer', owner: 'All Station Leads', standard: 'Temp logs, zoning, FIFO/FEFO date labels, raw/cooked segregation' },
  { zone: 'Dry Store', owner: 'Sous Chef / Storekeeper', standard: 'Stock organization, expiry audit, par levels & access control' },
  { zone: 'Monsoon Production Flow', owner: 'Designated Ember Chef', standard: 'Insulated transport vessels, holding temp, time & handover sign-off' },
];

const LEADERSHIP_DIMENSIONS = [
  { dim: 'Accountability', desc: 'รับผิดชอบงานตาม standard, owner และ deadline' },
  { dim: 'Technical Competency', desc: 'ทำ station ได้ตาม recipe, food safety และ quality' },
  { dim: 'Consistency', desc: 'ทำซ้ำได้แม่นยำหลาย service และหลายระดับ workload' },
  { dim: 'Communication', desc: 'handover, briefing และ escalation ชัดเจน' },
  { dim: 'Teamwork', desc: 'ช่วยเหลือทีมโดยไม่ละทิ้ง station responsibility' },
  { dim: 'Problem Solving', desc: 'ระบุ root cause และเสนอ corrective action' },
  { dim: 'Coaching Potential', desc: 'สอนงานและพัฒนาคนรุ่นถัดไปได้' },
  { dim: 'Professional Conduct', desc: 'วินัย ความเคารพ ความปลอดภัย และความเป็นธรรม' },
];

// ============================================================================
// STATUS BADGE COMPONENT
// ============================================================================

const StatusBadge = ({ status }) => {
  const styles = {
    CONFIRMED: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Verified: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    'Verified Closed': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Mandatory: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Received: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    'SOURCE PROVIDED': 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    PROVISIONAL: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Proposed: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    'In Progress': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Requested: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    'Baseline Pending': 'bg-slate-700/60 text-slate-300 border-slate-600',
    'Pending Evidence': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    'TO VERIFY': 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    Critical: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    Open: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    Overdue: 'bg-rose-600/25 text-rose-200 border-rose-500/50',
    High: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Low: 'bg-slate-700/60 text-slate-300 border-slate-600',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border tracking-wide ${
        styles[status] || 'bg-slate-800 text-slate-300 border-slate-700'
      }`}
    >
      {status}
    </span>
  );
};

// ============================================================================
// MAIN APPLICATION
// ============================================================================

export default function App() {
  const STORAGE_KEY = 'chefbot_crk_luxury_web_v1';

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load state:', e);
    }
    return INITIAL_DATA;
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [copiedStatement, setCopiedStatement] = useState(false);

  // Module 1 Filters
  const [factFilter, setFactFilter] = useState('ALL');

  // Module 3 Filters & Inputs
  const [wsSearch, setWsSearch] = useState('');
  const [wsFilter, setWsFilter] = useState('ALL');
  const [newTaskInputs, setNewTaskInputs] = useState({});

  // Module 4 Plating Calculator
  const [dishName, setDishName] = useState('Wood-Fired Andaman Dry-Aged Ribeye');
  const [dishOutlet, setDishOutlet] = useState('Ember');
  const [platingScores, setPlatingScores] = useState({
    visual: 92,
    portion: 95,
    ingredient: 90,
    texture: 88,
    flavour: 94,
    temp: 90,
  });

  // Module 5 CAPA Filters & Modal
  const [capaFilterOutlet, setCapaFilterOutlet] = useState('ALL');
  const [capaFilterStatus, setCapaFilterStatus] = useState('ALL');
  const [showNewCapa, setShowNewCapa] = useState(false);
  const [newCapa, setNewCapa] = useState({
    outlet: 'Ember',
    category: 'Food Safety',
    finding: '',
    containment: '',
    rootCause: '',
    action: '',
    owner: 'Chef Chris (CDC)',
    deadline: '2026-12-07',
    priority: 'High',
  });

  // Module 6 Manpower Simulator
  const [sim, setSim] = useState({
    saltStaff: 6,
    emberStaff: 6,
    stewardingIncluded: false,
    saltCovers: 85,
    emberCovers: 105,
    monsoonCovers: 40,
  });

  // Module 7 Report Generator
  const [reportType, setReportType] = useState('daily');
  const [copiedReport, setCopiedReport] = useState(false);
  const [dailyReportForm, setDailyReportForm] = useState({
    date: '2026-12-01',
    shift: 'Full Day (Opening – Close)',
    coversSalt: '82 / 85',
    coversEmber: '108 / 110',
    coversMonsoon: '38 / 40',
    staffingNotes: '12/12 Production Team on duty; 0 Sick Leave; 0 OT',
    vipAllergy: '2x VIP tables at Ember (19:30) — Severe shellfish allergy briefed to all stations',
    eightySix: 'None (100% menu availability)',
    hygieneNotes: 'All chiller logs verified (<4°C); raw/RTE zoning checked',
    qualityNotes: 'Pre-service tasting passed (92.5%); avg ticket time 16 mins',
    ticketComplaints: '0 Food Returns; 0 Guest Complaints',
    stockWaste: 'Daily waste recorded: 1.8 kg trim; 0 equipment breakdown',
    actionsOwner: 'CRK-2026-001 (Stewarding headcount confirmation) — CDC — Due 2 Dec',
    escalation: 'Awaiting HR confirmation on Stewarding scope & Finance Food Cost baseline',
    handover: 'Morning prep priority: Ember jus reduction & Salt Society seafood mise en place',
  });

  const [weeklyReportForm, setWeeklyReportForm] = useState({
    weekEnding: '2026-12-07',
    preparedBy: 'Chef Chris Jirawat Boonsit (CDC)',
    reviewedBy: 'Executive Chef / GM',
    salesCovers: 'Salt: 580 covers | Ember: 740 covers | Monsoon: 260 covers',
    foodCost: 'Baseline P&L under review with Finance; daily waste log active',
    inventoryWaste: 'FIFO/FEFO date coding enforced across walk-in chillers & dry store',
    hygieneHaccp: '0 Critical unresolved findings; 100% temp log compliance',
    foodQuality: 'Pre-service tasting active daily; plating scorecard average 91.2%',
    guestFeedback: 'Positive food feedback trending ≥90%; 0 allergy incidents',
    manpowerOt: '13 total headcount (1 CDC + 12 Prod); 5/2 off-day schedule validated',
    training: 'Skills Matrix baseline assessment completed for all 12 cooks',
    openCapa: '3 Open actions tracked in CAPA Register (0 Overdue)',
    nextWeekPriorities: 'Lock Master Recipe yields, Monsoon transfer SOP & 30-Day Action Plan',
    mgmtComments: '',
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      const payload = { ...data, meta: { ...data.meta, lastSaved: new Date().toISOString() } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Save error:', e);
    }
  }, [data]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  // ============================================================================
  // COMPUTED METRICS
  // ============================================================================

  const workstreamStats = useMemo(() => {
    let total = 0;
    let completed = 0;
    data.workstreams.forEach((ws) => {
      ws.tasks.forEach((t) => {
        total += 1;
        if (t.completed) completed += 1;
      });
    });
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pct };
  }, [data.workstreams]);

  const capaStats = useMemo(() => {
    const open = data.capas.filter((c) => c.status !== 'Verified Closed').length;
    const critical = data.capas.filter((c) => c.priority === 'Critical' && c.status !== 'Verified Closed').length;
    const closed = data.capas.filter((c) => c.status === 'Verified Closed').length;
    return { total: data.capas.length, open, critical, closed };
  }, [data.capas]);

  const weightedPlatingScore = useMemo(() => {
    const score =
      platingScores.visual * 0.2 +
      platingScores.portion * 0.2 +
      platingScores.ingredient * 0.15 +
      platingScores.texture * 0.15 +
      platingScores.flavour * 0.2 +
      platingScores.temp * 0.1;
    return Number(score.toFixed(1));
  }, [platingScores]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CHEFBOT_CentaraReserveKrabi_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported JSON backup file successfully.');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed && parsed.workstreams && parsed.kpis) {
          setData(parsed);
          showToast('Restored dashboard data from JSON backup.');
        } else {
          showToast('Invalid CHEFBOT JSON schema.');
        }
      } catch {
        showToast('Unable to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetDefault = () => {
    setData(INITIAL_DATA);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Reset all data to Master Plan V3.0 default.');
  };

  const copyStatement = () => {
    navigator.clipboard.writeText(data.leadershipStatement);
    setCopiedStatement(true);
    showToast('30-Second Leadership Statement copied!');
    setTimeout(() => setCopiedStatement(false), 2500);
  };

  const updateKpi = (id, field, val) => {
    setData((prev) => ({
      ...prev,
      kpis: prev.kpis.map((k) => (k.id === id ? { ...k, [field]: val } : k)),
    }));
  };

  const cycleFactStatus = (id) => {
    const order = ['TO VERIFY', 'PROVISIONAL', 'SOURCE PROVIDED', 'CONFIRMED'];
    setData((prev) => ({
      ...prev,
      factBase: prev.factBase.map((f) => {
        if (f.id !== id) return f;
        return { ...f, status: order[(order.indexOf(f.status) + 1) % order.length] };
      }),
    }));
  };

  const toggleApproval = (id) => {
    setData((prev) => ({
      ...prev,
      approvalChecklist: prev.approvalChecklist.map((a) => (a.id === id ? { ...a, verified: !a.verified } : a)),
    }));
  };

  const togglePhaseItem = (phaseKey, id) => {
    setData((prev) => ({
      ...prev,
      phaseChecklists: {
        ...prev.phaseChecklists,
        [phaseKey]: prev.phaseChecklists[phaseKey].map((item) =>
          item.id === id ? { ...item, done: !item.done } : item
        ),
      },
    }));
  };

  const toggleSevenDay = (idx) => {
    setData((prev) => ({
      ...prev,
      sevenDayPlan: prev.sevenDayPlan.map((d, i) => (i === idx ? { ...d, completed: !d.completed } : d)),
    }));
  };

  const updateSevenDayNote = (idx, notes) => {
    setData((prev) => ({
      ...prev,
      sevenDayPlan: prev.sevenDayPlan.map((d, i) => (i === idx ? { ...d, notes } : d)),
    }));
  };

  const cycleDocStatus = (id) => {
    const order = ['Requested', 'Received', 'Verified'];
    setData((prev) => ({
      ...prev,
      preJoiningDocs: prev.preJoiningDocs.map((d) => {
        if (d.id !== id) return d;
        return { ...d, status: order[(order.indexOf(d.status) + 1) % order.length] };
      }),
    }));
  };

  const toggleWsTask = (wsId, taskId) => {
    setData((prev) => ({
      ...prev,
      workstreams: prev.workstreams.map((ws) => {
        if (ws.id !== wsId) return ws;
        return {
          ...ws,
          tasks: ws.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
        };
      }),
    }));
  };

  const addWsTask = (wsId) => {
    const txt = (newTaskInputs[wsId] || '').trim();
    if (!txt) return;
    setData((prev) => ({
      ...prev,
      workstreams: prev.workstreams.map((ws) =>
        ws.id === wsId ? { ...ws, tasks: [...ws.tasks, { id: `t-${Date.now()}`, text: txt, completed: false }] } : ws
      ),
    }));
    setNewTaskInputs((prev) => ({ ...prev, [wsId]: '' }));
    showToast('Added task to workstream.');
  };

  const toggleDailyStage = (id) => {
    setData((prev) => ({
      ...prev,
      dailyStages: prev.dailyStages.map((s) => (s.id === id ? { ...s, done: !s.done } : s)),
    }));
  };

  const updateDailyStageNote = (id, note) => {
    setData((prev) => ({
      ...prev,
      dailyStages: prev.dailyStages.map((s) => (s.id === id ? { ...s, note } : s)),
    }));
  };

  const toggleBriefing = (id) => {
    setData((prev) => ({
      ...prev,
      dailyBriefingItems: prev.dailyBriefingItems.map((b) => (b.id === id ? { ...b, checked: !b.checked } : b)),
    }));
  };

  const toggleQuality = (id) => {
    setData((prev) => ({
      ...prev,
      dailyQualityItems: prev.dailyQualityItems.map((q) => (q.id === id ? { ...q, checked: !q.checked } : q)),
    }));
  };

  const saveTastingScore = () => {
    if (!dishName.trim()) return;
    const entry = {
      id: `tl-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      outlet: dishOutlet,
      dish: dishName.trim(),
      score: weightedPlatingScore,
      pass: weightedPlatingScore >= 90,
    };
    setData((prev) => ({ ...prev, tastingLogs: [entry, ...prev.tastingLogs] }));
    showToast(`Saved tasting score (${weightedPlatingScore}%) to log.`);
  };

  const updateWeeklyNote = (day, notes) => {
    setData((prev) => ({
      ...prev,
      weeklyCalendar: prev.weeklyCalendar.map((w) => (w.day === day ? { ...w, notes } : w)),
    }));
  };

  const handleAddCapa = (e) => {
    e.preventDefault();
    if (!newCapa.finding.trim()) return;
    const num = String(data.capas.length + 1).padStart(3, '0');
    const item = {
      id: `CRK-2026-${num}`,
      date: new Date().toISOString().slice(0, 10),
      outlet: newCapa.outlet,
      category: newCapa.category,
      finding: newCapa.finding.trim(),
      containment: newCapa.containment.trim() || 'Immediate containment applied',
      rootCause: newCapa.rootCause.trim() || 'Under root cause analysis',
      action: newCapa.action.trim() || 'Corrective action assigned',
      owner: newCapa.owner.trim() || 'Chef Chris (CDC)',
      deadline: newCapa.deadline,
      priority: newCapa.priority,
      status: 'Open',
      verifiedBy: '',
    };
    setData((prev) => ({ ...prev, capas: [item, ...prev.capas] }));
    setNewCapa({
      outlet: 'Ember',
      category: 'Food Safety',
      finding: '',
      containment: '',
      rootCause: '',
      action: '',
      owner: 'Chef Chris (CDC)',
      deadline: '2026-12-07',
      priority: 'High',
    });
    setShowNewCapa(false);
    showToast(`Logged CAPA ${item.id}`);
  };

  const cycleCapaStatus = (id) => {
    const order = ['Open', 'In Progress', 'Pending Evidence', 'Verified Closed', 'Overdue'];
    setData((prev) => ({
      ...prev,
      capas: prev.capas.map((c) => {
        if (c.id !== id) return c;
        const next = order[(order.indexOf(c.status) + 1) % order.length];
        return {
          ...c,
          status: next,
          verifiedBy: next === 'Verified Closed' ? 'Chef Chris (CDC)' : '',
        };
      }),
    }));
  };

  const deleteCapa = (id) => {
    setData((prev) => ({ ...prev, capas: prev.capas.filter((c) => c.id !== id) }));
    showToast(`Deleted ${id}`);
  };

  // ============================================================================
  // FORMATTED EXECUTIVE REPORT OUTPUT
  // ============================================================================

  const formattedReport = useMemo(() => {
    if (reportType === 'daily') {
      return `====================================================================
CENTARA RESERVE KRABI — READY-TO-USE DAILY CDC REPORT
====================================================================
Date / Shift / CDC:   ${dailyReportForm.date} | ${dailyReportForm.shift} | Chef Chris Jirawat Boonsit
Covers (Act/Fcst):    Salt: ${dailyReportForm.coversSalt} | Ember: ${dailyReportForm.coversEmber} | Monsoon: ${dailyReportForm.coversMonsoon}
Staffing / Abs / OT:  ${dailyReportForm.staffingNotes}
VIP / Allergy / Diet: ${dailyReportForm.vipAllergy}
86 Items / Changes:   ${dailyReportForm.eightySix}
Hygiene / Safety:     ${dailyReportForm.hygieneNotes}
Quality / Tasting:    ${dailyReportForm.qualityNotes}
Ticket / Complaints:  ${dailyReportForm.ticketComplaints}
Stock / Waste / Eqpt: ${dailyReportForm.stockWaste}
Actions / Owner / Due:${dailyReportForm.actionsOwner}
Escalation Required:  ${dailyReportForm.escalation}
Outstanding Handover: ${dailyReportForm.handover}
====================================================================`;
    }
    return `====================================================================
CENTARA RESERVE KRABI — WEEKLY CULINARY MANAGEMENT REVIEW
====================================================================
Week Ending: ${weeklyReportForm.weekEnding}
Prepared by: ${weeklyReportForm.preparedBy} | Reviewed by: ${weeklyReportForm.reviewedBy}

1. Sales & Covers:         ${weeklyReportForm.salesCovers}
2. Food Cost (Theo/Act):   ${weeklyReportForm.foodCost}
3. Inventory / Waste:      ${weeklyReportForm.inventoryWaste}
4. Hygiene / HACCP:        ${weeklyReportForm.hygieneHaccp}
5. Food Quality / Plating: ${weeklyReportForm.foodQuality}
6. Guest Feedback:         ${weeklyReportForm.guestFeedback}
7. Manpower / OT:          ${weeklyReportForm.manpowerOt}
8. Training / Leadership:  ${weeklyReportForm.training}
9. Open CAPA Status:       ${weeklyReportForm.openCapa}
10. Next Week Priorities:  ${weeklyReportForm.nextWeekPriorities}

Management Comments / Decisions:
${weeklyReportForm.mgmtComments || '(Pending management review sign-off)'}
====================================================================`;
  }, [reportType, dailyReportForm, weeklyReportForm]);

  const handleCopyReport = () => {
    navigator.clipboard.writeText(formattedReport);
    setCopiedReport(true);
    showToast('Formatted report copied to clipboard!');
    setTimeout(() => setCopiedReport(false), 2500);
  };

  // ============================================================================
  // NAVIGATION CONFIG (7 MODULES)
  // ============================================================================

  const navItems = [
    { id: 'overview', label: '1. Executive Command & Outlets', sub: 'ภาพรวมผู้บริหาร & 3 Outlets', icon: LayoutDashboard },
    { id: 'roadmap', label: '2. 90-Day & First 7 Days', sub: 'แผน 90 วัน & ปฏิบัติการ 7 วันแรก', icon: CalendarRange },
    { id: 'workstreams', label: '3. Master Checklist (9 Pillars)', sub: 'เช็กลิสต์หลัก 9 หมวดงาน', icon: CheckSquare },
    { id: 'daily', label: '4. Daily Routine & Quality', sub: 'ปฏิบัติการรายวัน & มาตรฐานคุณภาพ', icon: Clock },
    { id: 'capa', label: '5. Action & CAPA Tracker', sub: 'ระบบติดตามงาน & CAPA', icon: AlertTriangle, badge: capaStats.open },
    { id: 'manpower', label: '6. Manpower & Kitchen Flow', sub: 'จำลองกำลังคน & ระบบครัว', icon: Users },
    { id: 'reports', label: '7. Executive Report Generator', sub: 'สร้างรายงานผู้บริหาร', icon: FileText },
  ];

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col lg:flex-row font-sans antialiased selection:bg-[#D4AF37] selection:text-slate-950">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#131926] text-white border border-[#D4AF37] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs sm:text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#131926] px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40 print:hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#9A7228] flex items-center justify-center text-slate-950 font-bold">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide">CHEFBOT COMMAND</div>
            <div className="text-[11px] text-[#D4AF37]">Centara Reserve Krabi</div>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800/80 text-slate-200 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'fixed inset-0 z-30 block' : 'hidden'
        } lg:block lg:w-76 lg:shrink-0 bg-[#131926] border-r border-slate-800/90 flex flex-col justify-between lg:sticky lg:top-0 lg:h-screen overflow-y-auto print:hidden`}
      >
        <div>
          {/* Luxury Brand Header */}
          <div className="p-5 border-b border-slate-800/90">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#C69C2B] to-[#8C6820] flex items-center justify-center text-slate-950 shadow-lg shadow-[#D4AF37]/10">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] block">
                  Centara Reserve Krabi
                </span>
                <h1 className="text-base font-bold text-white tracking-tight">CHEFBOT COMMAND</h1>
              </div>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-3 text-xs space-y-1">
              <div className="font-bold text-white">Chef Chris Jirawat Boonsit</div>
              <div className="text-slate-400">Chef De Cuisine (CDC)</div>
              <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-slate-800/80 text-[11px]">
                <span className="text-slate-400">Planned Start:</span>
                <span className="text-[#D4AF37] font-semibold">1 December 2026</span>
              </div>
            </div>
          </div>

          {/* 7-Module Navigation */}
          <nav className="p-3.5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent text-white border border-[#D4AF37]/50'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-slate-500'}`} />
                    <div className="truncate">
                      <div className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{item.sub}</div>
                    </div>
                  </div>
                  {item.badge > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Persistence & Backup Footer */}
        <div className="p-4 border-t border-slate-800/90 bg-[#0B0F17]/60 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Save className="w-3 h-3" /> Saved Locally
            </span>
            <span>{new Date(data.meta.lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleExportJSON}
              className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              Export JSON
            </button>
            <label className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
              Import JSON
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
          <button
            onClick={handleResetDefault}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-500/40 hover:bg-rose-950/30 text-[11px] text-slate-400 hover:text-rose-300 transition"
          >
            <RotateCcw className="w-3 h-3" />
            Reset to Default Master Plan
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Global Executive Header Banner */}
        <header className="bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl flex flex-col xl:flex-row xl:items-center justify-between gap-4 print:border-slate-300 print:bg-white print:text-black">
          <div>
            <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.18em] mb-1">
              Three Outlets • One Culinary Leadership • One Standard of Excellence
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white print:text-black">
              Culinary Operations Master Plan & CDC Command Center
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Project Owner: <span className="text-slate-200 font-semibold">Chef Chris Jirawat Boonsit</span> | Position:{' '}
              <span className="text-slate-200 font-semibold">Chef De Cuisine</span> | Property:{' '}
              <span className="text-slate-200 font-semibold">Centara Reserve Krabi</span> | Version 3.0
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:flex sm:items-center sm:gap-3 shrink-0">
            <div className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">9-Pillar Progress</div>
              <div className="text-base sm:text-lg font-bold text-[#D4AF37]">
                {workstreamStats.pct}%{' '}
                <span className="text-[11px] font-normal text-slate-400">
                  ({workstreamStats.completed}/{workstreamStats.total})
                </span>
              </div>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Brigade Baseline</div>
              <div className="text-base sm:text-lg font-bold text-white">
                13 <span className="text-[11px] font-normal text-slate-400">(1+12)</span>
              </div>
            </div>
            <div className="bg-[#0B0F17] border border-rose-500/30 rounded-xl px-3.5 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-rose-300">Open CAPAs</div>
              <div className="text-base sm:text-lg font-bold text-rose-400">
                {capaStats.open}{' '}
                <span className="text-[11px] font-normal text-rose-300/70">({capaStats.critical} Crit)</span>
              </div>
            </div>
          </div>
        </header>

        {/* ====================================================================
            MODULE 1: EXECUTIVE COMMAND & OUTLETS
           ==================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Three Outlets Cards */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  Outlet Scope & Operating Reference (ขอบเขตการบริหาร 3 Outlets)
                </h3>
                <span className="text-xs text-slate-400">Confirmed Seating: 253 Seats (Salt + Ember)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.outlets.map((outlet) => {
                  const Icon = outlet.id === 'salt' ? Waves : outlet.id === 'ember' ? Flame : Wine;
                  return (
                    <div
                      key={outlet.id}
                      className="bg-[#131926] rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-[#D4AF37]/40 transition"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                                outlet.id === 'salt'
                                  ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                                  : outlet.id === 'ember'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                  : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-base">{outlet.name}</h4>
                              <span className="text-xs text-[#D4AF37] font-medium">{outlet.seats}</span>
                            </div>
                          </div>
                          <StatusBadge status={outlet.status} />
                        </div>
                        <p className="text-xs text-slate-300 mb-3">{outlet.concept}</p>
                        <div className="space-y-1.5 text-xs text-slate-400 bg-[#0B0F17] p-3 rounded-xl border border-slate-800/80">
                          <div>
                            <span className="font-semibold text-slate-200">Hours:</span> {outlet.hours}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-200">Last Order:</span> {outlet.lastOrder}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{outlet.productionNote}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 30-Second Leadership Statement & First Management Meeting Questions */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-5 bg-gradient-to-br from-[#161E31] to-[#111622] rounded-2xl border border-[#D4AF37]/40 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                      <MessageSquareQuote className="w-4 h-4" />
                      30-Second Leadership Statement
                    </span>
                    <button
                      onClick={copyStatement}
                      className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] text-xs font-semibold flex items-center gap-1 border border-[#D4AF37]/30 transition"
                    >
                      {copiedStatement ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedStatement ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <blockquote className="text-xs sm:text-sm italic leading-relaxed text-slate-200">
                    {data.leadershipStatement}
                  </blockquote>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                  Section 22 • Onboarding Playbook Positioning Statement
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
                  First Management Meeting: 8 Key Questions to Clarify (Section 18)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {data.firstMeetingQuestions.map((q, idx) => (
                    <div key={idx} className="bg-[#0B0F17] border border-slate-800/90 rounded-xl p-3">
                      <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                        {idx + 1}. {q.topic}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{q.question}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Proposed KPI Scorecard Table */}
            <section className="bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
              <div className="mb-4">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  Proposed KPI Scorecard Table (Editable Actuals & Status)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  ตัวเลขที่ระบุเป็นข้อเสนอเบื้องต้น (Proposed) ต้องกำหนดสูตรคำนวณ แหล่งข้อมูล และ Baseline ร่วมกับ Finance/HR ก่อนประกาศใช้จริง
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400">
                      <th className="py-3 px-3">Pillar</th>
                      <th className="py-3 px-3">KPI Metric</th>
                      <th className="py-3 px-3">Target / Rule</th>
                      <th className="py-3 px-3">Actual (Editable)</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Governance / Measurement Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 text-xs">
                    {data.kpis.map((kpi) => (
                      <tr key={kpi.id} className="hover:bg-slate-800/30">
                        <td className="py-3 px-3 font-bold text-[#D4AF37] whitespace-nowrap">{kpi.pillar}</td>
                        <td className="py-3 px-3 font-semibold text-white">{kpi.name}</td>
                        <td className="py-3 px-3 text-slate-300 font-medium whitespace-nowrap">{kpi.target}</td>
                        <td className="py-3 px-3">
                          <input
                            type="text"
                            value={kpi.actual}
                            onChange={(e) => updateKpi(kpi.id, 'actual', e.target.value)}
                            className="w-24 px-2.5 py-1 rounded-lg bg-[#0B0F17] border border-slate-700 text-white font-bold focus:outline-none focus:border-[#D4AF37]"
                          />
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <StatusBadge status={kpi.status} />
                        </td>
                        <td className="py-3 px-3 text-slate-400">{kpi.rule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Fact Base Governance & 8 Information Required Before Approval */}
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-5">
              {/* Fact Base Governance */}
              <div className="xl:col-span-8 bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                      Fact Base Governance Tracker (Section 2)
                    </h3>
                    <p className="text-xs text-slate-400">
                      แยก CONFIRMED / PROVISIONAL / TO VERIFY / SOURCE PROVIDED (คลิกที่ป้ายสถานะเพื่อเปลี่ยนเมื่อตรวจสอบแล้ว)
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['ALL', 'CONFIRMED', 'PROVISIONAL', 'TO VERIFY', 'SOURCE PROVIDED'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setFactFilter(st)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                          factFilter === st
                            ? 'bg-[#D4AF37] text-slate-950'
                            : 'bg-[#0B0F17] text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400">
                        <th className="py-2.5 px-3">Topic</th>
                        <th className="py-2.5 px-3">Current Position</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Action Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70 text-xs">
                      {data.factBase
                        .filter((f) => factFilter === 'ALL' || f.status === factFilter)
                        .map((fact) => (
                          <tr key={fact.id} className="hover:bg-slate-800/30">
                            <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">{fact.topic}</td>
                            <td className="py-2.5 px-3 text-slate-300">{fact.position}</td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <button onClick={() => cycleFactStatus(fact.id)}>
                                <StatusBadge status={fact.status} />
                              </button>
                            </td>
                            <td className="py-2.5 px-3 text-slate-400">{fact.action}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 8 Information Required Before Final Approval */}
              <div className="xl:col-span-4 bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">8 Gate Items Before Approval</h3>
                    <span className="text-xs font-bold text-[#D4AF37]">
                      {data.approvalChecklist.filter((a) => a.verified).length}/8 Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3">
                    ห้ามประกาศ Final Roster, Food Cost Target หรือเปลี่ยนสูตรอาหารจนกว่าข้อมูลเหล่านี้จะได้รับการยืนยัน
                  </p>
                  <div className="space-y-2">
                    {data.approvalChecklist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleApproval(item.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-start justify-between gap-2 transition ${
                          item.verified
                            ? 'bg-emerald-500/10 border-emerald-500/30'
                            : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-2 text-xs">
                          {item.verified ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                          )}
                          <span className={item.verified ? 'line-through text-slate-500' : 'text-slate-200'}>
                            {item.item}
                          </span>
                        </div>
                        <StatusBadge status={item.priority} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ====================================================================
            MODULE 2: 90-DAY ROADMAP & FIRST 7 DAYS
           ==================================================================== */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            {/* 4-Phase 90-Day Implementation Roadmap */}
            <section className="bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
              <h3 className="text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
                <CalendarRange className="w-4 h-4 text-[#D4AF37]" />
                90-Day Implementation Roadmap (1 Dec 2026 – 28 Feb 2027)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    phase: 'PHASE 1: DIAGNOSE',
                    dates: '1–7 Dec 2026',
                    priority: 'ทำความเข้าใจและตรวจสภาพจริง',
                    deliverables: '7-Day Assessment Report; Baseline; Risk Register; Management Alignment',
                    accent: 'border-t-amber-400',
                  },
                  {
                    phase: 'PHASE 2: STABILIZE',
                    dates: '8–30 Dec 2026',
                    priority: 'ควบคุมงานประจำวันและปิดความเสี่ยง',
                    deliverables: '30-Day Action Plan; Daily Command Routine; Station Ownership; Critical CAPA',
                    accent: 'border-t-sky-400',
                  },
                  {
                    phase: 'PHASE 3: STANDARDIZE',
                    dates: '31 Dec 2026–29 Jan 2027',
                    priority: 'สร้างมาตรฐานและฝึกทีม',
                    deliverables: 'Recipe/Plating Control; Cost Review; Training Matrix; 60-Day Review',
                    accent: 'border-t-purple-400',
                  },
                  {
                    phase: 'PHASE 4: OPTIMIZE',
                    dates: '30 Jan–28 Feb 2027',
                    priority: 'เพิ่มประสิทธิภาพและวางแผนระยะยาว',
                    deliverables: '90-Day Executive Review; Performance Analysis; 12-Month Culinary Strategy',
                    accent: 'border-t-emerald-400',
                  },
                ].map((p, idx) => (
                  <div
                    key={idx}
                    className={`bg-[#0B0F17] rounded-xl border border-slate-800 border-t-4 ${p.accent} p-4 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="text-[11px] font-bold text-[#D4AF37]">{p.dates}</div>
                      <div className="text-sm font-bold text-white mt-0.5">{p.phase}</div>
                      <div className="text-xs text-slate-300 mt-1">{p.priority}</div>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400">
                      <strong className="text-slate-200">Deliverables:</strong> {p.deliverables}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Phase Checklists */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
                {[
                  { key: 'phase1', title: 'Phase 1: 7-Day Assessment Checklist (10 Items)' },
                  { key: 'phase2', title: 'Phase 2: Stabilization Checklist (8 Items)' },
                  { key: 'phase34', title: 'Phase 3–4: Standardization & Optimization (7 Items)' },
                ].map((group) => {
                  const items = data.phaseChecklists[group.key];
                  const doneCount = items.filter((i) => i.done).length;
                  return (
                    <div key={group.key} className="bg-[#0B0F17] rounded-xl border border-slate-800 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-white">{group.title}</h4>
                        <span className="text-xs font-bold text-[#D4AF37]">
                          {doneCount}/{items.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => togglePhaseItem(group.key, item.id)}
                            className="flex items-start gap-2 text-xs cursor-pointer hover:bg-slate-800/40 p-1.5 rounded-lg"
                          >
                            {item.done ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                            )}
                            <span className={item.done ? 'line-through text-slate-500' : 'text-slate-300'}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* First 7 Days CDC Command Plan */}
            <section className="bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    First 7 Days: CDC Command Plan (1–7 December 2026)
                  </h3>
                  <p className="text-xs text-slate-400">
                    คลิกที่การ์ดเพื่อทำเครื่องหมายเสร็จสิ้น และบันทึก Field Observations ประจำวัน
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold self-start">
                  {data.sevenDayPlan.filter((d) => d.completed).length} / 7 Days Completed
                </span>
              </div>

              <div className="space-y-3">
                {data.sevenDayPlan.map((d, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition ${
                      d.completed
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                      <div
                        onClick={() => toggleSevenDay(idx)}
                        className="flex items-start gap-3 cursor-pointer flex-1"
                      >
                        {d.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-[#D4AF37] uppercase">{d.day}</span>
                            <span className="text-sm font-bold text-white">• {d.focus}</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">{d.activities}</p>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-lg bg-[#131926] text-slate-200 border border-slate-700">
                          Deliverable: {d.deliverable}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 pl-8">
                      <input
                        type="text"
                        placeholder="Field notes / key observations for this day..."
                        value={d.notes}
                        onChange={(e) => updateSevenDayNote(idx, e.target.value)}
                        className="w-full text-xs px-3 py-1.5 rounded-lg bg-[#131926] border border-slate-800 text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pre-Joining Document Request Tracker */}
            <section className="bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                Pre-Joining Information & Document Request Tracker (10 Datasets)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                คลิกที่สถานะเพื่อเปลี่ยน Requested → Received → Verified
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400">
                      <th className="py-2.5 px-3">Document / Data</th>
                      <th className="py-2.5 px-3">Purpose</th>
                      <th className="py-2.5 px-3">Coordinator</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 text-xs">
                    {data.preJoiningDocs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3 font-semibold text-white">{doc.doc}</td>
                        <td className="py-2.5 px-3 text-slate-300">{doc.purpose}</td>
                        <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">{doc.coordinator}</td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <button onClick={() => cycleDocStatus(doc.id)}>
                            <StatusBadge status={doc.status} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* ====================================================================
            MODULE 3: MASTER CHECKLIST — 9 WORKSTREAMS
           ==================================================================== */}
        {activeTab === 'workstreams' && (
          <div className="space-y-6">
            {/* Search & Filter Header */}
            <div className="bg-[#131926] rounded-2xl border border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ค้นหารายการใน 9 Workstreams (เช่น HACCP, Monsoon, Plating, Costing)..."
                  value={wsSearch}
                  onChange={(e) => setWsSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0B0F17] border border-slate-800 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'ALL', label: 'All Items' },
                  { id: 'PENDING', label: 'Pending' },
                  { id: 'COMPLETED', label: 'Completed' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setWsFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      wsFilter === f.id
                        ? 'bg-[#D4AF37] text-slate-950'
                        : 'bg-[#0B0F17] text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 9 Workstream Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.workstreams.map((ws) => {
                const doneCount = ws.tasks.filter((t) => t.completed).length;
                const pct = Math.round((doneCount / ws.tasks.length) * 100);
                const visibleTasks = ws.tasks.filter((t) => {
                  const matchSearch = t.text.toLowerCase().includes(wsSearch.toLowerCase());
                  const matchStatus =
                    wsFilter === 'ALL' ||
                    (wsFilter === 'PENDING' && !t.completed) ||
                    (wsFilter === 'COMPLETED' && t.completed);
                  return matchSearch && matchStatus;
                });

                if (visibleTasks.length === 0 && wsSearch) return null;

                return (
                  <div
                    key={ws.id}
                    className="bg-[#131926] rounded-2xl border border-slate-800 p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold">
                            {ws.code}
                          </span>
                          <h4 className="font-bold text-white text-sm">{ws.title}</h4>
                        </div>
                        <span className="text-xs font-bold text-[#D4AF37]">
                          {doneCount}/{ws.tasks.length} ({pct}%)
                        </span>
                      </div>

                      <div className="w-full h-1.5 bg-[#0B0F17] rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-emerald-400 transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="space-y-2">
                        {visibleTasks.map((task) => (
                          <div
                            key={task.id}
                            onClick={() => toggleWsTask(ws.id, task.id)}
                            className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                              task.completed
                                ? 'bg-emerald-500/10 border-emerald-500/20'
                                : 'bg-[#0B0F17] border-slate-800/80 hover:border-slate-700'
                            }`}
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                            )}
                            <span
                              className={`text-xs ${
                                task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                              }`}
                            >
                              {task.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add Custom Sub-task */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add custom checklist item..."
                        value={newTaskInputs[ws.id] || ''}
                        onChange={(e) => setNewTaskInputs((prev) => ({ ...prev, [ws.id]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && addWsTask(ws.id)}
                        className="flex-1 text-xs px-3 py-1.5 rounded-lg bg-[#0B0F17] border border-slate-800 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button
                        onClick={() => addWsTask(ws.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c59f2c] text-slate-950 text-xs font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ====================================================================
            MODULE 4: DAILY CDC ROUTINE, QUALITY & CALENDAR
           ==================================================================== */}
        {activeTab === 'daily' && (
          <div className="space-y-6">
            {/* 8-Stage Daily CDC Command Routine */}
            <section className="bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    Daily CDC Command Routine (8-Stage Operating Rhythm)
                  </h3>
                  <p className="text-xs text-slate-400">
                    คลิกทำเครื่องหมายแต่ละช่วงเวลา พร้อมบันทึก Evidence Notes ประจำวัน
                  </p>
                </div>
                <button
                  onClick={() => {
                    setData((prev) => ({
                      ...prev,
                      dailyStages: prev.dailyStages.map((s) => ({ ...s, done: false, note: '' })),
                      dailyBriefingItems: prev.dailyBriefingItems.map((b) => ({ ...b, checked: false })),
                      dailyQualityItems: prev.dailyQualityItems.map((q) => ({ ...q, checked: false })),
                    }));
                    showToast('Reset daily checklists for new service shift.');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#0B0F17] border border-slate-700 hover:border-[#D4AF37] text-xs font-semibold text-slate-200 flex items-center gap-1.5 self-start"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" /> Reset Today
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {data.dailyStages.map((st) => (
                  <div
                    key={st.id}
                    className={`p-3.5 rounded-xl border transition flex flex-col justify-between ${
                      st.done ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-[#0B0F17] border-slate-800'
                    }`}
                  >
                    <div>
                      <div
                        onClick={() => toggleDailyStage(st.id)}
                        className="flex items-center justify-between gap-2 mb-1.5 cursor-pointer"
                      >
                        <span className="text-xs font-bold text-white">{st.stage}</span>
                        {st.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">{st.activity}</p>
                    </div>
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        placeholder="Evidence / log ref..."
                        value={st.note}
                        onChange={(e) => updateDailyStageNote(st.id, e.target.value)}
                        className="w-full text-[11px] px-2 py-1 rounded bg-[#131926] border border-slate-800 text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                      />
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                        Output: {st.evidence}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Daily Briefing + Daily Quality + Plating Scorecard Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Briefing (9) */}
              <section className="lg:col-span-3 bg-[#131926] rounded-2xl border border-slate-800 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Daily Briefing (9)
                  </h4>
                  <span className="text-xs font-bold text-[#D4AF37]">
                    {data.dailyBriefingItems.filter((b) => b.checked).length}/9
                  </span>
                </div>
                <div className="space-y-2">
                  {data.dailyBriefingItems.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => toggleBriefing(b.id)}
                      className="flex items-start gap-2 p-2 rounded-lg bg-[#0B0F17] border border-slate-800/80 cursor-pointer text-xs"
                    >
                      {b.checked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      )}
                      <span className={b.checked ? 'line-through text-slate-500' : 'text-slate-300'}>{b.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quality Inspection (10) */}
              <section className="lg:col-span-3 bg-[#131926] rounded-2xl border border-slate-800 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Quality Inspection (10)
                  </h4>
                  <span className="text-xs font-bold text-[#D4AF37]">
                    {data.dailyQualityItems.filter((q) => q.checked).length}/10
                  </span>
                </div>
                <div className="space-y-2">
                  {data.dailyQualityItems.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => toggleQuality(q.id)}
                      className="flex items-start gap-2 p-2 rounded-lg bg-[#0B0F17] border border-slate-800/80 cursor-pointer text-xs"
                    >
                      {q.checked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      )}
                      <span className={q.checked ? 'line-through text-slate-500' : 'text-slate-300'}>{q.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Interactive Plating Evaluation Scorecard Calculator */}
              <section className="lg:col-span-6 bg-[#131926] rounded-2xl border border-slate-800 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#D4AF37]" />
                      Plating Evaluation Scorecard (Proposed Pass ≥90%)
                    </h4>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        weightedPlatingScore >= 90
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {weightedPlatingScore}% — {weightedPlatingScore >= 90 ? 'PASS' : 'FAIL'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 text-xs">
                    <select
                      value={dishOutlet}
                      onChange={(e) => setDishOutlet(e.target.value)}
                      className="p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white font-semibold"
                    >
                      <option>Ember</option>
                      <option>Salt Society</option>
                      <option>Monsoon</option>
                    </select>
                    <input
                      type="text"
                      value={dishName}
                      onChange={(e) => setDishName(e.target.value)}
                      placeholder="Enter dish name..."
                      className="sm:col-span-2 p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { key: 'visual', label: 'Visual Presentation (20%)' },
                      { key: 'portion', label: 'Portion Accuracy (20%)' },
                      { key: 'ingredient', label: 'Ingredient Quality (15%)' },
                      { key: 'texture', label: 'Texture (15%)' },
                      { key: 'flavour', label: 'Flavour & Seasoning (20%)' },
                      { key: 'temp', label: 'Temperature & Dispatch (10%)' },
                    ].map((c) => (
                      <div key={c.key} className="bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-[11px] font-medium text-slate-300 mb-1">
                          <span>{c.label}</span>
                          <span className="font-bold text-[#D4AF37]">{platingScores[c.key]}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={platingScores[c.key]}
                          onChange={(e) =>
                            setPlatingScores((prev) => ({ ...prev, [c.key]: Number(e.target.value) }))
                          }
                          className="w-full accent-[#D4AF37] cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={saveTastingScore}
                    className="mt-3 w-full py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c59f2c] text-slate-950 text-xs font-bold transition"
                  >
                    Save Dish Score to Tasting Log
                  </button>
                </div>

                {/* Tasting Log History */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="text-[11px] font-bold uppercase text-slate-400 mb-2">Recent Tasting Log</div>
                  <div className="space-y-1.5 max-h-28 overflow-y-auto">
                    {data.tastingLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between text-xs bg-[#0B0F17] px-3 py-1.5 rounded-lg border border-slate-800/80"
                      >
                        <div className="truncate pr-2">
                          <span className="text-[#D4AF37] font-semibold">[{log.outlet}]</span>{' '}
                          <span className="text-slate-200">{log.dish}</span>
                        </div>
                        <span
                          className={`shrink-0 font-bold ${
                            log.pass ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {log.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Weekly Management Calendar & Management Rhythm */}
            <section className="bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                Weekly Management Calendar (Section 8) & Management Rhythm
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                ไม่เลื่อนการตรวจ Critical Food Safety เพราะตารางประชุม • บันทึกผลประจำวันเพื่อส่งเข้า Weekly Report อัตโนมัติ
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {data.weeklyCalendar.map((w) => (
                  <div key={w.day} className="bg-[#0B0F17] rounded-xl border border-slate-800 p-3.5">
                    <div className="text-[11px] font-bold text-[#D4AF37] uppercase">{w.day}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{w.focus}</div>
                    <p className="text-[11px] text-slate-400 mt-1 mb-2">{w.output}</p>
                    <textarea
                      rows={2}
                      placeholder="Weekly focus notes..."
                      value={w.notes}
                      onChange={(e) => updateWeeklyNote(w.day, e.target.value)}
                      className="w-full text-xs p-2 rounded-lg bg-[#131926] border border-slate-800 text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ====================================================================
            MODULE 5: ACTION & CAPA TRACKER
           ==================================================================== */}
        {activeTab === 'capa' && (
          <div className="space-y-6">
            {/* Proposed Follow-up SLA Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3.5">
                <div className="text-xs font-bold text-rose-300 uppercase">CRITICAL SLA</div>
                <p className="text-[11px] text-rose-200/80 mt-1">
                  ควบคุมความเสี่ยงทันที หยุด/แยกอาหารที่ไม่ปลอดภัย แจ้งผู้มีอำนาจ และปฏิบัติตาม Food Safety SOP
                </p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3.5">
                <div className="text-xs font-bold text-orange-300 uppercase">HIGH SLA</div>
                <p className="text-[11px] text-orange-200/80 mt-1">
                  กำหนดการแก้ไขเร่งด่วน เป้าหมายปิดงานภายใน 24 ชั่วโมงเมื่อเหมาะสม
                </p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5">
                <div className="text-xs font-bold text-amber-300 uppercase">MEDIUM SLA</div>
                <p className="text-[11px] text-amber-200/80 mt-1">
                  วางแผนแก้ไขและติดตามผลในรอบประชุมสัปดาห์ (ภายใน 7 วัน)
                </p>
              </div>
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3.5">
                <div className="text-xs font-bold text-slate-200 uppercase">LOW SLA</div>
                <p className="text-[11px] text-slate-400 mt-1">
                  วางแผนปรับปรุงเชิงระบบภายใน 30 วัน พร้อมระบุ Owner และ Evidence
                </p>
              </div>
            </div>

            {/* Filter & New Action Bar */}
            <div className="bg-[#131926] rounded-2xl border border-slate-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={capaFilterOutlet}
                  onChange={(e) => setCapaFilterOutlet(e.target.value)}
                  className="text-xs font-semibold px-3 py-2 rounded-xl bg-[#0B0F17] border border-slate-700 text-white"
                >
                  <option value="ALL">All Outlets</option>
                  <option value="Salt Society">Salt Society</option>
                  <option value="Ember">Ember</option>
                  <option value="Monsoon">Monsoon</option>
                  <option value="Shared">Shared</option>
                </select>
                <select
                  value={capaFilterStatus}
                  onChange={(e) => setCapaFilterStatus(e.target.value)}
                  className="text-xs font-semibold px-3 py-2 rounded-xl bg-[#0B0F17] border border-slate-700 text-white"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending Evidence">Pending Evidence</option>
                  <option value="Verified Closed">Verified Closed</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>

              <button
                onClick={() => setShowNewCapa(!showNewCapa)}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c59f2c] text-slate-950 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" /> Log New Action / CAPA
              </button>
            </div>

            {/* Add CAPA Form */}
            {showNewCapa && (
              <form
                onSubmit={handleAddCapa}
                className="bg-[#131926] rounded-2xl border border-[#D4AF37]/60 p-5 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">New Master Action / CAPA Entry</h4>
                  <button type="button" onClick={() => setShowNewCapa(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Outlet</label>
                    <select
                      value={newCapa.outlet}
                      onChange={(e) => setNewCapa({ ...newCapa, outlet: e.target.value })}
                      className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                    >
                      <option>Salt Society</option>
                      <option>Ember</option>
                      <option>Monsoon</option>
                      <option>Shared</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Category</label>
                    <select
                      value={newCapa.category}
                      onChange={(e) => setNewCapa({ ...newCapa, category: e.target.value })}
                      className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                    >
                      <option>Food Safety</option>
                      <option>Quality</option>
                      <option>Cost</option>
                      <option>Guest</option>
                      <option>People</option>
                      <option>Equipment</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Priority</label>
                    <select
                      value={newCapa.priority}
                      onChange={(e) => setNewCapa({ ...newCapa, priority: e.target.value })}
                      className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                    >
                      <option>Critical</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Deadline</label>
                    <input
                      type="date"
                      value={newCapa.deadline}
                      onChange={(e) => setNewCapa({ ...newCapa, deadline: e.target.value })}
                      className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Finding (Specific Observable Fact)*</label>
                    <input
                      type="text"
                      required
                      value={newCapa.finding}
                      onChange={(e) => setNewCapa({ ...newCapa, finding: e.target.value })}
                      className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Immediate Containment</label>
                    <input
                      type="text"
                      value={newCapa.containment}
                      onChange={(e) => setNewCapa({ ...newCapa, containment: e.target.value })}
                      className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Root Cause (Evidence-based)</label>
                    <input
                      type="text"
                      value={newCapa.rootCause}
                      onChange={(e) => setNewCapa({ ...newCapa, rootCause: e.target.value })}
                      className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Corrective / Preventive Action & Owner</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Action..."
                        value={newCapa.action}
                        onChange={(e) => setNewCapa({ ...newCapa, action: e.target.value })}
                        className="p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Owner..."
                        value={newCapa.owner}
                        onChange={(e) => setNewCapa({ ...newCapa, owner: e.target.value })}
                        className="p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewCapa(false)}
                    className="px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                  >
                    Save Action Item
                  </button>
                </div>
              </form>
            )}

            {/* CAPA Register Table */}
            <section className="bg-[#131926] rounded-2xl border border-slate-800 p-5 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400">
                    <th className="py-3 px-2.5">Action ID</th>
                    <th className="py-3 px-2.5">Outlet / Cat</th>
                    <th className="py-3 px-2.5">Finding, Containment & Root Cause</th>
                    <th className="py-3 px-2.5">Corrective / Preventive Action</th>
                    <th className="py-3 px-2.5">Owner / Due</th>
                    <th className="py-3 px-2.5">Priority</th>
                    <th className="py-3 px-2.5">Status (Click)</th>
                    <th className="py-3 px-2.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-xs">
                  {data.capas
                    .filter((c) => capaFilterOutlet === 'ALL' || c.outlet === capaFilterOutlet)
                    .filter((c) => capaFilterStatus === 'ALL' || c.status === capaFilterStatus)
                    .map((c) => (
                      <tr key={c.id} className="hover:bg-slate-800/30 align-top">
                        <td className="py-3 px-2.5 whitespace-nowrap">
                          <div className="font-bold text-white">{c.id}</div>
                          <div className="text-[11px] text-slate-400">{c.date}</div>
                        </td>
                        <td className="py-3 px-2.5 whitespace-nowrap">
                          <div className="font-semibold text-slate-200">{c.outlet}</div>
                          <div className="text-[11px] text-[#D4AF37]">{c.category}</div>
                        </td>
                        <td className="py-3 px-2.5 max-w-xs space-y-1">
                          <div className="font-semibold text-white">{c.finding}</div>
                          <div className="text-[11px] text-amber-300/90">
                            <strong>Containment:</strong> {c.containment}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            <strong>Root Cause:</strong> {c.rootCause}
                          </div>
                        </td>
                        <td className="py-3 px-2.5 max-w-xs text-slate-300">{c.action}</td>
                        <td className="py-3 px-2.5 whitespace-nowrap">
                          <div className="font-semibold text-slate-200">{c.owner}</div>
                          <div className="text-[11px] text-slate-400">Due: {c.deadline}</div>
                        </td>
                        <td className="py-3 px-2.5 whitespace-nowrap">
                          <StatusBadge status={c.priority} />
                        </td>
                        <td className="py-3 px-2.5 whitespace-nowrap">
                          <button onClick={() => cycleCapaStatus(c.id)}>
                            <StatusBadge status={c.status} />
                          </button>
                          {c.verifiedBy && (
                            <div className="text-[10px] text-emerald-400 mt-1">Verified: {c.verifiedBy}</div>
                          )}
                        </td>
                        <td className="py-3 px-2.5 text-right">
                          <button
                            onClick={() => deleteCapa(c.id)}
                            className="p-1 text-slate-500 hover:text-rose-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>
          </div>
        )}

        {/* ====================================================================
            MODULE 6: MANPOWER & KITCHEN FLOW SIMULATOR
           ==================================================================== */}
        {activeTab === 'manpower' && (
          <div className="space-y-6">
            {/* Manpower & Covers Coverage Simulator */}
            <section className="bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#D4AF37]" />
                    Manpower & Production Coverage Simulator (1 CDC + 12 Production Team)
                  </h3>
                  <p className="text-xs text-slate-400">
                    ฐานคำนวณ: พนักงาน 12 คน × 5 วันทำงาน = 60 Production Man-days/สัปดาห์ (เฉลี่ย 8.57 คน/วัน) + CDC 5 Man-days/สัปดาห์ = 65 Total Man-days
                  </p>
                </div>
                <StatusBadge status="WORKING HYPOTHESIS" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Sliders */}
                <div className="lg:col-span-5 bg-[#0B0F17] rounded-xl border border-slate-800 p-4 space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-bold text-white mb-1">
                      <span>Salt Society Allocation (~112 seats)</span>
                      <span className="text-[#D4AF37]">{sim.saltStaff} Cooks</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="9"
                      value={sim.saltStaff}
                      onChange={(e) => {
                        const s = Number(e.target.value);
                        setSim((p) => ({ ...p, saltStaff: s, emberStaff: 12 - s }));
                      }}
                      className="w-full accent-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-white mb-1">
                      <span>Ember + Monsoon Allocation (141+ seats)</span>
                      <span className="text-[#D4AF37]">{sim.emberStaff} Cooks</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="9"
                      value={sim.emberStaff}
                      onChange={(e) => {
                        const em = Number(e.target.value);
                        setSim((p) => ({ ...p, emberStaff: em, saltStaff: 12 - em }));
                      }}
                      className="w-full accent-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Salt Covers/Day</label>
                      <input
                        type="number"
                        value={sim.saltCovers}
                        onChange={(e) => setSim((p) => ({ ...p, saltCovers: Number(e.target.value) || 0 }))}
                        className="w-full p-1.5 rounded bg-[#131926] border border-slate-700 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Ember Covers/Day</label>
                      <input
                        type="number"
                        value={sim.emberCovers}
                        onChange={(e) => setSim((p) => ({ ...p, emberCovers: Number(e.target.value) || 0 }))}
                        className="w-full p-1.5 rounded bg-[#131926] border border-slate-700 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Monsoon Covers</label>
                      <input
                        type="number"
                        value={sim.monsoonCovers}
                        onChange={(e) => setSim((p) => ({ ...p, monsoonCovers: Number(e.target.value) || 0 }))}
                        className="w-full p-1.5 rounded bg-[#131926] border border-slate-700 text-white font-bold"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Stewarding inside 12 staff?</span>
                    <button
                      onClick={() => setSim((p) => ({ ...p, stewardingIncluded: !p.stewardingIncluded }))}
                      className={`px-3 py-1 rounded-lg font-bold ${
                        sim.stewardingIncluded
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {sim.stewardingIncluded ? 'YES (-3 Cooks Risk)' : 'NO (Separate Team)'}
                    </button>
                  </div>
                </div>

                {/* Simulation Outputs */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(() => {
                    const effectiveSalt = sim.stewardingIncluded ? Math.max(1, sim.saltStaff - 1.5) : sim.saltStaff;
                    const effectiveEmber = sim.stewardingIncluded ? Math.max(1, sim.emberStaff - 1.5) : sim.emberStaff;
                    const saltDailyAvg = (effectiveSalt * 5) / 7;
                    const emberDailyAvg = (effectiveEmber * 5) / 7;
                    const totalDailyAvg = saltDailyAvg + emberDailyAvg;
                    const totalCovers = sim.saltCovers + sim.emberCovers + sim.monsoonCovers;
                    const coversPerCook = totalDailyAvg > 0 ? (totalCovers / totalDailyAvg).toFixed(1) : '0';

                    return (
                      <>
                        <div className="bg-[#0B0F17] rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
                          <div className="text-[11px] font-bold uppercase text-sky-400">Salt Society Coverage</div>
                          <div className="text-2xl font-bold text-white my-1">
                            {saltDailyAvg.toFixed(2)} <span className="text-xs font-normal text-slate-400">cooks/day</span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {(sim.saltCovers / Math.max(0.5, saltDailyAvg)).toFixed(1)} covers/cook/day across Lunch & Dinner.
                          </p>
                        </div>

                        <div className="bg-[#0B0F17] rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
                          <div className="text-[11px] font-bold uppercase text-amber-400">Ember + Monsoon</div>
                          <div className="text-2xl font-bold text-white my-1">
                            {emberDailyAvg.toFixed(2)} <span className="text-xs font-normal text-slate-400">cooks/day</span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {((sim.emberCovers + sim.monsoonCovers) / Math.max(0.5, emberDailyAvg)).toFixed(1)}{' '}
                            combined covers/cook/day (141 seats + bar bites).
                          </p>
                        </div>

                        <div
                          className={`rounded-xl border p-4 flex flex-col justify-between ${
                            Number(coversPerCook) > 32 || sim.stewardingIncluded
                              ? 'bg-rose-500/10 border-rose-500/40'
                              : 'bg-emerald-500/10 border-emerald-500/30'
                          }`}
                        >
                          <div className="text-[11px] font-bold uppercase text-slate-200">Productivity Load</div>
                          <div className="text-2xl font-bold text-white my-1">
                            {coversPerCook} <span className="text-xs font-normal text-slate-300">covers/cook</span>
                          </div>
                          <p className="text-[11px] text-slate-300">
                            {sim.stewardingIncluded
                              ? 'ALERT: Stewarding inclusion reduces culinary line to 6.43 cooks/day.'
                              : Number(coversPerCook) > 32
                              ? 'HIGH LOAD: Peak service bottleneck risk — review split shifts & prep par.'
                              : 'BALANCED: Within manageable luxury dining productivity range.'}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </section>

            {/* Kitchen Layout & 7-Zone Responsibility Matrix + Leadership Index */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <section className="lg:col-span-7 bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  Kitchen Layout & Production Flow Matrix (Section 4)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-[11px] font-bold uppercase text-slate-400">
                        <th className="py-2.5 px-3">Kitchen Area / Zone</th>
                        <th className="py-2.5 px-3">Assigned Owner</th>
                        <th className="py-2.5 px-3">Operational & Food Safety Standard</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70 text-xs">
                      {KITCHEN_ZONES.map((z, i) => (
                        <tr key={i} className="hover:bg-slate-800/30">
                          <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">{z.zone}</td>
                          <td className="py-2.5 px-3 text-[#D4AF37] whitespace-nowrap">{z.owner}</td>
                          <td className="py-2.5 px-3 text-slate-300">{z.standard}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="lg:col-span-5 bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-1">
                  <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
                  Leadership Index (8 Evaluation Dimensions)
                </h3>
                <p className="text-[11px] text-slate-400 mb-3">
                  ใช้ประเมินพัฒนาการรายบุคคล (Scale 1–5) จากหลักฐานและหลาย Service ไม่ใช้เหตุการณ์เดียวตัดสิน
                </p>
                <div className="space-y-2">
                  {LEADERSHIP_DIMENSIONS.map((d, i) => (
                    <div key={i} className="bg-[#0B0F17] border border-slate-800 rounded-xl p-2.5 text-xs">
                      <span className="font-bold text-[#D4AF37]">{d.dim}: </span>
                      <span className="text-slate-300">{d.desc}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* ====================================================================
            MODULE 7: EXECUTIVE REPORT GENERATOR
           ==================================================================== */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <section className="bg-[#131926] rounded-2xl border border-slate-800 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 print:hidden">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#D4AF37]" />
                    Executive Report Generator (Section 14 & Section 19 Templates)
                  </h3>
                  <p className="text-xs text-slate-400">
                    เลือกรูปแบบรายงาน กรอกข้อมูลประจำวันหรือประจำสัปดาห์ แล้วกด Copy หรือ Print / Save PDF ได้ทันที
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setReportType('daily')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                      reportType === 'daily'
                        ? 'bg-[#D4AF37] text-slate-950'
                        : 'bg-[#0B0F17] text-slate-300 border border-slate-700'
                    }`}
                  >
                    Daily CDC Report
                  </button>
                  <button
                    onClick={() => setReportType('weekly')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                      reportType === 'weekly'
                        ? 'bg-[#D4AF37] text-slate-950'
                        : 'bg-[#0B0F17] text-slate-300 border border-slate-700'
                    }`}
                  >
                    Weekly Management Review
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Inputs */}
                <div className="lg:col-span-6 space-y-3 text-xs print:hidden">
                  {reportType === 'daily' ? (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-400 block mb-1">Date</label>
                          <input
                            type="date"
                            value={dailyReportForm.date}
                            onChange={(e) => setDailyReportForm({ ...dailyReportForm, date: e.target.value })}
                            className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Shift</label>
                          <input
                            type="text"
                            value={dailyReportForm.shift}
                            onChange={(e) => setDailyReportForm({ ...dailyReportForm, shift: e.target.value })}
                            className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-slate-400 block mb-1">Salt (Act/Fcst)</label>
                          <input
                            type="text"
                            value={dailyReportForm.coversSalt}
                            onChange={(e) => setDailyReportForm({ ...dailyReportForm, coversSalt: e.target.value })}
                            className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Ember (Act/Fcst)</label>
                          <input
                            type="text"
                            value={dailyReportForm.coversEmber}
                            onChange={(e) => setDailyReportForm({ ...dailyReportForm, coversEmber: e.target.value })}
                            className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Monsoon (Act/Fcst)</label>
                          <input
                            type="text"
                            value={dailyReportForm.coversMonsoon}
                            onChange={(e) => setDailyReportForm({ ...dailyReportForm, coversMonsoon: e.target.value })}
                            className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                          />
                        </div>
                      </div>
                      {[
                        { key: 'staffingNotes', label: 'Staffing / Absence / OT' },
                        { key: 'vipAllergy', label: 'VIP / Allergy / Dietary / Special Requests' },
                        { key: 'eightySix', label: '86 Items / Menu Changes' },
                        { key: 'hygieneNotes', label: 'Hygiene / Food Safety Findings' },
                        { key: 'qualityNotes', label: 'Food Quality / Tasting / Plating' },
                        { key: 'ticketComplaints', label: 'Ticket Time / Food Returns / Complaints' },
                        { key: 'stockWaste', label: 'Stock / Receiving / Waste / Equipment' },
                        { key: 'actionsOwner', label: 'Actions / Owner / Deadline' },
                        { key: 'escalation', label: 'Escalation / Management Support Required' },
                        { key: 'handover', label: 'Outstanding Handover' },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="text-slate-400 block mb-1">{field.label}</label>
                          <input
                            type="text"
                            value={dailyReportForm[field.key]}
                            onChange={(e) =>
                              setDailyReportForm({ ...dailyReportForm, [field.key]: e.target.value })
                            }
                            className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-400 block mb-1">Week Ending Date</label>
                          <input
                            type="date"
                            value={weeklyReportForm.weekEnding}
                            onChange={(e) =>
                              setWeeklyReportForm({ ...weeklyReportForm, weekEnding: e.target.value })
                            }
                            className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Reviewed By</label>
                          <input
                            type="text"
                            value={weeklyReportForm.reviewedBy}
                            onChange={(e) =>
                              setWeeklyReportForm({ ...weeklyReportForm, reviewedBy: e.target.value })
                            }
                            className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                          />
                        </div>
                      </div>
                      {[
                        { key: 'salesCovers', label: '1. Sales & Covers' },
                        { key: 'foodCost', label: '2. Food Cost / Theoretical vs Actual' },
                        { key: 'inventoryWaste', label: '3. Inventory / Waste' },
                        { key: 'hygieneHaccp', label: '4. Hygiene / Audit / CAPA' },
                        { key: 'foodQuality', label: '5. Food Quality / Menu / Plating' },
                        { key: 'guestFeedback', label: '6. Guest Feedback / Complaints' },
                        { key: 'manpowerOt', label: '7. Manpower / OT / Attendance' },
                        { key: 'training', label: '8. Training / Leadership' },
                        { key: 'openCapa', label: '9. Open CAPA Summary' },
                        { key: 'nextWeekPriorities', label: '10. Next Week Priorities' },
                        { key: 'mgmtComments', label: 'Management Comments / Decisions' },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="text-slate-400 block mb-1">{field.label}</label>
                          <input
                            type="text"
                            value={weeklyReportForm[field.key]}
                            onChange={(e) =>
                              setWeeklyReportForm({ ...weeklyReportForm, [field.key]: e.target.value })
                            }
                            className="w-full p-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-white"
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Live Formatted Preview & Actions */}
                <div className="lg:col-span-6 flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-2.5 print:hidden">
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                      Formatted Executive Report Preview
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyReport}
                        className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c59f2c] text-slate-950 text-xs font-bold flex items-center gap-1.5"
                      >
                        {copiedReport ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedReport ? 'Copied!' : 'Generate & Copy'}
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Print / Save PDF
                      </button>
                    </div>
                  </div>
                  <pre className="flex-1 bg-[#0B0F17] text-slate-200 p-4 sm:p-5 rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap border border-slate-800 print:bg-white print:text-black print:border-slate-300">
                    {formattedReport}
                  </pre>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}