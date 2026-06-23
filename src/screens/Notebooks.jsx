import React from 'react';
import { useApp } from '../store.jsx';
import { notebookIcon, BtnPrimary } from '../App.jsx';
import { TYPE_LABELS, NB_OPEN_TASK_COUNTS } from '../data.js';

export default function NotebooksScreen() {
  const { state, navigate } = useApp();
  const { notebooks } = state;

  return (
    <div style={{ padding: 32, maxWidth: 960 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>Notebooks</div>
        <BtnPrimary onClick={() => navigate('new-file')} style={{ padding: '8px 16px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1={12} y1={5} x2={12} y2={19} /><line x1={5} y1={12} x2={19} y2={12} /></svg>
          New
        </BtnPrimary>
      </div>

      {/* Search bar → goes to chat */}
      <div
        onClick={() => navigate('chat')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, marginBottom: 24, cursor: 'text' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#D1D5DB'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}
      >
        <div style={{ color: '#9CA3AF' }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2={16.65} y2={16.65} /></svg>
        </div>
        <span style={{ color: '#9CA3AF', fontSize: 14 }}>Ask Copilot to find anything...</span>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {notebooks.filter(nb => nb.id !== 'quick-notes').map(nb => {
          const openCount = NB_OPEN_TASK_COUNTS[nb.id] ?? 0;
          const typeLabel = TYPE_LABELS[nb.type] || nb.type;
          return (
            <div
              key={nb.id}
              onClick={() => navigate('notebook-detail', nb.id)}
              style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: 20, cursor: 'pointer', transition: 'box-shadow 0.15s, border-color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#D1D5DB'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '#E5E7EB'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ color: '#6B7280' }}>{notebookIcon(nb.type)}</div>
                <div style={{ fontWeight: 600, color: '#111827', fontSize: 14, lineHeight: 1.3 }}>{nb.name}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 12, color: '#9CA3AF' }}>
                  Updated {formatNbUpdated(nb.lastUpdatedAt)}
                </div>
                <div style={{ fontSize: 12, color: '#6B7280', background: '#F3F4F6', padding: '2px 8px', borderRadius: 10 }}>
                  {openCount} open
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatNbUpdated(date) {
  if (!date) return '—';
  const NOW = new Date('2026-06-22T13:20:00');
  const diff = NOW - date;
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (weeks === 1) return '1 week ago';
  return `${weeks} weeks ago`;
}
