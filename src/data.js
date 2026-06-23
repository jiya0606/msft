// Simulated "now" — June 22, 2026 at 1:20 PM (makes "40 min to meeting" true for 2pm sync)
export const NOW = new Date('2026-06-22T13:20:00');

// ─── Notebooks ───────────────────────────────────────────────────────────────
export const INITIAL_NOTEBOOKS = [
  {
    id: 'checkout-redesign',
    name: 'Checkout Redesign Launch',
    type: 'launch',
    lastUpdatedAt: new Date('2026-06-22T11:00:00'),
    hasSavedRecipe: false,
    recipeName: null,
    averageContactIntervalDays: null,
    lastContactAt: null,
    upcomingMeeting: {
      id: 'm1',
      title: 'Checkout Redesign Launch Sync',
      notebookId: 'checkout-redesign',
      startTime: new Date('2026-06-22T14:00:00'),
      attendees: ['Priya Nair', 'Tom Alvarez', 'Marcus Webb'],
      agendaDocAttached: false,
      recurringSeriesJustAgendaCount: 0,
    },
  },
  {
    id: 'mobile-push',
    name: 'Mobile Push Notifications — PRD',
    type: 'prd',
    lastUpdatedAt: new Date('2026-06-21T09:00:00'),
    hasSavedRecipe: false,
    recipeName: null,
    averageContactIntervalDays: null,
    lastContactAt: null,
    upcomingMeeting: {
      id: 'm4',
      title: 'Push Notification Review with Tom',
      notebookId: 'mobile-push',
      startTime: new Date('2026-06-23T14:00:00'),
      attendees: ['Tom Alvarez'],
      agendaDocAttached: false,
      recurringSeriesJustAgendaCount: 0,
    },
  },
  {
    id: 'priya-1on1',
    name: 'Priya Nair — 1:1',
    type: '1on1',
    linkedPersonName: 'Priya Nair',
    lastUpdatedAt: new Date('2026-06-19T10:00:00'),
    hasSavedRecipe: false,
    recipeName: null,
    averageContactIntervalDays: 7,
    lastContactAt: new Date('2026-06-19T10:00:00'),
    upcomingMeeting: {
      id: 'm2',
      title: 'Priya Nair 1:1',
      notebookId: 'priya-1on1',
      startTime: new Date('2026-06-23T10:00:00'),
      attendees: ['Priya Nair'],
      agendaDocAttached: false,
      recurringSeriesJustAgendaCount: 0,
    },
  },
  {
    id: 'sprint-24',
    name: 'Sprint 24 Tracking',
    type: 'sprint_tracking',
    lastUpdatedAt: new Date('2026-06-22T09:00:00'),
    hasSavedRecipe: false,
    recipeName: null,
    averageContactIntervalDays: null,
    lastContactAt: null,
    upcomingMeeting: null,
  },
];

// ─── Tasks ────────────────────────────────────────────────────────────────────
export const INITIAL_TASKS = [
  // Global ranked to-do list (10 seed tasks)
  {
    id: 't1',
    text: 'Send updated mockups to Priya',
    ownerName: 'You',
    notebookId: 'checkout-redesign',
    dueAt: new Date('2026-06-22T14:00:00'),
    createdAt: new Date('2026-06-21T09:00:00'),
    completedAt: null,
    sourceType: 'meeting',
    sourceLabel: 'from meeting',
    urgencyLanguageDetected: false,
    manualOverride: false,
  },
  {
    id: 't2',
    text: 'Confirm Sprint 24 scope includes contrast fix',
    ownerName: 'You',
    notebookId: 'checkout-redesign',
    dueAt: new Date('2026-06-22T23:59:00'),
    createdAt: new Date('2026-06-20T10:00:00'),
    completedAt: null,
    sourceType: 'manual',
    sourceLabel: 'manual',
    urgencyLanguageDetected: false,
    manualOverride: false,
  },
  {
    id: 't4',
    text: 'Submit Sprint 24 retro notes',
    ownerName: 'You',
    notebookId: 'sprint-24',
    dueAt: new Date('2026-06-22T15:20:00'),
    createdAt: new Date('2026-06-21T10:00:00'),
    completedAt: null,
    sourceType: 'meeting',
    sourceLabel: 'from meeting',
    urgencyLanguageDetected: false,
    manualOverride: false,
  },
  {
    id: 't5',
    text: 'Draft launch announcement copy',
    ownerName: 'You',
    notebookId: 'checkout-redesign',
    dueAt: new Date('2026-06-23T23:59:00'),
    createdAt: new Date('2026-06-20T10:00:00'),
    completedAt: null,
    sourceType: 'manual',
    sourceLabel: 'manual',
    urgencyLanguageDetected: false,
    manualOverride: false,
  },
  {
    id: 't6',
    text: 'Review push notification frequency options with Tom',
    ownerName: 'You',
    notebookId: 'mobile-push',
    dueAt: null,
    createdAt: new Date('2026-06-21T10:00:00'),
    completedAt: null,
    sourceType: 'manual',
    sourceLabel: 'manual',
    urgencyLanguageDetected: false,
    manualOverride: false,
  },
  {
    id: 't7',
    text: 'Get legal sign-off on checkout terms',
    ownerName: 'You',
    notebookId: 'checkout-redesign',
    dueAt: null,
    createdAt: new Date('2026-06-16T09:00:00'),
    completedAt: null,
    sourceType: 'manual',
    sourceLabel: 'manual',
    urgencyLanguageDetected: false,
    manualOverride: false,
  },
  // Checkout-specific detailed tasks (for notebook detail view)
  {
    id: 'ck1',
    text: 'Share contrast-fixed mockups',
    ownerName: 'Tom',
    notebookId: 'checkout-redesign',
    dueAt: new Date('2026-06-23T23:59:00'),
    createdAt: new Date('2026-06-21T10:00:00'),
    completedAt: null,
    sourceType: 'meeting',
    sourceLabel: 'from meeting',
    urgencyLanguageDetected: false,
    manualOverride: false,
    detailOnly: true,
  },
  {
    id: 'ck2',
    text: 'Confirm fix is in Sprint 24 scope',
    ownerName: 'Priya',
    notebookId: 'checkout-redesign',
    dueAt: new Date('2026-06-22T23:59:00'),
    createdAt: new Date('2026-06-21T10:00:00'),
    completedAt: null,
    sourceType: 'meeting',
    sourceLabel: 'from meeting',
    urgencyLanguageDetected: false,
    manualOverride: false,
    detailOnly: true,
  },
  {
    id: 'ck3',
    text: 'Draft launch announcement copy',
    ownerName: 'You',
    notebookId: 'checkout-redesign',
    dueAt: new Date('2026-06-26T23:59:00'),
    createdAt: new Date('2026-06-20T10:00:00'),
    completedAt: null,
    sourceType: 'manual',
    sourceLabel: 'manual',
    urgencyLanguageDetected: false,
    manualOverride: false,
    detailOnly: true,
  },
  {
    id: 'ck4',
    text: 'Get legal sign-off on new checkout terms',
    ownerName: 'You',
    notebookId: 'checkout-redesign',
    dueAt: null,
    createdAt: new Date('2026-06-16T09:00:00'),
    completedAt: null,
    sourceType: 'manual',
    sourceLabel: 'manual',
    urgencyLanguageDetected: false,
    manualOverride: false,
    detailOnly: true,
  },
  // Completed tasks for checkout detail
  {
    id: 'ck-done1',
    text: 'Finalize cart redesign wireframes',
    ownerName: 'You',
    notebookId: 'checkout-redesign',
    dueAt: null,
    createdAt: new Date('2026-06-10T09:00:00'),
    completedAt: new Date('2026-06-18T10:00:00'),
    sourceType: 'manual',
    sourceLabel: 'manual',
    urgencyLanguageDetected: false,
    manualOverride: false,
    detailOnly: true,
  },
  {
    id: 'ck-done2',
    text: 'Get design sign-off from Tom',
    ownerName: 'You',
    notebookId: 'checkout-redesign',
    dueAt: null,
    createdAt: new Date('2026-06-12T09:00:00'),
    completedAt: new Date('2026-06-20T10:00:00'),
    sourceType: 'manual',
    sourceLabel: 'manual',
    urgencyLanguageDetected: false,
    manualOverride: false,
    detailOnly: true,
  },
];

// ─── Files ────────────────────────────────────────────────────────────────────
export const INITIAL_FILES = {
  'checkout-redesign': [
    { id: 'f1', notebookId: 'checkout-redesign', name: 'Launch Plan.docx', fileType: 'docx', addedAt: new Date('2026-06-19T10:00:00'), addedBy: 'user', githubIssue: null },
    { id: 'f2', notebookId: 'checkout-redesign', name: 'Checkout Redesign — PRD.docx', fileType: 'docx', addedAt: new Date('2026-06-15T10:00:00'), addedBy: 'user', githubIssue: null },
    { id: 'f3', notebookId: 'checkout-redesign', name: 'Sprint 24 scope notes', fileType: 'note', addedAt: new Date('2026-06-18T10:00:00'), addedBy: 'user', githubIssue: null },
    { id: 'f4', notebookId: 'checkout-redesign', name: 'Push notification frequency options', fileType: 'note', addedAt: new Date('2026-06-22T11:00:00'), addedBy: 'copilot_auto_filed', githubIssue: null, originalNotebookId: null },
  ],
  'mobile-push': [
    { id: 'f5', notebookId: 'mobile-push', name: 'Mobile Push Notifications — PRD.docx', fileType: 'docx', addedAt: new Date('2026-06-10T10:00:00'), addedBy: 'user', githubIssue: null },
    { id: 'f6', notebookId: 'mobile-push', name: 'Push notification frequency options', fileType: 'note', addedAt: new Date('2026-06-21T10:00:00'), addedBy: 'user', githubIssue: null },
    { id: 'f7', notebookId: 'mobile-push', name: 'User research — notification preferences', fileType: 'note', addedAt: new Date('2026-06-08T10:00:00'), addedBy: 'user', githubIssue: null },
  ],
  'priya-1on1': [
    { id: 'f8', notebookId: 'priya-1on1', name: 'Notes', fileType: 'note', addedAt: new Date('2026-06-19T10:00:00'), addedBy: 'user', githubIssue: null },
  ],
  'sprint-24': [
    { id: 'f9', notebookId: 'sprint-24', name: 'Sprint 24 Board', fileType: 'note', addedAt: new Date('2026-06-10T10:00:00'), addedBy: 'user', githubIssue: null },
  ],
};

// ─── Activity Logs ────────────────────────────────────────────────────────────
export const INITIAL_ACTIVITY_LOGS = {
  'checkout-redesign': [
    { id: 'al1', notebookId: 'checkout-redesign', description: "Copilot filed 'Push notification frequency options' here", timestamp: new Date('2026-06-22T11:00:00'), actor: 'copilot' },
    { id: 'al2', notebookId: 'checkout-redesign', description: 'Meeting notes imported from Teams transcript — Launch Sync', timestamp: new Date('2026-06-21T15:00:00'), actor: 'copilot' },
    { id: 'al3', notebookId: 'checkout-redesign', description: 'You added Checkout Redesign — PRD.docx', timestamp: new Date('2026-06-19T10:00:00'), actor: 'user' },
  ],
  'mobile-push': [],
  'priya-1on1': [
    { id: 'al4', notebookId: 'priya-1on1', description: 'Weekly 1:1 with Priya Nair — meeting notes added', timestamp: new Date('2026-06-19T10:00:00'), actor: 'user' },
    { id: 'al5', notebookId: 'priya-1on1', description: 'Weekly 1:1 with Priya Nair — meeting notes added', timestamp: new Date('2026-06-12T10:00:00'), actor: 'user' },
    { id: 'al6', notebookId: 'priya-1on1', description: 'Weekly 1:1 with Priya Nair — meeting notes added', timestamp: new Date('2026-06-05T10:00:00'), actor: 'user' },
  ],
  'sprint-24': [],
};

// ─── Proposed Actions ─────────────────────────────────────────────────────────
export const INITIAL_PROPOSED_ACTIONS = [
  {
    id: 'pa2',
    type: 'recipe_suggestion',
    description: 'Sprint 24 Tracking has new data from Sprint 23 — want me to run the Sprint Velocity Summary to prep for planning?',
    targetNotebookId: 'sprint-24',
    status: 'pending',
  },
];

// ─── Fake "duplicate" notebook for merge review modal ─────────────────────────
export const DUPLICATE_NOTEBOOK = {
  id: 'checkout-redesign-dup',
  name: 'Checkout Redesign — Launch Plan',
  type: 'launch',
  files: [
    { id: 'dup-f1', name: 'Launch Plan v2.docx', addedAt: new Date('2026-06-18T10:00:00'), addedBy: 'user' },
    { id: 'dup-f2', name: 'Q2 Launch Timeline.xlsx', addedAt: new Date('2026-06-15T10:00:00'), addedBy: 'user' },
  ],
  tasks: [
    { id: 'dup-t1', text: 'Finalize launch date with stakeholders', completedAt: null },
    { id: 'dup-t2', text: 'Get final approvals from legal', completedAt: null },
  ],
  activityLogs: [
    { description: 'You created this notebook', timestamp: new Date('2026-06-10T10:00:00'), actor: 'user' },
    { description: 'Launch Plan v2.docx added', timestamp: new Date('2026-06-18T10:00:00'), actor: 'user' },
  ],
};

// ─── Sprint Tickets (for analysis recipe) ─────────────────────────────────────
// Totals: 38 committed, 34 done, Checkout=20pts(59%≈60%), 3 carryovers, bugs 22% longer
export const SPRINT_TICKETS = [
  { id: 'CK-101', epic: 'Checkout Redesign', points: 5, status: 'done', sprintCarriedFrom: null, ticketType: 'feature', daysToClose: 3 },
  { id: 'CK-102', epic: 'Checkout Redesign', points: 3, status: 'done', sprintCarriedFrom: null, ticketType: 'feature', daysToClose: 4 },
  { id: 'CK-103', epic: 'Checkout Redesign', points: 8, status: 'done', sprintCarriedFrom: null, ticketType: 'feature', daysToClose: 3 },
  { id: 'CK-104', epic: 'Checkout Redesign', points: 2, status: 'done', sprintCarriedFrom: null, ticketType: 'bug', daysToClose: 4 },
  { id: 'CK-105', epic: 'Checkout Redesign', points: 2, status: 'done', sprintCarriedFrom: null, ticketType: 'feature', daysToClose: 3 },
  { id: 'PUSH-102', epic: 'Push Notifications PRD', points: 5, status: 'done', sprintCarriedFrom: 'Sprint 23', ticketType: 'feature', daysToClose: 4 },
  { id: 'PUSH-115', epic: 'Push Notifications PRD', points: 3, status: 'done', sprintCarriedFrom: 'Sprint 23', ticketType: 'bug', daysToClose: 4 },
  { id: 'PUSH-118', epic: 'Push Notifications PRD', points: 2, status: 'done', sprintCarriedFrom: 'Sprint 23', ticketType: 'bug', daysToClose: 4 },
  { id: 'OB-201', epic: 'Onboarding A/B Test', points: 2, status: 'done', sprintCarriedFrom: null, ticketType: 'feature', daysToClose: 3 },
  { id: 'Q3-301', epic: 'Q3 Roadmap', points: 2, status: 'done', sprintCarriedFrom: null, ticketType: 'feature', daysToClose: 3 },
  { id: 'Q3-302', epic: 'Q3 Roadmap', points: 2, status: 'not_done', sprintCarriedFrom: null, ticketType: 'feature', daysToClose: null },
  { id: 'OB-202', epic: 'Onboarding A/B Test', points: 2, status: 'not_done', sprintCarriedFrom: null, ticketType: 'feature', daysToClose: null },
];

// ─── Recipe types with saved state (type-level, not per-notebook) ─────────────
export const INITIAL_SAVED_RECIPE_TYPES = new Set();

// ─── Logic: Task Scoring ──────────────────────────────────────────────────────
export function scoreTask(task, notebooks, now = NOW) {
  if (task.completedAt) return { score: -Infinity, reason: 'completed', breakdown: {} };

  const breakdown = {};
  let score = 0;

  // 1. Due-date proximity
  if (task.dueAt) {
    const msUntilDue = task.dueAt - now;
    const hoursUntilDue = msUntilDue / (1000 * 60 * 60);
    let dateScore = 0;
    if (hoursUntilDue <= 0) {
      dateScore = 110; // overdue
      breakdown.dueDate = { score: dateScore, label: 'Overdue' };
    } else if (hoursUntilDue <= 4) {
      dateScore = 100;
      const mins = Math.round(hoursUntilDue * 60);
      breakdown.dueDate = { score: dateScore, label: mins < 60 ? `Due in ${mins}m` : `Due in ${Math.round(hoursUntilDue)}h` };
    } else if (hoursUntilDue <= 24) {
      dateScore = 70;
      breakdown.dueDate = { score: dateScore, label: hoursUntilDue < 3 ? `Due in ${Math.round(hoursUntilDue)}h` : 'Due today' };
    } else if (hoursUntilDue <= 48) {
      dateScore = 40;
      breakdown.dueDate = { score: dateScore, label: 'Due tomorrow' };
    } else if (hoursUntilDue <= 72) {
      dateScore = 25;
      breakdown.dueDate = { score: dateScore, label: 'Due in 3 days' };
    } else {
      dateScore = 10;
      breakdown.dueDate = { score: dateScore, label: 'Has due date' };
    }
    score += dateScore;
  }

  // 2. Meeting linkage
  const nb = notebooks.find(n => n.id === task.notebookId);
  if (nb?.upcomingMeeting) {
    const msUntilMeeting = nb.upcomingMeeting.startTime - now;
    const hoursUntilMeeting = msUntilMeeting / (1000 * 60 * 60);
    if (hoursUntilMeeting > 0 && hoursUntilMeeting <= 24) {
      let meetScore = 0;
      let meetLabel = '';
      if (hoursUntilMeeting <= 1) {
        meetScore = 95;
        meetLabel = `Meeting in ${Math.round(hoursUntilMeeting * 60)}min`;
      } else if (hoursUntilMeeting <= 4) {
        meetScore = 85;
        meetLabel = `Meeting in ${Math.round(hoursUntilMeeting)}h`;
      } else {
        meetScore = 75;
        meetLabel = hoursUntilMeeting <= 8 ? 'Meeting today' : 'Meeting tomorrow';
      }
      breakdown.meeting = { score: meetScore, label: meetLabel };
      score += meetScore;
    }
  }

  // 3. Urgency language
  if (task.urgencyLanguageDetected) {
    const urgScore = 30;
    const label = task.sourceType === 'email' ? 'Asked directly over email' : 'Urgent';
    breakdown.urgency = { score: urgScore, label };
    score += urgScore;
  }

  // 4. Staleness (no due date)
  if (!task.dueAt) {
    const daysSinceCreated = (now - task.createdAt) / (1000 * 60 * 60 * 24);
    const staleScore = Math.min(Math.floor(daysSinceCreated) * 2, 35);
    let staleLabel = '';
    if (daysSinceCreated < 1) staleLabel = 'Added today';
    else if (daysSinceCreated < 7) staleLabel = `Open ${Math.floor(daysSinceCreated)} day${Math.floor(daysSinceCreated) !== 1 ? 's' : ''}`;
    else if (daysSinceCreated < 14) staleLabel = `Open ${Math.floor(daysSinceCreated)} days`;
    else staleLabel = `Open ${Math.floor(daysSinceCreated / 7)} week${Math.floor(daysSinceCreated / 7) !== 1 ? 's' : ''}`;

    // Add "usually monthly" for 1:1 notebooks
    if (nb?.type === '1on1' && nb?.averageContactIntervalDays) {
      staleLabel += ` — usually ${nb.averageContactIntervalDays === 7 ? 'weekly' : nb.averageContactIntervalDays === 28 ? 'monthly' : `every ${nb.averageContactIntervalDays} days`}`;
    }
    breakdown.staleness = { score: staleScore, label: staleLabel };
    score += staleScore;
  }

  // Derive winning reason (highest contributing signal)
  let topReason = 'No signal';
  let topScore = 0;
  for (const [, v] of Object.entries(breakdown)) {
    if (v.score > topScore) { topScore = v.score; topReason = v.label; }
  }

  return { score, reason: topReason, breakdown };
}

export function rankTasks(tasks, notebooks, now = NOW) {
  const withScores = tasks
    .filter(t => !t.completedAt && !t.detailOnly)
    .map(t => {
      if (t.manualOverride) return { ...t, _score: Infinity, _reason: 'Pinned', _breakdown: {} };
      const { score, reason, breakdown } = scoreTask(t, notebooks, now);
      return { ...t, _score: score, _reason: reason, _breakdown: breakdown };
    });
  withScores.sort((a, b) => b._score - a._score);
  return withScores;
}

// ─── Logic: Content Classification ───────────────────────────────────────────
export function classifyContent(text, notebooks) {
  const lower = text.toLowerCase();
  const words = lower.split(/\W+/).filter(w => w.length > 2);
  const matches = [];

  for (const nb of notebooks) {
    if (nb.id === 'quick-notes') continue;
    let score = 0;
    const nbWords = nb.name.toLowerCase().split(/\W+/).filter(w => w.length > 2);
    const personWords = nb.linkedPersonName
      ? nb.linkedPersonName.toLowerCase().split(/\W+/).filter(w => w.length > 1)
      : [];

    for (const word of words) {
      if (nbWords.some(nw => nw === word || (nw.length > 4 && (nw.includes(word) || word.includes(nw))))) score += 2;
    }
    for (const pw of personWords) {
      if (lower.includes(pw)) score += 3;
    }

    if (score > 0) matches.push({ notebook: nb, score });
  }

  matches.sort((a, b) => b.score - a.score);
  return matches;
}

// ─── Logic: Staleness Detection ───────────────────────────────────────────────
export function checkStaleness(notebooks, activityLogs, stalenessDismissals, now = NOW) {
  const nudges = [];
  const COOLDOWN_DAYS = 5;

  for (const nb of notebooks) {
    if (nb.type !== '1on1' || !nb.averageContactIntervalDays || !nb.lastContactAt) continue;

    const dismissedAt = stalenessDismissals[nb.id];
    if (dismissedAt) {
      const daysSinceDismissal = (now - dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissal < COOLDOWN_DAYS) continue;
    }

    const daysSinceContact = (now - nb.lastContactAt) / (1000 * 60 * 60 * 24);
    const threshold = nb.averageContactIntervalDays * 1.25;
    if (daysSinceContact > threshold) {
      const weeks = Math.round(daysSinceContact / 7);
      const periodLabel = nb.averageContactIntervalDays === 7 ? 'weekly'
        : nb.averageContactIntervalDays === 28 ? 'monthly'
        : `every ${nb.averageContactIntervalDays} days`;
      nudges.push({
        notebookId: nb.id,
        personName: nb.linkedPersonName,
        daysSinceContact: Math.round(daysSinceContact),
        weeksLabel: `${weeks} week${weeks !== 1 ? 's' : ''}`,
        periodLabel,
      });
    }
  }
  return nudges;
}

// ─── Logic: Sprint Recipe Analysis ───────────────────────────────────────────
export function computeSprintRecipe(tickets) {
  const done = tickets.filter(t => t.status === 'done');
  const committed = tickets;
  const totalCommitted = committed.reduce((s, t) => s + t.points, 0);
  const totalDone = done.reduce((s, t) => s + t.points, 0);
  const completionPct = Math.round((totalDone / totalCommitted) * 100);

  const epicPoints = {};
  for (const t of done) {
    epicPoints[t.epic] = (epicPoints[t.epic] || 0) + t.points;
  }
  const topEpic = Object.entries(epicPoints).sort((a, b) => b[1] - a[1])[0];
  const topEpicPct = Math.round((topEpic[1] / totalDone) * 100);

  const carryover = done.filter(t => t.sprintCarriedFrom);
  const carryoverEpics = [...new Set(carryover.map(t => t.epic))];

  const featureDays = done.filter(t => t.ticketType === 'feature').map(t => t.daysToClose);
  const bugDays = done.filter(t => t.ticketType === 'bug').map(t => t.daysToClose);
  const avgFeature = featureDays.reduce((s, d) => s + d, 0) / featureDays.length;
  const avgBug = bugDays.reduce((s, d) => s + d, 0) / bugDays.length;
  const bugPctLonger = Math.round(((avgBug - avgFeature) / avgFeature) * 100);

  return {
    totalDone, totalCommitted, completionPct,
    topEpicName: topEpic[0], topEpicPct,
    carryoverCount: carryover.length,
    carryoverTickets: carryover.map(t => t.id),
    carryoverEpics,
    avgFeatureDays: avgFeature.toFixed(1),
    avgBugDays: avgBug.toFixed(1),
    bugPctLonger,
    doneCount: done.length,
  };
}

// ─── Utility: time formatting ─────────────────────────────────────────────────
export function fmtRelTime(date, now = NOW) {
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (weeks === 1) return '1 week ago';
  return `${weeks} weeks ago`;
}

export const TYPE_LABELS = {
  launch: 'Launch', prd: 'PRD', '1on1': '1:1',
  sprint_tracking: 'Sprint', planning: 'Planning',
  project: 'Project', general: 'General',
};

export const NB_OPEN_TASK_COUNTS = {
  'checkout-redesign': 4,
  'mobile-push': 3,
  'priya-1on1': 2,
  'sprint-24': 2,
};
