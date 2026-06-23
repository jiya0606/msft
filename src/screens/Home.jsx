import React from 'react';
import { useApp } from '../store.jsx';
import { ProposedActionCard, BtnPrimary, BtnGhost, StarIcon, ClockIcon, XIcon } from '../App.jsx';

// ─── Source logos ─────────────────────────────────────────────────────────────
function OutlookLogo() {
  return (
    <div title="Outlook" style={{ width: 20, height: 20, background: '#0078D4', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={12} height={10} viewBox="0 0 12 10" fill="none">
        <rect x={0} y={0} width={12} height={10} rx={1} fill="white" opacity={0.15}/>
        <path d="M1 2h10M1 2v7h10V2M1 2l5 4 5-4" stroke="white" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function GitHubLogo() {
  return (
    <div title="GitHub" style={{ width: 20, height: 20, background: '#24292F', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={12} height={12} viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    </div>
  );
}

function TeamsLogo() {
  return (
    <div title="Microsoft Teams" style={{ width: 20, height: 20, background: '#6264A7', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={12} height={12} viewBox="0 0 16 16" fill="white">
        <path d="M9.5 4a2 2 0 100-4 2 2 0 000 4z"/>
        <path d="M7 6h5.5a1 1 0 011 1v4.5a1 1 0 01-1 1H7V6zM6 7H4.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5H6V7z"/>
      </svg>
    </div>
  );
}

function CalendarLogo() {
  return (
    <div title="Calendar" style={{ width: 20, height: 20, background: '#fff', borderRadius: 4, border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
        <rect x={2} y={4} width={20} height={18} rx={2} fill="#1A73E8"/>
        <rect x={2} y={4} width={20} height={6} rx={0} fill="#4285F4"/>
        <rect x={2} y={4} width={20} height={4} rx={0} fill="#1A73E8"/>
        <circle cx={8} cy={2} r={1.5} fill="#5F6368"/>
        <circle cx={16} cy={2} r={1.5} fill="#5F6368"/>
        <text x={12} y={17} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">22</text>
      </svg>
    </div>
  );
}

// ─── Teams Reply Modal ────────────────────────────────────────────────────────
function TeamsReplyModal({ onClose, onSend }) {
  const [reply, setReply] = React.useState(
    "The PRD says the contrast fix qualifies as a blocking accessibility issue, which means it needs to ship with this release. Engineering scoped it at 3 days, so it should fit within Sprint 24's remaining capacity without displacing other committed work. I'll confirm with the eng lead and get you a final answer before standup."
  );

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, animation: 'fadeIn 0.15s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 12, width: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ background: '#6264A7', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <TeamsLogo />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: '#fff', fontSize: 14 }}>Priya Nair</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Direct Message · Teams</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', padding: 4 }}>
            <XIcon size={16} />
          </button>
        </div>

        {/* Message thread */}
        <div style={{ padding: 20, background: '#F5F5F5', minHeight: 120 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#6264A7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>P</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: '#252424' }}>Priya Nair</span>
                <span style={{ fontSize: 11, color: '#8E8E8E' }}>1:18 PM</span>
              </div>
              <div style={{ background: '#fff', borderRadius: '0 8px 8px 8px', padding: '10px 14px', fontSize: 13, color: '#252424', lineHeight: 1.5, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', maxWidth: 360 }}>
                Hey, just following up — I need to finalize the Sprint 24 scope before standup. Can you confirm whether the contrast fix is being included? I can't move forward on the sprint plan until I hear from you.
              </div>
            </div>
          </div>
        </div>

        {/* Reply area */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6264A7', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
            <StarIcon color="#6264A7" size={10} /> Copilot draft
          </div>
          <textarea
            value={reply}
            onChange={e => setReply(e.target.value)}
            rows={4}
            style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#252424', lineHeight: 1.6, resize: 'none', fontFamily: 'inherit', background: '#FAFAFA' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
            <BtnGhost onClick={onClose}>Cancel</BtnGhost>
            <button
              onClick={onSend}
              style={{ background: '#6264A7', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={22} y1={2} x2={11} y2={13}/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Email Approval Modal ─────────────────────────────────────────────────────
const COPILOT_NOTES = [
  {
    id: 'cn1',
    type: 'suggestion',
    phrase: 'redesigned from the ground up',
    note: 'Consider "faster, more accessible checkout" — aligns more closely with the positioning in the launch brief and Sprint 24 scope notes.',
  },
  {
    id: 'cn2',
    type: 'warning',
    phrase: '[launch date]',
    note: 'This placeholder hasn\'t been filled in. Confirm the go-live date before approving — marketing will publish it as-is.',
  },
  {
    id: 'cn3',
    type: 'info',
    phrase: 'WCAG 2.1 AA',
    note: 'Legal sign-off on the accessibility claim is still pending (see open action items). Flag to Keisha if this is a blocker.',
  },
];

function EmailApprovalModal({ onClose, onSend }) {
  const noteColors = {
    suggestion: { border: '#BFDBFE', bg: '#EFF6FF', icon: '💡', label: 'Suggestion', labelColor: '#1D4ED8' },
    warning:    { border: '#FCD34D', bg: '#FFFBEB', icon: '⚠️', label: 'Heads-up',   labelColor: '#92400E' },
    info:       { border: '#D1D5DB', bg: '#F9FAFB', icon: 'ℹ️', label: 'Note',       labelColor: '#374151' },
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, animation: 'fadeIn 0.15s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 12, width: 600, maxHeight: '88vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>

        {/* Header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#111827', marginBottom: 3 }}>
              Launch Announcement Copy — Approval Needed
            </div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>From: Keisha Thompson · Marketing · <strong style={{ color: '#D97706' }}>Due today</strong></div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4, flexShrink: 0 }}>
            <XIcon size={16} />
          </button>
        </div>

        {/* Attachment banner */}
        <div style={{ margin: '14px 20px 0', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: '#DBEAFE', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>📄</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, fontSize: 13, color: '#111827' }}>Checkout Redesign Launch Announcement.docx</div>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}>Attached by Keisha · Viewing through Copilot</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, background: '#EFF6FF', color: '#2563EB', padding: '3px 9px', borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
            <StarIcon size={9} /> Copilot reviewed
          </span>
        </div>

        {/* Doc content */}
        <div style={{ margin: '14px 20px 0', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '4px 14px', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: 11, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#D1D5DB', display: 'inline-block' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#D1D5DB', display: 'inline-block' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#D1D5DB', display: 'inline-block' }} />
            <span style={{ marginLeft: 4 }}>Document preview</span>
          </div>
          <div style={{ padding: '20px 24px', fontFamily: 'Georgia, serif' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'inherit', marginBottom: 14 }}>
              FOR IMMEDIATE RELEASE
            </div>
            <p style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.85, margin: 0, fontFamily: 'inherit' }}>
              We're excited to announce a brand-new checkout experience,{' '}
              <mark style={{ background: '#DBEAFE', padding: '0 2px', borderRadius: 2 }}>redesigned from the ground up</mark>
              {' '}to be faster, cleaner, and more accessible. The updated flow reduces checkout steps by 40% and introduces a redesigned confirmation screen that meets{' '}
              <mark style={{ background: '#F3F4F6', padding: '0 2px', borderRadius: 2 }}>WCAG 2.1 AA</mark>
              {' '}accessibility standards. Starting{' '}
              <mark style={{ background: '#FEF3C7', padding: '0 2px', borderRadius: 2 }}>[launch date]</mark>
              , all users will transition to the new experience automatically — no action required.
            </p>
          </div>
        </div>

        {/* Copilot notes */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#2563EB', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
            <StarIcon size={11} /> Copilot review — {COPILOT_NOTES.length} notes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {COPILOT_NOTES.map(n => {
              const c = noteColors[n.type];
              return (
                <div key={n.id} style={{ border: `1px solid ${c.border}`, background: c.bg, borderRadius: 7, padding: '10px 13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 12 }}>{c.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: c.labelColor, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{c.label}</span>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>·</span>
                    <span style={{ fontSize: 12, color: '#6B7280', fontStyle: 'italic' }}>"{n.phrase}"</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{n.note}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <BtnGhost onClick={onClose}>Cancel</BtnGhost>
          <BtnPrimary onClick={onSend} style={{ padding: '8px 20px' }}>
            Approve &amp; notify marketing
          </BtnPrimary>
        </div>
      </div>
    </div>
  );
}

// ─── Urgent Card ──────────────────────────────────────────────────────────────
function UrgentCard({ color, borderColor, iconColor, text, timing, actions }) {
  return (
    <div style={{ background: color, borderLeft: `3px solid ${borderColor}`, borderRadius: '0 8px 8px 0', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div style={{ color: iconColor, marginTop: 1, flexShrink: 0 }}>
        <ClockIcon color={iconColor} size={16} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 600, color: '#111827' }}>{text}</span>
          {timing && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 500, color: iconColor, background: 'rgba(255,255,255,0.7)', border: `1px solid ${borderColor}`, borderRadius: 20, padding: '2px 9px', whiteSpace: 'nowrap' }}>
              <ClockIcon color={iconColor} size={11} /> {timing}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {actions}
        </div>
      </div>
    </div>
  );
}

// ─── To-Do Item Row ───────────────────────────────────────────────────────────
function TodoItem({ logo, text, done, onToggle }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid #F3F4F6' }}>
      <div
        onClick={onToggle}
        style={{
          width: 18, height: 18, borderRadius: 4, flexShrink: 0,
          border: done ? '2px solid #2563EB' : '2px solid #D1D5DB',
          background: done ? '#2563EB' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        {done && <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
      </div>
      <div style={{ flex: 1, minWidth: 0, color: done ? '#9CA3AF' : '#374151', textDecoration: done ? 'line-through' : 'none', lineHeight: 1.4 }}>
        {text}
      </div>
      <div style={{ flexShrink: 0 }}>{logo}</div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen({ rankedTasks }) {
  const { state, dispatch, navigate } = useApp();
  const { proposedActions } = state;
  const [dismissed, setDismissed] = React.useState({});
  const [teamsModalOpen, setTeamsModalOpen] = React.useState(false);
  const [emailModalOpen, setEmailModalOpen] = React.useState(false);
  const [todoDone, setTodoDone] = React.useState({});

  const u1Dismissed = dismissed.u1;
  const u2Dismissed = dismissed.u2;
  const u3Dismissed = dismissed.u3;

  const pendingActions = proposedActions.filter(p => p.status === 'pending');
  const s2 = pendingActions.find(p => p.id === 'pa2');

  const todoItems = [
    { id: 'td1', logo: <OutlookLogo />, text: "Reply to Marcus's email — he's asking if the launch is still on track for end of month" },
    { id: 'td2', logo: <GitHubLogo />, text: "Priya commented on the PRD asking you to confirm the rollout percentage" },
    { id: 'td3', logo: <TeamsLogo />, text: "Tom sent mockups in Teams chat — he's asking for sign-off before he hands off to engineering" },
    { id: 'td4', logo: <CalendarLogo />, text: "Calendar shows your 1:1 with Marcus was never rescheduled after last week's cancellation" },
  ];

  return (
    <div style={{ padding: 32, maxWidth: 860 }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 24, letterSpacing: '-0.3px' }}>
        Good afternoon, Jiya
      </div>

      {/* Urgent banners */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {!u1Dismissed && (
          <UrgentCard
            color="#FEF2F2" borderColor="#EF4444" iconColor="#EF4444"
            text="Reply to Priya — she's blocked on the contrast fix until you confirm scope"
            actions={<>
              <button
                onClick={() => setTeamsModalOpen(true)}
                style={{ background: '#6264A7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
                onMouseEnter={e => e.currentTarget.style.background = '#4F5196'}
                onMouseLeave={e => e.currentTarget.style.background = '#6264A7'}
              >
                <TeamsLogo />
                Reply in Teams
              </button>
              <BtnGhost onClick={() => setDismissed(d => ({ ...d, u1: true }))}>Snooze</BtnGhost>
            </>}
          />
        )}
        {!u2Dismissed && (
          <UrgentCard
            color="#FFFBEB" borderColor="#F59E0B" iconColor="#D97706"
            text="Approve the launch announcement copy — marketing needs it by end of day to schedule social posts"
            actions={<>
              <BtnPrimary onClick={() => setEmailModalOpen(true)} style={{ background: '#D97706' }}>
                Open Draft
              </BtnPrimary>
              <BtnGhost onClick={() => setDismissed(d => ({ ...d, u2: true }))}>Snooze</BtnGhost>
            </>}
          />
        )}
        {!u3Dismissed && (
          <UrgentCard
            color="#EFF6FF" borderColor="#3B82F6" iconColor="#2563EB"
            text="Send Alex the PRD she requested before your 1:1 today"
            timing="1:1 at 4:00 PM · in 2h 40m"
            actions={<>
              <button
                onClick={() => setDismissed(d => ({ ...d, u3: true }))}
                style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
                onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
                onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}
              >
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
                Send PRD
              </button>
              <BtnGhost onClick={() => setDismissed(d => ({ ...d, u3: true }))}>Snooze</BtnGhost>
            </>}
          />
        )}
      </div>

      {/* Copilot Suggestions */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <StarIcon /> Copilot Suggestions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {s2 && (
            <ProposedActionCard description={s2.description}>
              <BtnPrimary onClick={() => dispatch({ type: 'ACCEPT_ACTION', id: 'pa2' })}>Accept</BtnPrimary>
              <BtnGhost onClick={() => dispatch({ type: 'DISMISS_ACTION', id: 'pa2' })}>Dismiss</BtnGhost>
            </ProposedActionCard>
          )}
          {!s2 && (
            <div style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', padding: '16px 0' }}>No pending suggestions.</div>
          )}
        </div>
      </div>

      {/* Coming Up */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 16 }}>Coming Up</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { title: 'Checkout Redesign Launch Sync', when: 'Today, 2:00 PM', nbId: 'checkout-redesign' },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 8, background: '#F9FAFB' }}>
              <div>
                <div style={{ fontWeight: 500, color: '#111827' }}>{m.title}</div>
                <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{m.when}</div>
              </div>
              <BtnPrimary onClick={() => navigate('notebook-detail', m.nbId, 'brief')}>View Brief</BtnPrimary>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 4 }}>Action Items</div>
        <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 14 }}>Needs your attention across apps</div>
        {todoItems.map(item => (
          <TodoItem
            key={item.id}
            logo={item.logo}
            text={item.text}
            done={!!todoDone[item.id]}
            onToggle={() => setTodoDone(d => ({ ...d, [item.id]: !d[item.id] }))}
          />
        ))}
      </div>

      {/* Modals */}
      {teamsModalOpen && (
        <TeamsReplyModal
          onClose={() => setTeamsModalOpen(false)}
          onSend={() => { setTeamsModalOpen(false); setDismissed(d => ({ ...d, u1: true })); }}
        />
      )}
      {emailModalOpen && (
        <EmailApprovalModal
          onClose={() => setEmailModalOpen(false)}
          onSend={() => { setEmailModalOpen(false); setDismissed(d => ({ ...d, u2: true })); }}
        />
      )}
    </div>
  );
}
