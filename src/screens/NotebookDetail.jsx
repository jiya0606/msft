import React from 'react';
import { useApp } from '../store.jsx';
import {
  BtnPrimary, BtnGhost,
  StarIcon, ExternalIcon, GithubIcon, ChartIcon,
} from '../App.jsx';
import { TYPE_LABELS, computeSprintRecipe, SPRINT_TICKETS } from '../data.js';

// ─── Checkout: Pre-Meeting Brief (only via "View Brief" from home) ─────────────
function CheckoutBriefView() {
  const actionItems = [
    { owner: 'Tom',   text: 'Share contrast-fixed mockups',                 due: 'due tomorrow', dueLevel: 'warn' },
    { owner: 'Priya', text: 'Confirm whether fix fits in Sprint 24 scope',  due: 'due today',    dueLevel: 'danger' },
    { owner: 'You',   text: 'Draft launch announcement copy',               due: 'due Friday',   dueLevel: 'normal' },
    { owner: 'You',   text: 'Get legal sign-off on new checkout terms',     due: null,           dueLevel: null },
  ];

  const fileList = [
    { name: 'Launch Plan.docx',                    icon: '📄', tag: null },
    { name: 'Checkout Redesign — PRD.docx',        icon: '📄', tag: null },
    { name: 'Sprint 24 scope notes',               icon: '📝', tag: null },
    { name: 'Push notification frequency options', icon: '📎', tag: 'auto-filed' },
  ];

  const duePill = (level, text) => {
    const s = {
      danger: { color: '#DC2626', background: '#FEF2F2' },
      warn:   { color: '#D97706', background: '#FFFBEB' },
      normal: { color: '#6B7280', background: '#F9FAFB' },
    };
    return <span style={{ fontSize: 12, padding: '2px 9px', borderRadius: 10, flexShrink: 0, ...(s[level] || s.normal) }}>{text}</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Pre-Meeting Brief */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', background: '#F9FAFB', display: 'flex', alignItems: 'center', gap: 8 }}>
          <StarIcon color="#2563EB" size={14} />
          <span style={{ fontWeight: 600, color: '#111827', fontSize: 15 }}>Pre-Meeting Brief</span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: '#9CA3AF' }}>Checkout Redesign Launch Sync · Today 2:00 PM</span>
        </div>
        <div style={{ padding: '18px 20px' }}>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.75, margin: 0 }}>
            In the last Launch Sync, the team reviewed the updated cart flow and walked through the new confirmation screen. Tom flagged a contrast issue on the confirmation screen that could affect accessibility compliance, and engineering estimated the fix would take about three days. Priya raised a question about whether the fix should be scoped into Sprint 24 or pushed to Sprint 25, given current capacity. The group also discussed Marcus's concern from email about whether the launch is still on track for end of month, and agreed to confirm that once the contrast fix timeline is locked in. No final decision was made on the announcement copy, which is still pending your draft.
          </p>
        </div>
      </div>

      {/* Open Action Items */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
          <span style={{ fontWeight: 600, color: '#111827', fontSize: 15 }}>Open Action Items</span>
        </div>
        {actionItems.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px',
            borderBottom: i < actionItems.length - 1 ? '1px solid #F3F4F6' : 'none',
          }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, border: '2px solid #D1D5DB', flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 14, color: '#111827', lineHeight: 1.4 }}>{item.text}</span>
            <span style={{
              fontSize: 12, fontWeight: 500, padding: '2px 9px', borderRadius: 10, flexShrink: 0,
              background: item.owner === 'You' ? '#DBEAFE' : '#F3F4F6',
              color: item.owner === 'You' ? '#1D4ED8' : '#374151',
            }}>{item.owner}</span>
            {item.due ? duePill(item.dueLevel, item.due) : <span style={{ fontSize: 12, color: '#D1D5DB', flexShrink: 0 }}>no due date</span>}
          </div>
        ))}
      </div>

      {/* Files */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, color: '#111827', fontSize: 15 }}>Files</span>
          <BtnGhost style={{ fontSize: 12, padding: '4px 10px' }}>+ Add file</BtnGhost>
        </div>
        {fileList.map((f, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '11px 20px',
            borderBottom: i < fileList.length - 1 ? '1px solid #F3F4F6' : 'none',
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{f.icon}</span>
            <span style={{ flex: 1, fontSize: 13, color: '#374151' }}>{f.name}</span>
            {f.tag && <span style={{ fontSize: 11, color: '#6B7280', background: '#F3F4F6', padding: '2px 8px', borderRadius: 10 }}>{f.tag}</span>}
            <ExternalIcon color="#9CA3AF" size={13} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Checkout: Copilot Analysis card 1 — cross-notebook PRD insight ────────────
const SUGGESTED_PRD_TEXT =
  'Supporting evidence: Internal usage data from the Onboarding Flow A/B Test (n=12,400) shows a consistent drop-off in notification engagement after day 14, matching the frequency curve assumed in Section 3.2 of this PRD. This validates the 2-week threshold as a reliable behavioral baseline for the frequency cap design.';

function PrdInsightCard() {
  const [phase, setPhase] = React.useState('idle'); // idle | preview | done | dismissed

  if (phase === 'dismissed') return null;

  return (
    <div style={{ background: '#EFF6FF', borderLeft: '3px solid #3B82F6', borderRadius: '0 8px 8px 0', padding: '16px 18px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <StarIcon color="#3B82F6" size={14} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1D4ED8', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 5 }}>
            Copilot · Cross-notebook insight
          </div>
          <p style={{ fontSize: 14, color: '#1E40AF', lineHeight: 1.65, margin: 0 }}>
            Your PRD assumes most users skip notifications after week 2 — usage data from the{' '}
            <strong>Onboarding Flow A/B Test</strong> shows the same drop-off pattern. Want to add this as supporting evidence in the PRD?
          </p>
        </div>
      </div>

      {/* Phase: idle — action buttons */}
      {phase === 'idle' && (
        <div style={{ display: 'flex', gap: 8, marginTop: 14, marginLeft: 24 }}>
          <BtnPrimary onClick={() => setPhase('preview')}>Add to PRD</BtnPrimary>
          <BtnGhost onClick={() => setPhase('dismissed')}>Dismiss</BtnGhost>
        </div>
      )}

      {/* Phase: preview — show the suggested text, let user confirm */}
      {phase === 'preview' && (
        <div style={{ marginTop: 14, marginLeft: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#2563EB', marginBottom: 8 }}>Suggested addition to Checkout Redesign — PRD.docx</div>
          <div style={{ background: '#fff', border: '1px solid #BFDBFE', borderRadius: 7, padding: '12px 14px' }}>
            <div style={{ fontSize: 11, color: '#9CA3AF', fontStyle: 'italic', marginBottom: 6 }}>Section 3.2 — Frequency Assumptions</div>
            <p style={{ fontSize: 13, color: '#1E3A8A', lineHeight: 1.7, margin: 0, borderLeft: '3px solid #93C5FD', paddingLeft: 10 }}>
              {SUGGESTED_PRD_TEXT}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <BtnPrimary onClick={() => setPhase('done')}>Confirm</BtnPrimary>
            <BtnGhost onClick={() => setPhase('idle')}>Cancel</BtnGhost>
          </div>
        </div>
      )}

      {/* Phase: done — success */}
      {phase === 'done' && (
        <div style={{ marginTop: 12, marginLeft: 24, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#059669', fontWeight: 500 }}>
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Added to Checkout Redesign — PRD.docx
        </div>
      )}
    </div>
  );
}

// ─── Checkout: Copilot Analysis card 2 — competitive intelligence ──────────────
const COMP_BRIEF = {
  what: 'In March 2026, Google shipped per-app notification frequency controls in Android 15. Users can cap any app to daily or weekly notification limits directly from system settings. The rollout was global with no opt-in required.',
  compare: [
    { icon: '✓', color: '#059669', label: 'Parity', text: 'Frequency caps (daily/weekly thresholds) — same core mechanism as your PRD spec.' },
    { icon: '✓', color: '#059669', label: 'Differentiated', text: 'Your design adds smart quiet hours derived from usage patterns. Google\'s controls are entirely manual.' },
    { icon: '△', color: '#D97706', label: 'Gap', text: 'Google surfaces frequency cap data to developers via Play Console. Your PRD doesn\'t yet include a developer-facing signal — worth considering for eng handoff.' },
  ],
};

function CompetitiveCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  return (
    <div style={{ background: '#F5F3FF', borderLeft: '3px solid #7C3AED', borderRadius: '0 8px 8px 0', padding: '16px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        {/* Globe-ish icon */}
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
          <circle cx={12} cy={12} r={10} />
          <line x1={2} y1={12} x2={22} y2={12} />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6D28D9', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 5 }}>
            Copilot · Competitive intelligence
          </div>
          <p style={{ fontSize: 14, color: '#4C1D95', lineHeight: 1.65, margin: 0 }}>
            Google just shipped a similar push notification frequency feature in Android 15. See how your PRD compares.
          </p>
        </div>
      </div>

      {!expanded && (
        <div style={{ display: 'flex', gap: 8, marginTop: 14, marginLeft: 24 }}>
          <button
            onClick={() => setExpanded(true)}
            style={{ background: '#7C3AED', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.background = '#6D28D9'}
            onMouseLeave={e => e.currentTarget.style.background = '#7C3AED'}
          >
            See comparison
          </button>
          <BtnGhost onClick={() => setDismissed(true)}>Dismiss</BtnGhost>
        </div>
      )}

      {expanded && (
        <div style={{ marginTop: 16, marginLeft: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* What Google shipped */}
          <div style={{ background: '#fff', border: '1px solid #DDD6FE', borderRadius: 7, padding: '13px 15px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6D28D9', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 7, display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={10}/><polyline points="12 6 12 12 16 14"/></svg>
              What Google shipped
            </div>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.65, margin: 0 }}>{COMP_BRIEF.what}</p>
          </div>

          {/* Comparison rows */}
          <div style={{ background: '#fff', border: '1px solid #DDD6FE', borderRadius: 7, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid #EDE9FE', background: '#F5F3FF' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#6D28D9', textTransform: 'uppercase', letterSpacing: '0.4px' }}>How you compare</span>
            </div>
            {COMP_BRIEF.compare.map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '11px 14px', borderBottom: i < COMP_BRIEF.compare.length - 1 ? '1px solid #F5F3FF' : 'none' }}>
                <span style={{ fontSize: 14, color: row.color, flexShrink: 0, lineHeight: 1 }}>{row.icon}</span>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: row.color }}>{row.label} · </span>
                  <span style={{ fontSize: 13, color: '#374151' }}>{row.text}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setExpanded(false)}
            style={{ alignSelf: 'flex-start', background: 'none', border: 'none', fontSize: 13, color: '#6B7280', cursor: 'pointer', padding: 0 }}
          >
            Collapse ↑
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Checkout: Default notebook view (Copilot analysis) ───────────────────────
function CheckoutDefaultView() {
  const fileList = [
    { name: 'Launch Plan.docx',                    icon: '📄', tag: null },
    { name: 'Checkout Redesign — PRD.docx',        icon: '📄', tag: null },
    { name: 'Sprint 24 scope notes',               icon: '📝', tag: null },
    { name: 'Push notification frequency options', icon: '📎', tag: 'auto-filed' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Copilot Analysis section */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>
          Copilot Analysis
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PrdInsightCard />
          <CompetitiveCard />
        </div>
      </div>

      {/* Files */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, color: '#111827', fontSize: 15 }}>Files</span>
          <BtnGhost style={{ fontSize: 12, padding: '4px 10px' }}>+ Add file</BtnGhost>
        </div>
        {fileList.map((f, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '11px 20px',
            borderBottom: i < fileList.length - 1 ? '1px solid #F3F4F6' : 'none',
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{f.icon}</span>
            <span style={{ flex: 1, fontSize: 13, color: '#374151' }}>{f.name}</span>
            {f.tag && <span style={{ fontSize: 11, color: '#6B7280', background: '#F3F4F6', padding: '2px 8px', borderRadius: 10 }}>{f.tag}</span>}
            <ExternalIcon color="#9CA3AF" size={13} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Priya 1:1 — Teams transcript auto-import ────────────────────────────────
const PRIYA_TRANSCRIPTS = [
  {
    id: 'tr1',
    title: 'Priya Nair 1:1 — June 19',
    date: 'Thu Jun 19, 2026 · 10:00 AM',
    duration: '28 min',
    autoAdded: true,
    expanded: false,
    summary: 'Reviewed Sprint 24 scope and the contrast fix timeline. Priya confirmed she needs your input on whether to include the fix before she finalizes the sprint plan. Also briefly discussed the launch announcement copy — she mentioned marketing is waiting.',
    highlights: [
      { speaker: 'Priya', text: "Can you confirm if the contrast fix is landing in Sprint 24? I need to lock the scope before standup tomorrow." },
      { speaker: 'You',   text: "I'll check with engineering on the estimate today and get back to you." },
      { speaker: 'Priya', text: "Also, marketing pinged me about the announcement copy. Are you close on that?" },
      { speaker: 'You',   text: "Working on it — should have a draft by end of week." },
    ],
  },
  {
    id: 'tr2',
    title: 'Priya Nair 1:1 — June 12',
    date: 'Thu Jun 12, 2026 · 10:00 AM',
    duration: '31 min',
    autoAdded: true,
    expanded: false,
    summary: "Covered the cart redesign wireframe sign-off, push notification PRD review timeline, and upcoming Q3 planning kickoff. Priya flagged a dependency on Tom completing his design review before engineering can start.",
    highlights: [
      { speaker: 'Priya', text: "Tom needs to finish his design review before we can hand off to eng. Can you follow up with him?" },
      { speaker: 'You',   text: "I'll ping him today. Should be done by Friday." },
    ],
  },
];

function TeamsIcon({ size = 16 }) {
  return (
    <div style={{ width: size, height: size, background: '#6264A7', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 16 16" fill="white">
        <path d="M9.5 4a2 2 0 100-4 2 2 0 000 4z"/>
        <path d="M7 6h5.5a1 1 0 011 1v4.5a1 1 0 01-1 1H7V6zM6 7H4.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5H6V7z"/>
      </svg>
    </div>
  );
}

function PriyaOverview() {
  const [transcripts, setTranscripts] = React.useState(PRIYA_TRANSCRIPTS);
  const [simulating, setSimulating] = React.useState(false);
  const [simulateDone, setSimulateDone] = React.useState(false);

  function toggleExpand(id) {
    setTranscripts(ts => ts.map(t => t.id === id ? { ...t, expanded: !t.expanded } : t));
  }

  function simulateImport() {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      setSimulateDone(true);
      setTranscripts(ts => [{
        id: 'tr-live',
        title: 'Priya Nair 1:1 — June 22 (today)',
        date: 'Mon Jun 22, 2026 · 10:00 AM',
        duration: '24 min',
        autoAdded: true,
        expanded: true,
        summary: "Discussed the contrast fix decision and confirmed it will be scoped into Sprint 24. Priya will update the sprint plan today. Also aligned on the announcement copy — you committed to sending a draft before EOD.",
        highlights: [
          { speaker: 'Priya', text: "Great — so we're including the contrast fix in Sprint 24. I'll update the board now." },
          { speaker: 'You',   text: "Yes, engineering confirmed 3 days. It fits." },
          { speaker: 'Priya', text: "Can you get me the announcement copy draft today so I can hand it to marketing?" },
          { speaker: 'You',   text: "I'll have it to you before EOD." },
        ],
      }, ...ts]);
    }, 1800);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Teams integration banner */}
      <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 8, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <TeamsIcon size={22} />
          <div>
            <div style={{ fontWeight: 600, color: '#1E40AF', fontSize: 14 }}>Teams transcript sync is on</div>
            <div style={{ fontSize: 13, color: '#3B82F6', marginTop: 1 }}>Transcripts are added automatically after each meeting ends</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          {!simulateDone && (
            <button
              onClick={simulateImport}
              disabled={simulating}
              style={{
                background: simulating ? '#93C5FD' : '#2563EB', color: '#fff',
                border: 'none', padding: '7px 14px', borderRadius: 6,
                fontSize: 13, fontWeight: 500, cursor: simulating ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              {simulating ? 'Importing…' : 'Simulate meeting end'}
            </button>
          )}
          {simulateDone && (
            <span style={{ fontSize: 13, color: '#059669', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Transcript added
            </span>
          )}
        </div>
      </div>

      {/* Transcript list */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
          <span style={{ fontWeight: 600, color: '#111827', fontSize: 15 }}>Meeting Transcripts</span>
          <span style={{ marginLeft: 8, fontSize: 12, color: '#9CA3AF' }}>{transcripts.length} sessions</span>
        </div>
        {transcripts.map((t, i) => (
          <div key={t.id} style={{ borderBottom: i < transcripts.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
            <div
              onClick={() => toggleExpand(t.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
              onMouseLeave={e => e.currentTarget.style.background = ''}
            >
              <TeamsIcon size={18} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, color: '#111827', fontSize: 14 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{t.date} · {t.duration}</div>
              </div>
              {t.autoAdded && (
                <span style={{ fontSize: 11, background: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: 10, fontWeight: 500, flexShrink: 0 }}>
                  auto-imported
                </span>
              )}
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                style={{ flexShrink: 0, transform: t.expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {t.expanded && (
              <div style={{ padding: '0 20px 18px', borderTop: '1px solid #F3F4F6' }}>
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <StarIcon color="#3B82F6" size={10} /> Copilot summary
                  </div>
                  <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0, background: '#F9FAFB', borderRadius: 6, padding: '10px 14px' }}>
                    {t.summary}
                  </p>
                </div>
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Key moments</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {t.highlights.map((h, hi) => (
                      <div key={hi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 8, flexShrink: 0, marginTop: 1,
                          background: h.speaker === 'You' ? '#DBEAFE' : '#F3F4F6',
                          color: h.speaker === 'You' ? '#1D4ED8' : '#374151',
                        }}>{h.speaker}</span>
                        <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{h.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Next meeting */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 500, color: '#111827' }}>Next 1:1 with Priya</div>
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>Tomorrow · 10:00 AM · Transcript will auto-import when the meeting ends</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6264A7', fontWeight: 500 }}>
          <TeamsIcon size={14} /> Teams
        </div>
      </div>
    </div>
  );
}

// ─── Sprint Planning overview ─────────────────────────────────────────────────
function SprintOverview({ notebook }) {
  const { state, dispatch } = useApp();
  const { recipeRanFor } = state;
  const hasRun = recipeRanFor.has(notebook.id);
  const recipe = hasRun ? computeSprintRecipe(SPRINT_TICKETS) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <ChartIcon color="#2563EB" size={16} />
          <span style={{ fontWeight: 600, color: '#111827', fontSize: 15 }}>Sprint 24 Planning</span>
        </div>

        {!hasRun && (
          <div style={{ background: '#EFF6FF', borderLeft: '3px solid #3B82F6', borderRadius: '0 8px 8px 0', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <StarIcon color="#3B82F6" size={14} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, color: '#1E40AF', marginBottom: 2 }}>Sprint Recipe available</div>
              <div style={{ fontSize: 13, color: '#3B82F6' }}>Generate a sprint summary from Sprint 23 data to inform Sprint 24 planning.</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <BtnPrimary onClick={() => dispatch({ type: 'RUN_RECIPE', notebookId: notebook.id })}>Generate</BtnPrimary>
                <BtnGhost onClick={() => dispatch({ type: 'SAVE_RECIPE_TYPE', recipeType: 'sprint' })}>Save for later</BtnGhost>
              </div>
            </div>
          </div>
        )}

        {hasRun && recipe && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { label: 'Velocity',            value: `${recipe.completionPct}%`,   note: `${recipe.totalDone}/${recipe.totalCommitted} pts committed` },
                { label: `${recipe.topEpicName.split(' ')[0]} Epic`, value: `${recipe.topEpicPct}%`, note: 'of sprint capacity' },
                { label: 'Sprint 23 Carryover', value: `${recipe.carryoverCount}`,   note: 'items to plan in Sprint 24' },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#F9FAFB', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{stat.note}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#F9FAFB', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Sprint 23 Insights</div>
              <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <li style={{ fontSize: 13, color: '#6B7280' }}>{recipe.topEpicName} delivered {recipe.topEpicPct}% of sprint capacity — highest single-epic concentration</li>
                <li style={{ fontSize: 13, color: '#6B7280' }}>Bugs took {recipe.bugPctLonger}% longer to close than features ({recipe.avgBugDays}d vs {recipe.avgFeatureDays}d avg)</li>
                <li style={{ fontSize: 13, color: '#6B7280' }}>{recipe.carryoverCount} carryover items from Sprint 23 need to be re-committed or deprioritized</li>
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Sprint 23 Carryover Tickets</div>
              {['PUSH-102: Push notification frequency cap', 'PUSH-115: Cold-start fallback logic', 'PUSH-118: A/B test variant logging'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #F3F4F6' }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, border: '2px solid #D1D5DB', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#374151', flex: 1 }}>{t}</span>
                  <button
                    onClick={() => dispatch({ type: 'OPEN_GH_MODAL', task: { id: t, text: t } })}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: '1px solid #E5E7EB', borderRadius: 5, padding: '3px 8px', cursor: 'pointer', fontSize: 12, color: '#6B7280' }}
                  >
                    <GithubIcon size={12} /> Create Issue
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Generic overview ─────────────────────────────────────────────────────────
function GenericOverview({ notebook }) {
  const { state, dispatch } = useApp();
  const { tasks } = state;
  const myTasks = tasks.filter(t => t.notebookId === notebook.id && !t.done && !t.detailOnly);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: 20 }}>
        <div style={{ fontWeight: 600, color: '#111827', fontSize: 15, marginBottom: 12 }}>Open Tasks</div>
        {myTasks.length === 0
          ? <div style={{ fontSize: 14, color: '#9CA3AF' }}>No open tasks.</div>
          : myTasks.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
              <div
                onClick={() => dispatch({ type: 'TOGGLE_TASK', taskId: t.id })}
                style={{ width: 18, height: 18, borderRadius: 4, border: '2px solid #D1D5DB', flexShrink: 0, cursor: 'pointer' }}
              />
              <span style={{ fontSize: 14, color: '#374151' }}>{t.text}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function NotebookDetailScreen() {
  const { state, navigate } = useApp();
  const { notebookId, notebookViewMode, notebooks } = state;

  const notebook = notebooks.find(n => n.id === notebookId);
  if (!notebook) {
    return <div style={{ padding: 32, color: '#9CA3AF' }}>Notebook not found.</div>;
  }

  const typeLabel = TYPE_LABELS[notebook.type] || notebook.type;
  const typeColors = {
    'launch':          { bg: '#DBEAFE', text: '#1D4ED8' },
    'prd':             { bg: '#F3E8FF', text: '#7C3AED' },
    '1on1':            { bg: '#D1FAE5', text: '#065F46' },
    'sprint_tracking': { bg: '#FEF9C3', text: '#92400E' },
    'general':         { bg: '#F3F4F6', text: '#374151' },
  };
  const { bg, text: textColor } = typeColors[notebook.type] || typeColors.general;

  let body;
  if (notebookId === 'checkout-redesign') {
    body = notebookViewMode === 'brief'
      ? <CheckoutBriefView />
      : <CheckoutDefaultView />;
  } else if (notebookId === 'priya-1on1') {
    body = <PriyaOverview />;
  } else if (notebookId === 'sprint-24') {
    body = <SprintOverview notebook={notebook} />;
  } else {
    body = <GenericOverview notebook={notebook} />;
  }

  return (
    <div style={{ padding: 32, maxWidth: 860 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-0.3px' }}>{notebook.name}</h1>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 10, background: bg, color: textColor }}>{typeLabel}</span>
            {notebookId === 'checkout-redesign' && notebookViewMode === 'brief' && (
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>
                Pre-meeting view ·{' '}
                <button
                  onClick={() => navigate('notebook-detail', 'checkout-redesign', 'default')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563EB', fontSize: 12, padding: 0 }}
                >
                  View notebook
                </button>
              </span>
            )}
          </div>
        </div>
        <BtnGhost>Edit</BtnGhost>
      </div>

      {body}
    </div>
  );
}
