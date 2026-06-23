import React, { useEffect } from 'react';
import { useApp } from './store.jsx';
import HomeScreen from './screens/Home.jsx';
import NotebooksScreen from './screens/Notebooks.jsx';
import NotebookDetail from './screens/NotebookDetail.jsx';
import NewCaptureScreen from './screens/NewCapture.jsx';
import ChatScreen from './screens/Chat.jsx';
import { TYPE_LABELS, rankTasks, DUPLICATE_NOTEBOOK } from './data.js';

// ─── Icons ────────────────────────────────────────────────────────────────────
export const StarIcon = ({ color = '#3B82F6', size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ flexShrink: 0 }}>
    <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2Z" />
  </svg>
);

export const FileIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1={16} y1={13} x2={8} y2={13} />
    <line x1={16} y1={17} x2={8} y2={17} />
  </svg>
);

export const UserIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx={12} cy={7} r={4} />
  </svg>
);

export const RocketIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
  </svg>
);

export const ChartIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <line x1={18} y1={20} x2={18} y2={10} /><line x1={12} y1={20} x2={12} y2={4} /><line x1={6} y1={20} x2={6} y2={14} />
  </svg>
);

export const CheckIcon = ({ size = 12, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ChevronRight = ({ style }) => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const ChevronDown = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const ClockIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx={12} cy={12} r={10} /><polyline points="12 6 12 12 16 14" />
  </svg>
);

export const GripIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="#D1D5DB" style={{ flexShrink: 0 }}>
    <circle cx={9} cy={5} r={1.5} /><circle cx={9} cy={12} r={1.5} /><circle cx={9} cy={19} r={1.5} />
    <circle cx={15} cy={5} r={1.5} /><circle cx={15} cy={12} r={1.5} /><circle cx={15} cy={19} r={1.5} />
  </svg>
);

export const XIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} />
  </svg>
);

export const ExternalIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1={10} y1={14} x2={21} y2={3} />
  </svg>
);

export const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export function notebookIcon(type) {
  switch (type) {
    case 'launch': return <RocketIcon />;
    case '1on1': return <UserIcon />;
    case 'sprint_tracking': return <ChartIcon />;
    default: return <FileIcon />;
  }
}

// ─── Shared: ProposedActionCard ───────────────────────────────────────────────
export function ProposedActionCard({ description, children, isLoading }) {
  return (
    <div style={{ background: '#EFF6FF', borderLeft: '3px solid #3B82F6', borderRadius: '0 8px 8px 0', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <div style={{ color: '#3B82F6', marginTop: 2, flexShrink: 0 }}>
        <StarIcon />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: '#1E40AF', lineHeight: 1.5 }}>{description}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export const BtnPrimary = ({ onClick, children, disabled, style: s }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      background: disabled ? '#93C5FD' : '#2563EB',
      color: '#fff', border: 'none', padding: '6px 14px',
      borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: disabled ? 'default' : 'pointer',
      ...s,
    }}
    onMouseEnter={e => { if (!disabled) e.target.style.background = '#1D4ED8'; }}
    onMouseLeave={e => { if (!disabled) e.target.style.background = '#2563EB'; }}
  >
    {children}
  </button>
);

export const BtnGhost = ({ onClick, children, style: s }) => (
  <button
    onClick={onClick}
    style={{ background: 'transparent', color: '#6B7280', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', ...s }}
    onMouseEnter={e => { e.target.style.background = '#F9FAFB'; }}
    onMouseLeave={e => { e.target.style.background = 'transparent'; }}
  >
    {children}
  </button>
);

export const BtnOutline = ({ onClick, children, style: s }) => (
  <button
    onClick={onClick}
    style={{ background: '#fff', color: '#374151', border: '1px solid #E5E7EB', padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', ...s }}
    onMouseEnter={e => { e.currentTarget.style.background = '#F9FAFB'; }}
    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
  >
    {children}
  </button>
);

// ─── Shared: TaskRow ──────────────────────────────────────────────────────────
export function TaskRow({ task, showNotebook, showGrip, showPin, onToggle, onGoNb, onPin, reasonTag }) {
  const done = !!task.completedAt;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid #F3F4F6' }}>
      {showGrip && <span style={{ color: '#D1D5DB', cursor: 'grab', flexShrink: 0 }}><GripIcon /></span>}
      {/* Checkbox */}
      <div
        onClick={onToggle}
        style={{
          width: 18, height: 18, borderRadius: 4,
          border: done ? '2px solid #2563EB' : '2px solid #D1D5DB',
          background: done ? '#2563EB' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0,
        }}
      >
        {done && <CheckIcon />}
      </div>
      {/* Text */}
      <div style={{ flex: 1, minWidth: 0, color: done ? '#9CA3AF' : '#111827', textDecoration: done ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {task.text}
      </div>
      {/* Tag */}
      {reasonTag && (
        <div style={{ fontSize: 12, color: '#9CA3AF', whiteSpace: 'nowrap', flexShrink: 0 }}>{reasonTag}</div>
      )}
      {/* Notebook pill */}
      {showNotebook && task.notebook && (
        <div
          onClick={onGoNb}
          style={{ fontSize: 11, color: '#6B7280', background: '#F3F4F6', padding: '2px 8px', borderRadius: 10, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
          onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
          onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
        >
          {task.notebook}
        </div>
      )}
      {/* Pin */}
      {showPin && (
        <button
          onClick={onPin}
          title={task.manualOverride ? 'Unpin' : 'Pin to top'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: task.manualOverride ? '#2563EB' : '#D1D5DB', padding: '2px 4px', flexShrink: 0 }}
        >
          📌
        </button>
      )}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast() {
  const { state, dispatch } = useApp();
  const { toast } = state;
  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: '#111827', color: '#fff', padding: '12px 20px',
      borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex', alignItems: 'center', gap: 12,
      zIndex: 300, animation: 'slideUp 0.3s ease', whiteSpace: 'nowrap', fontSize: 14,
    }}>
      {toast.msg}
      {toast.undoable && (
        <span
          onClick={() => dispatch({ type: 'UNDO_TOAST_FILE', fileId: toast.fileId, destNotebookId: toast.destNotebookId })}
          style={{ color: '#93C5FD', cursor: 'pointer', fontSize: 13 }}
          onMouseEnter={e => e.target.style.textDecoration = 'underline'}
          onMouseLeave={e => e.target.style.textDecoration = 'none'}
        >
          Undo
        </span>
      )}
      <span
        onClick={() => dispatch({ type: 'CLEAR_TOAST' })}
        style={{ color: '#6B7280', cursor: 'pointer', marginLeft: 4 }}
      >
        <XIcon size={14} />
      </span>
    </div>
  );
}

// ─── GitHub Modal ─────────────────────────────────────────────────────────────
function GitHubModal() {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('Implement push notification frequency controls');
  const [body, setBody] = React.useState(
    'Implement user-facing controls for push notification frequency as specified in the PRD. Users should be able to select between immediate, hourly digest, and daily digest delivery. Include quiet hours settings with customizable start and end times.'
  );

  const repos = ['mobile-app', 'checkout-service', 'notifications-backend'];

  function createIssue() {
    setLoading(true);
    setTimeout(() => {
      const issueNum = Math.floor(480 + Math.random() * 20);
      dispatch({ type: 'CREATE_GH_ISSUE', fileId: state.modalData?.fileId, repo: state.ghRepo, issueNumber: issueNum });
      setLoading(false);
    }, 1000);
  }

  return (
    <div
      onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, animation: 'fadeIn 0.15s ease' }}
    >
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 12, padding: 24, width: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'center', gap: 8 }}>
            <GithubIcon /> Send to GitHub
          </div>
          <button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 4 }}>
            <XIcon />
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Repository</div>
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => dispatch({ type: 'TOGGLE_GH_DD' })}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}
            >
              {state.ghRepo} <ChevronDown />
            </div>
            {state.ghRepoDDOpen && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, overflow: 'hidden' }}>
                {repos.map(r => (
                  <div key={r} onClick={() => dispatch({ type: 'SET_GH_REPO', repo: r })} style={{ padding: '10px 12px', cursor: 'pointer', fontSize: 14 }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                  >{r}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Issue title</div>
          <input
            type="text" value={title} onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 14, color: '#111827' }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Issue body</div>
          <textarea
            rows={4} value={body} onChange={e => setBody(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 14, color: '#374151', resize: 'vertical', lineHeight: 1.5 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BtnPrimary onClick={createIssue} disabled={loading} style={{ padding: '10px 20px', fontSize: 14 }}>
            {loading ? 'Creating…' : 'Create Issue'}
          </BtnPrimary>
        </div>
      </div>
    </div>
  );
}

// ─── Meeting Capture Modal ────────────────────────────────────────────────────
function MeetingCaptureModal() {
  const { state, dispatch } = useApp();
  const meeting = state.modalData;
  const [notes, setNotes] = React.useState('');
  const [path, setPath] = React.useState('prompt'); // 'prompt' | 'add-notes' | 'upload'
  const transcriptConsent = false; // global setting, could be in state
  const agendaAttached = meeting?.agendaDocAttached || false;

  function handleEnd() {
    if (transcriptConsent) {
      dispatch({
        type: 'SUBMIT_MEETING_NOTES',
        notebookId: meeting.notebookId,
        noteName: `${meeting.title} — Auto Notes`,
        transcriptAuto: true,
      });
      return;
    }
    if (!agendaAttached && !notes) {
      // show upload prompt
      setPath('upload');
      return;
    }
  }

  function submitNotes() {
    dispatch({
      type: 'SUBMIT_MEETING_NOTES',
      notebookId: meeting.notebookId,
      noteName: `${meeting.title} — Meeting Notes`,
      transcriptAuto: false,
    });
  }

  function justAgenda() {
    dispatch({
      type: 'SUBMIT_MEETING_NOTES',
      notebookId: meeting.notebookId,
      noteName: `${meeting.title} — Agenda`,
      transcriptAuto: false,
    });
  }

  return (
    <div onClick={() => dispatch({ type: 'CLOSE_MODAL' })} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 12, padding: 24, width: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>Meeting ended: {meeting?.title}</div>
          <button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}><XIcon /></button>
        </div>

        {path === 'prompt' && !agendaAttached && (
          <>
            <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 16 }}>No agenda doc attached. Would you like to add notes or upload a file?</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <BtnPrimary onClick={() => setPath('add-notes')}>Add notes</BtnPrimary>
              <BtnOutline onClick={() => setPath('upload')}>Upload file</BtnOutline>
              <BtnGhost onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>Skip</BtnGhost>
            </div>
          </>
        )}

        {path === 'prompt' && agendaAttached && (
          <>
            <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 16 }}>Agenda doc is attached. How would you like to capture this meeting?</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <BtnPrimary onClick={() => setPath('add-notes')}>Add notes</BtnPrimary>
              <BtnOutline onClick={justAgenda}>Just the agenda</BtnOutline>
              <BtnGhost onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>Skip</BtnGhost>
            </div>
          </>
        )}

        {path === 'add-notes' && (
          <>
            <textarea
              rows={5} value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Add meeting notes…"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 14, color: '#374151', resize: 'vertical', lineHeight: 1.5, marginBottom: 16 }}
            />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <BtnGhost onClick={() => setPath('prompt')}>Back</BtnGhost>
              <BtnPrimary onClick={submitNotes}>Save notes</BtnPrimary>
            </div>
          </>
        )}

        {path === 'upload' && (
          <>
            <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 12 }}>Upload notes, agenda, or transcript:</p>
            <input type="file" style={{ display: 'block', marginBottom: 16, fontSize: 13 }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <BtnGhost onClick={() => setPath('prompt')}>Back</BtnGhost>
              <BtnPrimary onClick={submitNotes}>File it</BtnPrimary>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Merge Review Modal ───────────────────────────────────────────────────────
function MergeReviewModal() {
  const { state, dispatch } = useApp();
  // Find the primary notebook
  const primaryNb = state.notebooks.find(n => n.id === 'checkout-redesign');
  const primaryFiles = state.files['checkout-redesign'] || [];
  const primaryTasks = state.tasks.filter(t => t.notebookId === 'checkout-redesign' && !t.completedAt && !t.detailOnly);

  const dupNb = DUPLICATE_NOTEBOOK;

  function handleMerge() {
    const preMergeFileCount = primaryFiles.length + dupNb.files.length;
    const preMergeTaskCount = primaryTasks.length + dupNb.tasks.length;
    dispatch({
      type: 'MERGE_NOTEBOOKS',
      primaryId: 'checkout-redesign',
      secondaryId: dupNb.id,
      secondaryData: dupNb,
      expectedFileCount: preMergeFileCount,
      expectedTaskCount: preMergeTaskCount,
    });
    dispatch({ type: 'SET_TOAST', toast: { msg: `Merged '${dupNb.name}' into '${primaryNb?.name}'`, undoable: false } });
  }

  return (
    <div onClick={() => dispatch({ type: 'CLOSE_MODAL' })} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, animation: 'fadeIn 0.15s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 12, padding: 24, width: 680, maxHeight: '80vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>Review Duplicate Notebooks</div>
          <button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}><XIcon /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {/* Primary */}
          <div style={{ background: '#F9FAFB', borderRadius: 8, border: '1px solid #E5E7EB', padding: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#111827', marginBottom: 12 }}>{primaryNb?.name}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Files ({primaryFiles.length})</div>
            {primaryFiles.map(f => (
              <div key={f.id} style={{ fontSize: 13, color: '#374151', padding: '4px 0', borderBottom: '1px solid #E5E7EB' }}>{f.name}</div>
            ))}
            <div style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, marginTop: 12 }}>Open Tasks ({primaryTasks.length})</div>
            {primaryTasks.map(t => (
              <div key={t.id} style={{ fontSize: 13, color: '#374151', padding: '4px 0', borderBottom: '1px solid #E5E7EB' }}>{t.text}</div>
            ))}
          </div>
          {/* Duplicate */}
          <div style={{ background: '#FFF7ED', borderRadius: 8, border: '1px solid #FED7AA', padding: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#111827', marginBottom: 12 }}>{dupNb.name} <span style={{ fontSize: 11, background: '#FED7AA', color: '#92400E', padding: '1px 6px', borderRadius: 8 }}>Duplicate</span></div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Files ({dupNb.files.length})</div>
            {dupNb.files.map(f => (
              <div key={f.id} style={{ fontSize: 13, color: '#374151', padding: '4px 0', borderBottom: '1px solid #FED7AA' }}>{f.name}</div>
            ))}
            <div style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, marginTop: 12 }}>Open Tasks ({dupNb.tasks.length})</div>
            {dupNb.tasks.map(t => (
              <div key={t.id} style={{ fontSize: 13, color: '#374151', padding: '4px 0', borderBottom: '1px solid #FED7AA' }}>{t.text}</div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
          Merging will combine {primaryFiles.length + dupNb.files.length} files and {primaryTasks.length + dupNb.tasks.length} tasks into <strong>{primaryNb?.name}</strong>.
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <BtnOutline onClick={() => {
            dispatch({ type: 'DISMISS_ACTION', id: 'pa3' });
            dispatch({ type: 'CLOSE_MODAL' });
          }}>Not duplicates</BtnOutline>
          <BtnPrimary onClick={handleMerge} style={{ padding: '8px 20px' }}>Merge notebooks</BtnPrimary>
        </div>
      </div>
    </div>
  );
}

// ─── Dev Panel ────────────────────────────────────────────────────────────────
function DevPanel({ tasks, notebooks, rankedTasks }) {
  const { dispatch } = useApp();
  return (
    <div style={{
      position: 'fixed', bottom: 0, right: 0, width: 360, maxHeight: '60vh', overflow: 'auto',
      background: '#1F2937', color: '#E5E7EB', fontSize: 12, fontFamily: 'monospace',
      borderRadius: '12px 0 0 0', zIndex: 500, boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
    }}>
      <div style={{ padding: '10px 16px', background: '#111827', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '12px 0 0 0' }}>
        <span style={{ fontWeight: 700, color: '#60A5FA' }}>⚙️ Dev Score Panel (Ctrl+Shift+D)</span>
        <button onClick={() => dispatch({ type: 'TOGGLE_DEV_PANEL' })} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: 14 }}>✕</button>
      </div>
      <div style={{ padding: '8px 0' }}>
        {rankedTasks.map((t, i) => (
          <div key={t.id} style={{ padding: '8px 16px', borderBottom: '1px solid #374151' }}>
            <div style={{ color: '#93C5FD', marginBottom: 4 }}>
              #{i + 1} — {t.text.substring(0, 40)}{t.text.length > 40 ? '…' : ''}
            </div>
            <div style={{ color: '#A3E635' }}>Score: {t._score === Infinity ? '∞ (pinned)' : t._score?.toFixed(1)}</div>
            <div style={{ color: '#FCD34D' }}>Reason: {t._reason}</div>
            {t._breakdown && Object.entries(t._breakdown).map(([k, v]) => (
              <div key={k} style={{ color: '#9CA3AF', paddingLeft: 8 }}>  {k}: +{v.score} ({v.label})</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar() {
  const { state, navigate } = useApp();
  const { screen, notebookId, notebooks } = state;
  const [nbSearch, setNbSearch] = React.useState('');

  const navItem = (label, targetScreen, icon, isActive) => (
    <div
      onClick={() => navigate(targetScreen)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
        borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500,
        background: isActive ? '#EFF6FF' : 'transparent',
        color: isActive ? '#2563EB' : '#374151',
        transition: 'background 0.1s',
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F3F4F6'; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
    >
      {icon} {label}
    </div>
  );

  const isHome = screen === 'home';
  const isChat = screen === 'chat';

  const filteredNotebooks = nbSearch.trim()
    ? notebooks.filter(nb => nb.name.toLowerCase().includes(nbSearch.toLowerCase()))
    : notebooks;

  return (
    <nav style={{ width: 260, background: '#fff', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100vh', overflowY: 'auto' }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, background: '#2563EB', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StarIcon color="#fff" size={14} />
        </div>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#111827', letterSpacing: '-0.2px' }}>Copilot Notebooks</span>
      </div>

      {/* Nav */}
      <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItem('Home', 'home', <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, isHome)}
        {navItem('Chat', 'chat', <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>, isChat)}
      </div>

      <div style={{ height: 1, background: '#E5E7EB', margin: '12px 16px' }} />

      {/* New capture button */}
      <div style={{ padding: '0 12px', marginBottom: 8 }}>
        <div
          onClick={() => navigate('new-file')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500, color: '#2563EB', border: '1px dashed #93C5FD' }}
          onMouseEnter={e => e.currentTarget.style.background = '#EFF6FF'}
          onMouseLeave={e => e.currentTarget.style.background = ''}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={12} y1={5} x2={12} y2={19} /><line x1={5} y1={12} x2={19} y2={12} /></svg>
          New capture
        </div>
      </div>

      {/* Notebook list with search */}
      <div style={{ padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#9CA3AF', padding: '4px 12px', marginBottom: 6 }}>Notebooks</div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 6, padding: '0 4px' }}>
          <svg
            width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF"
            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            <circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2={16.65} y2={16.65} />
          </svg>
          <input
            type="text"
            placeholder="Search notebooks…"
            value={nbSearch}
            onChange={e => setNbSearch(e.target.value)}
            style={{
              width: '100%', padding: '6px 10px 6px 28px',
              border: '1px solid #E5E7EB', borderRadius: 6,
              fontSize: 12, color: '#374151', background: '#F9FAFB',
              outline: 'none', boxSizing: 'border-box',
            }}
            onFocus={e => { e.target.style.borderColor = '#93C5FD'; e.target.style.background = '#fff'; }}
            onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.background = '#F9FAFB'; }}
          />
        </div>

        {filteredNotebooks.length === 0 && (
          <div style={{ fontSize: 12, color: '#9CA3AF', padding: '6px 12px' }}>No notebooks match.</div>
        )}
        {filteredNotebooks.map(nb => {
          const isActive = screen === 'notebook-detail' && notebookId === nb.id;
          return (
            <div
              key={nb.id}
              onClick={() => navigate('notebook-detail', nb.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                borderRadius: 6, cursor: 'pointer', fontSize: 13,
                color: isActive ? '#2563EB' : '#6B7280',
                background: isActive ? '#EFF6FF' : 'transparent',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F3F4F6'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nb.name}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const { state, dispatch } = useApp();
  const { screen, modal, devPanelOpen, notebooks, tasks } = state;

  // Keyboard shortcut for dev panel
  useEffect(() => {
    function onKey(e) {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_DEV_PANEL' });
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);

  const rankedTasks = rankTasks(tasks, notebooks);

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#F9FAFB', color: '#111827', fontSize: 14, lineHeight: 1.5 }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', height: '100vh' }}>
        {screen === 'home' && <HomeScreen rankedTasks={rankedTasks} />}
        {screen === 'notebooks' && <NotebooksScreen />}
        {screen === 'notebook-detail' && <NotebookDetail rankedTasks={rankedTasks} />}
        {screen === 'new-file' && <NewCaptureScreen />}
        {screen === 'chat' && <ChatScreen />}
      </main>

      {/* Modals */}
      {modal === 'github' && <GitHubModal />}
      {modal === 'merge-review' && <MergeReviewModal />}
      {modal === 'meeting-capture' && <MeetingCaptureModal />}

      {/* Toast */}
      <Toast />

      {/* Dev panel */}
      {devPanelOpen && <DevPanel tasks={tasks} notebooks={notebooks} rankedTasks={rankedTasks} />}
    </div>
  );
}
